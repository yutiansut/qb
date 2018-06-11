import {computed, observable} from "mobx";
const isEmpty = require('lodash.isempty');
/**
 * 最新交易对信息
 * data = {
 *   "trade_pair_id": {
 *       "last": '',   // 最新价格
 *       "vol": '',   // 数量
 *       "updown_value": "",  24小时涨跌
 *   }
 * }
 */
class TradePairStore {
  @observable _data = {};
  @observable order_by = "last";
  @observable reverse = true;

  constructor(info_url) {
    this.info_url = info_url;
    this.getTradePair = this.getTradePair.bind(this);
    this.getTradePairValue = this.getTradePairValue.bind(this);
  }

  @computed get data() {


  }

  set data(data) {
    this._data = data;
  }

  getTradePair(tp_id) {
    const data = this.data;
    if (isEmpty(data)) {
      return {}
    } else if (!data.hasOwnProperty(tp_id)) {
      return {}
    } else {
      return data[tp_id]
    }
  }

  getTradePairValue(tp_id, key) {
    const data = this.getTradePair(tp_id);
    if (!data.hasOwnProperty(key)) {
      return 0.0;
    }
    return data[key];
  };
}

export default TradePairStore
