import ExchangeStoreBase from '../ExchangeStoreBase'

const EXCHANGE_NAME_CNY = '币荣';
// const EXCHANGE_NAME_USD = 'CoinRising';
// const EXCHANGE_URl = 'www.coinrising.com';
const EXCHANGE_NAME_USD = 'QB';
const EXCHANGE_URl = 'qb.com';
const EXCHANGE_Apply_EMAIL = 'business@coinrising.com';
const EXCHANGE_CONTACT_EMAIL = 'support@coinrising.com';
const EXCHANGE_ADDR = 'Kemp House 152 -160 City Road, London';
const EXCHANGE_SERVICE_PHONE = '010-53348151'
const EXCHANGE_SERVICE_QQ = '3310267657';
const EXCHANGE_COIN = 'QB';
const CURRENT_URL = 'http://192.168.55.105:80'

export default class UserStore extends ExchangeStoreBase {
  constructor(count) {

    super();
    let language = this.getQuery("language") === '0' ? "zh-CN" : this.getQuery("language") === '1' ? "en-US" : undefined;
    language && this.Storage.language.set(language);
    console.log(1)
    this.state = {
      nameCny: EXCHANGE_NAME_CNY,
      nameUsd: EXCHANGE_NAME_USD,
      coin: EXCHANGE_COIN,
      netUrl: EXCHANGE_URl,
      applyEmailUrl: EXCHANGE_Apply_EMAIL,
      contactEmailUrl: EXCHANGE_CONTACT_EMAIL,
      addr: EXCHANGE_ADDR,
      servicePhone: EXCHANGE_SERVICE_PHONE,
      serviceQQ: EXCHANGE_SERVICE_QQ,
      currentUrl: CURRENT_URL,
      // language: 'zh-CN',
      language: this.Storage.language.get() || "en-US"
    }
  }

  changeLanguage(lang){
    this.state.language = lang;
    this.Storage.language.set(lang);
  }

  get language(){
    return this.state.language;
  }
}