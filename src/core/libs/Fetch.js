/**
 * fetch请求api
 * url 请求路径
 * params 请求参数，必传method
 */

export default async (url, params) => {
  // console.log(url, params)
  try {
    let response = await fetch(url, params).catch((e, obj) => {
        obj = { ret: -1, data: e };
        throw obj;
      });
    // console.log('返回的response1', response)
     let  result = await response.text().catch((e, obj) => {
        obj = { ret: -2, data: e };
        throw obj;
      });
    console.log(result)
    return JSON.parse(result);
  } catch (e) {
    console.error('error', e);
    if (!e.ret)
      e = { ret: -3, data: e };
    return e;
  }
};
