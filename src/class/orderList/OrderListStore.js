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