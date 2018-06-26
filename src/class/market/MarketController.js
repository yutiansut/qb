import ExchangeControllerBase from '../ExchangeControllerBase'
import MarketStore from './MarketStore'

export default class MarketController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new MarketStore();
  }
  
  setView(view) {
    super.setView(view);
  }
  
  async getRecommendData() {
  
  }
  
  async getPairData() {
  
  }
  // 推荐交易对处理
  // recommendDataHandle() {
  //   const recommendValues = Object.values(this.store.state.recommendData);
  //   const allPairData = Object.values(this.store.state.allPairData);
  //   let recommendPair = [];
  //   let pairDataValues = [];
  //   recommendValues.map((v) => {
  //     recommendPair.push(... v)
  //   });
  //   allPairData.forEach((v) => {
  //     pairDataValues.push(... v)
  //   });
  //   // let recommendData =pairDataValues.filter(v=> recommendPair.filter(vv=>vv===v.name).length)
  //   let recommendData = pairDataValues.filter((item) =>
  //       recommendPair.findIndex(v => v === item.name) !== -1
  //   );
  //   this.view.setState({
  //     recommendDataHandle:recommendData
  //   })
  //   this.store.state.recommendDataHandle = recommendData
  // }
  // 切换市场
  changeMarket(v){
    let homeMarketPairData = this.store.state.allPairData.filter(vv => vv.market_name === v)[0].market_data;
    this.view.setState({
      market:v,
      homeMarketPairData
    });
    this.store.state.market = v;
    this.store.state.homeMarketPairData = homeMarketPairData;
    this.tradePairSelect(homeMarketPairData);
  }
  // 市场下交易对
  marketDataHandle() {
    let homeMarket = [];
    this.store.state.allPairData.map(v => homeMarket.push(v.market_name));
    let homeMarketPair = this.store.state.allPairData.filter(v => v.market_name === this.store.state.market)[0].market_data;
    this.view.setState({
      marketDataHandle:homeMarket,
      homeMarketPairData: homeMarketPair,
    });
    this.store.state.marketDataHandle = homeMarket;
    this.store.state.homeMarketPairData = homeMarketPair;
    this.tradePairSelect(homeMarketPair);
  }
  //交易对的选中
  tradePairSelect(list) {
    let tradePair = list[0].trade_pair;
    this.view.setState({
      tradePair,
    });
    this.store.state.tradePair = tradePair;
    this.setDealMsg();
    // console.log('dealMsg', this)
  }
  
  tradePairChange(value) {
    this.view.setState({
      tradePair: value
    });
    this.store.state.tradePair = value;
    this.setDealMsg();
  }
  //排序功能
  pairSort(v) { // type 1 升序 0 降序

    let imgArr = ["/static/images/rank_down.svg", "/static/images/rank_up.svg"], sortArray = this.store.state.homeMarketPairData;
    console.log('图片1', imgArr[v.type])
    v.sortValue && this.view.setState({
      homeMarketPairData:this.sort(sortArray, v.sortValue,v.type),
      sortImg: imgArr[v.type]
    });
    v.type = !v.type
    console.log('图片2', v.type, imgArr[v.type])

  }
  
  //为交易模块提供价格以及交易对的信息
  setDealMsg(){
    //改变deal模块中的信息
    let tradePairMsg = this.store.state.homeMarketPairData.filter(v => v.trade_pair === this.store.state.tradePair),dealMsg = {
          tradePair: this.store.state.tradePair,
          coinIcon: tradePairMsg[0].coinIcon,
          prices:{
            price: tradePairMsg[0].price,
            priceCN: tradePairMsg[0].priceCN,
            priceEN: tradePairMsg[0].priceEN,
          }
        };
    this.TradeDealController && this.TradeDealController.setPairMsg(dealMsg)
  }
  pairDataHandle() {
  
  }
}