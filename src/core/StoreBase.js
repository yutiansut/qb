import Proxy from './httpProxy';
import WebSocket from './webSocket' //websocket交互
// import Storage from './storage' //localStorage交互


import ServerConfig from '../config/ServerConfig'
import HttpConfig from '../config/HttpConfig'
import WebSocketConfig from '../config/WebSocketConfig'


HttpConfig.useHttp && Proxy.install({}, ServerConfig, HttpConfig.httpList)
WebSocketConfig.useWebSocket && WebSocket.install({}, ServerConfig, WebSocketConfig.webSocketList);

export default class StoreBase {
  constructor() {
    // http
    this.Proxy = Proxy
    this.WebSocket = WebSocket
  }

}