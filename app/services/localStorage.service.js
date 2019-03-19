const KEY = 'FOOD_ITEMS_LOCAL_STORAGE_KEY';

export async function fetch() {
	return _getItems();
}

export async function add(item) {
	const items = _getItems();
	items.push(item);
	localStorage.setItem(KEY, JSON.stringify(items));
}


function _getItems() {
	return JSON.parse(localStorage.getItem(KEY)) || [];
}

export default { fetch, add };
