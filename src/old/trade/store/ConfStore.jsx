import {observable} from "mobx";


class ConfStore {

  USD = "USD";
  CNY = "CNY";
  DIGIT = '';
  @observable coinPriceType = this.DIGIT;
  @observable language = 'zh-hans';
  // @observable currentRate = {'eth_btc': ''};

  constructor(precision = 8) {
    this.precision = precision;
    this.setCoinPriceType = this.setCoinPriceType.bind(this);
    this.getUnit = this.getUnit.bind(this);
  }

  getUnit(market) {
    if (this.coinPriceType === this.USD) {
      return this.USD;
    }
    if (this.coinPriceType === this.CNY) {
      return this.CNY
    }
    return market;
  }

  getUnitType(unit) {
    unit = unit || this.coinPriceType
    if (unit === this.USD || unit === this.CNY) {
      return 'LEGAL';
    }
    return 'DIGITAL';
  }

  setCoinPriceType(e) {
    e.preventDefault();
    this.coinPriceType = e.target.value;
  }

}

export default ConfStore
