import ExchangeStoreBase from '../ExchangeStoreBase'

export default class MarketStore extends ExchangeStoreBase {
  constructor() {
    super();
    this.state = {
      allPairData: [
        {"market_name": "BTC",
          "market_data": [
            {
              "trade_pair_id": 1,
              "rise": -0.22,
              "price": 1023.22,
              "priceCN": 1023.22,
              "priceEN": 1023.22,
              "volume": 123444.34,
              "coin_name": "ETH",
              "market_name": "BTC",
              "trade_pair": "ETH/BTC",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 1111
            },
            {
              "trade_pair_id": 2,
              "rise": -0.12,
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "volume": 133444.34,
              "coin_name": "LSK",
              "market_name": "BTC",
              "trade_pair": "LSK/BTC",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 2222
            },
            {
              "trade_pair_id": 2,
              "rise": -0.12,
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "volume": 133444.34,
              "coin_name": "LSK",
              "market_name": "BTC",
              "trade_pair": "LSK/BTC",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 2222
            },
            {
              "trade_pair_id": 2,
              "rise": -0.12,
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "volume": 133444.34,
              "coin_name": "LSK",
              "market_name": "BTC",
              "trade_pair": "LSK/BTC",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 2222
            },
            {
              "trade_pair_id": 2,
              "rise": -0.12,
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "volume": 133444.34,
              "coin_name": "LSK",
              "market_name": "BTC",
              "trade_pair": "LSK/BTC",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 2222
            },
            {
              "trade_pair_id": 2,
              "rise": -0.12,
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "volume": 133444.34,
              "coin_name": "LSK",
              "market_name": "BTC",
              "trade_pair": "LSK/BTC",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 2222
            },
            {
              "trade_pair_id": 2,
              "rise": -0.12,
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "volume": 133444.34,
              "coin_name": "LSK",
              "market_name": "BTC",
              "trade_pair": "LSK/BTC",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 2222
            },
            {
              "trade_pair_id": 2,
              "rise": -0.12,
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "volume": 133444.34,
              "coin_name": "LSK",
              "market_name": "BTC",
              "trade_pair": "LSK/BTC",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 2222
            },
            {
              "trade_pair_id": 2,
              "rise": -0.12,
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "volume": 133444.34,
              "coin_name": "LSK",
              "market_name": "BTC",
              "trade_pair": "LSK/BTC",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 2222
            },
            {
              "trade_pair_id": 2,
              "rise": -0.12,
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "volume": 133444.34,
              "coin_name": "LSK",
              "market_name": "BTC",
              "trade_pair": "LSK/BTC",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 2222
            },
            {
              "trade_pair_id": 2,
              "rise": -0.12,
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "volume": 133444.34,
              "coin_name": "LSK",
              "market_name": "BTC",
              "trade_pair": "LSK/BTC",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 2222
            },
            {
              "trade_pair_id": 2,
              "rise": -0.12,
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "volume": 133444.34,
              "coin_name": "LSK",
              "market_name": "BTC",
              "trade_pair": "LSK/BTC",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 2222
            }
          ]},
        {"market_name": "ETH",
          "market_data": [
            {
              "trade_pair_id": 3,
              "rise": -0.22,
              "price": 1023.22,
              "priceCN": 1023.22,
              "priceEN": 1023.22,
              "volume": 123444.34,
              "coin_name": "BTC",
              "market_name": "ETH",
              "trade_pair": "BTC/ETH",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 3333
            },
            {
              "trade_pair_id": 4,
              "rise": -0.12,
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "volume": 133444.34,
              "coin_name": "BNB",
              "market_name": "ETH",
              "trade_pair": "BNB/ETH",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 4444
            }
          ]},
        {"market_name": "USDT",
          "market_data": [
            {
              "trade_pair_id": 5,
              "rise": -0.22,
              "price": 1023.22,
              "priceCN": 1023.22,
              "priceEN": 1023.22,
              "volume": 123444.34,
              "coin_name": "BTC",
              "market_name": "USDT",
              "trade_pair": "BTC/USDT",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 5555
            },
            {
              "trade_pair_id": 6,
              "rise": -0.12,
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "volume": 133444.34,
              "coin_name": "BNB",
              "market_name": "USDT",
              "trade_pair": "BNB/USDT",
              "is_favorite": false,
              "is_new_born": false,
              "turnover": 6666
            }
          ]}
      ],
        recommendData: [
          {
            'coin_name': 'BTC',
            'coin_data':{
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "rise": -0.12,
            }
          },
          {
            'coin_name': 'USD',
            'coin_data':{
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "rise": -0.12,
            }
          },
          {
            'coin_name': 'EYH',
            'coin_data':{
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "rise": -0.12,
            }
          },
          {
            'coin_name': 'ETH',
            'coin_data':{
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "rise": -0.12,
            }
          },
          {
            'coin_name': 'USDT',
            'coin_data':{
              "price": 1023.22,
              "priceCN": 1022.22,
              "priceEN": 1021.22,
              "rise": -0.12,
            }
          }
        ],
      // recommendData: {
      //   btc: ['BNB/BTC', 'LSK/BTC'],
      //   eth: ['BTC/ETH', 'EOS/ETH'],
      //   usdt: ['BTC/USDT']
      // },
      recommendDataHandle: [],
      marketDataHandle: [],
      homeMarketPairData:[],
      market:'BTC',
      tradePair:''
    }
  }
}