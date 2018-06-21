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
    let scoreArr = [0, 10000, 50000, 100000, 200000, 500000], sum = 0, index = 0, start = 0, end = 0;
    if(!(scoreArr.length > 0)){
      return;
    }
    if (num > 500000) { // 超过500000会出问题
      index = 6
      start = scoreArr[5]
      end = num
      return {checkStart: start, checkEnd: end, checkIndex: index}
    }
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

  async getVerify() { // 获取短信验证码
    if (this.view.state.verifyNum !== '获取验证码' && this.view.state.verifyNum !== 0) return
    this.view.setState({verifyNum: 5})
    this.countDown('verifyCountDown', 'verifyNum', this.view)
    let result = await this.store.Proxy.userInfo({"action": "get_code",
      "data": {
        "account": "oynix@foxmail.com",
        "mode": 1,//0 phone 1 email
        "type": 5,//0 登录; 1 修改密码; 2 支付; 3 绑定手机／邮箱; 4 ; 5 设置资金密码 6 修改资金密码
        "os": 3// 1 android 2 iOS 3 browser
      }
    })
    console.log('发送验证码', result )

  }
  clearVerify() { // 清除短信验证码
    this.countDownStop('verifyCountDown')
  }
  async initData() { // 获取用户信息
    let userInfo = await this.store.userInfo();
    let obj = this.checkNum(userInfo.data.credits)
    this.view.setState({userInfo: userInfo.data, scoreEnd: obj.checkEnd, scoreStart: obj.checkStart,  scoreIndex: obj.checkIndex})
  }

  async getUserAuthData() { // 获取用户认证信息
    let userAuth = await this.store.userAuth();
    this.view.setState({userAuth: userAuth.data})
  }

  uploadInfo() { // 身份认证确认提交
    let  typeIndexArr = [1, 3]
    this.store.Proxy.userInfo({"action": "upload_auth",
      "data": {
        "uid": 1,
        "first_name": this.view.state.firstNameValue, // 姓氏
        "last_name": this.view.state.lastNameValue, // 名字
        "name": `${this.view.state.firstNameValue}${this.view.state.lastNameValue}`, // 名字
        "type": typeIndexArr[this.view.state.selectIndex],  // 0：无 1：身份证 2：军官证 3：护照
        "number": this.view.state.numberValue,  // 证件号
        "image1": this.view.state.image1, // 正面照
        "image2": this.view.state.image2, // 背面照
        "image3": this.view.state.image3  // 手持照
      }
    }).then(res => {
      console.log('提交结果', res)
      if(res.ret === 101) {
        this.view.setState({userAuth: {state: 3}})
      }
    }).catch(msg => {
      console.log('提交错误', msg)
    });
  }

  async setLoginPass(aaa, bbbb) { // 设置登录密码
    let result = await this.store.Proxy.userInfo({"action": "modify_login_pwd",
      "data": {
        "uid": 1,
        "type": 0,// 0:设置密码 （不用传old_pass） 1:修改密码
        "old_pass": aaa,
        "new_pass": bbbb
      }
    })
    console.log('设置密码', result)
  }

  async setFundPass(aaa, bbbb) { // 设置资金密码
    let result = await this.store.Proxy.userInfo({"action": "set_fund_pass",
      "data": {
        "uid": 1,
        "account": "oynix@foxmail.com", // 用户登录信息
        "mode": 1,// 0:phone 1:email // 用户登录信息
        "code": "343252", // 短信验证码
        "os": 3,// 1:android 2:iOS 3:browser
        "pass": "jsjsjsjsjsj"
      }
    })
    console.log('设置密码', result)
  }
}