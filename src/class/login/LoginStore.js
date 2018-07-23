import ExchangeStoreBase from '../ExchangeStoreBase'

let pushHistoryFlag = true

export default class LoginStore extends ExchangeStoreBase {
  constructor() {
    super('login', 'general');
    this.state = {}
    let urlToken = window.location.pathname === "/whome/" && this.getQuery("token");
    this.WebSocket.general.on('login', data => {
      // console.log('joinRoom getWebSocketData', data, this.controller)
      // console.log('ccc1', data.data)
      // console.log('登录', data)
      this.controller.userLoginInfo(data, urlToken ? true : false);
      if(data.ret === 0 && pushHistoryFlag ){
        this.WebSocket.general.clearWebsocketHistoryArr('login')
        this.WebSocket.general.pushWebsocketHistoryArr('login', {'token': this.Storage.userToken.get(), os:3})
      }
      this.controller.loginUpdata(data);
    })
    this.WebSocket.general.on("loginOther", data => {
      console.log('a')
      this.WebSocket.general.clearWebsocketHistoryArr('login')
      console.log('b')
      let dataOther = Object.assign(data, {flag: 1})
      this.controller.loginUpdata(dataOther);
    });
    let token = urlToken || this.Storage.userToken.get();
    token && this.WebSocket.general.emit('login', { 'token': token, os:3})
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
