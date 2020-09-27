const { Info, FixedOffsetZone } = require('luxon');
const twoDigitYears = require('../data/twoDigitYears.js');
const timezoneNames = require('../data/timezoneNames.js');
const numberingSystems = require('../data/numberingSystems.js');

const cache = {};
const baseVars = {
	// Renamed from TZABBR
	ZONE: Object.keys(timezoneNames).join('|'),
	UNIT: 'year|month|week|day|hour|minute|second|millisecond',
	ORDINAL: 'st|nd|rd|th|\\.',
};

const latinNumberVars = {
	YEAR: '[1-9]\\d{3}|\\d{2}',
	MONTH: '1[0-2]|0?[1-9]',
	MONTH2: '1[0-2]|0[1-9]',
	DAY: '3[01]|[12]\\d|0?[1-9]',
	DAY2: '3[01]|[12]\\d|0[1-9]',
	// Renamed from TIMEZONE
	OFFSET: '[+-][01]?\\d\\:?[0-5]\\d',
	H24: '[01]\\d|2[0-3]',
	H12: '0?[1-9]|1[012]',
	MIN: '[0-5]\\d',
	SEC: '[0-5]\\d|60',
	MS: '\\d{3,9}',
};

const otherNumberVars = {
	YEAR: '*{3}|*{2}',
	MONTH: '*{1,2}',
	MONTH2: '*{2}',
	DAY: '*{1,2}',
	DAY2: '*{2}',
	// Renamed from TIMEZONE
	OFFSET: '[+-]*{1,2}\\:?*{2}',
	H24: '*{2}',
	H12: '*{1,2}',
	MIN: '*{2}',
	SEC: '*{2}',
	MS: '*{3,9}',
};

// digitRegex({ numberingSystem });

class LocalizedTemplate {
	static factory(locale) {
		if (!cache[locale.toLowerCase()]) {
			cache[locale.toLowerCase()] = new LocalizedTemplate(locale);
		}
		return cache[locale.toLowerCase()];
	}
	constructor(locale) {
		this.locale = locale;
		const numberingSystem = new Intl.DateTimeFormat(locale).resolvedOptions()
			.numberingSystem;
		this.digitRegex = numberingSystems[numberingSystem];
		this.build();
	}
	build() {
		this.vars = { ...baseVars };
		if (this.digitRegex) {
			Object.keys(otherNumberVars).forEach(key => {
				this.vars[key] = otherNumberVars[key].replace(/\*/g, this.digitRegex);
			});
		} else {
			Object.assign(this.vars, latinNumberVars);
		}
		if (/^en/i.test(this.locale)) {
			this.vars.AMPM = '[ap]\\.?m?\\.?';
		} else {
			this.vars.AMPM = Info.meridiems(this.locale).join('|');
		}
		this.lookups = {
			year: twoDigitYears,
			zone: timezoneNames,
		};
		this.loadList('months');
		this.loadList('weekdays');
		// console.log('this.vars', this.vars);
	}
	loadList(method) {
		const list = {};
		const lookup = {};
		['long', 'short'].forEach(variant => {
			const units = [
				...Info[method](variant, { locale: this.locale }),
				...Info[method + 'Format'](variant, { locale: this.locale }),
			];
			units.forEach((unit, i) => {
				unit = unit.toLowerCase();
				unit = unit.replace(/\.$/, '');
				lookup[unit] = (i % 12) + (method === 'months' ? 1 : 0);
				if (variant === 'short') {
					unit = unit + '\\.?';
				}
				list[unit] = true;
			});
		});
		if (method === 'months') {
			this.lookups.month = lookup;
			// console.log('======= this.lookups.month', lookup);
			this.vars.MONTHNAME = Object.keys(list).join('|');
		} else {
			this.lookups.dayname = lookup;
			this.vars.DAYNAME = Object.keys(list).join('|');
		}
	}
	getObject(units, matches) {
		const object = {};
		units.forEach((unit, i) => {
			if (!unit) {
				return;
			}
			let match = matches[i + 1];
			match = match.toLowerCase();
			match = match.replace(/\.$/, '');
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
			if (!this.vars[$1]) {
				throw new Error(`Template string contains invalid variable _${$1}_`);
			}
			return this.vars[$1];
		});
		//console.log({ regexString });
		return new RegExp(regexString, 'i');
	}
}

module.exports = LocalizedTemplate;
