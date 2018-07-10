import ExchangeStoreBase from '../ExchangeStoreBase'

export default class DealStore extends ExchangeStoreBase {
  constructor() {
    super('userOrder', 'general');
    this.state = {
      duration: '',
      tradePairName: '',
      kline: []
      // UnitObject: {
      //   'cny计价': 'CNY',
      //   'usd计价': 'USD'
      // }

    }
    this.WebSocket.general.on("tradeKline", data => {
      this.state.kline = data.kline.map(v => {
        let arr = [];
        arr.push(v.startTime * 1000);
        arr.push(v.openPrice);
        arr.push(v.highPrice);
        arr.push(v.lowPrice);
        arr.push(v.closePrice);
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
    if (result.tradePairName) {
      if (!result.kline) { this.state.kline = []; return };
      this.state.kline = result.kline.map(v => {
        let arr = [];
        arr.push(v.startTime * 1000);
        arr.push(v.openPrice);
        arr.push(v.highPrice);
        arr.push(v.lowPrice);
        arr.push(v.closePrice);
        return arr;
      });
    }
  }

  //websockt加入房间
  joinRoom(fromRoom, toRoom) {
    this.WebSocket.general.emit("joinRoom", { from: fromRoom, to: fromRoom });
  }

  update(k, v) {
    this.state[k] = v;
  }
}