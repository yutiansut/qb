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
    console.log('liveTradeList asdasdasdasd',liveTradeList)
    let liveTradeData = liveTradeList;
    let liveBuyArray = liveTradeData && liveTradeData.buy || [];
    let liveSellArray = liveTradeData.sell && liveTradeData.sell.reverse();
    this.view.setState({liveBuyArray, liveSellArray});
    this.store.state.liveSellArray = liveSellArray;
    this.store.state.liveBuyArray = liveBuyArray;
  }
  
  async getDepth(){
    let liveTradeData = await this.store.getDepth(this.TradeMarketController.tradePair.tradePairName);
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
      priceCN: v.priceCN,
      priceEN: v.priceEN,
    };
    this.TradePlanController && this.TradePlanController.orderHandle(prices);
  }

  joinRoom(){
    this.store.emitTradeOrderWs();
  }
  
  getNewPrice(v){
    this.view.setState(
        {
         prices:v
        }
    )
  }

}