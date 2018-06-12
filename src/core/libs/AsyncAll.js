/**
 * 将多个异步请求同时发送
 * @param invokes 可以是数组里面包着多个Promise，也可以是多个Promise，参数不限制
 * @returns {Promise<any>}
 */
export default function (...invokes)
{
  if(invokes.length === 0)
    new Promise((resolve, reject)=>resolve([]));
  invokes = invokes.reduce( (r, v) =>{Array.isArray(v) ? r.push(...v) : r.push(v);return r}, [] )
  return new Promise((resolve, reject)=>Promise.all(invokes)
    .then(results=>resolve(results)).catch(e=>reject(e)))

}
