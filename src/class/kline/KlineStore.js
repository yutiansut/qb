import ExchangeStoreBase from '../ExchangeStoreBase'

export default class KlineStore extends ExchangeStoreBase {
  constructor() {
    super('userOrder', 'general');
    this.name = new Date()-0
    this.state = {
      duration: '',
      tradePairName: '',
      kline: []
    }
    this.WebSocket.general.on("tradeKline", data => {
      this.state.kline = data.kline.map(v => {
        let arr = [];
        arr.push(v.endTime * 1000);
        arr.push(v.openPrice);
        arr.push(v.highPrice);
        arr.push(v.lowPrice);
        arr.push(v.closePrice);
        arr.push(v.volume);
        return arr;
      });
      this.controller.setKline(this.state.kline)
    });
  }
  setController(ctrl) {
    this.controller = ctrl;
  }
  async getData() {
    let result = await this.Proxy.getKline({
      "tradePairName": this.state.tradePairName,
      "duration": this.state.duration // k线时间段秒数
    })
    console.log(result);
    if (result.tradePairName) {
      if (!result.kline) { this.state.kline = []; return };
      this.state.kline = result.kline.map(v => {
        let arr = [];
        arr.push(v.endTime * 1000);
        arr.push(v.openPrice);
        arr.push(v.highPrice);
        arr.push(v.lowPrice);
        arr.push(v.closePrice);
        arr.push(v.volume);
        return arr;
      });
      console.log(this.state.kline);
    }
  }

  //websockt加入房间
  joinRoom(fromRoom, toRoom) {
    if (toRoom === ''){
      this.state.duration = '',
      this.state.tradePairName = '',
      this.state.kline = [];
    }
    this.WebSocket.general.emit("joinRoom", { from: fromRoom, to: toRoom });
  }

  update(k, v) {
    console.log('store update', k, v, JSON.stringify(this.state))
    this.state[k] = v;
  }
}