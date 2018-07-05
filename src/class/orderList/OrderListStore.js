import ExchangeStoreBase from '../ExchangeStoreBase'

export default class OrderListStore extends ExchangeStoreBase {
  constructor(modelName, connectName) {
    super(modelName, connectName)
    this.state = {
      recentTradeListArr: [],
      recentItemSelect: 'mineLess',
      unitsType: '',
      market:'',
      coin:'',
      tradePairId: 3
    }
    // this.WebSocket.general.on('joinRoom', data => {
    //   console.log('joinRoom getWebSocketData Recent', data, this.controller)
    // })
    this.WebSocket.general.on('orderUpdate', data => {
      console.log(this.controller,'orderUpdate getWebSocketData', data)
    })
  }
  emitRecentOrderWs(){
    this.WebSocket.general.emit('joinRoom', {from: '', to: 'eth/btc-D6'})
  }
  async getRecentOrder(isPersonal){
    let recentTradeListArr = await this.Proxy.recentOrder(
        {
          "userId": JSON.parse('232601699242483712'),
          "tradePairId": this.state.tradePairId,
          isPersonal,
          "count": 10
        }
    );
    this.state.recentTradeListArr = recentTradeListArr.orders;
    return recentTradeListArr.orders
  }
}