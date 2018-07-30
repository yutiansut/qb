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
    })
    this.WebSocket.general.on('orderUpdate', data => {
      let dataAf = {
        orders: data.ors.map(v => {
          return {
            "dealTime": v.t,
            "price": v.p,
            "priceCN": v.pc,
            "priceEN": v.pe,
            "volume": v.vol,
            "orderType": v.ty //0买1卖
          }
        })
      }
      this.state.recentItemSelect === 'mineLess' && this.controller.updateRecentOrder(dataAf)
    })
  }

  get room() {
    return this.state.room
  }

  setRoom(room) {
    this.state.room = room
  }


  emitRecentOrderWs(f, t){
    this.WebSocket.general.emit('joinRoom', {f, t})
  }
  async getRecentOrder(isPersonal, id){
    let recentTradeListArr = isPersonal ? await this.Proxy.recentOrderUser(
        {
          token: this.controller.userController.userToken,
          id: id,
          c: 10
        }
    ): await this.Proxy.recentOrderMarket(
        {
          id: id,
          a: 10
        }
    );
    let recentTradeListArrAf = isPersonal ? {
      orders: recentTradeListArr && recentTradeListArr.ors && recentTradeListArr.ors.map(v => {
        return{
          "orderTime": v.t,
          "avgPrice": v.ap,
          "avgPriceCN": v.apc,
          "avgPriceEN": v.ape,
          "dealDoneCount": v.a,
          "orderType": v.ot
        }
      })
    } : {
      orders: recentTradeListArr.ors && recentTradeListArr.ors.length && recentTradeListArr.ors.map(v => {
        return{
          "dealTime": v.t,
          "price": v.p,
          "priceCN": v.pc,
          "priceEN": v.pe,
          "volume": v.vol
        }
      })
    }
    this.state.recentTradeListArr = recentTradeListArr && recentTradeListArrAf.orders || [];
    return recentTradeListArr && recentTradeListArrAf.orders || []
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