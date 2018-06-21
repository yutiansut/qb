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
    this.tradePairSelect(homeMarketPairData);
    this.store.state.market = v;
    this.store.state.homeMarketPairData = homeMarketPairData;
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
    this.tradePairSelect(homeMarketPair);
    this.store.state.marketDataHandle = homeMarket;
    this.store.state.homeMarketPairData = homeMarketPair;
  }
  //交易对的选中
  tradePairSelect(list) {
    let tradePair = list[0].trade_pair;
    this.view.setState({
      tradePair,
    });
    this.store.state.tradePair = tradePair
  }
  //排序功能
  pairSort(v) {
    let sortArray = this.store.state.homeMarketPairData;
    v.sortValue && this.view.setState({
      homeMarketPairData:this.sort(sortArray, v.sortValue,v.type)
    });
    v.type = !v.type
  }
  pairDataHandle() {
  
  }
}