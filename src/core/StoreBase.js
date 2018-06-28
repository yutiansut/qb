// import Proxy from './httpProxy';
import WebSocket from './webSocket' //websocket交互
// import Storage from './storage' //localStorage交互
import Fetch from './libs/Fetch'
import AsyncAll from './libs/AsyncAll'
import Sleep from './libs/Sleep'


import ServerConfig from '../config/ServerConfig'
import HttpConfig from '../config/HttpConfig'
import WebSocketConfig from '../config/WebSocketConfig'
import HTTP_PROXY from "./httpProxy";

const host = ServerConfig.host;
const port = ServerConfig.port;

const formatParams = req => {
  if (req.url.path.indexOf(":") > 0) {
    let urlArr = req.url.path.split(":"),
      url = urlArr[0],
      replaceKey = urlArr[1];
    req.url.path = `${url}${req.data.params[replaceKey]}`;
    delete req.data.params[replaceKey];
  }
  // console.log(req)
  req.url.path && (req.url = `http://${req.url.host}:${req.url.port}${req.url.path}`);
  if (req.data && req.data.method === "post" && req.data.params)
    Object.keys(req.data.params).length > 0 && (req.data.body = JSON.stringify(req.data.params));
  if (req.data && req.data.method === "get" && req.data.params)
    Object.keys(req.data.params).length > 0 && (req.url += `?`) && Object.keys(req.data.params).forEach((key, index) =>
      (req.url += `${key}=${req.data.params[key]}`) && Object.keys(req.data.params).length - 1 !== index && (req.url += "&"));

  req.data = JSON.parse(JSON.stringify(req.data));
  // delete req.data.params
  // console.log(req)
  return req
}


// HttpConfig.useHttp && Proxy.install({}, ServerConfig, HttpConfig.httpList)
WebSocketConfig.useWebSocket && WebSocket.install({}, ServerConfig, WebSocketConfig.webSocketList);

export default class StoreBase {
  constructor() {
    // http
    this.Proxy = {};
    this.Proxy.fetch = async (obj, req) => (req = formatParams(obj)) && await Fetch(req.url, req.data);
    this.preHandler = [];
    this.afterHandler = [];
    this.Sleep = Sleep;
    this.WebSocket = WebSocket
  }

  installProxy(modelName, preHandler, afterHandler) {
    HttpConfig.useHttp && HttpConfig[modelName].forEach(v => {
      this.Proxy[v.name] = async params => {
        let req = {},
          res = {};
        req.url = {host, port}
        req.url.path = v.data.url
        let data = JSON.parse(JSON.stringify(v.data));
        delete data.url
        req.data = Object.assign({params}, data);
        // console.log('0', req)
        if (preHandler && preHandler.length) {
          // preHandler(this, req);
          // console.log(preHandler)
          for (let i = 0; i < preHandler.length; i++) {
            await preHandler[i](this, req, v)
          }
          // await AsyncAll(...preHandler.map(async vv => await vv(this, req, v)))
        }
        req = formatParams(req)
        // console.log(1, req)
        res.result = await Fetch(req.url, req.data);
        // console.log(data.url, !result, result.code !== 200, result.msg !== 'ok', result,httpFilter)
        if (afterHandler && afterHandler.length) {
          // afterHandler(this, req, res);
          // console.log(afterHandler)
          for (let i = 0; i < afterHandler.length; i++) {
            await afterHandler[i](this, req, res, v)
          }
        }
        return res.result;
      };
    })
  }

}