import localStorageService from './localStorage.service.js';

export async function fetch() {
	return localStorageService.fetch();
}

export async function add(item) {
	return localStorageService.add(item);
}

export default { fetch, add };
