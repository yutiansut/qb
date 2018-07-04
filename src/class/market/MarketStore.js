import ExchangeStoreBase from "../ExchangeStoreBase";

export default class MarketStore extends ExchangeStoreBase {
  constructor(name) {
  super('market', 'general');
    this.state = {
      allPairData: [
        {
          market_name: "BTC",
          market_data: [
            {
              tradePairId: 3,
              rise: -0.22,
              price: 1023.22,
              priceCN: 1023.22,
              priceEN: 1023.22,
              volume: 123444.34,
              coin_name: "ETH",
              market_name: "BTC",
              trade_pair: "ETH/BTC",
              is_favorite: true,
              is_new_born: false,
              turnover: 1111
            },
            {
              trade_pair_id: 2,
              rise: -0.12,
              price: 1023.22,
              priceCN: 1022.22,
              priceEN: 1021.22,
              volume: 133444.34,
              coin_name: "LSK",
              market_name: "BTC",
              trade_pair: "LSK/BTC",
              is_favorite: false,
              is_new_born: false,
              turnover: 2222
            }
          ]
        },
        {
          market_name: "ETH",
          market_data: [
            {
              tradePairId: 3,
              rise: -0.22,
              price: 1023.22,
              priceCN: 1023.22,
              priceEN: 1023.22,
              volume: 123444.34,
              coin_name: "BTC",
              market_name: "ETH",
              trade_pair: "BTC/ETH",
              is_favorite: false,
              is_new_born: false,
              turnover: 3333
            },
            {
              tradePairId: 4,
              rise: -0.12,
              price: 1023.22,
              priceCN: 1022.22,
              priceEN: 1021.22,
              volume: 133444.34,
              coin_name: "BNB",
              market_name: "ETH",
              trade_pair: "BNB/ETH",
              is_favorite: false,
              is_new_born: false,
              turnover: 4444
            }
          ]
        },
        {
          market_name: "USDT",
          market_data: [
            {
              tradePairId: 5,
              rise: -0.22,
              price: 1023.22,
              priceCN: 1023.22,
              priceEN: 1023.22,
              volume: 123444.34,
              coin_name: "BTC",
              market_name: "USDT",
              trade_pair: "BTC/USDT",
              is_favorite: false,
              is_new_born: false,
              turnover: 5555
            },
            {
              tradePairId: 6,
              rise: -0.12,
              price: 1023.22,
              priceCN: 1022.22,
              priceEN: 1021.22,
              volume: 133444.34,
              coin_name: "BNB",
              market_name: "USDT",
              trade_pair: "BNB/USDT",
              is_favorite: false,
              is_new_born: false,
              turnover: 6666
            }
          ]
        }
      ],
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
      // recommendData: {
      //   btc: ['BNB/BTC', 'LSK/BTC'],
      //   eth: ['BTC/ETH', 'EOS/ETH'],
      //   usdt: ['BTC/USDT']
      // },
      collectArr:[],
      recommendDataHandle: [],
      marketDataHandle: [],
      homeMarketPairData:[],
      market:'BTC',
      coin:'',
      tradePair:'',
      unitsType:'',
      coinInfo: {
        fullName: "BitCoin",
        coinName: "BTC",
        createdTime: 947586000,
        totalCount: 21000000,
        marketCount: 11000000,
        crowdfunding: 1.1,
        website: "www.baidu.com",
        blockSite: "www.baidu.com",
        introduction: "wwwwwww",
        enName: "string",
        logo: "url",
        webSite: "url",
        whitePaper: "url",
        blockSites: "url",
        description: "string",
        releaseTime: "string",
        price: {
          cny: 42744.613840365026,
          usd: 6603.502018124614,
          btc: 1.0088212447399139,
          eth: 12.734116540105735
        },
        totalVolume: 21000000,
        circulationVolume: 21000000,
        totalValue: {
          cny: 897636890647.6655,
          usd: 138673542380.61688,
          btc: 21185246.13953819,
          eth: 267416447.34222043
        },
        icoPrice: {
          cny: 0,
          usd: 0,
          btc: 0,
          eth: 0
        }
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
  }


  getRecommendCurrency() {
    console.log('getData recommendCurrency', this.WebSocket)
    this.WebSocket.general.emit('recommendCurrency', {test:'test'})
    this.WebSocket.general.on('recommendCurrency', data => {
      console.log('getWebSocketData', data, this.controller)
      this.controller.updateRecommend(data.data)
      this.recommendData = data.data
    })
  }

  getMarketPair() {
    console.log('getData marketPair', this.WebSocket)
    this.WebSocket.general.on('marketPair', data => {
      console.log('getWebSocketData', data, this.controller)
      // this.controller.updateRecommend(data.data)
      // this.recommendData = data.data
    })
    this.WebSocket.general.emit('joinRoom', {from:'', to:'home'})
  }

  changeFavorite(tradePairId, userId, operateType) {
    this.Proxy.changeFavorite({
      operateType, //0添加 1取消
      tradePairId,
      userId
    });
    // console.log('收藏 0', tradePairId, userId, operateType)
  }

  async getCoinInfo(){
    this.store.state.coinInfo = await this.Proxy.coinInfo({userId:3});
  }
  async getPairInfo(){
    let pairInfo = await this.Proxy.pairInfo(
    );
    this.store.state.coinInfo = pairInfo.list;
    return pairInfo.list
  }
}
