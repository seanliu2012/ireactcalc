import numeral from 'numeral';

class util {

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

}

export default util;
