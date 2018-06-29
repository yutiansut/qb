import ExchangeStoreBase from '../ExchangeStoreBase'

export default class UserStore extends ExchangeStoreBase {
  constructor() {
    super("user");
    this.state = {
      verifyNum: '获取验证码',
      userInfo: {}, // 用户基本信息
      userAuth: {}, // 认证信息
      loginList: [], // 登录日志
      userCredits: [], // 用户积分列表
      currentLogin: [], // 当前登录设备
      ipList: [], // 白名单列表
      googleSecret: '', // 谷歌验证密钥
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOiIyMjcxNzAxMzc0NTc4Mjc4NDAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tr6AowdEPkZJQRnib28_dfUjY_MTmI_aNu9UN-Cl5y0'
    }
    // this.preHandlerndler.push(this.userPreHandler)
    // this.installProxy("user", this.preHandler, this.afterHandler)
  }

  // userPreHandler(app, req) {
  //   // if (app.state.userInfo.loginState) {
  //   //   let headers = new Headers();
  //   //   headers.set('token', app.state.userInfo.token)
  //   //   req.data.headers = headers;
  //   // }
  //   // req.params = Object.assign({app:0}, req.params)
  //   console.log('用户', app, req)
  // }

  async userInfo() { // 获取用户信息
    let userInfo = await this.Proxy.getUserInfo({"userId": 1});
    this.state.userInfo = userInfo;
    return userInfo
  }

  async userAuth() { // 获取用户认证信息
    let userAuth = await this.Proxy.getUserAuth({"userId": 1});
    this.state.userAuth = userAuth;
    return userAuth
  }
  async currentLogin() { // 获取当前登录设备列表
    let currentLogin = await this.Proxy.getCurrentLogin({"userId": 1});
    if(currentLogin.errCode)
      currentLogin = []
    this.state.currentLogin = currentLogin;
    return currentLogin
  }

  async loginList() { // 获取登录日志
    let loginContent = await this.Proxy.getLoginList({"userId": 3, "page":0, "pageSize":10, "src":-1, "catalog":0});
    let loginlist = loginContent.data;
    console.log('denglu', loginlist)
    let catalogArr = ['登录日志', '注册日志', '第三方账号', '实名认证', '两步验证', '邮件验证', '手机号验证', '登录密码设置', '钱包日志', 'API设置', '资金密码设置', '系统日志', 'IP 白名单', '联系人管理']
    loginlist.forEach(v => {
      v.catalog = catalogArr[v.catalog]
    })
    console.log('denglu', loginlist)
    this.state.loginList = loginlist;
    return loginlist
  }getIpList

  async ipList() { // 获取ip白名单
    let ipList = await this.Proxy.getIpList({"userId": 3});
    console.log('白名单', ipList)
    this.state.ipList = ipList;
    return ipList
  }

  async userCredits() { // 获取用户积分
    let userCreditsCon = await this.Proxy.getUserCredits({"userId": 3, "page":0, "pageSize":10});
    let userCredits = userCreditsCon.list
    console.log('积分', userCredits)
    if(userCredits.errCode)
      userCredits = []
    this.state.userCredits = userCredits;
    return userCredits
  }

  async googleSecret() { // 获取谷歌验证密钥
    let googleSecret = await this.Proxy.getGoogle({"userId": 1})
    this.state.googleSecret = googleSecret;
    return googleSecret
  }

}
