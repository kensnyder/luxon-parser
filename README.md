# luxon-parser

[![NPM Link](https://img.shields.io/npm/v/luxon-parser?v=1.0.3)](https://npmjs.com/package/luxon-parser)
[![Build Status](https://github.com/kensnyder/luxon-parser/actions/workflows/workflow.yml/badge.svg?v=2.0.0-rc.1)](https://github.com/kensnyder/luxon-parser/actions)
[![Code Coverage](https://codecov.io/gh/kensnyder/luxon-parser/branch/main/graph/badge.svg?v=2.0.0-rc.1)](https://codecov.io/gh/kensnyder/luxon-parser)
[![Language: TypeScript](https://badgen.net/static/language/TS?v=1.0.3)](https://github.com/search?q=repo:kensnyder/luxon-parser++language:TypeScript&type=code)
[![ISC License](https://badgen.net/github/license/kensnyder/luxon-parser?v=1.0.3)](https://opensource.org/licenses/ISC)

The most comprehensive and accurate date parser for Node and browsers. It uses
`Intl` to provide parsing support for all installed locales. This plugin
connects the capabilities of
[any-date-parser](https://npmjs.com/package/dany-date-parser) to
[luxon](https://moment.github.io/luxon/docs/).

It allows parsing every imaginable date format to a Luxon `DateTime` object.
Most locales are supported automatically.

## Table of Contents

- [Motivation](#motivation)
- [Installation](#installation)
- [Usage](#usage)
- [Recognized Formats](https://www.npmjs.com/package/any-date-parser#exhaustive-list-of-date-formats)
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
npm install luxon luxon-parser
```

## Usage

Option 1: import functions (recommended)

```ts
import { dateTimeFromHuman, dateTimeFromAny } from 'luxon-parser';

const date1 = dateTimeFromHuman('March 5th, 2016 at 7:05pm');
const date2 = dateTimeFromHuman('9 days ago');
const date3 = dateTimeFromHuman('2016-03-05 23:59:59 CST');
const date4 = dateTimeFromAny(new Date());
```

Option 2: use new functions on `DateTime` object

```ts
import { DateTime } from 'luxon';
import 'luxon-parser';

const date1 = DateTime.fromHuman('March 5th, 2016 at 7:05pm');
const date2 = DateTime.fromHuman('9 days ago');
const date3 = DateTime.fromHuman('2016-03-05 23:59:59 CST');
const date4 = DateTime.fromAny(new Date());
```

### dateTimeFromHuman(string, options) : DateTime

Create a `DateTime` from any given string.

### dateTimeFromAny(any, options) : DateTime

Create a `DateTime` from string, milliseconds, object, `DateTime`, or `Date`.

## Locale Support

Locales are supported through a second argument:

```ts
import { dateTimeFromHuman, dateTimeFromAny } from 'luxon-parser';

const date1 = dateTimeFromHuman('15 septembre 2015', { locale: 'fr' });
const date2 = dateTimeFromAny('15 septembre 2015', { locale: 'fr' });
```

See the
[Luxon docs on locales](https://moment.github.io/luxon/docs/manual/intl.html)
and the example non-English dates that
[any-date-parser](https://www.npmjs.com/package/any-date-parser#locale-support)
can parse.

## Sister Packages

- Standalone Parser: [any-date-parser](http://npmjs.com/package/any-date-parser)
- DayJS Parser: [dayjs-parser](http://npmjs.com/package/dayjs-parser)
- Moment Parser: [moment-parseplus](http://npmjs.com/package/moment-parseplus) \[deprecated]

## Unit Testing

`luxon-parser` has 100% code coverage.

- To run tests, run `npm test`
- To check coverage, run `npm run coverage`

Unit tests require a global install of `full-icu` and `luxon`. The test runner
will attempt to install these if absent. It tests compatibility with Luxon
version 1.x, 2.x and 3.x

## Contributing

Contributions are welcome. Please open a GitHub ticket for bugs or feature
requests. Please make a pull request for any fixes or new code you'd like to be
incorporated.
