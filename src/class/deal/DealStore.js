import ExchangeStoreBase from '../ExchangeStoreBase'

export default class DealStore extends ExchangeStoreBase {
  constructor() {
    super();
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
  
}