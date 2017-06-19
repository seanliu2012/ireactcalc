import rateApi from './rateApi';

describe('getAllIndividualTaxRates()', function () {
  it('return all tax rates', function (done) {
    rateApi.getAllIndividualTaxRates().then(rates => {
        expect(rates).not.toBeUndefined();
        expect(rates.length).toBeGreaterThan(10);
        done();
      });
  });
});

describe('getAllSuperGuaranteeRates()', function () {
  it('return all super rates', function (done) {
    rateApi.getAllSuperGuaranteeRates().then(rates => {
      expect(rates).not.toBeUndefined();
      expect(rates.length).toBeGreaterThan(3);
      done();
    });
  });
});
