/**
 * 使用方法
 *  1.在ProxyConfig配置好相关参数
 *  2.直接this.Proxy.XXX生成链接，返回promise
 *      注：若需要参数，this.Proxy.XXX（params）
 */

import Fetch from "../libs/Fetch";
// import HttpConfig from "../../config/HttpConfig"; //引入Fetch

let host, port, HttpList, protocol;

const formatParams = req => {
  if (req.url.path.indexOf(":") > 0) {
    let urlArr = req.url.path.split(":"),
      url = urlArr[0],
      replaceKey = urlArr[1];
    req.url.path = `${url}${req.data.params[replaceKey]}`;
    delete req.data.params[replaceKey];
  }
  req.url.path && (req.url = `${req.url.protocol}://${req.url.host}:${req.url.port}${req.url.path}`);
  if (req.data && req.data.method === "post" && req.data.params)
    Object.keys(req.data.params).length > 0 && (req.data.body = JSON.stringify(req.data.params));
  if (req.data && req.data.method === "get" && req.data.params)
    Object.keys(req.data.params).length > 0 && (req.url += `?`) && Object.keys(req.data.params).forEach((key, index) =>
      (req.url += `${key}=${req.data.params[key]}`) && Object.keys(req.data.params).length - 1 !== index && (req.url += "&"));
  delete req.data.params
  return req
}

const HTTP_PROXY = {
  setConfig(HttpConfig, ServerConfig){
    HttpList = HttpConfig;
    protocol = ServerConfig.hSecure && 'https' || 'http';
    host = ServerConfig.host;
    port = ServerConfig.port;
  },

  install(modelName, preHandler, afterHandler) {
    HttpList && HttpList[modelName] && HttpList[modelName].forEach(v => {
      this.Proxy[v.name] = async params => {
        let req = {},
          res = {};
        req.url = {host, port, protocol}
        req.url.path = v.data.url
        let data = JSON.parse(JSON.stringify(v.data));
        delete data.url
        req.data = Object.assign({params}, data);
        if (preHandler && preHandler.length) {
          for (let i = 0; i < preHandler.length; i++) {
            await preHandler[i](this, req, v)
          }
        }
        req = formatParams(req)
        // console.log(req)
        res.result = await Fetch(req.url, req.data);
        if (afterHandler && afterHandler.length) {
          for (let i = 0; i < afterHandler.length; i++) {
            await afterHandler[i](this, req, res, v)
          }
        }
        return res.result;
      };
    })
  },
  fetch: async (url, data) => await Fetch(url, data)
};

export default HTTP_PROXY;
