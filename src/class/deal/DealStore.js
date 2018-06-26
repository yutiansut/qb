import ExchangeStoreBase from '../ExchangeStoreBase'

export default class DealStore extends ExchangeStoreBase {
  constructor() {
    super();
    this.state = {
      PriceUnit: '',
      NumUnit: '',
      UnitControl: ''
    }
  }
  
}