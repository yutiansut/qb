// import Proxy from './httpProxy';
import WebSocket from './webSocket' //websocket交互
// import Storage from './storage' //localStorage交互
import Fetch from './libs/Fetch'
import HttpProxy from "./httpProxy";
import MassageHandler from './messageHandler'

import AsyncAll from './libs/AsyncAll'
import Sleep from './libs/Sleep'
import Loop from './loop' //localStorage交互
import GlobalUtil from "./libs/GlobalUtil";
import Storage from "./storage/index"


export default class StoreBase {
  constructor() {
    // http
    this.Proxy = {};
    this.Proxy.fetch = async (url, data) => await Fetch(url, data);
    this.preHandler = [];
    this.afterHandler = [];
    this.Sleep = Sleep;
    this.AsyncAll = AsyncAll;
    this.Loop = Loop;
    this.GlobalUtil = GlobalUtil;
    this.WebSocket = WebSocket;
    this.Storage = Storage
  }


  setController(ctl) {
    this.controller = ctl
  }


  installProxy(modelName, preHandler, afterHandler) {
    HttpProxy.install.call(this, modelName, preHandler, afterHandler)
  }

  installWebsocket(connectName) {
    // console.log('installWebsocket',MassageHandler[connectName].get())
    return MassageHandler[connectName]
  }

}
