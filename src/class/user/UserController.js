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
    console.log(6789,this.store.state.verifyNum, this.view.state.verifyNum)
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
}