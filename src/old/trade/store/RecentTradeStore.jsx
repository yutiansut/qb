import {computed, observable} from "mobx";
const isEmpty = require('lodash.isempty');

/**
 * 近期交易
 */


class RecentTradeStore {

  TYPE = {
    TRADE: "TRADE",
    MINE: "MINE",
  };
  @observable type = this.TYPE.TRADE;
  @observable userData = [];
  @observable marketData = {};
  @observable tradePair = "";
  @observable orderBy = 'date';
  @observable reversed = false;  // 升序
  @observable tradePlanHeight = 0;

  constructor() {
    this.changeType = this.changeType.bind(this);
    this.compare = this.compare.bind(this);
  }

  compare(a, b) {
    if (parseFloat(a[this.orderBy]) < parseFloat(b[this.orderBy])) {
      return this.reversed ? 1 : -1;
    }
    if (parseFloat(a[this.orderBy]) > parseFloat(b[this.orderBy])) {
      return this.reversed ? -1 : 1;
    }
    return 0
  }

  @computed get coin() {
    // console.log('this.coin_market',this.coin_market)
    return this.tradePair && this.tradePair.split('_')[0]
  }

  changeType(type, e) {
    e.preventDefault();
    if (!this.TYPE.hasOwnProperty(type))
      return;
    this.type = type
  }

  @computed get Data() {
    let data = [];
    if (this.type === this.TYPE.TRADE) {
      data = this.marketData || [];
    } else if (this.type === this.TYPE.MINE) {
      data = this.userData || [];
    }
    if(isEmpty(data)){
      return []
    }
    return data.sort(this.compare)
  }
}

export default RecentTradeStore
