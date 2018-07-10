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

  user: [ // 用户
    {name: 'getUserInfo', data: {url: '/user/', method: 'post'}, action: 'userInfo', actionBack: 'userInfoRes', needToken: true}, // 获取用户信息
    {name: 'getUserAuth', data: {url: '/user/', method: 'post'}, action: 'userAuth', actionBack: 'userAuthRes', needToken: true}, // 获取用户认证信息
    {name: 'getUserCreditsNum', data: {url: '/user/', method: 'post'}, action: 'getUserCredits', actionBack: 'getUserCreditsRes', needToken: true}, // 获取用户积分
    {name: 'uploadUserAuth', data: {url: '/user/', method: 'post'}, action: 'uploadAuth', actionBack: 'uploadAuthRes', needToken: true}, // 上传用户认证信息
    {name: 'getLoginPwd', data: {url: '/user/', method: 'post'}, action: 'modifyLoginPwd', actionBack: 'modifyLoginPwdRes', needToken: true}, // 设置登录密码
    {name: 'getVerifyCode', data: {url: '/common/', method: 'post'}, action: 'getCode', actionBack: 'getCodeRes'}, // 获取验证码
    {name: 'setFundPwd', data: {url: '/user/', method: 'post'}, action: 'setFundPass', actionBack: 'setFundPassRes', needToken: true}, // 设置资金密码
    {name: 'modifyFundPwd', data: {url: '/user/', method: 'post'}, action: 'modifyFundPass', actionBack: 'modifyFundPassRes', needToken: true}, // 修改资金密码
    {name: 'bindUser', data: {url: '/user/', method: 'post'}, action: 'bindAccount', actionBack: 'bindAccountRes', needToken: true}, // 绑定手机邮箱
    {name: 'getGoogle', data: {url: '/user/', method: 'post'}, action: 'getGoogleSecret', actionBack: 'getGoogleSecretRes', needToken: true}, // 获取谷歌验证密钥
    {name: 'getCurrentLogin', data: {url: '/user/', method: 'post'}, action: 'getCurrentLoginList', actionBack: 'getCurrentLoginListRes', needToken: true}, // 获取当前登录设备列表
    {name: 'getLoginList', data: {url: '/user/', method: 'post'}, action: 'getOperateRecord', actionBack: 'getOperateRecordRes', needToken: true}, // 获取登录日志
    {name: 'getUserCredits', data: {url: '/user/', method: 'post'}, action: 'getUserCreditsHistory', actionBack: 'getUserCreditsHistoryRes', needToken: true}, // 获取积分详情
    {name: 'getIpList', data: {url: '/user/', method: 'post'}, action: 'getIPWhiteList', actionBack: 'getIPWhiteListRes', needToken: true}, // 查看ip白名单
    {name: 'addIp', data: {url: '/user/', method: 'post'}, action: 'insertIP', actionBack: 'insertIPRes', needToken: true}, // 添加ip白名单
    {name: 'deletIp', data: {url: '/user/', method: 'post'}, action: 'deleteIP', actionBack: 'deleteIPRes', needToken: true}, // 删除ip白名单
    {name: 'setFundPwdSuspend', data: {url: '/user/', method: 'post'}, action: 'setFundPassSuspend', actionBack: 'setFundPassSuspendRes', needToken: true}, // 设置资金密码输入间隔
    {name: 'getFundPwdSuspend', data: {url: '/user/', method: 'post'}, action: 'getFundPassSuspend', actionBack: 'getFundPassSuspendRes', needToken: true}, // 查看资金密码输入间隔
    {name: 'getCaptcha', data: {url: '/common/', method: 'post'}, action: 'getCaptcha', actionBack: 'getCaptchaRes'}, // 获取图形验证码
    {name: 'setTwoVerify', data: {url: '/user/', method: 'post'}, action: 'setVerifyType', actionBack: 'setVerifyTypeRes', needToken: true}, // 修改两步认证
    {name: 'setGoogleVerify', data: {url: '/user/', method: 'post'}, action: 'verifyGoogleCode', actionBack: 'verifyGoogleCodeRes', needToken: true}, // 验证谷歌验证码
    {name: 'outOther', data: {url: '/user/', method: 'post'}, action: 'kickoffClient', actionBack: 'kickoffClientRes', needToken: true}, // 退出其他设备
  ],
  notice: [
    {name: 'getActivity', data: {url: '/common/', method: 'post'}, action: 'getActivity', actionBack: 'getActivityRes'} // 活动内容
  ],
  market: [
    //币种资料
    { name: 'coinInfo', data: { url: '/common/', method: 'post' }, action: 'getCoinInfo', actionBack: 'getCoinInfoRes' },
    // 获取交易对名称以及id
    {name: 'pairInfo', data: { url: '/common/', method: 'post'}, action: 'getAllTradePairList', actionBack: 'getAllTradePairListRes'},
    {name: 'getRecommendCoins', data: { url: '/common/', method: 'post'}, action: 'getRecommendCoins', actionBack: 'getRecommendCoinsRes'},
    // 添加收藏
    {name:'changeFavorite', data:{url: '/user/', method: 'post'}, action: 'changeFavorite', actionBack: 'changeFavoriteRes',needToken: true},
    // 获取收藏
    {name:'getFavoriteList', data:{url: '/user/', method: 'post'}, action: 'getFavoriteList', actionBack: 'getFavoriteListRes', needToken: true},
    // 获取交易对
    {name:'getAllChg', data:{url: '/common/', method: 'post'}, action: 'getAllChg', actionBack:'getAllChgRes'},
  ],
  asset: [
    // 撤销提币申请
    { name: 'cancelWithdraw', data: { url: '/property/', method: 'post' }, action: 'cancelWithdraw', actionBack: 'cancelWithdrawRes', needToken: true  },
    // 获取交易对手续费5.16（pass）
    { name: 'getFee', data: { url: '/common/', method: 'post' }, action: 'getAllTradePairFee', actionBack: 'getAllTradePairFeeRes'},
    // 获取总资产(包含各个钱包币种的详细信息)4.1
    { name: 'totalAsset', data: { url: '/property/', method: 'post' }, action: 'getProperty', actionBack: 'getPropertyRes', needToken: true },
    //24小时提现额度, 查询币种额度，4.2
    { name: 'balance', data: { url: '/property/', method: 'post' }, action: 'getBalance', actionBack: 'getBalanceRes', needToken: true },
    // 充币地址查询4.4（pass）
    { name: 'chargeAddress', data: { url: '/property/', method: 'post' }, action: 'getChargeAddress', actionBack: 'getChargeAddressRes',needToken: true  },
    // 提币矿工费4.5
    { name: 'minerFee', data: { url: '/property/', method: 'post' }, action: 'getMinerFee', actionBack: 'getMinerFeeRes', needToken: true },
    // 提交提币订单4.6（pass）
    { name: 'extractOrder', data: { url: '/property/', method: 'post' }, action: 'withdraw', actionBack: 'withdrawRes', needToken: true },
    // 提币地址查询4.7（pass）
    { name: 'extractAddress', data: { url: '/property/', method: 'post' }, action: 'getWithdrawAddress', actionBack: 'getWithdrawAddressRes', needToken: true  },
    //增加提币地址4.8(需要登录)（pass）
    { name: 'addAddress', data: { url: '/property/', method: 'post' }, action: 'addWithdrawAddress', actionBack: 'addWithdrawAddressRes', needToken:true },
    // 删除提币地址4.9(需要登录)（pass）
    { name: 'delAddress', data: { url: '/property/', method: 'post' }, action: 'deleteWithdrawAddress', actionBack: 'deleteWithdrawAddressRes', needToken: true },
    // 充提记录4.10
    { name: 'history', data: { url: '/property/', method: 'post' }, action: 'getChargeRecord', actionBack: 'getChargeRecordRes', needToken: true },
  ],
  userOrder:[
    //当前订单
    {name: 'currentOrder', data: {url: '/order/', method:'post'}, action: 'getCurrOrders', actionBack: 'getCurrOrdersRes'},
    //历史订单
    {name:'historyOrder', data: {url: '/order/', method: 'post'}, action: 'getCurrOrderRecord', actionBack: 'getCurrOrderRecordRes'},
      //订单详情
    {name:'orderDetail', data: {url: '/order/', method: 'post'}, action: 'orderDetail', actionBack: 'orderDetailRes'},
      //近期交易市场
    {name: 'recentOrderMarket', data: {url: '/common/', method: 'post'}, action: 'getRecentOrderOfMarket', actionBack: 'getRecentOrderOfMarketRes'},
      //近期交易个人
    {name: 'recentOrderUser', data: {url: '/order/', method: 'post'}, action: 'getRecentOrderOfUser', actionBack: 'getRecentOrderOfUserRes'},
      //挂单列表
    {name: 'getDepth', data: {url: '/common/', method: 'post'}, action: 'getDepth', actionBack: 'getDepthRes'},
      //撤单操作
    {name: 'cancelOrder', data: {url: '/order/', method: 'post'}, action: 'cancelOrder', actionBack: 'cancelOrderRes'},
    // 获取k线数据
    { name: 'getKline', data: { url: '/common/', method: 'post' }, action: 'getKLine', actionBack: 'getKLineRes' }

  ],
  deal:[
    //交易接口
    // {name: 'dealExchange', data: {url: '/order/', method: 'post'}, action: 'makeOrder', actionBack: 'makeOrderRes', needToken: true}
    {name: 'dealExchange', data: {url: '/order/', method: 'post'}, action: 'makeOrder', actionBack: 'makeOrderRes'}
  ],
  activity:[
    {name: 'getHomeBanner', data: {url: '/common/', method: 'post'}, action: 'getHomeBanner', actionBack: 'getHomeBannerRes'}, // 活动内容
    // H5活动页，获取qbt活动余量
    { name: 'getQbtMargin', data: { url: '/common/', method: 'post' }, action: 'getQbtMargin', actionBack: 'getQbtMarginRes'},
    //H5活动页，领取qbt奖励
    { name: 'getAward', data: { url: '/common/', method: 'post' }, action: 'invite', actionBack: 'inviteRes'}
  ],
  login:[
    {name: 'forgetLoginPass', data: {url: '/user/', method: 'post'}, action: 'forgetLoginPass', actionBack: 'forgetLoginPassRes', needToken: true}, // 找回密码
  ]
}
