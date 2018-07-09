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
      // console.log('登录', data)
      this.controller.userLoginInfo(data)
      data.ret === 0 && this.WebSocket.general.pushWebsocketHistoryArr('login', {'token': this.Storage.userToken.get()})
    })
    this.Storage.userToken.get() && this.WebSocket.general.emit('login', {'token': this.Storage.userToken.get()})
  }

  login(obj) { // 登陆接口
    // console.log('getData', this.WebSocket)
    this.WebSocket.general.emit('login', obj)
  }

  loginOutRemind() { // 退出登陆
    this.WebSocket.general.emit('loginOut')
  }
}
