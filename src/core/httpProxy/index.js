/**
 * 使用方法
 *  1.在ProxyConfig配置好相关参数
 *  2.直接this.Proxy.XXX生成链接，返回promise
 *      注：若需要参数，this.Proxy.XXX（params）
 */

import Fetch from "../libs/Fetch"; //引入Fetch

let host, port;

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

const HTTP_PROXY = {
  install(app, ServerConfig, httpList, httpPreHandler, httpAfterHandler) {
    host = ServerConfig.host;
    port = ServerConfig.port;
    httpList.forEach(v => {
      HTTP_PROXY[v.name] = async params => {
        let req = {},
          res = {};
        req.url = {host, port}
        req.url.path = v.data.url
        let data = JSON.parse(JSON.stringify(v.data));
        delete data.url
        req.data = Object.assign({params}, data);
        // console.log('0', req)
        if (httpPreHandler) {
          httpPreHandler(app, req);
        }
        req = formatParams(req)
        // console.log(1, req)
        res.result = await Fetch(req.url, req.data);
        // console.log(data.url, !result, result.code !== 200, result.msg !== 'ok', result,httpFilter)
        if (httpAfterHandler) {
          httpAfterHandler(app, req, res);
        }
        return res.result;
      };
    });
  },
  fetch: async (obj, req) => (req = formatParams(obj)) && await Fetch(req.url, req.data)
};

export default HTTP_PROXY;
