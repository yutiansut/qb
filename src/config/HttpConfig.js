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
    {name: 'getUserInfo', data: {url: '/user/', method: 'post'}, action: 'userInfo', actionBack: 'userInfoRes'}, // 获取用户信息
    {name: 'getUserAuth', data: {url: '/user/', method: 'post'}, action: 'userAuth', actionBack: 'userAuthRes'}, // 获取用户认证信息
    // {name: 'uploadUserImg', data: {url: '/image/', method: 'post'}, action: 'uploadAuth', actionBack: 'uploadAuthRes', needToken: true }, // 上传用户认证图片
    {name: 'uploadUserAuth', data: {url: '/user/', method: 'post'}, action: 'uploadAuth', actionBack: 'uploadAuthRes' }, // 上传用户认证信息
    {name: 'getLoginPwd', data: {url: '/user/', method: 'post'}, action: 'modifyLoginPwd', actionBack: 'modifyLoginPwdRes' }, // 设置登录密码
    {name: 'getVerifyCode', data: {url: '/user/', method: 'post'}, action: 'getCode', actionBack: 'getCodeRes' }, // 获取验证码
    {name: 'setFundPwd', data: {url: '/user/', method: 'post'}, action: 'setFundPass', actionBack: 'setFundPassRes' }, // 设置资金密码
    {name: 'modifyFundPwd', data: {url: '/user/', method: 'post'}, action: 'modifyFundPass', actionBack: 'modifyFundPassRes' }, // 修改资金密码
    {name: 'bindUser', data: {url: '/user/', method: 'post'}, action: 'bindAccount', actionBack: 'bindAccountRes' }, // 绑定手机邮箱
    {name: 'getGoogle', data: {url: '/user/', method: 'post'}, action: 'getGoogleSecret', actionBack: 'getGoogleSecretRes' }, // 获取谷歌验证密钥
    {name: 'getCurrentLogin', data: {url: '/user/', method: 'post'}, action: 'getCurrentLoginList', actionBack: 'getCurrentLoginListRes' }, // 获取当前登录设备列表
    {name: 'getLoginList', data: {url: '/user/', method: 'post'}, action: 'getOperateRecord', actionBack: 'getOperateRecordRes' }, // 获取登录日志
    {name: 'getUserCredits', data: {url: '/user/', method: 'post'}, action: 'getUserCreditsHistory', actionBack: 'getUserCreditsHistoryRes'}, // 获取积分详情
    {name: 'getIpList', data: {url: '/user/', method: 'post'}, action: 'getIPWhiteList', actionBack: 'getIPWhiteListRes'}, // 查看ip白名单
    {name: 'addIp', data: {url: '/user/', method: 'post'}, action: 'InsertIP', actionBack: 'InsertIPRes'}, // 添加ip白名单
    {name: 'deletIp', data: {url: '/user/', method: 'post'}, action: 'DeleteIP', actionBack: 'DeleteIPRes'}, // 删除ip白名单
    {name: 'setFundPwdSuspend', data: {url: '/user/', method: 'post'}, action: 'setFundPassSuspend', actionBack: 'setFundPassSuspendRes'}, // 设置资金密码输入间隔
    {name: 'getFundPwdSuspend', data: {url: '/user/', method: 'post'}, action: 'getSecretInterval', actionBack: 'getSecretIntervalRes'}, // 查看资金密码输入间隔
  ],
  notice: [
    {name: 'getActivityCon', data: {url: '/common/', method: 'post'}, action: 'getActivity', actionBack: 'getActivityRes'} // 活动内容
  ],
  test: [
    {name: 'topCurrency', data: {url: '/v1/home/topCurrency', method: 'get'}, action: 'test', actionBack: 'testRes'},
  ],
  market: [
    { name: 'coinInfo', data: { url: '/common', method: 'post' }, action: 'getCoinInfo', actionBack: 'getCoinInfoRes' }
  ],
  asset: [
    // 获取交易对手续费
    { name: 'getFee', data: { url: '/order', method: 'post' }, action: 'getFee', actionBack: 'getFeeRes' },
    // 获取总资产(包含各个钱包币种的详细信息)(pass)
    { name: 'totalAsset', data: { url: '/rpc/get_user_property', method: 'post' }, action: 'get_user_property', actionBack: 'get_user_property_r' },
    //24小时提现额度, 查询币种额度，
    { name: 'balance', data: { url: '/rpc/get_withdraw_balance', method: 'post' }, action: 'get_withdraw_balance', actionBack: 'get_withdraw_balance_r' },
    // 充币地址查询(pass)
    { name: 'chargeAddress', data: { url: '/rpc/get_deposit_address', method: 'post' }, action: 'get_deposit_address', actionBack: 'get_deposit_address_r' },
    // 充提记录(pass)
    { name: 'history', data: { url: '/rpc/get_asset_records', method: 'post' }, action: 'get_asset_records', actionBack: 'get_asset_records_r' },
    // 提币矿工费
    { name: 'minerFee', data: { url: '/wallet', method: 'post' }, action: 'getMinerFee', actionBack: 'getMinerFeeRes' },
    // 提币地址查询(pass)
    { name: 'extractAddress', data: { url: '/rpc/get_withdraw_addresses', method: 'post' }, action: 'get_withdraw_addresses', actionBack: 'get_withdraw_addresses_r' },
    //
    { name: 'addAddress', data: { url: '/rpc/add_withdraw_balance', method: 'post' }, action: 'add_withdraw_balance', actionBack: 'add_withdraw_balance_r' },
  ]
}
