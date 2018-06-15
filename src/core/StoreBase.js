import proxy from './httpProxy';
// import Storage from './storage' //localStorage交互


import ServerConfig from '../config/ServerConfig'
import HttpConfig from '../config/HttpConfig'

proxy.install({}, ServerConfig, HttpConfig.httpList)


export default class StoreBase {
  constructor() {
    // http
    this.Proxy = proxy
  }

}