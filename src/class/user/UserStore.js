import ExchangeStoreBase from '../ExchangeStoreBase'
import Sleep from "../../core/libs/Sleep";
// import JsonBig from "json-bigint"
// uid : 232601699242483712, 232602529072947201
export default class UserStore extends ExchangeStoreBase {
  constructor() {
    super("user");
    this.state = {
      // userId: JSON.parse("232602529072947201"),
      // userId: JSON.parse("232602529072947201"),
      // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOiIyMjcxNzAxMzc0NTc4Mjc4NDAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tr6AowdEPkZJQRnib28_dfUjY_MTmI_aNu9UN-Cl5y0',
      userId: "",
      token: "",
      userName: "",
      verifyNum: '获取验证码',
      userInfo: {}, // 用户基本信息
      userAuth: {}, // 认证信息
      userCreditsNum: "", // 用户积分
      loginList: [], // 登录日志
      userCredits: [], // 用户积分列表
      currentLogin: [], // 当前登录设备
      ipList: [], // 白名单列表
      googleSecret: '', // 谷歌验证密钥

      // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOiIyMjcxNzAxMzc0NTc4Mjc4NDAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tr6AowdEPkZJQRnib28_dfUjY_MTmI_aNu9UN-Cl5y0'
    }
    this.state.token && this.userInfo()
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

  userLogin(data) { // 获取登录信息
    console.log('ccc4', data)
    this.state.userId = data && data.userId
    this.state.token = data && data.token
    this.state.userName = data && data.userName
    data && this.userInfo()
    console.log('loginUser', this.state.userId, this.state.token, this.userInfo())
  }

  //清除用户信息
  clearUserInfo() {
    this.Storage.userId.removeAll()
    // await Sleep(100)
    this.Storage.userToken.removeAll()
    // await Sleep(100)
    this.Storage.userName.removeAll()
    // await Sleep(100)
    this.state.userId = ''
    this.state.token = ''
    this.state.userName = ''
  }

  // 提供基础数据
  get uid(){ // 提供用户id
    this.Storage.userId.set(this.state.userId)
    return this.Storage.userId.get() || this.state.userId;
  }

  get token() { // 提供用户token
    this.Storage.userToken.set(this.state.token)
    return this.Storage.userToken.get() || this.state.token;
  }

  get name() { // 提供用户姓名
    this.Storage.userName.set(this.state.userName)
    return this.Storage.userName.get() || this.state.userName;
  }

  async userInfo() { // 获取用户信息
    let userInfo = await this.Proxy.getUserInfo({"userId": this.uid, "token": this.token});
    this.state.userInfo = userInfo;
    return userInfo
  }

  async userAuth() { // 获取用户认证信息
    let userAuth = await this.Proxy.getUserAuth({"uid": this.uid, "token": this.token});
    this.state.userAuth = userAuth;
    return userAuth
  }


  async userCreditsNum() { // 获取用户积分
    let userCreditsCon = await this.Proxy.getUserCreditsNum({"userId": this.uid, "token": this.token});
    let userCreditsNum = userCreditsCon.credits;
    this.state.userCreditsNum = userCreditsNum;
    return userCreditsNum
  }

  async currentLogin() { // 获取当前登录设备列表
    let currentLoginCon = await this.Proxy.getCurrentLogin({"userId": this.uid, "token": this.token});
    let currentLogin = currentLoginCon ? currentLoginCon.list : []
    // if(currentLogin.errCode)
    //   currentLogin = []
    console.log('当前登录', currentLoginCon)
    this.state.currentLogin = currentLogin
    return currentLogin
  }

  async loginList() { // 获取登录日志
    let loginContent = await this.Proxy.getLoginList({"userId": this.uid, "page":0, "pageSize":10, "src":-1, "catalog":0, "token": this.token});
    let loginlist = loginContent.data ? loginContent.data : [];
    // console.log('denglu', loginContent)
    let catalogArr = ['登录日志', '注册日志', '第三方账号', '实名认证', '两步验证', '邮件验证', '手机号验证', '登录密码设置', '钱包日志', 'API设置', '资金密码设置', '系统日志', 'IP 白名单', '联系人管理']
    loginlist.length && loginlist.forEach(v => {
      v.catalog = catalogArr[v.catalog]
    })
    // console.log('denglu', loginlist)
    this.state.loginList = loginlist;
    return loginlist
  }


  async ipList() { // 获取ip白名单
    let ipListCon = await this.Proxy.getIpList({"userId": this.uid, "token": this.token});
    let ipList = ipListCon.data
    console.log('白名单', ipList)
    this.state.ipList = ipList;
    return ipList
  }

  async userCredits() { // 获取用户积分
    let userCreditsCon = await this.Proxy.getUserCredits({"userId": this.uid, "page":0, "pageSize":10, "token": this.token});
    let userCredits = userCreditsCon.list ? userCreditsCon.list : []
    console.log('积分', userCredits)
    // if(userCredits.errCode)
    //   userCredits = []
    this.state.userCredits = userCredits;
    return userCredits
  }

  async googleSecret() { // 获取谷歌验证密钥
    let googleSecret = await this.Proxy.getGoogle({"userId": this.uid, "token": this.token})
    this.state.googleSecret = googleSecret;
    return googleSecret
  }

  async uploadImg(file){ // 上传图片
    let uploadImg = new FormData();
    uploadImg.append("uploadimage", file);
    // headers = new Headers(),
    // headers.set('Token', this.token);
    // console.log(headers)
    // console.log('uploadImg', uploadImg, file)
    return await fetch("http://192.168.55.105/usupload/", {
      method: 'Post',
      body: uploadImg,
      // headers,
      // credentials: 'include'
    })
  }
}
