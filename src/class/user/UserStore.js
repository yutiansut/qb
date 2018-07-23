import ExchangeStoreBase from '../ExchangeStoreBase'
import Sleep from "../../core/libs/Sleep";
// import JsonBig from "json-bigint"
// uid : 232601699242483712, 232602529072947201
export default class UserStore extends ExchangeStoreBase {
  constructor() {
    super("user", "general");
    this.state = {
      // userId: JSON.parse("232602529072947201"),
      // userId: JSON.parse("232602529072947201"),
      // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOiIyMjcxNzAxMzc0NTc4Mjc4NDAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tr6AowdEPkZJQRnib28_dfUjY_MTmI_aNu9UN-Cl5y0',
      userId: "",
      token: "",
      userName: "",
      // verifyNum: "",
      userInfo: {}, // 用户基本信息
      userAuth: {}, // 认证信息
      userCreditsNum: "", // 用户积分
      loginList: [], // 登录日志
      userCredits: {}, // 用户积分列表
      currentLogin: [], // 当前登录设备
      ipList: [], // 白名单列表
      googleSecret: '', // 谷歌验证密钥


      // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOiIyMjcxNzAxMzc0NTc4Mjc4NDAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tr6AowdEPkZJQRnib28_dfUjY_MTmI_aNu9UN-Cl5y0'
    }
    this.state.token && this.userInfo()

    // websocket监听退出消息
    this.WebSocket.general.on("login", data => {
      // console.log("login-user-websocket", data);
      if(data.ret === 2006) {
        this.clearUserInfo()
      }
    });
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
  userListener(){
    this.Loop["userListener"].clear();
    this.Loop["userListener"].set(()=>{
      JSON.stringify(this.state.userId) !== JSON.stringify(this.Storage.userId.get()) && window.location.reload();
    },1000);
    this.Loop["userListener"].start();
  }
  async userLogin(data) { // 获取登录信息
    this.state.userId = data && data.userId
    this.state.token = data && data.token
    this.state.userName = data && data.userName
    this.Storage.userToken.set(data && data.token);
    this.Storage.userId.set(data && data.userId);
    this.Storage.userName.set(data && data.userName);
    // data && await this.userInfo()
    // data && await this.userAuth()
    data && data.isNew && this.getAward()
    // console.log('loginUser', this.state.userId, this.state.token, this.userInfo())
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
    // this.Storage.userId.set(this.state.userId)
    return this.state.userId || this.Storage.userId.get();
  }

  get token() { // 提供用户token
    // this.Storage.userToken.set(this.state.token)
    return this.state.token || this.Storage.userToken.get();
  }

  get name() { // 提供用户姓名
    // this.Storage.userName.set(this.state.userName)
    return this.state.userName || this.Storage.userName.get();
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
    // console.log('当前登录', currentLoginCon)
    this.state.currentLogin = currentLogin
    return currentLogin
  }

  async loginList() { // 获取登录日志
    let loginContent = await this.Proxy.getLoginList({"userId": this.uid, "page":0, "pageSize":10, "src":-1, "catalog":0, "token": this.token});
    let loginlist = loginContent.data ? loginContent.data : [];
    // console.log('denglu', loginContent)
    // let catalogArr = ['登录日志', '注册日志', '第三方账号', '实名认证', '两步验证', '邮件验证', '手机号验证', '登录密码设置', '钱包日志', 'API设置', '资金密码设置', '系统日志', 'IP 白名单', '联系人管理']
    let catalogArr = [
        this.controller.view.intl.get("user-log-1"),
        this.controller.view.intl.get("user-log-2"),
        this.controller.view.intl.get("user-log-3"),
        this.controller.view.intl.get("user-name"),
        this.controller.view.intl.get("twoStep"),
        this.controller.view.intl.get("user-log-4"),
        this.controller.view.intl.get("user-log-5"),
        this.controller.view.intl.get("user-log-6"),
        this.controller.view.intl.get("user-log-7"),
        this.controller.view.intl.get("user-log-8"),
        this.controller.view.intl.get("user-log-9"),
        this.controller.view.intl.get("user-log-10"),
        this.controller.view.intl.get("user-ipWhite"),
        this.controller.view.intl.get("user-log-11")];
    loginlist.length && loginlist.forEach(v => {
      v.catalog = catalogArr[v.catalog]
    })
    // console.log('denglu', loginlist)
    this.state.loginList = loginlist;
    return loginlist
  }

  async userCredits(page) { // 获取用户积分列表
    let userCreditsCon = await this.Proxy.getUserCredits({"userId": this.uid, page, "pageSize":10, "token": this.token});
    // let userCredits = userCreditsCon.list ? userCreditsCon.list : []
    //['每日登录', 'CNY充值', 'BTC充值', '交易额', '网站改进意见采纳', '注册并实名认证', '邮箱认证', '绑定手机', '添加谷歌验证', '首次充值BTC', '首次充值CNY', '首次交易', 'USD充值', '首次充值USD']
    let userCreditsArr = [
      this.controller.view.intl.get("user-credits1"),
      this.controller.view.intl.get("user-credits2"),
      this.controller.view.intl.get("user-credits3"),
      this.controller.view.intl.get("user-credits4"),
      this.controller.view.intl.get("user-credits5"),
      this.controller.view.intl.get("user-credits6"),
      this.controller.view.intl.get("user-credits7"),
      this.controller.view.intl.get("user-credits8"),
      this.controller.view.intl.get("user-credits9"),
      this.controller.view.intl.get("user-credits10"),
      this.controller.view.intl.get("user-credits11"),
      this.controller.view.intl.get("user-credits12"),
      this.controller.view.intl.get("user-credits13"),
      this.controller.view.intl.get("user-credits14"),
      this.controller.view.intl.get("user-credits15"),
    ]
    // console.log('积分列表', userCreditsCon)
    userCreditsCon && userCreditsCon.list.forEach(v => {
      v.operation = userCreditsArr[v.id]
    })
    // if(userCredits.errCode)
    //   userCredits = []
    this.state.userCredits = userCreditsCon;
    return userCreditsCon
  }

  async ipList() { // 获取ip白名单
    let ipListCon = await this.Proxy.getIpList({"userId": this.uid, "token": this.token});
    let ipList = ipListCon.data
    // console.log('白名单', ipList)
    this.state.ipList = ipList;
    return ipList
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
    return await fetch("http://192.168.55.105/v1/usupload/", {
      method: 'Post',
      body: uploadImg,
      // headers,
      // credentials: 'include'
    })
  }

  async getAward(){
    await this.userInfo();
    let account = this.state.userInfo.phone || this.state.userInfo.email
    // console.log('getAward 0', account)
    let result = await this.Proxy.getAward({
      token:this.token,
      account
    })
    // console.log('getAward 1', result)
    return result
  }

  async getQbtTrade(){
    return this.Proxy.getQbtTrade()
  }

}
