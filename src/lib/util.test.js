import util from './util';

describe('getMonthIndex()', function () {
  it('return -1 for invalid value', function (done) {
    expect(util.getMonthIndex()).toBe(-1);
    expect(util.getMonthIndex(0)).toBe(-1);
    expect(util.getMonthIndex('13')).toBe(-1);
    expect(util.getMonthIndex('mas')).toBe(-1);
    done();
  });
  it('accepts integer or string', function (done) {
    expect(util.getMonthIndex(1)).toBe(0);
    expect(util.getMonthIndex('6')).toBe(5);
    expect(util.getMonthIndex('january')).toBe(0);
    expect(util.getMonthIndex('Dec')).toBe(11);
    done();
  });
});

describe('getDaysInMonth()', function () {
  it('return -1 for invalid year and month', function () {
    expect(util.getDaysInMonth('xyz', 1)).toBe(-1);
    expect(util.getDaysInMonth(2010, 13)).toBe(-1);
  });
  it('return expected days', function () {
    expect(util.getDaysInMonth(2016, 2)).toBe(29);
    expect(util.getDaysInMonth('2016', 'Feb')).toBe(29);
  });
});

describe('isAmount()', function () {
  it('returns true', function () {
    expect(util.isAmount(12345)).toBe(true);
    expect(util.isAmount(12345.50)).toBe(true);
    expect(util.isAmount('12345')).toBe(true);
    expect(util.isAmount('-$12,345.00')).toBe(true);
    expect(util.isAmount('(12,345.00)')).toBe(true);
  });
  it('returns false', function () {
    expect(util.isAmount()).toBe(false);
    expect(util.isAmount(null)).toBe(false);
    expect(util.isAmount('123.txt')).toBe(false);
    expect(util.isAmount('abc')).toBe(false);
  });
});

describe('isDate()', function () {
  it('returns true', function () {
    expect(util.isDate(new Date())).toBe(true);
    expect(util.isDate('1 march ')).toBe(true);
    expect(util.isDate('1/03/2015')).toBe(true);
    expect(util.isDate('28/2/2015')).toBe(true);
    expect(util.isDate('28 Feb 2015')).toBe(true);
    expect(util.isDate('2015-02-28')).toBe(true);
  });
  it('returns false', function () {
    expect(util.isDate(null)).toBe(false);
    expect(util.isDate('  ')).toBe(false);
    expect(util.isDate('29/02/2015')).toBe(false);
    expect(util.isDate('29 Feb 2015')).toBe(false);
    expect(util.isDate('2015-02-29')).toBe(false);
  });
});

describe('isNullOrWhitespace()', function () {
  it('returns true', function () {
    expect(util.isNullOrWhitespace()).toBe(true);
    expect(util.isNullOrWhitespace(null)).toBe(true);
    expect(util.isNullOrWhitespace('  ')).toBe(true);
  });
  it('returns false', function() {
    expect(util.isNullOrWhitespace(123)).toBe(false);
    expect(util.isNullOrWhitespace('!@#')).toBe(false);
    expect(util.isNullOrWhitespace('123')).toBe(false);
    expect(util.isNullOrWhitespace('abc')).toBe(false);
  });
});

describe('isOneMonthPeriod()', function () {
  it('returns true for valid period', function () {
    expect(util.isOneMonthPeriod('1 mar', '31 mar')).toBe(true);
    expect(util.isOneMonthPeriod('1/03/2015', '31/03/2015')).toBe(true);
    expect(util.isOneMonthPeriod(new Date(2015,3-1,1), '31/03/2015')).toBe(true);
  });
  it('return false for invalid period', function () {
    expect(util.isOneMonthPeriod('1 Mar 2016', 'xxx')).toBe(false);
    expect(util.isOneMonthPeriod('1/3/2016', '1/3/2016')).toBe(false);
    expect(util.isOneMonthPeriod('29 Feb 2016', '31 Mar 2016')).toBe(false);
  });
});

describe('isPercentage()', function () {
  it('returns true with both digits and % sign', function () {
    expect(util.isPercentage(9)).toBe(true);
    expect(util.isPercentage('9')).toBe(true);
    expect(util.isPercentage('9.5%')).toBe(true);
    expect(util.isPercentage('900%')).toBe(true);
    expect(util.isPercentage(' 900 % ')).toBe(true);
  });
  it('returns false without digits or % sign', function () {
    expect(util.isPercentage(null)).toBe(false);
    expect(util.isPercentage('  ')).toBe(false);
    expect(util.isPercentage('%')).toBe(false);
    expect(util.isPercentage('x%')).toBe(false);
  });
});

describe('sanitiseAmount()', function() {
  it('treats null or undefined as 0', function () {
    expect(util.sanitiseAmount(undefined)).toBe(0);
    expect(util.sanitiseAmount(null)).toBe(0);
    expect(util.sanitiseAmount('NaN')).toBe(0);
  });
  it('removes signs and currency symbols', function () {
    expect(util.sanitiseAmount(1.2345)).toBe(1.2345);
    expect(util.sanitiseAmount('$12,345.00')).toBe(12345);
    expect(util.sanitiseAmount('+$12,345.00')).toBe(12345);
    expect(util.sanitiseAmount('-$12,345.00')).toBe(-12345);
    expect(util.sanitiseAmount('(12,345.00)')).toBe(-12345);
  });
});

describe('sanitiseDate()', function () {
  it('treat invalid dates as empty string', function () {
    expect(util.sanitiseDate(undefined)).toBe('');
    expect(util.sanitiseDate(null)).toBe('');
    expect(util.sanitiseDate('2015-02-29')).toBe('');
  });
  it('format valid dates as "D MMM YYYY"', function () {
    let currentYear = (new Date()).getFullYear();
    expect(util.sanitiseDate(' 1 march 2001')).toBe('1 Mar 2001');
    expect(util.sanitiseDate('01 march')).toBe('1 Mar ' + currentYear);
    expect(util.sanitiseDate('1/3')).toBe('1 Mar ' + currentYear);
    expect(util.sanitiseDate('2015-03-01')).toBe('1 Mar 2015');
    expect(util.sanitiseDate('1/3/2015')).toBe('1 Mar 2015');
    expect(util.sanitiseDate(new Date(2015,3-1,1))).toBe('1 Mar 2015');
  });
});

describe('sanitisePercentage()', function () {
  it('append % sign if not exists', function () {
    expect(util.sanitisePercentage(' 9 ')).toBe('9%');
  });
});
