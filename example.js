const { DateTime } = require('luxon');
require('./index.js');

const date = DateTime.fromAny('17 Apr 2021 8pm');

console.log(date.toString());
