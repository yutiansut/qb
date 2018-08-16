import ExchangeStoreBase from "../ExchangeStoreBase";

export default class MarketStore extends ExchangeStoreBase {
  constructor(name) {
    super('market', 'general');
    // console.log('MarketStore constructor')
    this.state = {
      allPairData: [],//全部交易对池
      recommendData: [],//推荐数据
      collectArr: [],//收藏数组
      selecedMarket: '',//选择市场 todo 和market有重复
      market: '',//选择市场
      recommendDataHandle: [],
      marketDataHandle: [],
      newMarketPair:[],
      mainMarketPair:[],
      homeMarketPairData: [],
      coin: '',
      sortValue: ['turnover'],//排序值
      ascending: 0,//是否升序， 0 否 1 是
      pairInfo: [],
      unitsType: '',
      pairMsg: {},
      tradePair: 'lsk/btc',
      coinInfo: {
        "id": 0,            // 币种id
        "name": "",      // 币种名
        "enName": "",   // 币种英文全称
        "cnName": "",  // 币种中文名
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
      qb: {},
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
        // console.log('getWebSocketData collectArr', data, this.controller, name)
        this.controller.updateMarketAll(data, 0)
      })
      // 监听市场数据更新
      this.WebSocket.general.on('marketPair', data => {
        // console.log('getWebSocketData marketPair', data, this.controller)
        let result = data && data.d && data.d.map(v => {
          return {
            points: v.ps,
            price: v.p,
            // priceCN: v.pc,
            // priceEN: v.pe,
            rise: v.r,
            tradePairId: v.id,
            tradePairName: v.n,
            turnover: v.to,
            volume: v.vol,
          }
        })
        this.controller.updateMarketAll(result, 1)
      });
      this.WebSocket.general.on('bankArr', data => {
        // console.log('dataaaaaaaaaaaaa',data.is)
        this.controller.updateMarketAll(data.is, 2)
      })
    }

    if (name === 'recommend') {
      // 监听推荐币种
      this.WebSocket.general.on('recommendCurrency', data => {
        // console.log('recommendCurrency', data, this.controller)
        let result = data && data.d && data.d.map(v=>{
          return {
            coinName: v.n,
            // priceCN: v.pc,
            // priceEN: v.pe,
            rise: v.r,
            coinId: v.id,
          }
        })
        // console.log('getWebSocketData', data, this.controller)
        this.controller.updateRecommend(result)
        // this.state.recommendData = result
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
  
  //设置选择的交易对
  setMarketDataHandle(data) {
    this.state.marketDataHandle = data
  }
  
  //得到选择的交易对
  get marketDataHandle() {
    return this.state.marketDataHandle
  }

  setAllPair(data) {
    // console.log('setAllPair 0', data)
    this.state.allPairData = data
    // console.log('setAllPair 1', this.state.allPairData)
  }

  setSort(sortValue, ascending) {
    this.state.sortValue = sortValue
    this.state.ascending = ascending
  }

  get sortValue() {
    return this.state.sortValue
  }

  get ascending() {
    return this.state.ascending
  }


  get allPair() {
    return this.state.allPairData
  }

  //从交易对池中拿到收藏数据
  get collectData() {
    // console.log('this.state.allPairData', this, this.state.allPairData)
    return this.state.allPairData.filter(v => v.isFavorite).sort((a, b) => a.collectIndex - b.collectIndex)
  }


  //收藏变动更新列表
  updateAllPairListFromCollect(list = []) {
    this.state.allPairData = this.state.allPairData.map(v => Object.assign(v, list.includes(v.tradePairId) && {
      isFavorite: 1,
      collectIndex: list.indexOf(v.tradePairId)
    } || {isFavorite: 0}))
  }

  //数据变动更新列表
  updateAllPairListFromData(list, type = 1) {
    list && list.length && (this.state.allPairData = this.state.allPairData.map(v => {
      let res = list.find(vv => vv.tradePairId === v.tradePairId);
      if (!res) {
        return v
      }
      //除第一次外需要计算增长值改变字体颜色
      if (type) {
        res.updown = (res.price - v.price) || v.updown;
        res.priceCNY = res.price * v.priceCN;
        res.priceUSD = res.price * v.priceEN;
      }
      res.points = (res.points && res.points.length) && res.points || v.points
      return Object.assign(v, res)
    }))
  }

  //数据变动更新推荐币种
  updateRecListFromData(list) {
    list && list.length && (this.state.recommendData = this.state.recommendData.map(v => Object.assign(v, list.find(vv => vv.coinId === v.coinId) || {})))
  }
// 汇率变化更新
  updateAllPairListFromBank(list) {
    list && list.length && (this.state.allPairData = this.state.allPairData.map(v => {
      let res = list.find(vv => vv.na === v.marketName);
      v.priceCN = res.cr;
      v.priceEN = res.ur;
      v.priceCNY = res.cr * v.price;
      v.priceUSD = res.ur * v.price;
      return Object.assign(v)
    }));
  }
  
  setHomeMarketPairData(homeMarketPairData) {
    this.state.homeMarketPairData = homeMarketPairData
  }

  //根据选择的市场筛选出交易对
  async selectMarketData() {
    if (this.selecedMarket === '收藏区') {
      this.state.homeMarketPairData = this.collectData
      return this.collectData
    }
    //根据选择市场从pair里拿到id，再从allPairData中取出数据
    let pairMsg = await this.getPairMsg()
    let coinNameList = pairMsg.pairNameMarket[this.selecedMarket] || []
    this.state.homeMarketPairData = coinNameList.map(v => this.state.allPairData.find(vv => vv.tradePairId === pairMsg.pairIdMarket[this.selecedMarket][v]));
    return this.state.homeMarketPairData
  }


  getRecommendCurrency() {
    // console.log('getData recommendCurrency', this.WebSocket)
    // this.WebSocket.general.emit('recommendCurrency', {test:'test'})

  }

  //加入房间
  joinHome() {
    this.WebSocket.general.emit('joinRoom', {f: '', t: 'home'})
  }

  //退出房间
  clearRoom() {
    this.WebSocket.general.emit('joinRoom', {f: 'home', t: ''})
  }

  //清除websocket历史记录
  clearHistory() {
    this.WebSocket.general.clearWebsocketHistoryArr('joinRoom')
  }


  //收藏接口
  async changeFavorite(tradePairId, userId, operateType, token) {
    await this.Proxy.changeFavorite({
      ty: operateType, //0添加 1取消
      id: tradePairId,
      token
    });
    // console.log('收藏 0', tradePairId, userId, operateType)
  }

  async getRecommendCoins() {
    // console.log('getRecommendCoins', this.state.recommendData.length)
    if (!this.state.recommendData.length) {
      let result = await this.Proxy.getRecommendCoins()
      // console.log('this.state.recommendData', result)
      this.state.recommendData = result && result.d.map(v=>{
        return {
          coinName: v.n,
          priceCN: v.pc,
          priceEN: v.pe,
          rise: v.r,
          coinId: v.id,
        }
      }) || []
    }
    return this.state.recommendData
  }

  //币种资料
  async getCoinInfo(coinId) {
    let r = await this.Proxy.coinInfo({cf: coinId});
    r.n && (this.state.coinInfo = {
      "id": r.id,            // 币种id
      "name": r.n,      // 币种名
      "enName": r.ne,   // 币种英文全称
      "cnName": r.nc,  // 币种中文名
      "icon": r.ic,        // 币种符号
      "logo_url": r.lu,//币种logo
      "webSite": r.ws,
      "whitePaper": r.wp,
      "blockSites": r.bs,
      "description": r.des,  //币种简介
      "releaseTime": r.rt,  // 发行时间
      "totalVolume": r.tv,   // 总发行量
      "circulationVolume": r.cv,  // 流通量
      "priceCN": r.pc,  // 人民币价格
      "priceEN": r.pe,  // 美元价格
      "totalValueCN": r.tvc,   // 人民币总市值
      "totalValueEN": r.tve, // 美元总市值
      "icoPriceCN": r.ipc,              // 人民币ico价格
      "icoPriceEN": r.ipe  // 美元ico价格
    });
  }
  async getQb() {
    let r = await this.Proxy.getQb();
    r.d && (this.state.qb = r);
  }
  //收藏列表
  async getFavoriteList(token) {
    this.state.collectArr = await this.Proxy.getFavoriteList({
      token
    });
    if (!(this.state.collectArr instanceof Array)) {
      this.state.collectArr = [];
    }
    return this.state.collectArr
  }

  //全部交易对
  async getPairInfo() {
    let pairInfo = await this.Proxy.pairInfo();
    this.state.pairInfo = pairInfo && pairInfo.l && pairInfo.l.map(v => {
      return {
        tradePairName: v.n,
        tradePairId: v.id,
        marketName: v.mn,
        coinIcon : v.i,
        priceAccuracy: v.pb,
        isNew: v.new,
        volumeAccuracy: v.vb
      }
    }) || []
    // this.state.pairMsg = this.formatPairMsg(pairInfo)
    return this.state.pairInfo
  }

  get pairInfo() {
    return this.state.pairInfo
  }

  async getMarketAll() {
    let marketAll = await this.Proxy.getAllChg();
    // console.log('marketAll', marketAll)
    // this.state.allPairData = marketAll.marketList
    return marketAll && marketAll.d && marketAll.d.map(v => {
      return {
        points: v.ps,
        price: v.p,
        // priceCN: v.pc,
        // priceEN: v.pe,
        rise: v.r,
        tradePairId: v.id,
        tradePairName: v.n,
        turnover: v.to,
        volume: v.vol,
        highestPrice: v.hp,
        lowestPrice: v.lp,
        priceY: v.op
      }
    }) || []
    // console.log('arr',arr)
    // console.log('marketAll.items',marketAll.items)
    // return arr
  }

  //或区域交易对信息
  async getPairMsg() {
    let coinCorrespondingId = {}, marketCorrespondingId = {}, coinCorrespondingPair = {}, marketCorrespondingPair = {};
    // console.log(Object.keys(this.state.pairInfo).length)
    if (!this.state.pairInfo.length) {
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
  
  //获取当前汇率接口
  async getBank(){
    let bank = await this.Proxy.getBank();
    this.state.bank = bank && bank.is;
    return bank.is
  }
}
