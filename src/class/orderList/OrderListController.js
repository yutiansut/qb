import ExchangeControllerBase from '../ExchangeControllerBase'
import OrderListStore from './OrderListStore'

export default class OrderListController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new OrderListStore('userOrder', 'general')
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
  async getRecentOrder(isPersonal){
    let recentTradeListArr = await this.store.getRecentOrder(isPersonal);
    this.view.setState({
      recentTradeListArr
    })
  }
  changeRecentItem(v) {
    this.getRecentOrder(v.isPersonal);
    this.view.setState({
      recentItemSelect: v.type,
      isPersonal: v.isPersonal
    });
    this.store.state.recentItemSelect = v.type;
  };
  setTradePairId(id){
    this.store.state.tradePairId = id;
    this.getRecentOrder(this.view.state.isPersonal)
  }
  tradeSort(v, index) { // 近期交易排
    let sortArray = this.store.state.recentTradeListArr,
        tradeSortImg = ["/static/img/trade_rank_shang.svg", "/static/img/trade_rank_xia.svg"];
    v.type = v.type === false ? 0 : 1;
    v.sortValue && this.view.setState({
      recentTradeListArr: this.sort(sortArray, v.sortValue, v.type),
      sortIndex: index,
      tradeSortImg: tradeSortImg[v.type]
    });

    v.type = !v.type
  }
}