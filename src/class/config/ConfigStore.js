import ExchangeStoreBase from '../ExchangeStoreBase'

const EXCHANGE_NAME_CNY = 'QB';
// const EXCHANGE_NAME_USD = 'CoinRising';
// const EXCHANGE_URl = 'www.coinrising.com';
// const CURRENT_IMGURL = "http://user.qb.com/";
const EXCHANGE_NAME_USD = 'QB';
const EXCHANGE_URl = 'qb.com';
const EXCHANGE_Apply_EMAIL = 'business@qb.com';
const EXCHANGE_CONTACT_EMAIL = 'support@qb.com';
const EXCHANGE_ADDR = 'Kemp House 152 -160 City Road, London';
const EXCHANGE_SERVICE_PHONE = '010-53348151'
const EXCHANGE_SERVICE_QQ = '3310267657';
const EXCHANGE_COIN = 'QB';
const CURRENT_URL = 'http://192.168.55.105:80'
const CURRENT_IMGURL = "http://192.168.55.107/";

export default class UserStore extends ExchangeStoreBase {
  constructor(count) {

    super("config", "general");
    let language = this.getQuery("language") === '0' ? "zh-CN" : this.getQuery("language") === '1' ? "en-US" : undefined;
    language && this.Storage.language.set(language);
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
      currentImgUrl: CURRENT_IMGURL,
      // language: 'zh-CN',
      language: this.Storage.language.get() || "en-US",
      activityState: 1
    }
  }

  changeLanguage(lang){
    this.state.language = lang;
    this.Storage.language.set(lang);
  }
  // 获取活动状态
  async getActivityState(){
    let result = await this.Proxy.activityState();
    this.state.activityState = result && result.qe;
  }
  get language(){
    return this.state.language;
  }
}