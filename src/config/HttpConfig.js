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
    {name: 'getUserInfo', data: {url: '/user/', method: 'post'}, action: 'userInfo', actionBack: 'userInfoRes' }, // 获取用户信息
    {name: 'getUserAuth', data: {url: '/user/', method: 'post'}, action: 'userAuth', actionBack: 'userAuthRes' }, // 获取用户认证信息
    {name: 'uploadUserAuth', data: {url: '/user/', method: 'post'}, action: 'uploadAuth', actionBack: 'uploadAuthRes' }, // 上传用户认证信息
    {name: 'getLoginPwd', data: {url: '/user/', method: 'post'}, action: 'modifyLoginPwd', actionBack: 'modifyLoginPwdRes' }, // 设置登录密码
    {name: 'getVerifyCode', data: {url: '/user/', method: 'post'}, action: 'getCode', actionBack: 'getCodeRes' }, // 获取验证码
    {name: 'setFundPwd', data: {url: '/user/', method: 'post'}, action: 'setFundPass', actionBack: 'setFundPassRes' }, // 设置资金密码
    {name: 'modifyFundPwd', data: {url: '/user/', method: 'post'}, action: 'modifyFundPass', actionBack: 'modifyFundPassRes' }, // 修改资金密码
    {name: 'bindUser', data: {url: '/user/', method: 'post'}, action: 'bindAccount', actionBack: 'bindAccountRes' }, // 绑定手机邮箱
    {name: 'getGoogle', data: {url: '/user/', method: 'post'}, action: 'getGoogleSecret', actionBack: 'getGoogleSecretRes' }, // 获取谷歌验证密钥
  ],
  notice: [
    {name: 'getActivity', data: {url: '/activity/', method: 'post'}}
  ],
  test: [
    {name: 'topCurrency', data: {url: '/v1/home/topCurrency', method: 'get'}, action: 'test', actionBack: 'testRes'},
  ],
  asset: [
    // 获取交易对手续费
    { name: 'getFee', data: { url: '/order', method: 'post' }, action: 'geFee', actionBack: 'getFeeRes' },
    // 获取总资产(包含各个钱包币种的详细信息)
    { name: 'totalAsset', data: { url: '/property', method: 'post' }, action: 'getProperty', actionBack: 'getPropertyRes' },
    //24小时提现额度, 查询币种额度，
    { name: 'balance', data: { url: '/property', method: 'post' }, action: 'getBalance', actionBack: 'getBalanceRes' },
    // 充币地址查询
    { name: 'chargeAddress', data: { url: '/common', method: 'post' }, action: 'getChargeAddress', actionBack: 'getChargeAddressRes' },
    // 充提记录
    { name: 'history', data: { url: '/property', method: 'post' }, action: 'getChargeRecord', actionBack: 'getChargeRecordRes' },
    // 提币信息
    { name: 'extractInfo', data: { url: '/common', method: 'post' }, action: 'getWithdrawFee', actionBack: 'getWithdrawFeeRes' },
    { name: 'extractAddress', data: { url: '/common', method: 'post' }, action: 'getWithdrawAddress', actionBack: 'getWithdrawAddressRes' },
  ]
}
