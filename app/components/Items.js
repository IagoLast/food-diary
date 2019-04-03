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
		const days = this._splitByDay(this._items);
		for (const day in days) {
			this._renderDay(days[day]);
		}
	}

	_renderDay(data) {
		const $day = this._createArticle(data);
		this.appendChild($day);
	}

	_createArticle(data) {
		const article = document.createElement('article');
		article.classList.add('day');
		article.innerHTML = `
			<time class="date">
				${data.day}
			</time>
			<div class="media">
				${data.images.map(image => `<img src="${image}">`).join('')}
			</div>
		`;
		return article;
	}

	_splitByDay(items) {
		const days = [];
		for (const item of items) {
			const date = new Date(item.date);
			date.setHours(0, 0, 0, 0);
			const key = date.toLocaleDateString();
			if (days[key]) {
				days[key].images.push(item.image);
			} else {
				days[key] = { day: key, images: [item.image] };
			}
		}
		return days;
	}
}

window.customElements.define('food-items', Items);
