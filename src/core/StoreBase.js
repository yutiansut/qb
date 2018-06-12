import proxy from './httpProxy';

import ServerConfig from '../config/ServerConfig'
import HttpConfig from '../config/HttpConfig'


export default class StoreBase {
  constructor() {
    // http
    proxy.install({}, ServerConfig, HttpConfig.httpList)
    this.Proxy = proxy
  }

}