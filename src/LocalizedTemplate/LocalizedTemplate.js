const { Info, FixedOffsetZone } = require('luxon');
const twoDigitYears = require('../data/twoDigitYears.js');
const timezoneNames = require('../data/timezoneNames.js');

const cache = {};

class LocalizedTemplate {
	static factory(locale) {
		if (!cache[locale]) {
			cache[locale] = new LocalizedTemplate(locale);
		}
		return cache[locale];
	}
	constructor(locale) {
		this.locale = locale;
		this.setup();
	}
	setup() {
		let meridiems;
		if (/^en/.test(this.locale)) {
			meridiems = '[ap]\\.?m?\\.?';
		} else {
			meridiems = Info.meridiems(this.locale).join('|');
		}
		this.lookups = {
			year: twoDigitYears,
			month: this.createLookup('months', ['long', 'short']),
			dayname: this.createLookup('weekdays', ['long', 'short']),
			zone: timezoneNames,
		};
		this.data = {
			YEAR: '[1-9]\\d{3}|\\d{2}',
			MONTH: '1[0-2]|0?[1-9]',
			MONTH2: '1[0-2]|0[1-9]',
			MONTHNAME: Object.keys(this.lookups.month).join('|'),
			DAYNAME: Object.keys(this.lookups.dayname).join('|'),
			DAY: '3[01]|[12]\\d|0?[1-9]',
			DAY2: '3[01]|[12]\\d|0[1-9]',
			// Renamed from TIMEZONE
			OFFSET: '[+-][01]\\d\\:?[0-5]\\d',
			// Renamed from TZABBR
			ZONE: Object.keys(this.lookups.zone).join('|'),
			H24: '[01]\\d|2[0-3]',
			H12: '0?[1-9]|1[012]',
			AMPM: meridiems,
			MIN: '[0-5]\\d',
			SEC: '[0-5]\\d',
			MS: '\\d{3,}',
			UNIT: 'year|month|week|day|hour|minute|second|millisecond',
			ORDINAL: 'st|nd|rd|th|\\.',
		};
		console.log(this.data);
	}
	createLookup(method, variants) {
		const lookup = {};
		variants.forEach(variant => {
			// if (this.locale !== 'en-US') {
			// 	console.log(
			// 		'Info for ' + this.locale,
			// 		Info[method](variant, { locale: this.locale })
			// 	);
			// }
			Info[method](variant, { locale: this.locale }).forEach((unit, i) => {
				unit = unit.toLowerCase();
				unit = unit.replace(/\.$/, '');
				lookup[unit] = method === 'months' ? i + 1 : i;
			});
		});
		return lookup;
	}
	getObject(units, matches) {
		const object = {};
		units.forEach((unit, i) => {
			if (!unit) {
				return;
			}
			const match = matches[i + 1].toLowerCase();
			if (this.lookups[unit]) {
				object[unit] = this.lookups[unit][match] || Number(match);
				if (unit === 'zone') {
					object[unit] = FixedOffsetZone.instance(object[unit]);
				}
			} else {
				object[unit] = Number(match);
			}
		});
		return object;
	}
	compile(template) {
		const regexString = template.replace(/_([A-Z]+)_/g, ($0, $1) => {
			if (!this.data[$1]) {
				throw new Error(`Template string contains invalid variable _${$1}_`);
			}
			return this.data[$1];
		});
		return new RegExp(regexString, 'i');
	}
}

module.exports = LocalizedTemplate;
