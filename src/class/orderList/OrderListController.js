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
  setUnitsType(v){
    this.view.setState({
      unitsType: v
    })
  }
  
  setInitUnit(market,coin){
    this.view.setState({
      market,
      coin
    })
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

  tradeSort(v, index) { // 近期交易排
    let sortArray = this.store.state.recentTradeListMi,
        tradeSortImg = ["/static/img/trade_rank_shang.svg", "/static/img/trade_rank_xia.svg"];
    v.type = v.type === false ? 0 : 1
    v.sortValue && this.view.setState({
      recentTradeListArr: this.sort(sortArray, v.sortValue, v.type),
      sortIndex: index,
      tradeSortImg: tradeSortImg[v.type]
    });

    v.type = !v.type
  }
}