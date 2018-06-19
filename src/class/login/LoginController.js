import ExchangeControllerBase from '../ExchangeControllerBase'
import LoginStore from './LoginStore'

export default class LoginController extends ExchangeControllerBase {
  constructor(props) {
    super(props)
    this.store = new LoginStore()
  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }

  async getVerify() {
    if (this.view.state.verifyNum !== '获取验证码' && this.view.state.verifyNum !== 0) return
    this.view.setState({verifyNum: 5})
    this.countDown('verifyCountDown', 'verifyNum', this.view)
  }
}