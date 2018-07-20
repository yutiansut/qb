import ExchangeControllerBase from "../ExchangeControllerBase";
import KdepthStore from "./KdepthStore";

export default class KdepthController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new KdepthStore();
  }
  setView(view) {
    super.setView(view);
  }
  // set深度数据
  setData(data) {
    // console.log('set深度数据.............', data)
    let result = {};
    if (!data || !data.buy || !data.sell) {
      result = { bids: [], asks: [] };
    }
    result.bids = data && data.buy ? data.buy.map(v => {
          let arr = [];
          arr.push(v.price);
          arr.push(v.amount);
          return arr;
        }) : [];
    result.asks = data && data.sell ? data.sell.map(v => {
            let arr = [];
            arr.push(v.price);
            arr.push(v.amount);
            return arr;
          }) : [];
    // console.log('深度数据', result)
    this.view.setData(result);
  }
  get language() {
    return this.configController.initState.language.toLowerCase();
  }
}
