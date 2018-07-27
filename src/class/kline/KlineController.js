import ExchangeControllerBase from "../ExchangeControllerBase";
import KlineStore from "./KlineStore";

export default class KlineController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new KlineStore();
    this.store.setController(this)
    this.rooms = {
      604800: "1w",
      86400: "1d",
      43200: '12h',
      21600: "6h",
      14400: "4h",
      7200: "2h",
      3600: "1h",
      1800: "30m",
      900: "15m",
      300: "5m",
      60: "1m"
    };
  }

  setView(view) {
    super.setView(view);
  }
  get roomId() {
    if (this.store.state.tradePairName === "" || this.store.state.duration === "") return "";
    return `${this.store.state.tradePairName}-${this.rooms[this.store.state.duration]}`;
  }
  get language() {
    return this.configController.initState.language.toLowerCase();
  }
  // 获取K线数据
  async getKlineData() {
    if (!this.store.state.tradePairName) return;
    await this.store.getData();
    this.setKline(this.store.state.kline);
  }

  // 设置币种交易对
  async setPair(symbol, symbolName) {
    !this.store.state.tradePairName && this.store.update("tradePairName", symbolName);
    this.store.state.tradePairName && this.update("tradePairName", symbolName);
    this.view && this.view.setSymbol(symbol, symbolName.toUpperCase());
    // await this.getKlineData()
  }
  // setK线数据
  setKline(data) {
    // data.reverse();
    this.view.setData(data.reverse());
  }
  // websocket切换房间
  joinRoom(to) {
    // console.log('joinroom,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',this.roomId, to);
    this.store.joinRoom(this.roomId, to);
  }
  // 更新tradePair
  update(k, v) {
    let tradePairName = this.store.state.tradePairName,
      duration = this.store.state.duration;
    if (k === 'tradePairName' && v !== tradePairName) {
      // console.log('update...............................', duration, k, v);
      if (duration === "") return;
      this.joinRoom(`${v}-${this.rooms[duration]}`)
    }
    if (k === "duration" && v !== this.store.state.duration) {
      // console.log('update...............................', tradePairName, k, v);
      if (tradePairName === '') return;
      this.joinRoom(`${tradePairName}-${this.rooms[v]}`);
    }
    this.store.update(k, v);
  }
}
