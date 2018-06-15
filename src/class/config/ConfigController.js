import ExchangeControllerBase from '../ExchangeControllerBase'

import ConfigStore from './ConfigStore'

export default class ConfigController extends ExchangeControllerBase {
  constructor() {
    super()
    this.store = new ConfigStore()
  }

  get nameCny() {
    return this.store.state.nameCny
  }



}