/**
 * fetch请求api
 * url 请求路径
 * params 请求参数，必传method
 */

export default async (url, params) => {
    // console.log(url, params)
    return await fetch(url, params)
        .then(response => response.json(), (response, obj) => obj = {code: 0, msg: result, data: 'fetch 失败'})
        .then(results => results, (reject, obj) => obj = {code: 1, msg: 'JSON解析出错', data: reject})
}
