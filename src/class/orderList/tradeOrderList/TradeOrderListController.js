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
    // console.log('this.TradeMarketController.tradePair.tradePairName',this.TradeMarketController.tradePair.tradePairName)
    let liveTradeData = await this.store.getDepth(tradePairName);
    console.log('livelivelivelivelive', liveTradeData)
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
      priceCN: v.priceCN.toFixed(2),
      priceEN: v.priceEN.toFixed(2),
    };
    this.TradePlanController && this.TradePlanController.orderHandle(prices);
    // this.store.changeFlag = false
    this.view.state.changeFlag = false
  }
  get changeFlag(){
    return this.view.state.changeFlag
  }
  setChangeFlag(){
    // this.store.changeFlag = true
    this.view.setState({
      changeFlag:true
    })
  }
  setChangeFlagClose(){
    // this.store.changeFlag = true
    this.view.setState({
      changeFlag:false
    })
  }
  joinRoom(tradePairName){
    // console.log(this.store.room)
    let room = `${tradePairName}-D0`
    this.emitRecentOrderWs(this.store.room, room)
    this.store.setRoom(room)
  }
  
  getNewPrice(v){
    this.view.setState(
        {
         prices:v.prices
        }
    )
    this.getDepth(v.tradePair)
  }

}