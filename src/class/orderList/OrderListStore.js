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
      console.log(this.controller,'orderUpdate getWebSocketData', data);
      this.state.recentItemSelect === 'mineLess' && this.controller.updateRecentOrder(data)
    })
  }
  emitRecentOrderWs(){
    this.WebSocket.general.emit('joinRoom', {from: '', to: 'eth/btc-D6'})
  }
  async getRecentOrder(isPersonal, id){
    let recentTradeListArr = await this.Proxy.recentOrder(
        {
          "userId": this.controller.userController.userId,
          "tradePairId": id,
          isPersonal,
          "count": 10
        }
    );
    this.state.recentTradeListArr = recentTradeListArr && recentTradeListArr.orders || [];
    return recentTradeListArr && recentTradeListArr.orders || []
  }
}