import OrderListController from '../OrderListController.js'
import TradeOrderListStore from './TradeOrderListStore'

export default class TradeOrderListController extends OrderListController {
  constructor() {
    super();
    this.store = new TradeOrderListStore()
    this.store.setController(this)
  }
  
  setView(view) {
    super.setView(view);
  }
  
  liveTradeListHandle(liveTradeList) {
    let liveTradeData = liveTradeList;
    let liveBuyArray = liveTradeData && liveTradeData.buy || [];
    let liveSellArray = liveTradeData && liveTradeData.sell || [];
    // this.view.setState({liveBuyArray, liveSellArray});
    this.store.state.liveSellArray = liveSellArray;
    this.store.state.liveBuyArray = liveBuyArray;
    this.changeRenderLive();
  }
  
  async getDepth(tradePairName) {
    let liveTradeData = await this.store.getDepth(tradePairName);
    this.store.state.liveBuyArray = liveTradeData && liveTradeData.buy || [];
    this.store.state.liveSellArray = liveTradeData && liveTradeData.sell || [];
    this.changeRenderLive();
    // this.view.setState(
    //     {
    //       liveBuyArray: ,
    //       liveSellArray: liveTradeData && liveTradeData.sell && liveTradeData.sell.reverse()
    //     }
    // )
  }
  
  orderListSelect(v) {
    let prices = {
      price: v.price,
      priceCN: this.view.state.prices.priceCN,
      priceEN: this.view.state.prices.priceEN,
    };
    this.TradePlanController && this.TradePlanController.orderHandle(prices);
    this.view.state.changeFlag = false
  }
  
  get changeFlag() {
    return this.view.state.changeFlag
  }
  
  setChangeFlag() {
    this.view.setState({
      changeFlag: true
    })
  }
  
  setChangeFlagClose() {
    this.view.setState({
      changeFlag: false
    })
  }
  
  joinRoom(tradePairName) {
    // console.log(this.store.room)
    let room = `${tradePairName}-0`
    this.emitRecentOrderWs(this.store.room, room)
    this.store.setRoom(room)
  }
  
  getNewPrice(v, flag) {
    this.view.setState(
        {
          prices: v.prices,
          updown: v.updown
        }
    );
    this.store.state.prices = v.prices;
    this.changeRenderLive();
    flag !== 1 && this.getDepth(v.tradePair)
  }
  
  setUnitsType(v) {
    this.view.setState({
      unitsType: v
    });
    this.store.state.unitsType = v;
    this.changeRenderLive();
  }
  
  changeLiveTitleSelect(v) {
    this.view.setState({
      titleSelect: v.type
    });
    this.store.state.titleSelect = v.type
    this.changeRenderLive()
    //预留方法
  }
  
  // 挂单列表渲染数据的处理
  changeRenderLive() {
    let liveSellArray = this.store.state.liveSellArray;
    let liveBuyArray = this.store.state.liveBuyArray;
    let unitsType = this.store.state.unitsType;
    let liveBank = this.store.state.prices;
    let liveTitleSelect = this.store.state.titleSelect; // buy,sell,all
    let items = {
      CNY: 'priceCN',
      USD: 'priceEN'
    };
    let formatKey = (unitsType === "CNY" || unitsType === 'USD') ? 'legal' : 'digital';
    let formatProperty = (unitsType === "CNY" || unitsType === 'USD') ? 'legal' : 'property';
    let formatObj = {
      digital: {number: 'digital', style: {decimalLength: this.accuracy.priceAccuracy}},
      legal: {number: 'legal', style: {name: unitsType && unitsType.toLowerCase()}},
      property: {number: 'property', style: {decimalLength: this.accuracy.priceAccuracy + this.accuracy.volumeAccuracy}}
    };
    let dealPrice = Number(liveBank.price && liveBank.price * (liveBank[items[unitsType]] || 1)).format(formatObj[formatKey]);
    if (liveTitleSelect === 'all') {
      liveSellArray = (liveSellArray.slice(0,13)).reverse();
      liveBuyArray = liveBuyArray.slice(0,13);
      liveSellArray = liveSellArray && liveSellArray.map(v => {
          v.priceH = Number(v.price * (liveBank[items[unitsType]] || 1));
          v.priceR = Number(v.price * (liveBank[items[unitsType]] || 1)).format(formatObj[formatKey]);
          v.amountR = Number(v.amount).formatFixNumberForAmount(this.accuracy.volumeAccuracy, false);
          v.turnover = Number(v.priceH.multi(v.amount)).format(formatObj[formatProperty]);
        return v
      });
      liveBuyArray = liveBuyArray &&  liveBuyArray.map(v => {
          v.priceH = Number(v.price * (liveBank[items[unitsType]] || 1));
          v.priceR = Number(v.price * (liveBank[items[unitsType]] || 1)).format(formatObj[formatKey]);
          v.amountR = Number(v.amount).formatFixNumberForAmount(this.accuracy.volumeAccuracy, false);
          v.turnover = Number(v.priceH.multi(v.amount)).format(formatObj[formatProperty]);
        return Object.assign(v)
      });
      this.view.setState({
        liveBuyArray,
        liveSellArray,
        dealPrice
      })
    }
    if (liveTitleSelect === 'buy') {
      liveBuyArray = liveBuyArray.slice(0,26);
      liveBuyArray = liveBuyArray && liveBuyArray.length && liveBuyArray.map(v => {
        v.priceH = Number(v.price * (liveBank[items[unitsType]] || 1));
        v.priceR = Number(v.price * (liveBank[items[unitsType]] || 1)).format(formatObj[formatKey]);
        v.amountR = Number(v.amount).formatFixNumberForAmount(this.accuracy.volumeAccuracy, false);
        v.turnover = Number(v.priceH.multi(v.amount)).format(formatObj[formatProperty]);
        return v
      })
      this.view.setState({
        liveBuyArray,
        liveSellArray: [],
        dealPrice
      })
    }
    if (liveTitleSelect === 'sell') {
      liveSellArray = (liveSellArray.slice(0,26)).reverse();
      liveSellArray = liveSellArray && liveSellArray.length && liveSellArray.map(v => {
        v.priceH = Number(v.price * (liveBank[items[unitsType]] || 1));
        v.priceR = Number(v.price * (liveBank[items[unitsType]] || 1)).format(formatObj[formatKey]);
        v.amountR = Number(v.amount).formatFixNumberForAmount(this.accuracy.volumeAccuracy, false);
        v.turnover = Number(v.priceH.multi(v.amount)).format(formatObj[formatProperty]);
        return v
      })
      this.view.setState({
        liveSellArray,
        liveBuyArray: [],
        dealPrice
      })
    }
  }
}