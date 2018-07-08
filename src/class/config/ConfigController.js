import ExchangeControllerBase from '../ExchangeControllerBase'
import intl from "react-intl-universal";
import en from "../../lang/en.js";
import zh from "../../lang/zh.js";
// locale data


import ConfigStore from './ConfigStore'

export default class ConfigController extends ExchangeControllerBase {
  constructor() {
    super()
    this.store = new ConfigStore()
  }
  // 获取app view
  setAppView(view){
    this.app = view;
  }
  get nameCny() {
    return this.store.state.nameCny
  }
  get language() {
    // return "zh-CN";
    return this.store.language;
  }
  changeLanguage(lang){
    this.store.changeLanguage(lang);
    this.app.setState({ initDone: false},()=>{
      this.loadLocales();
    })
  }
  async loadLocales() {
    const locales = {
      "en-US": en(this.store.state),
      "zh-CN": zh(this.store.state)
    };

    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    let lang = this.language;
    await intl.init({
      currentLocale: lang, // TODO: determine locale here
      locales,
    });
    this.app.setState({ initDone: true });
  }

}