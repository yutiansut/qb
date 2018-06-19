import ExchangeStoreBase from '../ExchangeStoreBase'

export default class LoginStore extends ExchangeStoreBase {
  constructor() {
    super();
    this.state = {
      verifyNum: '获取验证码'
    }
  }
}