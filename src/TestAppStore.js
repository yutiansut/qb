import ExchangeStoreBase from './ExchangeStoreBase'

export default class TestAppStore extends ExchangeStoreBase {
  constructor(count) {
    super();
    this.data = {count}
  }
}