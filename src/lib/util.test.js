import util from './util';

describe('util class tests', function () {
  describe('sanitiseAmount()', function () {
    it('removes currency symbols and signs', function (done) {
      expect(util.sanitiseAmount(null)).toBe(0);
      expect(util.sanitiseAmount('NaN')).toBe(0);
      expect(util.sanitiseAmount(1.2345)).toBe(1.2345);
      expect(util.sanitiseAmount('$12,345.00')).toBe(12345);
      expect(util.sanitiseAmount('+$12,345.00')).toBe(12345);
      expect(util.sanitiseAmount('-$12,345.00')).toBe(-12345);
      expect(util.sanitiseAmount('(12,345.00)')).toBe(-12345);
      done();
    });
  });
});
