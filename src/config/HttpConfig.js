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
    { name: 'getUserInfo', data: { url: '/v1/user/', method: 'post' }, action: 'ui', actionBack: 'uir', needToken: true }, // 获取用户信息
    { name: 'getUserAuth', data: { url: '/v1/user/', method: 'post' }, action: 'ua', actionBack: 'uar', needToken: true }, // 获取用户认证信息
    { name: 'getUserCreditsNum', data: { url: '/v1/user/', method: 'post' }, action: 'guc', actionBack: 'gucr', needToken: true }, // 获取用户积分
    { name: 'uploadUserAuth', data: { url: '/v1/user/', method: 'post' }, action: 'upa', actionBack: 'upar', needToken: true }, // 上传用户认证信息
    { name: 'getLoginPwd', data: { url: '/v1/user/', method: 'post' }, action: 'mlp', actionBack: 'mlpr', needToken: true }, // 设置登录密码
    { name: 'getVerifyCode', data: { url: '/v1/common/', method: 'post' }, action: 'gco', actionBack: 'gcor' }, // 获取验证码
    // {name: 'setFundPwd', data: {url: '/user/', method: 'post'}, action: 'setFundPass', actionBack: 'setFundPassRes', needToken: true}, // 设置资金密码
    { name: 'modifyFundPwd', data: { url: '/v1/user/', method: 'post' }, action: 'mfp', actionBack: 'mfpr', needToken: true }, // 修改资金密码
    { name: 'bindUser', data: { url: '/v1/user/', method: 'post' }, action: 'ba', actionBack: 'bar', needToken: true }, // 绑定手机邮箱
    { name: 'getGoogle', data: { url: '/v1/user/', method: 'post' }, action: 'gs', actionBack: 'gsr', needToken: true }, // 获取谷歌验证密钥
    { name: 'getCurrentLogin', data: { url: '/v1/user/', method: 'post' }, action: 'gll', actionBack: 'gllr', needToken: true }, // 获取当前登录设备列表
    { name: 'getLoginList', data: { url: '/v1/user/', method: 'post' }, action: 'gor', actionBack: 'gorr', needToken: true }, // 获取登录日志
    { name: 'getUserCredits', data: { url: '/v1/user/', method: 'post' }, action: 'uch', actionBack: 'uchr', needToken: true }, // 获取积分详情
    { name: 'getIpList', data: { url: '/v1/user/', method: 'post' }, action: 'iwl', actionBack: 'iwlr', needToken: true }, // 查看ip白名单
    { name: 'addIp', data: { url: '/v1/user/', method: 'post' }, action: 'ii', actionBack: 'iir', needToken: true }, // 添加ip白名单
    { name: 'deletIp', data: { url: '/v1/user/', method: 'post' }, action: 'di', actionBack: 'dir', needToken: true }, // 删除ip白名单
    { name: 'setFundPwdSuspend', data: { url: '/v1/user/', method: 'post' }, action: 'sfs', actionBack: 'sfsr', needToken: true }, // 设置资金密码输入间隔
    { name: 'getFundPwdSuspend', data: { url: '/v1/user/', method: 'post' }, action: 'gfs', actionBack: 'gfsr', needToken: true }, // 查看资金密码输入间隔
    { name: 'getCaptcha', data: { url: '/v1/common/', method: 'post' }, action: 'gca', actionBack: 'gcar' }, // 获取图形验证码
    { name: 'setTwoVerify', data: { url: '/v1/user/', method: 'post' }, action: 'sv', actionBack: 'svr', needToken: true }, // 修改两步认证
    { name: 'setGoogleVerify', data: { url: '/v1/user/', method: 'post' }, action: 'vgc', actionBack: 'vgcr', needToken: true }, // 验证谷歌验证码
    { name: 'setUserNotify', data: { url: '/v1/user/', method: 'post' }, action: 'sut', actionBack: 'sutr', needToken: true }, // 修改通知方式
    { name: 'outOther', data: { url: '/v1/user/', method: 'post' }, action: 'kfc', actionBack: 'kfcr', needToken: true }, // 退出其他设备
    { name: 'getAward', data: { url: '/v1/common/', method: 'post' }, action: 'in', actionBack: 'inr' }, // 领取奖励
    { name: 'getQbtTrade', data: { url: '/v1/common/', method: 'post' }, action: 'ai', actionBack: 'air' }, //关于我们
    { name: 'getIPAddr', data: { url: '/v1/common/', method: 'post' }, action: 'ia', actionBack: 'iar' }, // 获取当前iP
  ],
  notice: [
    { name: 'getActivity', data: { url: '/v1/common/', method: 'post' }, action: 'at', actionBack: 'atr' }, // 资讯公告内容
    { name: 'getUserNocticeList', data: { url: '/v1/user/', method: 'post' }, action: 'gunl', actionBack: 'gunlr', needToken: true }, // 获取通知列表
    { name: 'upDateUserNocticeList', data: { url: '/v1/user/', method: 'post' }, action: 'uuns', actionBack: 'uunsr', needToken: true }, // 读取通知
    { name: 'readAllUserNotifications', data: { url: '/v1/user/', method: 'post' }, action: 'rauns', actionBack: 'raunsr', needToken: true }, // 清除全部通知
  ],
  market: [
    //币种资料
    { name: 'coinInfo', data: { url: '/v1/common/', method: 'post' }, action: 'ci', actionBack: 'cir' },
    // 获取交易对名称以及id
    { name: 'pairInfo', data: { url: '/v1/common/', method: 'post' }, action: 'al', actionBack: 'alr' },
    { name: 'getRecommendCoins', data: { url: '/v1/common/', method: 'post' }, action: 'rc', actionBack: 'rcr' },
    // 添加收藏
    { name: 'changeFavorite', data: { url: '/v1/user/', method: 'post' }, action: 'cf', actionBack: 'cfr', needToken: true },
    // 获取收藏
    { name: 'getFavoriteList', data: { url: '/v1/user/', method: 'post' }, action: 'fl', actionBack: 'flr', needToken: true },
    // 获取交易对
    { name: 'getAllChg', data: { url: '/v1/common/', method: 'post' }, action: 'gac', actionBack: 'gacr' },
  ],
  asset: [
    // 获取交易对手续费5.16（pass）
    { name: 'getFee', data: { url: '/v1/common/', method: 'post' }, action: 'atp', actionBack: 'atpr' },
    // 获取我的QBT
    { name: 'getMyQbt', data: { url: '/v1/user/', method: 'post' }, action: 'gmq', actionBack: 'gmqr', needToken: true  },
    // 获取总资产(包含各个钱包币种的详细信息)4.1
    { name: 'totalAsset', data: { url: '/v1/property/', method: 'post' }, action: 'gp', actionBack: 'gpr', needToken: true },
    // 获取全部币种列表
    { name: 'getAllCoinList', data: { url: '/v1/common/', method: 'post' }, action: 'gai', actionBack: 'gair' },
    //24小时提现额度, 查询币种额度，4.2
    { name: 'balance', data: { url: '/v1/property/', method: 'post' }, action: 'gb', actionBack: 'gbr', needToken: true },
    // 充币地址查询4.4（pass）
    { name: 'chargeAddress', data: { url: '/v1/property/', method: 'post' }, action: 'ca', actionBack: 'car', needToken: true },
    // 充提记录4.10
    { name: 'history', data: { url: '/v1/property/', method: 'post' }, action: 'cr', actionBack: 'crr', needToken: true },
    // 提币矿工费4.5
    { name: 'minerFee', data: { url: '/v1/property/', method: 'post' }, action: 'mf', actionBack: 'mfr', needToken: true },
    // 提币地址查询4.7（pass）
    { name: 'extractAddress', data: { url: '/v1/property/', method: 'post' }, action: 'wa', actionBack: 'war', needToken: true },
    // 提交提币订单4.6（pass）
    { name: 'extractOrder', data: { url: '/v1/property/', method: 'post' }, action: 'wd', actionBack: 'wdr', needToken: true },
    // 撤销提币申请
    { name: 'cancelWithdraw', data: { url: '/v1/property/', method: 'post' }, action: 'cwd', actionBack: 'cwdr', needToken: true },
    //增加提币地址4.8(需要登录)（pass）
    { name: 'addAddress', data: { url: '/v1/property/', method: 'post' }, action: 'awa', actionBack: 'awar', needToken: true },
    // 删除提币地址4.9(需要登录)（pass）
    { name: 'delAddress', data: { url: '/v1/property/', method: 'post' }, action: 'dwa', actionBack: 'dwar', needToken: true },
    // 验证资金密码
    { name: 'verifyFundPass', data: { url: '/v1/user/', method: 'post' }, action: 'vf', actionBack: 'vfr', needToken: true },
  ],
  userOrder: [
    //当前订单
    { name: 'currentOrder', data: { url: '/v1/order/', method: 'post' }, action: 'co', actionBack: 'cor' , needToken: true },
    //历史订单
    { name: 'historyOrder', data: { url: '/v1/order/', method: 'post' }, action: 'cor', actionBack: 'corr' , needToken: true },
    //订单详情
    { name: 'orderDetail', data: { url: '/v1/order/', method: 'post' }, action: 'od', actionBack: 'odr' , needToken: true },
    //近期交易市场
    { name: 'recentOrderMarket', data: { url: '/v1/common/', method: 'post' }, action: 'rom', actionBack: 'romr' },
    //近期交易个人
    { name: 'recentOrderUser', data: { url: '/v1/order/', method: 'post' }, action: 'rou', actionBack: 'rour', needToken: true },
    //挂单列表
    { name: 'getDepth', data: { url: '/v1/common/', method: 'post' }, action: 'gd', actionBack: 'gdr' },
    //撤单操作
    { name: 'cancelOrder', data: { url: '/v1/order/', method: 'post' }, action: 'can', actionBack: 'canr', needToken: true },
    // 获取k线数据
    { name: 'getKline', data: { url: '/v1/common/', method: 'post' }, action: 'gk', actionBack: 'gkr' }

  ],
  deal: [
    //交易接口
    // {name: 'dealExchange', data: {url: '/order/', method: 'post'}, action: 'makeOrder', actionBack: 'makeOrderRes', needToken: true}
    { name: 'dealExchange', data: { url: '/v1/order/', method: 'post' }, action: 'mo', actionBack: 'mor',needToken: true },
    { name: 'getCoinMinTrade', data: { url: '/v1/common/', method: 'post'}, action: 'gcm', actionBack: 'gcmr'}
  ],
  activity: [
    // 获取邀请列表
    { name: 'getInvited', data: { url: '/v1/user/', method: 'post' }, action: 'gi', actionBack: 'gir', needToken: true },
    // 活动内容
    { name: 'getHomeBanner', data: { url: '/v1/common/', method: 'post' }, action: 'hb', actionBack: 'hbr' },
    // H5活动页，获取qbt活动余量
    { name: 'getQbtMargin', data: { url: '/v1/common/', method: 'post' }, action: 'qm', actionBack: 'qmr' },
    //H5活动页，领取qbt奖励
    { name: 'getAward', data: { url: '/v1/common/', method: 'post' }, action: 'in', actionBack: 'inr' }
  ],
  login: [
    { name: 'forgetLoginPass', data: { url: '/v1/common/', method: 'post' }, action: 'flp', actionBack: 'flpr' }, // 找回密码
    //H5活动页，领取qbt奖励
    { name: 'getAward', data: { url: '/v1/common/', method: 'post' }, action: 'in', actionBack: 'inr' }
  ]
}
