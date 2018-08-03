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
    let liveSellArray = liveTradeData.sell && liveTradeData.sell.reverse();
    this.view.setState({liveBuyArray, liveSellArray});
    this.store.state.liveSellArray = liveSellArray;
    this.store.state.liveBuyArray = liveBuyArray;
  }
  
  async getDepth(tradePairName){
    let liveTradeData = await this.store.getDepth(tradePairName);
    this.view.setState(
        {
          liveBuyArray: liveTradeData && liveTradeData.buy || [],
          liveSellArray: liveTradeData && liveTradeData.sell && liveTradeData.sell.reverse()
        }
    )
  }

  orderListSelect(v){
    let prices = {
      price: v.price,
      priceCN:  this.view.state.prices.priceCN,
      priceEN:  this.view.state.prices.priceEN,
    };
    this.TradePlanController && this.TradePlanController.orderHandle(prices);
    this.view.state.changeFlag = false
  }
  get changeFlag(){
    return this.view.state.changeFlag
  }
  setChangeFlag(){
    this.view.setState({
      changeFlag:true
    })
  }
  setChangeFlagClose(){
    this.view.setState({
      changeFlag:false
    })
  }
  joinRoom(tradePairName){
    // console.log(this.store.room)
    let room = `${tradePairName}-0`
    this.emitRecentOrderWs(this.store.room, room)
    this.store.setRoom(room)
  }
  
  getNewPrice(v,flag){
    this.view.setState(
        {
         prices: v.prices,
         updown: v.updown
        }
    );
    flag && this.getDepth(v.tradePair)
  }

}