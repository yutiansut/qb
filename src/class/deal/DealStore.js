import ExchangeStoreBase from '../ExchangeStoreBase'

export default class DealStore extends ExchangeStoreBase {
  constructor() {
    super('deal');
    this.state = {
      PriceUnit: '',
      NumUnit: '',
      UnitControl: '',
      prices:{},
      priceBank:{
        CNY:0,
        USD:0
      },
      priceInit:0
      // UnitObject: {
      //   'cny计价': 'CNY',
      //   'usd计价': 'USD'
      // }
     
    }
  }
  async dealTrade(){
    await this.Proxy.dealExchange(
        {
          "userId": JSON.parse('232601699242483712'),
          "orderType": 0,//0买 1 卖
          "priceType": 0,//0限价  1市价
          "price": 1,//价格
          "count": 0.1,//数量
          "tradePairId": 3,
          "tradePairName": "ETH/BTC",
          "funpass": "123456",//资金密码
          "interval": 2,// 0:每次都需要密码 1:2小时内不需要 2:每次都不需要
          "priceUnit": 0//计价单位  0数字币  1人民币 2美元
  
        }
    )
  }
  
}