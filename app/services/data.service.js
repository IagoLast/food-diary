import storageService from './firebaseStorage.service.js';

export async function fetch() {
	return storageService.fetch();
}

export async function add(item) {
	return storageService.add(item);
}

export default { fetch, add };
