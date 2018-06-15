import ExchangeStoreBase from '../ExchangeStoreBase'

export default class UserStore extends ExchangeStoreBase {
  constructor(count) {
    super();
    this.state = {count}
  }
}