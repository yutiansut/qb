import ExchangeControllerBase from '../ExchangeControllerBase'
import MarketStore from './MarketStore'

export default class MarketController extends ExchangeControllerBase {
  constructor(name) {
    super('market');
    this.store = new MarketStore(name);
    this.store.setController(this)
  }

  setView(view) {
    super.setView(view);
  }

  async getRecommendData() {

  }

  async getPairData() {

  }
// 获取币种资料
  async getCoinInfo(currency){
    await this.store.getCoinInfo(currency);
    this.view.setState({ coinInfo: this.store.state.coinInfo});
  }

  //更新recommend数据
  updateRecommend(data) {
    this.view.setState({
      recommendData: data
    })
  }
  
  async getMarket(){
    await this.store.getMarket();
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
  changeMarket(v) {
    let homeMarketPairData = this.store.state.allPairData.filter(vv => vv.market_name === v)[0].market_data;
    this.view.setState({
      // searchValue: '',
      sortIndex: 0,
      sortImg: "/static/images/rank_normal.svg",
      searchRealt: [],
      collectActive: false,
      market: v,
      homeMarketPairData
    });
    this.store.state.market = v;
    this.store.state.homeMarketPairData = homeMarketPairData;
    this.tradePairSelect(homeMarketPairData);
  }

  // 点击收藏
  collectMarket() {
    this.view.setState({
      searchValue: '',
      sortIndex: 0,
      sortImg: "/static/images/rank_normal.svg",
      searchRealt: [],
      collectActive: true,
      collectIndex: -1,
      market: ''
    });
    this.getCollectArr()
  }

  // 添加/取消收藏
  addCollect(v, index) {
    this.view.setState({
      collectIndex: index
    });
    v.isFavorite = 1-v.isFavorite
    this.store.changeFavorite(1, JSON.parse('232602516485840896'), v.isFavorite)
    // console.log('收藏 0', v.isFavorite)
  }

  // 市场下交易对
  async marketDataHandle() {
    let collectIdArr = [1,2,3]
    let homeMarket = [];
    let allPairData = await this.store.getMarketAll()
    allPairData.map(v => homeMarket.push(v.market_name));
    let homeMarketPair = this.store.state.allPairData.filter(v => v.market_name === this.store.state.market)[0].market_data;
    homeMarketPair.forEach(v => {
      let aaa = {isFavorite: collectIdArr.indexOf(v.tradePairId) > -1 ? 1 : 0}
      v = Object.assign(v, aaa);
    })
    this.view.setState({
      marketDataHandle: homeMarket,
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
    this.TradeRecentController && this.TradeRecentController.setTradePairId(list[0].tradePairId);
    this.setDealMsg();
  }

  tradePairChange(value) {
    this.view.setState({
      tradePair: value.trade_pair
    });
    this.store.state.tradePair = value.trade_pair;
    this.TradeRecentController && this.TradeRecentController.setTradePairId(value.tradePairId);
    this.setDealMsg();
  }

  //排序功能
  pairSort(v, index) { // type 1 升序 0 降序
    let imgArr = ["/static/images/rank_down.svg", "/static/images/rank_up.svg"],
      tradeSortImg = ["/static/img/trade_rank_shang.svg", "/static/img/trade_rank_xia.svg"],
      sortArray = this.store.state.homeMarketPairData;

    v.type = v.type === false ? 0 : 1
    v.sortValue && this.view.setState({
      homeMarketPairData: this.sort(sortArray, v.sortValue, v.type),
      sortImg: imgArr[v.type],
      sortIndex: index,
      tradeSortImg: tradeSortImg[v.type]
    });
    v.type = !v.type
  }

  // 筛选功能
  filte(arr, value) {
    let result = this.filter(arr, item => {
      return (
        item.coin_name.includes(value.toUpperCase())
      );
    });
    // this.view.setState({
    //   searchRealt: result
    // });
    // console.log('筛选', result, value)
    return result;
  }

  // 点击收藏筛选数组
  getCollectArr() {
    let collectIdArr = [1, 2, 3], concatArr = [], collectArr = [];
    // console.log('收藏数组', this.store.state.allPairData)
    // arr.concat(arr2,arr3)
    this.store.state.allPairData.map(v => {
      concatArr = concatArr.concat(v.market_data)
    })
    // console.log('收藏数组2', concatArr)
    collectArr = concatArr.filter(v => {
      return collectIdArr.indexOf(v.tradePairId) > -1
    })
    // console.log('收藏数组3', collectArr)
    this.view.setState({
      homeMarketPairData: collectArr
    });
  }

  //为交易模块提供价格以及交易对的信息
  setDealMsg() {
    //改变deal模块中的信息
    let tradePairMsg = this.store.state.homeMarketPairData.filter(v => v.trade_pair === this.store.state.tradePair),
      dealMsg = {
        tradePair: this.store.state.tradePair,
        coinIcon: tradePairMsg[0].coinIcon,
        prices: {
          price: tradePairMsg[0].price,
          priceCN: tradePairMsg[0].priceCN,
          priceEN: tradePairMsg[0].priceEN,
        }
      };
    this.TradeDealController && this.TradeDealController.setPairMsg(dealMsg);
    this.TradePlanController && this.TradePlanController.tradePairHandle(this.store.state.tradePair, dealMsg.prices);
  }

  setUnitsType(v){
    this.view.setState({
      unitsType: v
    })
  }

  pairDataHandle() {

  }
  // 交易对名称以及id的处理
   getTradePairHandle() {
    // let a = await this.store.getPairInfo();
    // let pairInfo = this.store.getPairInfo();
    let pairInfo = this.store.state.list;
    let coinCorrespondingId = {},marketCorrespondingId = {},coinCorrespondingPair = {},marketCorrespondingPair = {};
    pairInfo.map((v) => {
     let pair = v.tradePairName.split('/');
     let coin = pair[0];
     let market = pair[1];
      marketCorrespondingId[market] = marketCorrespondingId[market] || {};
      coinCorrespondingId[coin] = coinCorrespondingId[coin] || {};
      marketCorrespondingId[market][coin] = v.tradePairId;
      coinCorrespondingId[coin][market] = v.tradePairId;
      coinCorrespondingPair[coin] = coinCorrespondingPair[coin] || [];
      marketCorrespondingPair[market] = marketCorrespondingPair[market] || [];
      coinCorrespondingPair[coin].push(market);
      marketCorrespondingPair[market].push(coin);
    });
    let pairMsg = {};
    pairMsg.pairIdCoin = coinCorrespondingId;
    pairMsg.pairIdMarket = marketCorrespondingId;
    pairMsg.pairNameCoin = coinCorrespondingPair;
    pairMsg.pairNameMarket = marketCorrespondingPair;
    return pairMsg
  }
}