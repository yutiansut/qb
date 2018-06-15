import ExchangeStoreBase from './class/ExchangeStoreBase'

export default class TestAppStore extends ExchangeStoreBase {
  constructor() {
    super();
    this.state = {count: 20, price:1000 , testObj:{b:1}}
  }
}