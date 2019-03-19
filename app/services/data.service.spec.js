require = require('esm')(module); // eslint-disable-line
const dataService = require('./data.service').default;

describe('dataService', () => {
	it('should return an empty array when there is no stored items', async () => {
		const actual = await dataService.fetch();
		expect(actual).toEqual([]);
	});	
		
	it('should return a list of items when there are stored items', async () => {
		dataService.add({ date: 'dummy_date_0', img: 'fake_img_0' });
		dataService.add({ date: 'dummy_date_1', img: 'fake_img_1' });

			
		const actual = await dataService.fetch();
		expect(actual).toEqual([
			{ date: 'dummy_date_0', img: 'fake_img_0' },
			{ date: 'dummy_date_1', img: 'fake_img_1' }
		]);
	});
});
