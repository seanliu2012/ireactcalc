import _ from 'lodash';
import numeral from 'numeral';
import validator from 'validator';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

class util {

  static _getMoment(dateString) {
    if (typeof dateString !== 'string')
      throw new TypeError("A string must be provided when calling _getTime().");

    moment.locale('en-au');

    let format = "D MMM YYYY";
    if (dateString.includes('/')) {
      format = "D/MM/YYYY";
    }
    else if (dateString.includes('-')) {
      format = "YYYY-MM-DD";
    }
    else if (dateString.includes(',')) {
      format = "MMM D, YYYY";
    }

    // caller to check if the moment is valid or not
    return moment(dateString, format);
  }

  static getMonthIndex(month) {
    if (typeof month === 'undefined' || month === null) return -1;

    if (typeof month !== 'string') month = month.toString();

    // for a number, expect 1 to 12
    // the month index is 0 to 11
    if (validator.isInt(month)) {
      let num = month - 0;
      if (num < 1 || num > 12) return -1;

      return num - 1;
    }

    // for a string, expect Jan, feb, March, etc.
    var testStr = '1 ' + month.trim();
    let m = this._getMoment(testStr);
    if (!m.isValid()) return -1;

    return m.month();
  }

  // expect month number not index as the 2nd parameter
  static getDaysInMonth(year, month) {
    if (typeof year === 'undefined' || year === null) return -1;
    if (typeof month === 'undefined' || month === null) return -1;

    // year must be an integer or an integer's string form
    if (typeof year !== 'string') year = year.toString();
    if (!validator.isInt(year)) return -1;

    // month could be string or 1 to 12
    let monthIndex = this.getMonthIndex(month);
    if (monthIndex < 0) return -1;

    return (new Date(year, monthIndex + 1, 0)).getDate();
  }

  static isAmount(arg) {
    if (typeof arg === 'undefined' || arg === null) return false;

    if (typeof arg === 'string') {
      // remove leading and trailing spaces and brackets
      // validator.isCurrency() not recognising negative amount in brackets
      arg = arg.trim().replace(/^\(/, '').replace(/\)$/, '');
    } else {
      arg = arg.toString();
    }

    return validator.isNumeric(arg) || validator.isFloat(arg) || validator.isCurrency(arg);
  }

  static isDate(arg) {
    if (typeof arg === 'undefined' || arg === null) return false;

    if (_.isDate(arg)) return true;

    if (typeof arg !== 'string') arg = arg.toString();

    let trimmed = arg.trim();

    let m = this._getMoment(trimmed);

    return m.isValid();
  }

  static isNullOrWhitespace(arg) {
    if (typeof arg === 'undefined' || arg === null) return true;

    if (typeof arg !== 'string') arg = arg.toString();

    return arg.trim().length < 1;
  }

  static isOneMonthPeriod(startDate, endDate) {
    if (!this.isDate(startDate)) return false;
    if (!this.isDate(endDate)) return false;

    let start = new Date(this.sanitiseDate(startDate));
    let end = new Date(this.sanitiseDate(endDate));
    if (end <= start) return false;

    let range = moment.range(start, end);
    let daysDiff = range.diff('days');

    let y = start.getFullYear();
    var m = start.getMonth(); // month index 0 to 11
    var daysInMonth = this.getDaysInMonth(y, m + 1);

    return daysInMonth === daysDiff + 1;
  }

  static isPercentage(arg) {
    if (typeof arg === 'undefined' || arg === null) return false;

    if (typeof arg !== 'string') arg = arg.toString();

    // remove possible ending % sign
    arg = arg.trim().replace(/%$/, '').trim();
    if (arg.length === 0) return false;

    let value = arg - 0;
    return !isNaN(value) && value >= 0;
  }

  static sanitiseAmount (arg) {
    // deal with unexpected
    if (typeof arg === 'undefined' || arg === null) return 0;

    if (typeof arg === 'string') {
      // deal with empty string
      if (arg.trim().length < 1) return 0;

      let value = numeral(arg).value();
      if (value === null) return 0;

      return value;
    }

    // deal with types other than string
    return arg - 0;
  }

  static sanitiseDate (arg) {
    if (typeof arg === 'undefined' || arg === null) return '';

    moment.locale('en-au');

    if (_.isDate(arg)) {

      let m = moment(arg);
      // format as 'D MMM YYYY'
      return m.format('ll');

    } else {

      if (typeof arg !== 'string') arg = arg.toString();
      let trimmed = arg.trim();

      let m = this._getMoment(trimmed);
      // in case of invalid date
      if (!m.isValid()) return '';

      // format as 'D MMM YYYY'
      return m.format('ll');
    }
  }

  static sanitisePercentage(arg) {
    if (typeof arg === 'undefined' || arg === null) return '';

    if (typeof arg !== 'string') arg = arg.toString();

    let trimmed = arg.trim();
    let lastChar = trimmed.substr(-1);
    return `${lastChar === '%' ? trimmed : trimmed + '%'}`;
  }
}

export default util;
