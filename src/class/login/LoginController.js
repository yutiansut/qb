import ExchangeControllerBase from '../ExchangeControllerBase'
import LoginStore from './LoginStore'

export default class LoginController extends ExchangeControllerBase {
  constructor(props) {
    super(props)
    this.store = new LoginStore()
    this.store.setController(this)
  }

  setView(view){
    super.setView(view);
    // return this.store.data
  }

  getVerify(account, mode, type) { // 获取验证码
    if (this.view.state.verifyNum !== '获取验证码' && this.view.state.verifyNum !== 0) return
    this.view.setState({verifyNum: 60})
    this.countDown('verifyCountDown', 'verifyNum', this.view)
    this.userController.getCode(account, mode, type)
  }

  clearVerify() { // 清除定时器
    this.countDownStop("verifyCountDown");
  }

  async getCaptchaVerify() { // 获取图形验证码
    let captcha = await this.userController.getCaptcha()
    this.view.setState({captcha: captcha.data, captchaId: captcha.id})
    // console.log('aaa 1', this.view.state, )
  }

  //登录
  login(account, code, type, mode, captchaId, captchaCode){
    let obj = {passCode:code, mode, captchaId, captchaCode, os:3};
    let keyArr = ['phone','email']
    obj[keyArr[type]] = account
    this.store.login(obj)
  }

  userLoginInfo(data) { // 登陆返回信息
    // console.log('ccc2', data, this.view.history)
    this.userController.getUserId(data.data)
    // console.log('this.view.history.goBack()', this.userController.store.state.token);
    // history.push()
    if (data.ret === 0) { // 登陆成功
      this.view.history.goBack()
      return
    }
    if ([2008, 2009, 2010].includes(data.ret)) { // 需要二次验证
      this.view.setState({showTwoVerify: true, verifyType: data.ret})
      return
    }
    this.view.setState({showPopup: true, popType: 'tip3', popMsg: data.msg})
  }
  clearLoginInfo() { // 退出登陆
    // console.log(111, this.Storage.userId.get())
    this.Storage.userId.removeAll()
    this.Storage.userToken.removeAll()
    this.Storage.userName.removeAll()
    window.location.href = '/home'
  }

  // 找回密码
  async forgetLoginPass(account, mode, code, newPass, captchaId, captchaCode) { // 找回密码
    let result = await this.store.Proxy.forgetLoginPass({
      account,
      mode, // 0 phone 1 email
      code,
      newPass,
      captchaId,
      captchaCode,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOiIyMjcxNzAxMzc0NTc4Mjc4NDAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tr6AowdEPkZJQRnib28_dfUjY_MTmI_aNu9UN-Cl5y0"
    })
    console.log('忘记密码', result)
    this.view.setState({showPopup: true, popType: result ? 'tip3': 'tip1', popMsg: result ? result.msg : "修改成功"})
  }

  async initLoginVerification() { // 获取手势验证
    let res = await this.store.Proxy.fetch('http://192.168.113.241:5555/vaptcha/challenge/', {method: 'get'})
    console.log('获取手势验证res', res)
    //根据服务端接口获取的vid与challenge创建实例
    //验证参数对象
    let config={
      vid:res.vid, //验证单元id, string, 必填
      challenge:res.challenge, //验证流水号, string, 必填
      container:"#vaptcha_container",//验证码容器, HTMLElement或者selector, 必填
      type:"click", //必填，表示点击式验证模式
      // type:"emb ed", //必填，表示点击式验证模式
      effect:'popup', //验证图显示方式, string, 可选择float, popup, 默认float
      https:false, //协议类型, boolean, 可选true, false,不填则自适应。
      color:"#0080D0", //按钮颜色, string
      outage:"http://192.168.113.241:5555/vaptcha/downtime/", //服务器端配置的宕机模式接口地址
      success:(token,challenge) => {//验证成功回调函数, 参数token, challenge 为string, 必填
        console.log(token,challenge)
        //执行表单验证失败时，需要重新初始化VAPTCHA
      },
      fail:() => {//验证失败回调函数
        console.log('error')
      }
    }
    //Vaptcha对象
    let obj;
    window.vaptcha(config,function(vaptcha_obj){
      obj = vaptcha_obj;
      obj.init();
    });
  }
}