const { DateTime, Info } = require('luxon');
require('../src/index.js');

function testDates({ expected, format, locale, dates }) {
	for (const date of dates) {
		it(date, () => {
			const actualString = DateTime.fromAny(date, { locale }).toFormat(format);
			const expectedString = DateTime.fromISO(expected).toFormat(format);
			expect(actualString).toBe(expectedString);
		});
	}
}

// console.log('fr-FR', Info.months('long', { locale: 'fr-FR' }));
// console.log('Info.features()', Info.features());

describe('monthname day year', () => {
	testDates({
		expected: '2016-03-24',
		format: 'yyyy-MM-dd',
		locale: 'en-US',
		dates: [
			'Sun. March 24th, 2016',
			'Sun, March 24th, 2016',
			'Sun, March 24th 2016',
			'Sun, March 24, 2016',
			'Sun, March 24 2016',
			'Sun March 24 2016',
			'March 24, 2016',
			'March 24 2016',
			'March 24 16',
			'Mar. 24 16',
			'Mar 24 16',
		],
	});
});

describe('month day year', () => {
	testDates({
		expected: '2016-03-24',
		format: 'yyyy-MM-dd',
		locale: 'en-US',
		dates: [
			'03/24/2016',
			'03-24-2016',
			'3/24/2016',
			'3-24-2016',
			'3/24/16',
			'3-24-16',
		],
	});
});
describe('day month year', () => {
	testDates({
		expected: '2016-03-24',
		format: 'yyyy-MM-dd',
		locale: 'en-US',
		dates: ['24/03/2016', '24.03.2016', '24/3/2016', '24.3.2016'],
	});
});
describe('day monthname year', () => {
	testDates({
		expected: '2016-03-24',
		format: 'yyyy-MM-dd',
		locale: 'en-US',
		dates: [
			// test
			'24 march 2016',
		],
	});
	testDates({
		expected: '2016-05-24',
		format: 'yyyy-MM-dd',
		locale: 'fr-FR',
		dates: [
			// test
			'24 mai 2016',
		],
	});
});
describe('@unix', () => {
	testDates({
		expected: '2020-09-26',
		format: 'yyyy-MM-dd',
		locale: 'en-US',
		dates: [
			// test
			'@1601142916',
		],
	});
});

// describe('test', () => {
// 	const ymd = 'yyyy-MM-dd';
// 	it('fromSeconds', () => {
// 		const actual = DateTime.fromSeconds(0);
// 		expect(actual.isValid).toBe(true);
// 	});
// });
