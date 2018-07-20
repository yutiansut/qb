import ExchangeStoreBase from '../ExchangeStoreBase'

let pushHistoryFlag = true

export default class LoginStore extends ExchangeStoreBase {
  constructor() {
    super('login', 'general');
    this.state = {}
    this.WebSocket.general.on('login', data => {
      // console.log('joinRoom getWebSocketData', data, this.controller)
      // console.log('ccc1', data.data)
      // console.log('登录', data)
      this.controller.userLoginInfo(data)
      if(data.ret === 0 && pushHistoryFlag ){
        this.WebSocket.general.pushWebsocketHistoryArr('login', {'token': this.Storage.userToken.get()})
      }
      this.controller.loginUpdata(data);
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

  async getAward(obj){
    // let result =
    return await this.Proxy.getAward(obj);
  }

}
