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
  async dealTrade(params){
    let result = await this.Proxy.dealExchange(
        params
    );
    return result
  }

  //设置可用额度
  setWallet(buyWallet, sellWallet){
    this.state.buyWallet = buyWallet
    this.state.sellWallet = sellWallet
  }
}