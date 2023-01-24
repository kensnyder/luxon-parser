const parser = require('any-date-parser');
const { DateTime } = require('luxon');

/**
 * Create a DateTime from any given String
 * Equivalent to auto choosing the right from*() function:
 * DateTime.fromFormat()
 * DateTime.fromHTTP()
 * DateTime.fromISO()
 * DateTime.fromRFC2822()
 * DateTime.fromSQL()
 * DateTime.fromString()
 * @param {String} string  Any parseable string
 * @param {Object} options  Luxon options you would normally pass as a second argument
 * @returns {DateTime}
 */
DateTime.fromHuman = function fromHuman(string, options = {}) {
	const date = Date.fromString(string, options.locale);
	if (date.invalid) {
		return DateTime.invalid(date.invalid);
	}
	return DateTime.fromJSDate(date, options);
};

/**
 * Create a DateTime from any given type
 * Equivalent to auto choosing the right from*() function:
 * DateTime.now()
 * DateTime.fromFormat()
 * DateTime.fromHTTP()
 * DateTime.fromISO()
 * DateTime.fromJSDate()
 * DateTime.fromMillis()
 * DateTime.fromObject()
 * DateTime.fromRFC2822()
 * DateTime.fromSQL()
 * DateTime.fromString()
 * @param {String|DateTime|Date|Number|Object} [date]  Something that can be converted to a date
 * @param {Object} [options]  Luxon options you would normally pass as a second argument
 * @returns {DateTime}
 */
DateTime.fromAny = function fromAny(date, options = {}) {
	if (!date) {
		return DateTime.now();
	} else if (date instanceof DateTime) {
		return date;
	} else if (date instanceof Date) {
		return DateTime.fromJSDate(date, options);
	} else if (typeof date === 'number') {
		return DateTime.fromMillis(date, options);
	} else if (typeof date === 'object') {
		return DateTime.fromObject(date, options);
	}
	// String
	return DateTime.fromHuman(date, options);
};

module.exports = parser;
