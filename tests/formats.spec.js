const { DateTime, Info } = require('luxon');
require('../src/index.js');
const localeList = require('../src/data/localeList.js');
// const localeList = ['en-US', 'ar-SA'];

const noon = { hour: 12, minute: 0, second: 0, millisecond: 0 };
function testDates({ name, formats, expected, locales }) {
	for (const locale of locales || localeList) {
		describe(`${name} (${locale})`, () => {
			for (const format of formats) {
				const expectedDate = DateTime.fromObject({
					...noon,
					...expected,
					locale,
				});
				const formatted = expectedDate.toFormat(format);
				it(`${formatted} (${format})`, () => {
					const parsedDate = DateTime.fromAny(formatted, { locale });
					const actual = parsedDate.toObject();
					expect(actual).toMatchObject(expected);
				});
			}
		});
	}
}
function xtestDates() {}

testDates({
	name: 'monthname day year',
	expected: { year: 2016, month: 9, day: 24 },
	formats: [
		'cccc, MMMM dd yyyy',
		'cccc, MMMM dd yyyy',
		'cccc MMMM dd yyyy',
		'ccc, MMMM dd yyyy',
		'ccc MMMM dd yyyy',
		'MMMM dd yyyy',
		'MMM dd yyyy',
		'MMM dd yy',
	],
});

testDates({
	name: 'month day year',
	expected: { year: 2020, month: 3, day: 14 },
	locales: ['en-US'],
	formats: [
		'MM/dd/yyyy',
		'MM-dd-yyyy',
		'M/dd/yyyy',
		'M-dd-yyyy',
		'MM/dd/yy',
		'MM-dd-yy',
	],
});

testDates({
	name: 'day month year',
	expected: { year: 2020, month: 3, day: 3 },
	locales: ['en-US'],
	formats: [
		'dd/MM/yyyy',
		'dd.MM.yyyy',
		'dd/M/yyyy',
		'dd.M.yyyy',
		'd/M/yyyy',
		'd.M.yyyy',
		'dd/MM/yy',
		'dd.MM.yy',
	],
});

testDates({
	name: 'day monthname year',
	expected: { year: 2020, month: 3, day: 9 },
	formats: [
		'dd-LLLL-yyyy',
		'dd LLLL yyyy',
		'dd LLL yyyy',
		'd LLLL yyyy',
		'd LLL yyyy',
		'dd LLLL yy',
		'dd LLL yy',
		'd LLLL yy',
		'd LLL yy',
	],
});

testDates({
	name: 'chinese',
	expected: { year: 2020, month: 9, day: 26 },
	locales: ['zh-CN'],
	formats: ['yyyy年MM月dd日', 'yyyy年M月d日'],
});

testDates({
	name: '@unix',
	expected: { year: 2020, month: 9, day: 26 },
	locales: ['en-US'],
	formats: ['@X'],
});

// describe('test', () => {
// 	const ymd = 'yyyy-MM-dd';
// 	it('fromSeconds', () => {
// 		const actual = DateTime.fromSeconds(0);
// 		expect(actual.isValid).toBe(true);
// 	});
// });
