import dataService from './data.service.js';

let file;
const $form = document.querySelector('.form');
const $name = document.querySelector('[name="name"]');
const $file = document.querySelector('[name="image"]');
const $preview = document.querySelector('.preview');
const $items = document.querySelector('.items');

(async function init() {
    $file.addEventListener('change', _onFileChanged);
    $form.addEventListener('submit', _onSubmit);

    _renderItems();
})();

function _resetForm() {
    $file.value = '';
    $name.value = '';
    $preview.setAttribute('src', 'img/camera.svg');
}

async function _renderItems() {
    const items = await dataService.fetch();
    $items.innerHTML = '';
    items.forEach(item => _renderItem(item.name, item.image));
}

async function _renderItem(name, base64Image) {
    const article = _createArticle(name, base64Image);
    $items.appendChild(article);
}

function _createArticle(name, base64Image) {
    const article = document.createElement('article');
    article.classList.add('food-item');

    article.innerHTML = `
        <img 
            src="${base64Image}"
            alt="${name}"
        >
        <div class="info">
            <h3> ${name}</h3>
        </div>`;
    return article;
}

function _onFileChanged() {
    const reader = new FileReader();
    reader.onload = e => {
        file = e.target.result;
        $preview.setAttribute('src', file);
    }
    reader.readAsDataURL($file.files[0]);
}

async function _onSubmit(event) {
    event.preventDefault();
    if (!$name.value || !file) {
        return;
    }
    await dataService.add({ name: $name.value, image: file });
    _resetForm();
    _renderItems();
}