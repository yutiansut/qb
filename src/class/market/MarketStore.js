import ExchangeStoreBase from "../ExchangeStoreBase";

export default class MarketStore extends ExchangeStoreBase {
  constructor(name) {
    super('market', 'general');
    console.log('MarketStore constructor')
    this.state = {
      allPairData: [],
      recommendData: [
        {
          coinName: 'BTC',
          priceCN: 1022.22,
          priceEN: 1021.22,
          rise: 0.3,

        },
        {
          coinName: 'USD',
          priceCN: 1022.22,
          priceEN: 1021.22,
          rise: -0.12,

        },
        {
          coinName: 'EYH',
          priceCN: 1022.22,
          priceEN: 1021.22,
          rise: -0.12,

        },
        {
          coinName: 'ETH',
          priceCN: 1022.22,
          priceEN: 1021.22,
          rise: -0.12,

        },
        {
          coinName: 'USDT',
          priceCN: 1022.22,
          priceEN: 1021.22,
          rise: -0.12,
        }
      ],
      collectArr: [],
      selecedMarket: '',
      recommendDataHandle: [],
      marketDataHandle: [],
      homeMarketPairData: [],
      market: '',
      coin: '',
      tradePair: '',
      pairInfo: {},
      unitsType: '',
      pairMsg: {},
      coinInfo: {
        "id": 4,            // 币种id
        "name": "eth",      // 币种名
        "enName": "Ethereum",   // 币种英文全称
        "cnName": "以太坊",  // 币种中文名
        "icon": "",        // 币种符号
        "logo_url": "",//币种logo
        "webSite": [],
        "whitePaper": [],
        "blockSites": [],
        "description": "",  //币种简介
        "releaseTime": 0,  // 发行时间
        "totalVolume": 0,   // 总发行量
        "circulationVolume": 0,  // 流通量
        "priceCN": 0,  // 人民币价格
        "priceEN": 0,  // 美元价格
        "totalValueCN": 0,   // 人民币总市值
        "totalValueEN": 0, // 美元总市值
        "icoPriceCN": 0,              // 人民币ico价格
        "icoPriceEN": 0  // 美元ico价格

      },
      "list": [
        {
          "tradePairId": 0,
          "tradePairName": "usd/btc"
        },
        {
          "tradePairId": 1,
          "tradePairName": "btc/lsk"
        },
        {
          "tradePairId": 2,
          "tradePairName": "btc/bch"
        },
        {
          "tradePairId": 3,
          "tradePairName": "btc/eth"
        },
        {
          "tradePairId": 4,
          "tradePairName": "usd/xas"
        }]

    };
    if (name === 'market') {
      // 监听收藏
      this.WebSocket.general.on('collectArr', data => {
        console.log('getWebSocketData', data, this.controller, name)
        this.controller.updateMarketAll(data, 0)
      })
      // 监听市场数据更新
      this.WebSocket.general.on('marketPair', data => {
        console.log('getWebSocketData', data, this.controller)
        this.controller.updateMarketAll(data, 1)
      })
    }

    if (name === 'recommend') {
      // 监听推荐币种
      this.WebSocket.general.on('recommendCurrency', data => {
        console.log('getWebSocketData', data, this.controller)
        this.controller.updateRecommend(data.data)
        this.recommendData = data.data
      })
    }

  }

  //设置选择的交易对
  setSelecedMarket(data) {
    this.state.market = data
  }

  //得到选择的交易对
  get selecedMarket() {
    return this.state.market
  }

  setAllPair(data) {
    // console.log('setAllPair 0', data)
    this.state.allPairData = data
    // console.log('setAllPair 1', this.state.allPairData)
  }

  get allPair() {
    return this.state.allPairData
  }

  //收藏变动更新列表
  updateAllPairListFromCollect(list) {
    // console.log('updateAllPairListFromCollect 0', this, this.allPair, list)
    // list && list.length && list.forEach(v => this.allPair.find(vv => vv.tradePairId === v).isFavorite = 1)
    list && list.length && (this.state.allPairData = this.state.allPairData.map(v => Object.assign(v, list.includes(v.tradePairId) && {isFavorite: 1} || {isFavorite: 0})))
    // console.log('updateAllPairListFromCollect 1', this.allPair)
  }

  //数据变动更新列表
  updateAllPairListFromData(list) {
    console.log('updateAllPairListFromData 0', this.state.allPairData, list)
    list && list.length && (this.state.allPairData = this.state.allPairData.map(v => Object.assign(v, list.find(vv => vv.tradePairId === v.tradePairId) || {})))
    console.log('updateAllPairListFromData 1', this.state.allPairData)
  }

  //根据选择的市场筛选出交易对
  async selectMarketData() {
    //根据选择市场从pair里拿到id，再从allPairData中取出数据
    let pairMsg = await this.getPairMsg()
    // console.log(pairMsg, this.selecedMarket)
    let coinNameList = pairMsg.pairNameMarket[this.selecedMarket]
    this.state.homeMarketPairData = coinNameList.map(v => this.state.allPairData.find(vv => vv.tradePairId === pairMsg.pairIdMarket[this.selecedMarket][v]))
    return this.state.homeMarketPairData
  }

  getRecommendCurrency() {
    // console.log('getData recommendCurrency', this.WebSocket)
    // this.WebSocket.general.emit('recommendCurrency', {test:'test'})

  }

  getMarketPair() {
    // console.log('getData marketPair', this.WebSocket)

    this.WebSocket.general.emit('joinRoom', {from: '', to: 'home'})
  }

  async changeFavorite(tradePairId, userId, operateType, token) {
    await this.Proxy.changeFavorite({
      operateType, //0添加 1取消
      tradePairId,
      userId,
      token
    });
    // console.log('收藏 0', tradePairId, userId, operateType)
  }

  async getCoinInfo(coinId) {
    this.state.coinInfo = await this.Proxy.coinInfo({coinId});
  }

  async getFavoriteList(token, userId) {
    this.state.collectArr = await this.Proxy.getFavoriteList({
      userId,
      token
    });
    return this.state.collectArr
  }

  async getPairInfo() {
    let pairInfo = await this.Proxy.pairInfo();
    console.log('getPairInfo', pairInfo)
    this.state.pairInfo = pairInfo.list
    // this.state.pairMsg = this.formatPairMsg(pairInfo)
    return pairInfo.list
  }

  get pairInfo() {
    return this.state.pairInfo
  }

  async getMarketAll() {
    let marketAll = await this.Proxy.getAllChg();
    // console.log(marketAll)
    // this.state.allPairData = marketAll.marketList
    return marketAll.items
  }

  async getPairMsg() {
    let coinCorrespondingId = {}, marketCorrespondingId = {}, coinCorrespondingPair = {}, marketCorrespondingPair = {};
    // console.log(Object.keys(this.state.pairInfo).length)
    if (!Object.keys(this.state.pairInfo).length) {
      await this.getPairInfo()
    }
    this.state.pairInfo.map((v) => {
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
