const Format = require('../Format/Format.js');

const dayMonthnameYear = new Format({
	/* prettier-ignore */
	//           $1                       $2               $3
	template: "^(_DAY_)(?:_ORDINAL_)?\\s+(_MONTHNAME_)\\s+(_YEAR_)$",
	units: ['day', 'month', 'year'],
});

module.exports = dayMonthnameYear;
