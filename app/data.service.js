export async function fetch() {
    return JSON.parse(localStorage.getItem('food-items')) || [];
}

export async function add({ name, image }) {
    const items = JSON.parse(localStorage.getItem('food-items')) || [];
    items.push({ name, image });
    localStorage.setItem('food-items', JSON.stringify(items));
}

export default { fetch, add };