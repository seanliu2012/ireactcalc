import delay from './delay';
import individualTaxRates from './individualTaxRates';
import superGuaranteeRates from './superGuaranteeRates';


class rateApi {
  static getAllIndividualTaxRates() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], individualTaxRates));
      }, delay);
    });
  }

  static getAllSuperGuaranteeRates() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], superGuaranteeRates));
      }, delay);
    });
  }
}

export default rateApi;
