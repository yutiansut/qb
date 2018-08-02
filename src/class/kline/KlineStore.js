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
      console.log("k线推送数据：\n",data);
      this.state.kline = data.ns.map(v => {
        let arr = [];
        arr.push(v.et * 1000);
        arr.push(v.op);
        arr.push(v.hp);
        arr.push(v.lp);
        arr.push(v.cp);
        arr.push(v.vol);
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
      "n": this.state.tradePairName,
      "dur": this.state.duration // k线时间段秒数
    });
    console.log("k线初始数据：\n",result);
    if (result.n) {
      if (!result.ns) { this.state.kline = []; return };
      this.state.kline = result.ns.map(v => {
        let arr = [];
        arr.push(v.et * 1000);
        arr.push(v.op);
        arr.push(v.hp);
        arr.push(v.lp);
        arr.push(v.cp);
        arr.push(v.vol);
        return arr;
      });
    }
  }

  get kline(){
    return this.state.kline;
  }

  //websockt加入房间
  joinRoom(fromRoom, toRoom) {
    if (toRoom === ''){
      this.state.duration = '',
      this.state.tradePairName = '',
      this.state.kline = [];
    }
    this.WebSocket.general.emit("joinRoom", { f: fromRoom, t: toRoom });
  }

  update(k, v) {
    // console.log('store update', k, v, JSON.stringify(this.state))
    this.state[k] = v;
  }
}