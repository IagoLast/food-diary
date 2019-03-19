export default class Items extends HTMLElement {
	static get observedAttributes() {
		return ['items'];
	}

	constructor() {
		super();
		this._items = [];
	}

	set items(value) {
		this._items = value;
		this.render();
	}

	attributeChangedCallback() {
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = '';
		this._items.forEach(item => this._renderItem(item));
	}

	_renderItem(item) {
		const article = this._createArticle(item);
		this.appendChild(article);
	}

	_createArticle(item) {
		const article = document.createElement('article');
		article.classList.add('food-item');
		article.innerHTML = `
			<img src="${item.image}" >
			${item.date ? `<p> ${new Date(item.date).toLocaleString()} </p>`: ''}
		`;
		return article;
	}
}

window.customElements.define('food-items', Items);
