import OrderListController from '../OrderListController.js'
import TradeOrderListStore from './TradeOrderListStore'

export default class TradeOrderListController extends OrderListController {
  constructor() {
    super();
    this.store = new TradeOrderListStore()
  }
  
  setView(view) {
    super.setView(view);
  }
  
  liveTradeListHandle() {
    let liveTradeData = this.store.state.liveTradeList;
    let liveBuyArray = liveTradeData.buy;
    let liveSellArray = liveTradeData.sell;
    this.view.setState({liveBuyArray, liveSellArray});
    this.store.state.liveSellArray = liveSellArray;
    this.store.state.liveBuyArray = liveBuyArray;
  }
}