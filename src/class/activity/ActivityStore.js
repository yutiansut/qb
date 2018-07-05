import ExchangeStoreBase from '../ExchangeStoreBase'

export default class NoticeStore extends ExchangeStoreBase {
  constructor() {
    super('activity');
    this.state = {
      recordList: [
        {coin: '1111', amount: '22222'},
        {coin: '1111', amount: '22222'},
        {coin: '1111', amount: '22222'},
        {coin: '1111', amount: '22222'},
      ]
    }
  }

  async getQbtMargin(){
    let result = await this.Proxy.getQbtMargin();
    return result;
  }

  async getAward(obj){
    let result = await this.Proxy.getAward(obj);
    return result;
  }
}