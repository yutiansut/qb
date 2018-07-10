import ExchangeControllerBase from '../ExchangeControllerBase'
import OrderListStore from './OrderListStore'

export default class OrderListController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new OrderListStore('userOrder', 'general');
    this.store.setController(this);
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
  async getRecentOrder(isPersonal, id){
    let recentTradeListArr = await this.store.getRecentOrder(isPersonal, id);
    this.view.setState({
      recentTradeListArr
    })
  }
  changeRecentItem(v) {
    this.getRecentOrder(v.isPersonal, this.store.state.tradePairId);
    this.view.setState({
      recentItemSelect: v.type,
      isPersonal: v.isPersonal
    });
    this.store.state.recentItemSelect = v.type;
  };
  setTradePairId(id){
    // console.log('setTradePairId', id )
    this.store.state.tradePairId = id;
    this.getRecentOrder(this.view.state.isPersonal, id)
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
  emitRecentOrderWs() {
    this.store.emitRecentOrderWs();
  }
  updateRecentOrder(data){
    // this.view.setState(
    //     {
    //       recentTradeListArr: data
    //     }
    // )
  }
}