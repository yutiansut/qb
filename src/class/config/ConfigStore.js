import ExchangeStoreBase from '../ExchangeStoreBase'

const EXCHANGE_NAME_CNY = '币荣';
const EXCHANGE_NAME_USD = 'CoinRising';
const EXCHANGE_URl = 'www.coinrising.com';

export default class UserStore extends ExchangeStoreBase {
  constructor(count) {
    super();
    this.state = {
      nameCny: EXCHANGE_NAME_CNY,
      nameUsd: EXCHANGE_NAME_USD,
      netUrl: EXCHANGE_URl
    }
  }
}