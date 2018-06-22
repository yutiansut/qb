/**
 * 使用方法
 *  1.在ProxyConfig配置好相关参数
 *  2.直接this.Proxy.XXX生成链接，返回promise
 *      注：若需要参数，this.Proxy.XXX（params）
 */

// import httpAfterHandler from '@/common/js/afterHandler/HttpAfterHandler' // 这里引入http请求后的处理器，没有可以不引入
// import httpPreHandler from '@/common/js/preHandler/HttpPreHandler' // 这里引入http请求前的处理器，没有可以不引入

export default {
  useHttp: true,// 是否开启http
  /**
   * name:请求标识
   * data:请求数据
   *  url:路径
   *  method:请求方式
   *  。。。
   * 注：其他fetch可以传入的参数，也在data里面传入
   */
  // httpPreHandler,
  // httpAfterHandler,
  httpList: [

    // 个人中心
    {name: 'userInfo', data: {url: '/user/', method: 'post'}},
    // 资讯详情
    {name: 'getActivity', data: {url: '/activity/', method: 'post'}}
  ]
}
