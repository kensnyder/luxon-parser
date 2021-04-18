# luxon-parser

[![NPM Link](https://img.shields.io/npm/v/luxon-parser?v=1.0.0)](https://npm.com/package/luxon-parse)
[![Build Status](https://travis-ci.org/kensnyder/luxon-parser.svg?branch=master&v=1.0.0)](https://travis-ci.org/kensnyder/luxon-parse)
[![Code Coverage](https://codecov.io/gh/kensnyder/luxon-parser/branch/master/graph/badge.svg?v=1.0.0)](https://codecov.io/gh/kensnyder/luxon-parse)
[![ISC License](https://img.shields.io/npm/l/luxon-parser.svg?v=1.0.0)](https://opensource.org/licenses/ISC)

A comprehensive and extensible date parsing plugin for
[Luxon](https://moment.github.io/luxon/docs/). It allows passing a wide variety
of date formats to new functions `DateTime.fromHuman()` and
`DateTime.fromAny()`. Most locales are supported automatically.

## Table of Contents

- [Motivation](#motivation)
- [Installation](#installation)
- [Usage](#usage)
- [Recognized Formats](#recognized-formats)
- [Adding Custom Formats](#adding-custom-formats)
- [Locale Support](#locale-support)
- [Sister Packages](#sister-packages)
- [Unit Testing](#unit-testing)
- [Contributing](#contributing)

## Motivation

1. The APIs I consume have a lot of different date formats
1. I want to create REST APIs that accept all major formats
1. I want to handle user-input dates
1. I want to support dates in other languages according to JavaScript's new
   `Intl` global object

## Installation

```bash
npm install luxon-parser
```

## Usage

```js
const { DateTime } = require('luxon');
require('luxon-parser');

const date1 = DateTime.fromHuman('March 5th, 2016 at 7:05pm');
const date2 = DateTime.fromHuman('9 days ago');
const date3 = DateTime.fromHuman('2016-03-05 23:59:59 CST');
```

### DateTime.fromHuman(string, options)

Create a DateTime from any given String. Equivalent to auto choosing the right
from\*() function:

- DateTime.fromFormat()
- DateTime.fromHTTP()
- DateTime.fromISO()
- DateTime.fromRFC2822()
- DateTime.fromSQL()
- DateTime.fromString()

### DateTime.fromAny(any, options)

Create a DateTime from any given type. Equivalent to auto choosing the right
from\*() function:

- DateTime.now()
- DateTime.fromFormat()
- DateTime.fromHTTP()
- DateTime.fromISO()
- DateTime.fromJSDate()
- DateTime.fromMillis()
- DateTime.fromObject()
- DateTime.fromRFC2822()
- DateTime.fromSQL()
- DateTime.fromString()

## Recognized Formats

- 24 hour time
- 12 hour time
- timezone offsets
- timezone abbreviations
- year month day
- year monthname day
- month day year
- monthname day year
- day month year
- day monthname year
- +/-/ago periods
- now/today/yesterday/tomorrow
- Twitter

`luxon-parser` relies on
[any-date-format](https://www.npmjs.com/package/any-date-parser) which supports
even more formats. See the
[exhaustive list](https://www.npmjs.com/package/any-date-parser#exhaustive-list-of-date-formats).

## Adding Custom Formats

See
[any-date-format's instructions](https://www.npmjs.com/package/any-date-parser#adding-custom-formats).

Example:

```js
const parser = require('luxon-parser');

parser.addFormat(
	new parser.Format({
		matcher: /^Q([1-4]) (\d{4})$/,
		handler: function ([, quarter, year]) {
			const monthByQuarter = { 1: 1, 2: 4, 3: 7, 4: 10 };
			const month = monthByQuarter[quarter];
			return { year, month };
		},
	})
);
```

## Locale Support

Locales are supported through a second argument:

```js
const date = DateTime.fromAny('15 septembre 2015', { locale: 'fr' });
```

See the
[Luxon docs on locales](https://moment.github.io/luxon/docs/manual/intl.html)

## Sister Packages

- Standalone Parser:
  [any-date-format](http://npmjs.com/packages/any-date-format)
- DayJS: [dayjs-parser](http://npmjs.com/package/dayjs-parse)
- Moment: [moment-parseplus](http://npmjs.com/package/moment-parseplus)

## Unit Testing

`luxon-parser` has 100% code coverage.

- To run tests, run `npm test`
- To check coverage, run `npm run coverage`

Unit tests require a global install of `full-icu` and `luxon`. The test runner
will attempt to install these if absent.

## Contributing

Contributions are welcome. Please open a GitHub ticket for bugs or feature
requests. Please make a pull request for any fixes or new code you'd like to be
incorporated.
