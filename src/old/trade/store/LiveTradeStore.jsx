import {observable, toJS, computed} from "mobx";
// import {Decimal} from 'decimal.js';
const isEmpty = require('lodash.isempty');


/**
 * 指定交易对的交易数据
 */
class LiveTradeStore {
  @observable market = '';  // 交易对
  @observable select = '';  // ["ALL", "BUY", "SELL"]
  @observable data = []; // [ {price:, vol, trade_type}  ]
  @observable rawData = {};
  @observable depthSettings = {};  // depth chart settings.
  @observable clickedItem = '';  // 选择了哪条买卖记录.

  constructor() {
    this.ChangeTradeType = this.ChangeTradeType.bind(this);
    this.updateDepthSettings = this.updateDepthSettings.bind(this);
    this.clickItem = this.clickItem.bind(this);
  }


  clickItem(item, e) {
    e.preventDefault();
    this.clickedItem = item;
  }

  @computed get TradePair() {
    if (this.market === "") {
      return ["", ""]
    } else {
      return this.market.split("_").map(i => i.toUpperCase())
    }
  }

  @computed get coin() {
    // console.log('this.coin_market',this.coin_market)
    return this.market && this.market.split('_')[0]
  }

  @computed get SData() {
    if (this.select === "ALL") {
      return this.data
    } else {
      return this.data.filter(i => i['trade_type'] === this.select)
    }
  }

  updateDepthSettings() {
    if (isEmpty(this.rawData) || (isEmpty(this.rawData.asks) && isEmpty(this.rawData.bids))) {
      return;
    }
    const dchart = this.dChart;
    let opt = this.depthSettings;
    let xis = [];
    let d0 = [];
    let d1 = [];
    const rawData = this.rawData;
    // console.log('dchartSetOption 0',rawData)
    Object.values(rawData).map(a => {
      let count = Decimal(0);
      a.map(i => {
        count = parseFloat(Decimal.add(count, i[1]).toFixed(8));
        i.push(count)
      })
    });
    rawData.asks.reverse();

    let {asks, bids} = rawData;
    let [t1, t2] = this.market.split('_');
    // console.log('dchartSetOption 0.1',bids.slice(), asks.slice())
    // bids.map(item => {
    //   xis.unshift(item[0]);
    //   // d0.unshift(item[2]);
    //   // d1.unshift('-');
    // });
    // asks.map(item=>{
    //   // xis.unshift(item[0]);
    //   // d0.unshift('-');
    //   // d1.unshift(item[2]);
    // })
    xis = [...bids.map(item=>item[0]).reverse(),...asks.map(item=>item[0])]
    // console.log('dchartSetOption 0.2', xis)
    opt.tooltip.formatter = e => {
      let bidParam = e[0];
      let askParam = e[1];
      let tipParam = bidParam;
      if (!bidParam.value) {
        tipParam = askParam;
      }
      return `${tipParam.name} ${t2} x ${tipParam.value} ${t1}`;
    };
    opt.xAxis.data = xis;
    // console.log('dchartSetOption 0',bids.map(v=>v.splice(1,1) && v),asks.map(v=>v.splice(1,1) && v))
    opt.series[0].data = bids.map(v=>v.splice(1,1) && v);
    opt.series[1].data = asks.map(v=>v.splice(1,1) && v);
    // console.log('dchartSetOption 1',toJS(opt))
    dchart.setOption(toJS(opt));
  }


  ChangeTradeType(type, e) {
    e.preventDefault();
    if (type === "BUY") {
      this.select = "BUY";
    } else if (type === "SELL") {
      this.select = "SELL";
    } else {
      this.select = 'ALL';
    }
  }
}


export default LiveTradeStore
