import ExchangeStoreBase from '../../class/ExchangeStoreBase'

export default class UserStore extends ExchangeStoreBase {
  constructor(count) {
    super();
    this.data = {count}
  }
}