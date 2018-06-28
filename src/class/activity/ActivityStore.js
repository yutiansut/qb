import ExchangeStoreBase from '../ExchangeStoreBase'

export default class NoticeStore extends ExchangeStoreBase {
  constructor() {
    super();
    this.state = {
      recordList: [
        {coin: '1111', amount: '22222'},
        {coin: '1111', amount: '22222'},
        {coin: '1111', amount: '22222'},
        {coin: '1111', amount: '22222'},
      ]
    }
  }
}