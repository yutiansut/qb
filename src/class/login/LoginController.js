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

  async getCaptchaVerify() { // 获取图形验证码
    let captcha = await this.userController.getCaptcha()
    console.log('aaa 0', captcha)
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

  userLoginInfo(data) {
    this.userController.getUserId(data)
    console.log('ccc2', data, this.view.history)
    // history.push()
    // this.view.history.push('/home')
    this.view.history.goBack('/home')
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