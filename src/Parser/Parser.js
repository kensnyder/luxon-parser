const { DateTime } = require('luxon');

class Parser {
	constructor() {
		this.formats = [];
	}
	addFormat(format) {
		this.formats.push(format);
		return this;
	}
	removeFormat(format) {
		const idx = this.formats.indexOf(format);
		if (idx > -1) {
			this.formats.splice(idx, 1);
			return true;
		}
		return false;
	}
	attempt(date, locale) {
		for (const format of this.formats) {
			const matches = format.getMatches(date, locale);
			if (matches) {
				return format.toDateTime(matches, locale);
			}
		}
		const string = String(date).slice(0, 200);
		return DateTime.invalid(`Unable to parse ${string}`);
	}
}

module.exports = Parser;
