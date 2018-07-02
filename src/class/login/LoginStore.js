import ExchangeStoreBase from '../ExchangeStoreBase'

export default class LoginStore extends ExchangeStoreBase {
  constructor() {
    super('login', 'general');
    this.state = {
      verifyNum: '获取验证码'
    }
  }

  login() {
    console.log('getData', this.WebSocket)
    this.WebSocket.general.emit('login', {phone:'', code: '', os:3, version:1, mode:0})
    this.WebSocket.general.on('login', data => {
      console.log('joinRoom getWebSocketData', data, this.controller)
      this.controller.updateRecommend(data.data)
      this.recommendData = data.data
    })
    this.WebSocket.general.on('tradeDepth', data => {
      console.log('tradeDepth getWebSocketData', data)
      // this.controller.updateRecommend(data.data)
      // this.recommendData = data.data
    })
  }
}