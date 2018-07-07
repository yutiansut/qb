import ExchangeStoreBase from '../ExchangeStoreBase'

export default class LoginStore extends ExchangeStoreBase {
  constructor() {
    super('login', 'general');
    this.state = {
      verifyNum: '获取验证码'
    }
    this.WebSocket.general.on('login', data => {
      // console.log('joinRoom getWebSocketData', data, this.controller)
      // console.log('ccc1', data.data)
      this.controller.userLoginInfo(data)

    })
  }

  login(obj) { // 登陆接口
    // console.log('getData', this.WebSocket)
    this.WebSocket.general.emit('login', obj)
  }

}
