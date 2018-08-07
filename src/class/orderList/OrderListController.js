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
    this.view.setState({
      recentTradeListArr: [],
      recentTableHead: v.isPersonal && this.view.state.recentTableMineHead || this.view.state.recentTableMarketHead
    })
    this.getRecentOrder(v.isPersonal, this.store.state.tradePairId);
    this.view.setState({
      recentItemSelect: v.type,
      isPersonal: v.isPersonal
    });
    this.store.state.recentItemSelect = v.type;
  };

  setTradePairId(id, tradePairName){
    // console.log('setTradePairId', id ,this.store.room)
    this.store.state.tradePairId = id;
    this.getRecentOrder(this.view.state.isPersonal, id)
    this.emitRecentOrderWs(this.store.room, tradePairName)
    this.store.setRoom(tradePairName)
  }

  //清除房间
  clearRoom(){
    this.emitRecentOrderWs(this.store.room, '')
  }

  tradeSort(v, index) { // 近期交易排
    let sortArray = this.store.state.recentTradeListArr,
        tradeSortImg = ["/static/web/trade/trade_rank_shang.svg", "/static/web/trade/trade_rank_xia.svg"];
    v.type = v.type === false ? 0 : 1;
    v.sortValue && this.view.setState({
      recentTradeListArr: this.sort(sortArray, v.sortValue, v.type),
      sortIndex: index,
      tradeSortImg: tradeSortImg[v.type]
    });
    v.type = !v.type
  }

  emitRecentOrderWs(from, to) {
    this.store.emitRecentOrderWs(from, to);
    //
  }
  //ws更新市场成交列表
  updateRecentOrder(data){
    let recentTradeListArr = this.view.state.recentTradeListArr;
    data.orders.map((v, index) => {
      recentTradeListArr.unshift(v)
    })
    this.view.setState(
        {
          recentTradeListArr
        }
    )
  }
  //ws更新用户成交列表
  updateRecentOrderUser(data){
    if(this.view.state.recentItemSelect === 'mineLess' || data.orderStatus === 0){
      return
    }
    let recentTradeListArr = this.view.state.recentTradeListArr;
    let findIndex = recentTradeListArr.findIndex(v => Number(v.orderId) === Number(data.orderId));
    if(data.orderStatus === 2 && findIndex === -1){
      recentTradeListArr.unshift(data);
      this.view.setState(
          {
            recentTradeListArr
          }
      )
    }
    
  }
  // 设置价格及数量精度
  setAccuracy(priceAccuracy,volumeAccuracy) {
    this.view.setState(
        {
          priceAccuracy,
          volumeAccuracy
        },
    )
    this.store.state.volumeAccuracy = volumeAccuracy;
    this.store.state.priceAccuracy = priceAccuracy;
  }
  
  get accuracy(){
    return{
      volumeAccuracy: this.store.state.volumeAccuracy,
      priceAccuracy: this.store.state.priceAccuracy
    }
  }
  
  setBank(value){
    this.store.state.bank = {
      cny: value.priceCN,
      usd: value.priceEN
    }
    this.view.setState(
        {
          recentBank: {
            cny: value.priceCN,
            usd: value.priceEN
          }
        }
    );
  }
  
  //改变数据渲染的数组(计价方式切换,数据来源切换)
  changeRenderRecent(){
  
  }
}