import OrderListController from '../OrderListController.js'
import TradeOrderListStore from './TradeOrderListStore'

export default class TradeOrderListController extends OrderListController {
  constructor() {
    super();
    this.store = new TradeOrderListStore()
    this.store.setController(this);
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
  
  async getDepth() {
    let liveTradeData = await this.store.getDepth();
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
  
  joinRoom() {
    // console.log(this.store.room)
    let room = `${this.store.state.tradePairName}-${this.store.state.depthType}`;
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
    flag !== 1 && this.getDepth()
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
  setPriceList(value){
    this.store.userPriceList = value;
    this.userPriceListHandle();
  }
  //深度合并位数切换
  depthSelect(e){
    let accuracy = this.accuracy.priceAccuracy;
    this.view.setState({
      depthSelected: e
    });
    this.store.state.depthType = accuracy - e;
    this.userPriceListHandle();
    this.joinRoom();
    this.getDepth();
  }
  // 用户挂单数据处理
  userPriceListHandle(){
   let userPriceList = this.store.userPriceList;
   let depthType = this.store.state.depthType;
   let accuracy = this.accuracy.priceAccuracy;
   let userTagArr = [];
   userPriceList.map(v => {
      if(v.type){
        v.priceU = depthType ? (v.price === v.price.toFixedWithoutUp(accuracy - depthType) ? v.price : v.price.toFixedWithoutUp(accuracy - depthType) + Math.pow(0.1,accuracy - depthType)) : v.price
      }
      else{
        v.priceU = Number(v.price).toFixedWithoutUp(accuracy - depthType);
      }
     userTagArr.push(v.priceU)
   });
   this.view.setState(
       {
         userTagArr
       }
   )
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
    let sellSortArray = [],buySortArray = [],sellMid = 0,buyMid = 0;
    if (liveTitleSelect === 'all') {
      liveSellArray = (liveSellArray.slice(0,50)).reverse();
      liveBuyArray = liveBuyArray.slice(0,50);
      liveSellArray = liveSellArray && liveSellArray.map(v => {
          v.priceH = Number(v.price * (liveBank[items[unitsType]] || 1));
          v.priceR = Number(v.price * (liveBank[items[unitsType]] || 1)).format(formatObj[formatKey]);
          v.amountR = Number(v.amount).formatFixNumberForAmount(this.accuracy.volumeAccuracy, false);
          v.turnover = Number(v.priceH.multi(v.amount)).format(formatObj[formatProperty]);
          sellSortArray.push(v.amount)
        return v
      });
      liveBuyArray = liveBuyArray &&  liveBuyArray.map(v => {
          v.priceH = Number(v.price * (liveBank[items[unitsType]] || 1));
          v.priceR = Number(v.price * (liveBank[items[unitsType]] || 1)).format(formatObj[formatKey]);
          v.amountR = Number(v.amount).formatFixNumberForAmount(this.accuracy.volumeAccuracy, false);
          v.turnover = Number(v.priceH.multi(v.amount)).format(formatObj[formatProperty]);
        buySortArray.push(v.amount)
        return Object.assign(v)
      });
      sellSortArray && sellSortArray.sort((a,b) => a > b);
      buySortArray && buySortArray.sort((a,b) => a > b);
      sellSortArray.length % 2 === 0 && (sellMid = (sellSortArray[sellSortArray.length/2] + sellSortArray[sellSortArray.length/2 - 1]) / 2) || (sellMid = sellSortArray[(sellSortArray.length - 1 )/ 2]);
      buySortArray.length % 2 === 0 && (buyMid = (buySortArray[buySortArray.length/2] + buySortArray[buySortArray.length/2 - 1]) / 2) || (buyMid = buySortArray[(buySortArray.length - 1 )/ 2]);
      liveSellArray = liveSellArray.slice(0,13);
      liveBuyArray = liveBuyArray.slice(0,13);
      this.view.setState({
        liveBuyArray,
        liveSellArray,
        dealPrice,
        sellMid,
        buyMid
      })
    }
    if (liveTitleSelect === 'buy') {
      liveBuyArray = liveBuyArray.slice(0,26);
      liveBuyArray = liveBuyArray && liveBuyArray.length && liveBuyArray.map(v => {
        v.priceH = Number(v.price * (liveBank[items[unitsType]] || 1));
        v.priceR = Number(v.price * (liveBank[items[unitsType]] || 1)).format(formatObj[formatKey]);
        v.amountR = Number(v.amount).formatFixNumberForAmount(this.accuracy.volumeAccuracy, false);
        v.turnover = Number(v.priceH.multi(v.amount)).format(formatObj[formatProperty]);
        buySortArray.push(v.amount)
        return v
      });
      buySortArray.sort((a,b) => a > b);
      buySortArray.length % 2 === 0 && (buyMid = (buySortArray[buySortArray.length/2] + buySortArray[buySortArray.length/2 - 1]) / 2) || (buyMid = buySortArray[(buySortArray.length - 1) / 2]);
      this.view.setState({
        buyMid,
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
        sellSortArray.push(v.amount)
        return v
      });
      sellSortArray.sort((a,b) => a > b);
      sellSortArray.length % 2 === 0 && (sellMid = (sellSortArray[sellSortArray.length/2] + sellSortArray[sellSortArray.length/2 - 1]) / 2) || (sellMid = sellSortArray[(sellSortArray.length - 1) / 2]);
      this.view.setState({
        sellMid,
        liveSellArray,
        liveBuyArray: [],
        dealPrice
      })
    }
  }
}