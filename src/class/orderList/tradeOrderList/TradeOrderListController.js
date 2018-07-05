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
    let liveBuyArray = liveTradeData.buy;
    let liveSellArray = liveTradeData.sell;
    this.view.setState({liveBuyArray, liveSellArray});
    this.store.state.liveSellArray = liveSellArray;
    this.store.state.liveBuyArray = liveBuyArray;
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


}