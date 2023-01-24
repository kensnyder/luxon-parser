const { DateTime } = require('luxon');
const parser = require('../index.js');

describe('DateTime.fromHuman()', () => {
	it('should handle "2021-04-16"', () => {
		const actual = DateTime.fromHuman('2021-04-16');
		const expected = DateTime.fromObject({
			year: 2021,
			month: 4,
			day: 16,
			hour: 0,
			minute: 0,
			second: 0,
		});
		expect(actual.toString()).toBe(expected.toString());
	});
	it('should default to invalid', () => {
		const actual = DateTime.fromHuman('my toys are sticky');
		const expected = DateTime.invalid('Unable to parse my toys are sticky');
		expect(actual.invalidReason).toBe(expected.invalidReason);
	});
});
describe('DateTime.fromAny()', () => {
	it('should handle null', () => {
		const actual = DateTime.fromAny(null);
		const expected = DateTime.now();
		expect(actual.toMillis()).toBeCloseTo(expected.toMillis(), -1000);
	});
	it('should handle false', () => {
		const actual = DateTime.fromAny(false);
		const expected = DateTime.now();
		expect(actual.toMillis()).toBeCloseTo(expected.toMillis(), -1000);
	});
	it('should handle undefined', () => {
		const actual = DateTime.fromAny(undefined);
		const expected = DateTime.now();
		expect(actual.toMillis()).toBeCloseTo(expected.toMillis(), -1000);
	});
	it('should handle no arg', () => {
		const actual = DateTime.fromAny();
		const expected = DateTime.now();
		expect(actual.toMillis()).toBeCloseTo(expected.toMillis(), -1000);
	});
	it('should handle Date object', () => {
		const date = new Date();
		const actual = DateTime.fromAny(date);
		const expected = DateTime.fromJSDate(date);
		expect(actual.toString()).toBe(expected.toString());
	});
	it('should handle DateTime object', () => {
		const dt = DateTime.now();
		const actual = DateTime.fromAny(dt);
		expect(actual.toString()).toBe(dt.toString());
	});
	it('should handle milliseconds', () => {
		const timestamp = Number(new Date());
		const expected = DateTime.fromMillis(timestamp);
		const actual = DateTime.fromAny(timestamp);
		expect(actual.toString()).toBe(expected.toString());
	});
	it('should handle string', () => {
		const actual = DateTime.fromAny('2021-04-16');
		const expected = DateTime.fromObject({
			year: 2021,
			month: 4,
			day: 16,
			hour: 0,
			minute: 0,
			second: 0,
		});
		expect(actual.toString()).toBe(expected.toString());
	});
	it('should handle object', () => {
		const object = {
			year: 2021,
			month: 4,
			day: 16,
			hour: 0,
			minute: 0,
			second: 0,
		};
		const actual = DateTime.fromAny(object);
		const expected = DateTime.fromObject(object);
		expect(actual.toString()).toBe(expected.toString());
	});
	it('should handle object with options', () => {
		const object = {
			year: 2021,
			month: 4,
			day: 17,
			hour: 0,
			minute: 0,
			second: 0,
		};
		const optionsFiji = {
			zone: 'Pacific/Fiji',
		};
		const optionsFaroe = {
			zone: 'Atlantic/Faroe',
		};
		const actualFiji = DateTime.fromAny(object, optionsFiji);
		const expectedFiji = DateTime.fromObject(object, optionsFiji);
		expect(actualFiji.toString()).toBe(expectedFiji.toString());
		const actualFaroe = DateTime.fromAny(object, optionsFaroe);
		const expectedFaroe = DateTime.fromObject(object, optionsFaroe);
		expect(actualFaroe.toString()).toBe(expectedFaroe.toString());
	});
	it('should default to invalid', () => {
		const actual = DateTime.fromAny('my toys are sticky');
		const expected = DateTime.invalid('Unable to parse my toys are sticky');
		expect(actual.invalidReason).toBe(expected.invalidReason);
	});
});
describe('custom parser', () => {
	parser.addFormat(
		new parser.Format({
			matcher: /^(\d+) days? into month (\d+) in year (\d{4})$/,
			units: ['day', 'month', 'year'],
		})
	);
	it('should handle "17 days into month 4 in year 2021"', () => {
		const actual = DateTime.fromAny('17 days into month 4 in year 2021');
		const expected = DateTime.fromObject({
			year: 2021,
			month: 4,
			day: 17,
			hour: 0,
			minute: 0,
			second: 0,
		});
		expect(actual.toString()).toBe(expected.toString());
	});
});
