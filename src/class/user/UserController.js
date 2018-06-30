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

  async getVerify(account, type, mode) { // 获取短信验证码
    if (this.view.state.verifyNum !== '获取验证码' && this.view.state.verifyNum !== 0) return
    this.view.setState({verifyNum: 60})
    this.countDown('verifyCountDown', 'verifyNum', this.view)
    this.getCode(account, mode, type)
  }

  clearVerify() { // 清除短信验证码
    this.countDownStop('verifyCountDown')
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

  async getUserCredits() { // 获取用户积分信息
    let userCredits = await this.store.userCredits();
    this.view.setState({userCredits})
  }

  async getGoogle() { // 获取谷歌密钥
     let googleSecret = await this.store.googleSecret();
     this.view.setState({googleSecret})
  }

  uploadInfo() { // 身份认证确认提交
    let typeIndexArr = [1, 3]
    this.store.Proxy.uploadUserAuth({
      "userId": this.store.state.userId,
      "firstName": this.view.state.firstNameValue, // 姓氏
      "lastName": this.view.state.lastNameValue, // 名字
      "name": `${this.view.state.firstNameValue}${this.view.state.lastNameValue}`, // 名字
      "type": typeIndexArr[this.view.state.selectIndex],  // 0：无 1：身份证 2：军官证 3：护照
      "number": this.view.state.numberValue,  // 证件号
      "image1": this.view.state.image1, // 正面照
      "image2": this.view.state.image2, // 背面照
      "image3": this.view.state.image3  // 手持照
    }).then(res => {
      console.log('提交结果', res)
      if(res.ret === 101) {
        this.view.setState({userAuth: {state: 3}})
      }
    }).catch(msg => {
      console.log('提交错误', msg)
    });
  }

  async setLoginPass(newpwd, againpwd) { // 设置登录密码
    let result = await this.store.Proxy.getLoginPwd({
      "userId": this.store.state.userId,
      "type": 0,// 0:设置密码 （不用传old_pass） 1:修改密码
      "oldPass": newpwd,
      "newPass": againpwd
    })
    console.log('设置密码', result)
  }

  async setFundPass(aaa, bbbb) { // 设置资金密码
    let result = await this.store.Proxy.setFundPwd({
      "userId": this.store.state.userId,
      "account": "oynix@foxmail.com", // 用户登录信息
      "mode": 1,// 0:phone 1:email // 用户登录信息
      "code": "343252", // 短信验证码
      "os": 3,// 1:android 2:iOS 3:browser
      "pass": "jsjsjsjsjsj"
    })
    console.log('设置密码', result)
  }

  async addIp() { // 添加ip白名单
    let result = await this.store.Proxy.addIp({
      "userId": this.store.state.userId,
      "IPAddress":"1.1.1.1"
    })
    console.log('添加ip', result)
  }

  async delIp() { // 删除ip白名单
    let result = await this.store.Proxy.deletIp({
      "userId": this.store.state.userId,
      "IPId":0,
      "IPAddress":10
    })
    console.log('删除ip', result)
  }

  async getCaptchaVerify() { // 获取图形验证码
    let captcha = await this.getCaptcha()
    this.view.setState({captcha: captcha.data, captchaId: captcha.id})
  }

  // 为其他模块提供接口
  // 密码间隔  设置间隔  两步验证  设置用户初始信息  userId  是否设置资金密码
  get userVerify() { // 提供两步认证信息, 是否设置资金密码
    let {  //0: 已设置资金密码 1: 未设置资金密码; 2 谷歌验证 1 邮件 3 短信 0 无
      fundPassVerify, loginVerify, withdrawVerify, fundPwd
    } = this.store.state.userInfo
    return {fundPassVerify, loginVerify, withdrawVerify, fundPwd}
  }

  get userToken() { // 提供用户token
    return this.store.state.token
  }

  get userId() { // 提供用户id
    return this.store.state.userId
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
      account,
      mode,//0 phone 1 email
      type,//0 登录; 1 修改密码; 2 支付; 3 绑定手机／邮箱; 4 ; 5 设置资金密码 6 修改资金密码 7登陆第二次验证 8提币
      "os": 3// 1 android 2 iOS 3 browser
    })
    console.log('发送验证码', result )
    return result
  }

  async getCaptcha() { // 获取图形验证码
    let result = await this.store.Proxy.getCaptcha()
    return result
  }

}