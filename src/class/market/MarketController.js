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
  async getCoinInfo(coinId) {
    await this.store.getCoinInfo(coinId);
    this.view.setState({coinInfo: this.store.state.coinInfo});
  }

  async getMarket() {
    await this.store.getMarket();
  }

  //获取getRecommendCoins
  async getRecommendCoins() {
    let recommendData = await this.store.getRecommendCoins()
    // console.log(recommendData)
    this.view.setState({
      recommendData
    })
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
  async changeMarket(v) {
    // let homeMarketPairData = this.store.state.allPairData.filter(vv => vv.market_name === v)[0].market_data;
    this.store.setSelecedMarket(v);
    this.store.setSort([], 0)
    let homeMarketPairData = await this.store.selectMarketData()
    this.view.setState({
      // searchValue: '',
      sortIndex: 0,
      sortImg: "/static/images/rank_normal.svg",
      searchRealt: [],
      collectActive: false,
      market: v,
      homeMarketPairData
    });
    // this.store.state.market = v;
    // this.store.state.homeMarketPairData = homeMarketPairData;
    if(this.view.state.query) {
      this.querySelectPair(this.view.state.query)
      return
    }
    this.tradePairChange(homeMarketPairData[0]);
     // this.tradePairChange(homeMarketPairData[0]);
  }

  // 点击收藏
  collectMarket() {
    let homeMarketPairData = this.getCollectArr()
    // console.log('collectMarket', homeMarketPairData)
    this.store.setSelecedMarket('收藏区');
    this.store.setHomeMarketPairData(homeMarketPairData);
    this.store.setSort([], 0)
    this.view.setState({
      searchValue: '',
      sortIndex: 0,
      sortImg: "/static/images/rank_normal.svg",
      searchRealt: [],
      collectActive: true,
      market: '',
      homeMarketPairData
    });
    this.tradePairChange(homeMarketPairData[0]);
  }

  // 添加/取消收藏
  async addCollect(v, index, e) {
    // console.log(e)
    e.preventDefault();
    e.stopPropagation();
    // v.isFavorite = 1 - v.isFavorite
    // console.log('收藏 0', v.tradePairId, this.userController.userId, v.isFavorite, this.userController.userToken)
    await this.store.changeFavorite(v.tradePairId, this.userController.userId, v.isFavorite, this.userController.userToken)
    // console.log('收藏 1', res)
  }

  get language() {
    return this.configController.language
  }

  get token() {
    return this.userController.userToken
  }

  // 市场下交易对
  async marketDataHandle() {
    //更新全部交易对信息
    await this.getTradePairHandle()
    //生成市场列表
    let homeMarket = [...new Set(this.store.pairInfo.map(v => v.marketName))].sort()
    //默认设置为第一市场
    this.store.setSelecedMarket(homeMarket[0])
    this.view.setState({
      marketDataHandle: homeMarket,
      market: homeMarket[0],
    });
    //生成交易对池
    this.store.setAllPair(this.store.pairInfo.map(v => Object.assign(v, {
      rise: 0,
      price: 0,
      priceCN: 0,
      priceEN: 0,
      volume: 0,
      isFavorite: 0,
      turnover: 0,
      points: [],
      coinName: v.tradePairName.split('/')[0]
    })))
    // console.log(homeMarket, this.store.allPair, homeMarket[0])
    //更新交易对池，只在第一次打开时，发送http请求更新
    let marketAll = await this.store.getMarketAll()
    // console.log('更新交易对池 0', JSON.stringify(marketAll))
    // console.log('更新交易对池 1', marketAll)
    this.store.updateAllPairListFromData(marketAll, 0)
    //请求收藏列表
    let collectIdArr = []
    if (this.userController.userToken) {
      collectIdArr = await this.store.getFavoriteList(this.userController.userToken, this.userController.userId)
    }
    this.store.updateAllPairListFromCollect(collectIdArr)


    // console.log('homeMarketPair', homeMarketPairData)
    //更新视图层
    this.updateMarketAll([], 2)
    // this.store.initWebsocket()


    // this.

    // pairMsg[market[0]]
    // allPairData.map(v => homeMarket.push(v.market_name));
    // let homeMarketPair = this.store.state.allPairData.filter(v => v.market_name === this.store.state.market)[0].market_data;
    // homeMarketPair.forEach(v => {
    //   let aaa = {isFavorite: collectIdArr.indexOf(v.tradePairId) > -1 ? 1 : 0}
    //   v = Object.assign(v, aaa);
    // })
    // this.view.setState({
    //   marketDataHandle: homeMarket,
    //   homeMarketPairData: homeMarketPair,
    // });
    // this.store.state.marketDataHandle = homeMarket;
    // this.store.state.homeMarketPairData = homeMarketPair;
    // this.tradePairSelect(homeMarketPair);
  }

  //更新MarketAll数据
  async updateMarketAll(List, type) {
    let arr = ['updateAllPairListFromCollect', 'updateAllPairListFromData'];
    // console.log('updateMarketAll', this.store, this.store.state)
    //根据数据更新allPair
    type < 2 && this.store[arr[type]](List)
    //根据市场从交易对池中选择该市场中的交易对
    let homeMarketPairData = await this.store.selectMarketData()
    this.view.setState({
      homeMarketPairData: this.sort(homeMarketPairData, this.store.sortValue, this.store.ascending),
    });
    if(this.view.state.query) {
      let pairMsg = await this.getTradePairHandle();
      let queryValue = this.view.state.query;
      if(queryValue.split('/').length === 1){
        this.view.state.marketDataHandle.indexOf(queryValue) !== -1 && (queryValue = `${pairMsg.pairNameMarket[queryValue][0]}/${queryValue}`) || (queryValue = `${queryValue}/${pairMsg.pairNameCoin[queryValue][0]}`);
        this.view.setState({query:queryValue})
      }
      this.changeMarket(queryValue.split('/')[1]);
      return
    }
    type > 1 && this.tradePairChange(homeMarketPairData[0]);
  }

  //更新recommend数据
  updateRecommend(data) {
    this.store.updateRecListFromData(data)
    this.getRecommendCoins()
  }

  //交易对的选中
  //   tradePairSelect(list) {
  //   let tradePair = list[0].tradePairName;
  //   this.view.setState({
  //     tradePair,
  //     tradePairId:list[0].tradePairId
  //   });
  //   this.store.state.tradePair = tradePair;
  //   this.TradeRecentController && this.TradeRecentController.setTradePairId(list[0].tradePairId);
  //   this.userOrderController && this.userOrderController.changeTradePairId(list[0].tradePairId)
  //   this.setDealMsg();
  // }

  //交易对的选中
  tradePairChange(value) {
    // console.log('tradePairChange',value)
    if(!value){
      return
    }
    this.view.setState({
      tradePair: value.tradePairName,
      tradePairId: value.tradePairId
    });
    this.store.state.tradePair = value.tradePairName;
    this.store.state.tradePairId = value.tradePairId;
    this.TradeRecentController && this.TradeRecentController.setTradePairId(value.tradePairId, value.tradePairName);
    this.TradeOrderListController && this.TradeOrderListController.joinRoom(value.tradePairName);
    this.userOrderController && this.userOrderController.changeTradePairId(value.tradePairId);
    this.assetController && this.assetController.setSimpleAsset({tradePairId: value.tradePairId});
    this.klineController && this.klineController.setPair(value.tradePairName.split("/")[0], value.tradePairName);
    this.setDealMsg();
    this.view.setState({
      query:''
    })
    // console.log('setTradePair....................................', value )
    // 为K线图设置交易对

  }

  clearRoom(){
    this.store.clearRoom()
  }

  get tradePair() {
    return {
      tradePairId: this.store.state.tradePairId,
      tradePairName: this.store.state.tradePair
    }
  }


  //排序功能
  pairSort(v, index) { // type 1 升序 0 降序
    let imgArr = ["/static/images/rank_down.svg", "/static/images/rank_up.svg"],
      tradeSortImg = ["/static/img/trade_rank_shang.svg", "/static/img/trade_rank_xia.svg"],
      sortArray = this.store.state.homeMarketPairData;

    this.store.setSort(v.sortValue, v.type)
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
    let result = this.filter(arr, item => item.coinName.toUpperCase().includes(value.toUpperCase()));
    return result;
  }

  // 点击收藏筛选数组
  getCollectArr() {
    console.log('this.store.collectData', this.store.collectData)
    return this.store.collectData
  }

  joinHome() {
    this.store.joinHome()
  }


  //为交易模块提供价格以及交易对的信息
  setDealMsg() {
    //改变deal模块中的信息
    console.log('this.store.state.homeMarketPairData', this.store.state.homeMarketPairData, this.store.state.tradePair)
    let tradePairMsg = this.store.state.homeMarketPairData.filter(v => v.tradePairName === this.store.state.tradePair),
      dealMsg = {
        tradePair: this.store.state.tradePair,
        coinIcon: tradePairMsg[0].icon,
        prices: {
          price: tradePairMsg[0].price,
          priceCN: tradePairMsg[0].priceCN,
          priceEN: tradePairMsg[0].priceEN,
        }
      };
    this.TradeDealController && this.TradeDealController.setPairMsg(dealMsg);
    this.TradePlanController && this.TradePlanController.tradePairHandle(this.store.state.tradePair, dealMsg.prices);
    this.TradeOrderListController && this.TradeOrderListController.getNewPrice(dealMsg)
  }

  setUnitsType(v) {
    this.view.setState({
      unitsType: v
    })
  }

  pairDataHandle() {

  }

  // 交易对名称以及id的处理
  async getTradePairHandle() {
    return await this.store.getPairMsg();
  }
  // 跳转选取交易对,location.query
  async querySelectPair(data){
    let pairMsg = await this.getTradePairHandle();
    let pairItems = data.split('/'),id;
    if(pairItems.length > 1){
      id = pairMsg.pairIdCoin[pairItems[0]][pairItems[1]];
      // this.changeMarket(pairItems[1]);
      this.tradePairChange({tradePairId:id,tradePairName:data});
      return
    }
    
  }
}