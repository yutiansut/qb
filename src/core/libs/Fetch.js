/**
 * fetch请求api
 * url 请求路径
 * params 请求参数，必传method
 */

export default async (url, params) => await fetch(url, params).catch((e, obj) => {
    obj = { ret: -1, data: e };
    throw obj;
  });
