import ExchangeControllerBase from '../ExchangeControllerBase'
import UserStore from './UserStore'

export default class UserController extends ExchangeControllerBase {
  constructor(props) {
    super(props)
    this.store = new UserStore()
    console.log(1111, this.store)
  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }

  async getVerify() {
    if (this.view.state.verifyNum !== '获取验证码' && this.view.state.verifyNum !== 0) return
    // console.log(this)
    // console.log(this.store.Proxy)
    // console.log(this.view)
    // console.log(this.view.state.count)
    // let data = await this.store.Proxy.topCurrency()
    this.view.setState({verifyNum: 5})
    this.countDown('verifyCountDown', 'verifyNum', this.view)
    console.log(6789,this.store.state.verifyNum, this.view.state.verifyNum)
  }


}