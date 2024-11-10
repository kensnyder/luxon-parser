import { DateTime } from 'luxon';
import { describe, expect, it } from 'vitest';
import { dateTimeFromAny, dateTimeFromHuman } from './luxon-parser';

describe('dateTimeFromHuman()', () => {
  it('should handle "2021-04-16"', () => {
    const actual = dateTimeFromHuman('2021-04-16');
    const expected = DateTime.fromObject({
      year: 2021,
      month: 4,
      day: 16,
      hour: 0,
      minute: 0,
      second: 0,
    });
    expect(actual.toString()).toBe(expected.toString());
  });
  it('should default to invalid', () => {
    const actual = dateTimeFromHuman('my toys are sticky');
    expect(actual.invalidReason).toContain('Unable to parse');
  });
});
describe('dateTimeFromAny()', () => {
  it('should handle null', () => {
    const actual = dateTimeFromAny(null);
    const expected = DateTime.now();
    expect(actual.toMillis()).toBeCloseTo(expected.toMillis(), -1000);
  });
  it('should handle undefined', () => {
    const actual = dateTimeFromAny(undefined);
    const expected = DateTime.now();
    expect(actual.toMillis()).toBeCloseTo(expected.toMillis(), -1000);
  });
  it('should handle no arg', () => {
    const actual = dateTimeFromAny();
    const expected = DateTime.now();
    expect(actual.toMillis()).toBeCloseTo(expected.toMillis(), -1000);
  });
  it('should handle Date object', () => {
    const date = new Date();
    const actual = dateTimeFromAny(date);
    const expected = DateTime.fromJSDate(date);
    expect(actual.toString()).toBe(expected.toString());
  });
  it('should handle DateTime object', () => {
    const dt = DateTime.now();
    const actual = dateTimeFromAny(dt);
    expect(actual.toString()).toBe(dt.toString());
  });
  it('should handle milliseconds', () => {
    const timestamp = Number(new Date());
    const expected = DateTime.fromMillis(timestamp);
    const actual = dateTimeFromAny(timestamp);
    expect(actual.toString()).toBe(expected.toString());
  });
  it('should handle string', () => {
    const actual = dateTimeFromAny('2021-04-16');
    const expected = DateTime.fromObject({
      year: 2021,
      month: 4,
      day: 16,
      hour: 0,
      minute: 0,
      second: 0,
    });
    expect(actual.toString()).toBe(expected.toString());
  });
  it('should handle object', () => {
    const object = {
      year: 2021,
      month: 4,
      day: 16,
      hour: 0,
      minute: 0,
      second: 0,
    };
    const actual = dateTimeFromAny(object);
    const expected = DateTime.fromObject(object);
    expect(actual.toString()).toBe(expected.toString());
  });
  it('should handle object with options', () => {
    const object = {
      year: 2021,
      month: 4,
      day: 17,
      hour: 0,
      minute: 0,
      second: 0,
    };
    const optionsFiji = {
      zone: 'Pacific/Fiji',
    };
    const optionsFaroe = {
      zone: 'Atlantic/Faroe',
    };
    const actualFiji = dateTimeFromAny(object, optionsFiji);
    const expectedFiji = DateTime.fromObject(object, optionsFiji);
    expect(actualFiji.toString()).toBe(expectedFiji.toString());
    const actualFaroe = dateTimeFromAny(object, optionsFaroe);
    const expectedFaroe = DateTime.fromObject(object, optionsFaroe);
    expect(actualFaroe.toString()).toBe(expectedFaroe.toString());
  });
  it('should default to invalid', () => {
    const actual = dateTimeFromAny('my toys are sticky');
    expect(actual.invalidReason).toContain('Unable to parse');
  });
});
