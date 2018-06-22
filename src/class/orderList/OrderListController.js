import ExchangeControllerBase from '../ExchangeControllerBase'
import OrderListStore from './OrderListStore'

export default class OrderListController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new OrderListStore()
  };
  
  setView(view) {
    super.setView(view);
  }
  
  changeRecentItem(v) {
    let recentListArray = this.store.state[v.item];//todo 模拟切换,接口调试需重写
    this.view.setState({
      recentItemSelect: v.type,
      recentTradeListArr: recentListArray
    });
    this.store.state.recentItemSelect = v.type;
    this.store.state.recentTradeListArr = recentListArray
  };
  recentTradeList() {
    this.view.setState({
      recentTradeListArr: this.store.state.recentTradeListMa
    })
  }
}