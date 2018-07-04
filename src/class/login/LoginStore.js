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
      this.controller.userLoginInfo(data.data)
      console.log('ccc1', data.data)
      // if (data.ret === 0) {
      //   window.location.href = '/'
      // } else {
      //   this.view.setState({showPopup: true, popType: 'tip3', popMsg: data.ret})
      // }
    })
    this.WebSocket.general.emit('login', obj)
  }
}
