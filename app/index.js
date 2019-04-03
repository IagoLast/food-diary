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
	const file = $file.files[0];
	_submit(file);
}

async function _submit(file) {
	await dataService.add(file);
	_resetForm();
	_renderItems();
}
