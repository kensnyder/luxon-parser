const { DateTime } = require('luxon');
const Format = require('../Format/Format.js');

const atSeconds = new Format({
	template: '^@(\\d+)$',
	handler: function (matches) {
		const seconds = parseInt(matches[1], 10);
		return DateTime.fromSeconds(seconds);
	},
});

module.exports = atSeconds;
