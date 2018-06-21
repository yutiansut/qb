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
    // //test
    // // {name: 'test', data: {url: '/v1/home/searchCurrency/:page', method: 'get'}},
    // //轮循数据接口
    // {name: 'symbolsRefresh', data: {url: '/v1/home/symbolsRefresh', method: 'post'}},
    //
    // //保存自选
    // {name: 'myOptionalOp', data: {url: '/v1/home/myOptionalOp', method: 'post'}},
    //
    // //顶部币种切换
    // {name: 'topCurrency', data: {url: '/v1/home/topCurrency', method: 'get'}},
    //
    // //首页平台
    // {name: 'getHomeMarketList', data: {url: '/v1/home/markets', method: 'get'}},
    // //首页表格数据
    // {name: 'getHomeTableData', data: {url: '/v1/home/symbolList', method: 'get'}},
    // //首页自选页列表
    // {name: 'getMyOptionUnlogin', data: {url: '/v1/home/myOptionUnlogin', method: 'post'}},
    // //首页交易所列表编辑保存
    // {name: 'saveHomeMarketList', data: {url: '/v1/home/saveMyMarketList', method: 'post'}},
    // // 首页自选列表编辑保存
    // {name: 'saveMyOption', data: {url: '/v1/home/saveMyOption', method: 'post'}},
    // //首页资讯数据
    // {name: 'getNews', data: {url: '/v1/market/marketsNews', method: 'get'}},
    // //榜单涨跌幅榜
    // {name: 'getRankRange', data: {url: '/v1/rank/coinChanged', method: 'get'}},
    // //榜单币种成交额榜
    // {name: 'getRankCurrency', data: {url: '/v1/rank/coin', method: 'get'}},
    // //榜单交易所成交额榜
    // {name: 'getRankExchange', data: {url: '/v1/rank/market', method: 'get'}},
    // //新上市榜
    // {name: 'getNewCoins', data: {url: '/v1/rank/newcoins', method: 'get'}},
    // //热门概念榜
    // {name: 'getRankConcept', data: {url: '/v1/rank/hotconcept', method: 'get'}},
    //
    // //currencyInfo
    // {name: 'getCurrencyDetail', data: {url: '/v1/currency/detail', method: 'get'}},// 币种详情页头部
    // {name: 'getCurrencyQuatation', data: {url: '/v1/currency/symbols', method: 'get'}},// 币种详情页行情表
    // {name: 'getCurrencyPairRatio', data: {url: '/v1/currency/pairRatio', method: 'get'}},// 币种详情页交易对占比
    // {name: 'getCurrencyMarketRatio', data: {url: '/v1/currency/marketRatio', method: 'get'}},// 币种详情页交易所占比
    // {name: 'getCurrencyKLine', data: {url: '/v1/currency/kLine', method: 'get'}},// 币种详情页折线图
    //
    // // exchage
    // {name: 'getMarketList', data: {url: '/v1/market/list', method: 'get'}},// 交易所列表
    //
    // //exchangeInfo
    // {name: 'getMarketDetail', data: {url: '/v1/market/detail', method: 'get'}},// 交易所详情页头部
    // {name: 'getMarketQuatation', data: {url: '/v1/home/symbolList', method: 'get'}},// 交易所详情页行情表
    // {name: 'getMarketCoinRatio', data: {url: '/v1/market/coinRatio', method: 'get'}},// 交易所详情页币种占比
    // {name: 'getMarketTurnoverKLine', data: {url: '/v1/market/turnoverKLine', method: 'get'}},// 交易所详情页折线图
    //
    // //searchResult
    // {name: 'searchTips', data: {url: '/v1/home/searchTips', method: 'get'}},
    // {name: 'searchCurrency', data: {url: '/v1/home/searchCurrency', method: 'get'}},
    // {name: 'searchMarket', data: {url: '/v1/home/searchMarket', method: 'get'}},
    //
    // //login
    // {name: 'message', data: {url: '/v1/message', method: 'post'}},
    // {name: 'login', data: {url: '/v1/login', method: 'post'}},
    // {name: 'logout', data: {url: '/v1/logout', method: 'post'}}

    // 个人中心
    {name: 'userInfo', data: {url: '/user/', method: 'post'}}, // 用户基本信息
  ]
}
