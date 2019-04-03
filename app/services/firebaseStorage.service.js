const KEY = 'IMAGE_NAMES';
const storageRef = window.firebase.storage().ref();


export async function fetch() {
	const names = _getNames();
	const urls = await Promise.all(names.map(fetchImage));
	return urls;
}

async function fetchImage(name) {
	const url = await storageRef.child(name).getDownloadURL();
	const metadata = await storageRef.child(name).getMetadata();

	return { image: url, date: metadata.timeCreated };
}

export async function add(item) {
	const names = _getNames();
	names.push(item.name);
	localStorage.setItem(KEY, JSON.stringify(names));

	return storageRef.child(item.name).put(item);
}

function _getNames() {
	return JSON.parse(localStorage.getItem(KEY)) || [];
}


export default { fetch, add };
