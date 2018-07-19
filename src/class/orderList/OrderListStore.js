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
      room:'',
      tradePairId: 3
    }
    this.WebSocket.general.on('joinRoom', data => {
      // console.log('joinRoom getWebSocketData Recent', data, this.controller)
    })
    this.WebSocket.general.on('orderUpdate', data => {
      // console.log(this.controller,'orderUpdate getWebSocketData123456', data);
      this.state.recentItemSelect === 'mineLess' && this.controller.updateRecentOrder(data)
    })
  }

  get room() {
    return this.state.room
  }

  setRoom(room) {
    this.state.room = room
  }


  emitRecentOrderWs(from, to){
    this.WebSocket.general.emit('joinRoom', {from, to})
  }
  async getRecentOrder(isPersonal, id){
    let recentTradeListArr = isPersonal ? await this.Proxy.recentOrderUser(
        {
          "userId": this.controller.userController.userId,
          token: this.controller.userController.userToken,
          "tradePairId": id,
          "count": 10
        }
    ): await this.Proxy.recentOrderMarket(
        {
          "tradePairId": id,
          "count": 10
        }
    );
    this.state.recentTradeListArr = recentTradeListArr && recentTradeListArr.orders || [];
    return recentTradeListArr && recentTradeListArr.orders || []
  }
  // async getRecentOrderMarket(id){
  //   let recentTradeListArr = await this.Proxy.recentOrderMarket(
  //       {
  //         "tradePairId": id,
  //         "count": 10
  //       }
  //   );
  //   this.state.recentTradeListArr = recentTradeListArr && recentTradeListArr.orders || [];
  //   return recentTradeListArr && recentTradeListArr.orders || []
  // }
}