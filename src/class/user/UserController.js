import ExchangeControllerBase from '../ExchangeControllerBase'
import UserStore from './UserStore'

export default class UserController extends ExchangeControllerBase {
  constructor(props) {
    super(props)
    this.store = new UserStore()
  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }

  checkNum(num) { // 进度条长度获取
    let scoreArr = [0, 10000, 50000, 100000, 200000, 500000, 500000000000000000], sum = 0, index = 0, start = 0, end = 0;
    if(!(scoreArr.length > 0)){
      return;
    }
    // if (num > 500000) { // 超过500000会出问题
    //   index = 6
    //   start = scoreArr[5]
    //   end = num
    //   return {checkStart: start, checkEnd: end, checkIndex: index}
    // }
    for (let i = 0; i < scoreArr.length; i++) {
      sum += scoreArr[i];
      if(sum >= num){
        index = i
        start = scoreArr[i-1]
        end = scoreArr[i]
        return {checkStart: start, checkEnd: end, checkIndex: index}
      }
    }
  }

  async getVerify(account, mode, type) { // 获取短信验证码
    if (this.view.state.verifyNum !== '获取验证码' && this.view.state.verifyNum !== 0) return
    this.view.setState({verifyNum: 60})
    this.countDown('verifyCountDown', 'verifyNum', this.view)
    this.getCode(account, mode, type)
  }

  clearVerify() { // 清除短信验证码
    this.countDownStop('verifyCountDown')
  }
  // 从登录接口获取信息
  getUserId(data) {
    console.log('ccc3', data)
    this.store.userLogin(data)
    console.log('this.view',this.view)
    // this.view.history.goBack()
  }

  // 接口调用部分
  async initData() { // 获取用户信息
    let userInfo = await this.store.userInfo();
    let obj = this.checkNum(userInfo.credits)
    this.view.setState({userInfo: userInfo, scoreEnd: obj.checkEnd, scoreStart: obj.checkStart,  scoreIndex: obj.checkIndex})
  }

  async getUserAuthData() { // 获取用户认证信息
    let userAuth = await this.store.userAuth();
    this.view.setState({userAuth})
  }

  async getCurrentLogin() { // 获取当前登录设备
    let currentLogin = await this.store.currentLogin();
    this.view.setState({currentLogin})
  }

  async getLoginList() { // 获取登录记录
    let loginList = await this.store.loginList();
    this.view.setState({loginList})
  }

  async getIpList() { // 获取ip白名单
    let ipList = await this.store.ipList();
    console.log('ip白名单', ipList)
    this.view.setState({ipList})
  }

  async getUserCreditsNum() { // 获取用户积分信息
    let userCreditsNum = await this.store.userCreditsNum();
    this.view.setState({userCreditsNum})
  }

  async getUserCredits() { // 获取用户积分信息列表
    let userCredits = await this.store.userCredits();
    this.view.setState({userCredits})
  }

  async getGoogle() { // 获取谷歌密钥
     let googleSecret = await this.store.googleSecret();
     this.view.setState({googleSecret})
  }

  async uploadImg(file) { // 上传图片
    let res = await this.store.uploadImg(file),
      result = await res.text()
    // console.log(res, result)
    let imgUrl = `image${this.view.state.imgUrlIndex + 1}`, obj={}
    obj[imgUrl] = result
    this.view.setState(obj)
  }

  async uploadInfo() { // 身份认证确认提交
    let typeIndexArr = [1, 3]
    let result = await this.store.Proxy.uploadUserAuth({
      "userId": this.store.state.userId,
      "firstName": this.view.state.firstNameValue, // 姓氏
      "lastName": this.view.state.lastNameValue, // 名字
      "name": `${this.view.state.firstNameValue}${this.view.state.lastNameValue}`, // 名字
      "type": typeIndexArr[this.view.state.selectIndex],  // 0：无 1：身份证 2：军官证 3：护照
      "number": this.view.state.numberValue, // 证件号
      "image1": this.view.state.image1, // 正面照
      "image2": this.view.state.image2, // 背面照
      "image3": this.view.state.image3  // 手持照
    })
    console.log('上传照片', result)
    this.view.setState({remindPopup: true, popType: result && result.ret === 101 ? 'tip1': 'tip3', popMsg: result && result.ret === 101 ? "上传成功" : result.msg})
    result.ret === 101 && this.view.setState({userAuth: {state: 3}})
  }

  async bindUser(account, mode, code, captchaId, captchaCode) { // 绑定邮箱／手机号
    let result = await this.store.Proxy.bindUser({
      "userId": this.store.state.userId,
      account,// 手机号或邮箱
      mode,// 0:phone 1:email
      code,
      captchaId, // 图形验证码id，没有就传空
      captchaCode, // 图形验证码，没有就传空
      "os": 3, // 1:android 2:iOS 3:borwser
    })
    this.view.setState({remindPopup: true, popType: result.errCode ? 'tip3': 'tip1', popMsg: result.msg ? result.msg : "绑定成功"})
    console.log('绑定手机号／邮箱', result)
  }

  async setLoginPass(oldPwd, newPwd, type) { // 设置登录密码
    let result = await this.store.Proxy.getLoginPwd({
      "userId": this.store.state.userId,
      oldPwd,
      newPwd,
      type,// 0:设置密码 （不用传old_pass） 1:修改密码
    })
    this.view.setState({
      remindPopup: true,
      popType: result && result.errCode ? 'tip3': 'tip1',
      popMsg: result && result.msg ? result.msg : "设置成功",
      showSet: result && result.errCode ? true : false
    })
    console.log('设置密码', result)
  }

  async setFundPass(account, mode, pass, captchaCode, captchaId, code) { // 设置资金密码
    let result = await this.store.Proxy.setFundPwd({
      "userId": this.store.state.userId,
      account,
      mode, // 0:phone 1:email
      pass,
      captchaCode, // 图形验证码，没有就传空
      captchaId, // 图形验证码id，没有就传空
      code,
      "os": 3, // 1:android 2:iOS 3:browser
    })
    console.log('设置密码', result)
  }

  async modifyFundPwd(account, mode, oldPass, newPass, captchaCode, captchaId, code) { // 修改资金密码
    let result = await this.store.Proxy.setFundPwd({
      "userId": this.store.state.userId,
      account,
      mode, // 0:phone 1:email 2:google
      oldPass,
      newPass,
      captchaCode, // 图形验证码，没有就传空
      captchaId, // 图形验证码id，没有就传空
      code,
      "os": 3, // 1:android 2:iOS 3:browser
    })
    console.log('设置密码', result)
  }

  async setTwoVerify(account, mode, code, picCode, picId, position, verifyType) { // 修改两步认证
    let twoVerifyArr = ['loginVerify', 'withdrawVerify', 'fundPassVerify'], changeVerifyArr = [3, 1, 0, 2];
    let twoVerifyState = twoVerifyArr[position-1]
    let twoVerifyUser = {}
    twoVerifyUser[twoVerifyState] = verifyType
    let userInfo = Object.assign(this.view.state.userInfo, twoVerifyUser)
    let verifyList = this.view.state.verifyList
    verifyList[position-1].contentList.forEach(v=>v.flag=false)
    verifyList[position-1].contentList[changeVerifyArr[verifyType]].flag = true
    let result = await this.store.Proxy.setTwoVerify({
      "userId": this.store.state.userId,
      account,
      mode, //0手机 1邮箱 2Google
      code, //验证码
      "os": 3, // 1:android 2:iOS 3:borwser
      picCode,//图形验证码
      picId,//验证码图片的id
      position,//修改的位置 1登陆   2提现   3资金密码
      verifyType//2谷歌验证 1邮件  3短信  0无
    })
    this.view.setState({
      remindPopup: true,
      popType: result.errCode ? 'tip3': 'tip1',
      popMsg: result.errCode ? result.msg : '修改成功',
      userInfo,
      showChange: result.errCode ? true : false,
      verifyList
    })
    console.log('修改两步认证', result)
  }

  async addIp(ipAdd) { // 添加ip白名单
    if (this.view.state.ipValue === '') return
    let result = await this.store.Proxy.addIp({
      "userId": this.store.state.userId,
      "IPAddress":ipAdd
    })
    !result && this.view.setState({remindPopup: true})
    console.log('添加ip', result)
  }

  async delIp(ipId, iPAdd) { // 删除ip白名单
    let result = await this.store.Proxy.deletIp({
      "userId": this.store.state.userId,
      "IPId": ipId,
      "IPAddress": iPAdd
    })
    !result && this.view.setState({remindPopup: true})
    console.log('删除ip', result)
  }

  async getCaptchaVerify() { // 获取图形验证码
    let captcha = await this.getCaptcha()
    this.view.setState({captcha: captcha.data, captchaId: captcha.id})
  }

  async setGoogleVerify(code) { // 验证谷歌验证码
    let result = await this.store.Proxy.setGoogleVerify({
      "userId": this.store.state.userId,
      code
    })
    this.view.setState({remindPopup: true, popType: result.errCode ? 'tip3': 'tip1', popMsg: result.msg})
    console.log('验证谷歌', result)
  }

  // 为其他模块提供接口
  // 密码间隔  设置间隔  两步验证  设置用户初始信息  userId  是否设置资金密码
  get userVerify() { // 提供两步认证信息, 是否设置资金密码
    let {  //0: 已设置资金密码 1: 未设置资金密码; 2 谷歌验证 1 邮件 3 短信 0 无
      fundPassVerify, loginVerify, withdrawVerify, fundPwd
    } = this.store.state.userInfo
    console.log(this.store.state)
    return {fundPassVerify, loginVerify, withdrawVerify, fundPwd}
  }

  get userInfo() { // 提供用户手机号或者邮箱
    let {  //0: 已设置资金密码 1: 未设置资金密码; 2 谷歌验证 1 邮件 3 短信 0 无
      email, phone
    } = this.store.state.userInfo
    return { email, phone }
  }

  get userAuthVerify() { // 提供用户是否实名
    let {  // 0：未认证 1：已通过  2：认证失败 3：认证中
      state
    } = this.store.state.userAuth
    return {state}
  }

  get userToken() { // 提供用户token
    return this.store.state.token
  }

  get userId() { // 提供用户id
    return this.store.state.userId
  }

  get userName() { // 提供用户姓名
    return this.store.state.userName
  }

  async setFundPwdInterval(type, pwd) { // 设置资金密码输入间隔
    let result = await this.store.Proxy.setFundPwdSuspend({
      "userId": this.store.state.userId,
      "interval": type, // 0:每次都需要密码 1:2小时内不需要 2:每次都不需要
      "fundPass": pwd
    })
    console.log('设置资金密码', result)
    return result
  }

  async getFundPwdInterval(userId) { // 查看资金密码输入间隔
    let result = await this.store.Proxy.setFundPwdSuspend({
      "userId": userId
    })
    console.log('查看资金密码', result)
    return result
  }

  async getCode(account, mode, type) { // 获取短信验证码
    let result = await this.store.Proxy.getVerifyCode({
      account, // 手机号或者邮箱
      mode,//0 phone 1 email
      type,//0 登录; 1 修改密码; 2 支付; 3 绑定手机／邮箱; 5 设置资金密码 6 修改资金密码 7登陆第二次验证 8提币 9二次验证
      "os": 3// 1 android 2 iOS 3 browser
    })
    console.log('发送验证码', result, account, mode, type )
    return result
  }

  async getCaptcha() { // 获取图形验证码
    let result = await this.store.Proxy.getCaptcha()
    return result
  }

}