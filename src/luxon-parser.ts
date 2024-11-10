import { fromString } from 'any-date-parser';
import { DateTime } from 'luxon';
import type { DateObjectUnits, DateTimeOptions } from 'luxon/src/datetime';

/**
 * Create a DateTime from any given String
 * Equivalent to auto choosing the right from*() function:
 * DateTime.fromFormat()
 * DateTime.fromHTTP()
 * DateTime.fromISO()
 * DateTime.fromRFC2822()
 * DateTime.fromSQL()
 * DateTime.fromString()
 * @param string  Any parseable string
 * @param options  Luxon options you would normally pass as a second argument
 */
export function dateTimeFromHuman(
  string: string,
  options: DateTimeOptions = {}
): DateTime {
  const date = fromString(string, options.locale);
  if (date.invalid) {
    return DateTime.invalid(date.invalid);
  }
  return DateTime.fromJSDate(date, options);
}

/**
 * Create a DateTime from any given type
 * @param [date]  Something that can be converted to a date
 * @param [options]  Luxon options you would normally pass as a second argument
 */
export function dateTimeFromAny(
  date?: null | string | DateTime | Date | number | DateObjectUnits,
  options: DateTimeOptions = {}
): DateTime {
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
  return dateTimeFromHuman(date, options);
}

// @ts-expect-error - We are adding directly to the DateTime object
DateTime.fromHuman = dateTimeFromHuman;
// @ts-expect-error - We are adding directly to the DateTime object
DateTime.fromAny = dateTimeFromAny;
