import ExchangeStoreBase from '../ExchangeStoreBase'

export default class LoginStore extends ExchangeStoreBase {
  constructor() {
    super('login', 'general');
    this.state = {
      verifyNum: '获取验证码'
    }
  }

  login(obj) {
    console.log('getData', this.WebSocket)
    this.WebSocket.general.on('login', data => {
      console.log('joinRoom getWebSocketData', data, this.controller)
      // this.controller.updateRecommend(data.data)
      // this.recommendData = data.data
    })
    this.WebSocket.general.emit('login', obj)
  }
}