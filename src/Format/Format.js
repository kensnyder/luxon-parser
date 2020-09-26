const { DateTime } = require('luxon');
const LocalizedTemplate = require('../LocalizedTemplate/LocalizedTemplate.js');

class Format {
	constructor({ template, units, regex, handler }) {
		if (!Array.isArray(units) && typeof handler !== 'function') {
			throw new Error(
				'Format instance must receive a "units" array or "handler" function'
			);
		}
		if (typeof template !== 'string' && !(regex instanceof RegExp)) {
			throw new Error(
				'Format instance must receive a "template" string or "regex" RegExp'
			);
		}
		this.template = template;
		this.units = units;
		this.regex = regex;
		this.handler = handler;
		this.regexByLocale = {};
	}
	getMatches(string, locale) {
		if (this.template) {
			if (!this.regexByLocale[locale]) {
				this.regexByLocale[locale] = LocalizedTemplate.factory(locale).compile(
					this.template
				);
			}
			return string.match(this.regexByLocale[locale]);
		}
		return string.match(this.regex);
	}
	toDateTime(matches, locale) {
		if (this.units) {
			const object = LocalizedTemplate.factory(locale).getObject(
				this.units,
				matches
			);
			return DateTime.fromObject(object);
		}
		return this.handler(matches, locale);
	}
}

module.exports = Format;
