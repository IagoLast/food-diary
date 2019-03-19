import './components/Items.js';
import dataService from './services/data.service.js';

const $file = document.querySelector('[name="image"]');
const $items = document.querySelector('food-items');

(async function init() {
	$file.addEventListener('change', _onFileChanged);
	_renderItems();
})();

function _resetForm() {
	$file.value = '';
}

async function _renderItems() {
	const items = await dataService.fetch();
	$items.items = items;
}

function _onFileChanged() {
	const reader = new FileReader();
	reader.onload = e => {
		const file = e.target.result;
		if (!file) {
			return;
		}
		_submit(file);
	};
	reader.readAsDataURL($file.files[0]);
}

async function _submit(file) {
	await dataService.add({ image: file, date: Date.now() });
	_resetForm();
	_renderItems();
}
