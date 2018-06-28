import ExchangeStoreBase from '../ExchangeStoreBase'

export default class OrderListStore extends ExchangeStoreBase {
  constructor(props) {
    super(props)
    this.state = {
      recentTradeListMa:[
        {
          "tradePairId": 1,
          "tradePairName": "ETH/BTC",
          "dealTime": 947586000,
          "price": 0.122789,
          "priceCN": 1.122789,
          "priceEN": 2.122789,
          "volume": 3.178,
          "orderType": 0 //订单类型0买 1卖
        },
        {
          "tradePairId": 1,
          "tradePairName": "ETH/BTC",
          "dealTime": 947586000,
          "price": 0.122789,
          "priceCN": 1.122789,
          "priceEN": 2.122789,
          "volume": 23.178,
          "orderType": 0
        },
        {
          "tradePairId": 1,
          "tradePairName": "ETH/BTC",
          "dealTime": 947586000,
          "price": 0.122789,
          "priceCN": 1.122789,
          "priceEN": 2.122789,
          "volume": 13.178,
          "orderType": 0
        }
      ],
      recentTradeListMi:[
        {
          "tradePairId": 1,
          "tradePairName": "ETH/BTC",
          "dealTime": 947586000,
          "price": 0.122789,
          "priceCN": 1.122789,
          "priceEN": 2.122789,
          "volume": 3.178,
          "orderType": 0 //订单类型0买 1卖
        },
        {
          "tradePairId": 1,
          "tradePairName": "ETH/BTC",
          "dealTime": 947586000,
          "price": 0.122789,
          "priceCN": 1.122789,
          "priceEN": 2.122789,
          "volume": 23.178,
          "orderType": 0
        },
        {
          "tradePairId": 1,
          "tradePairName": "ETH/BTC",
          "dealTime": 947586000,
          "price": 0.122789,
          "priceCN": 1.122789,
          "priceEN": 2.122789,
          "volume": 13.178,
          "orderType": 0
        }
      ],
      recentTradeListArr: [],
      recentItemSelect: 'mineLess',
      unitsType: '',
      market:'',
      coin:''
    }
  }
}