import ExchangeControllerBase from '../ExchangeControllerBase'
import intl from "react-intl-universal";
import en from "../../lang/en.js";
import zh from "../../lang/zh.js";
// locale data

console.log('config')
import ConfigStore from './ConfigStore'

export default class ConfigController extends ExchangeControllerBase {
  constructor() {
    super()
    this.store = new ConfigStore()
  }

  get nameCny() {
    return this.store.state.nameCny
  }
  async getLanguage() {
    // return "zh-CN";
    return this.store.state.language;
  }
  async loadLocales() {
    const locales = {
      "en-US": en(this.store.state),
      "zh-CN": zh(this.store.state)
    };

    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    let lang = await this.getLanguage();
    await intl.init({
      currentLocale: lang, // TODO: determine locale here
      locales,
    });
    return true;
  }

}