import OrderListStore from '../OrderListStore'

export default class TradeOrderListStore extends OrderListStore{
  constructor(props) {
    super(props);
    this.state={
      liveTradeList: {
        buy: [
          {
            id:0,
            "price": 1025.22,
            "priceCN": 1023.22,
            "priceEN": 1023.22,
            "currDepth": 123444.34,
            "turnover": 1111
          },       {
            id:1,
            "price": 1024.22,
            "priceCN": 1023.22,
            "priceEN": 1023.22,
            "currDepth": 123444.34,
            "turnover": 1111
          },       {
            id:2,
            "price": 1023.22,
            "priceCN": 1023.22,
            "priceEN": 1023.22,
            "currDepth": 123444.34,
            "turnover": 1111
          }
        ],
        sell: [
          {
            id:3,
            "price": 1025.22,
            "priceCN": 1023.22,
            "priceEN": 1023.22,
            "currDepth": 123444.34,
            "turnover": 1111
          },       {
            id:4,
            "price": 1024.22,
            "priceCN": 1023.22,
            "priceEN": 1023.22,
            "currDepth": 123444.34,
            "turnover": 1111
          },       {
            id:5,
            "price": 1023.22,
            "priceCN": 1023.22,
            "priceEN": 1023.22,
            "currDepth": 123444.34,
            "turnover": 1111
          }
        ],
      },
      liveBuyArray:[],
      liveSellArray:[],
      recentTradeList: [
        {
          "tradePairId": 1,
          "tradePairName": "ETH/BTC",
          "dealTime": 947586000,
          "price": 0.122789,
          "volume": 3.178,
          "orderType": 0 //订单类型0买 1卖
        },
        {
          "tradePairId": 1,
          "tradePairName": "ETH/BTC",
          "dealTime": 947586000,
          "price": 0.132789,
          "volume": 23.178,
          "orderType": 0
        },
        {
          "tradePairId": 1,
          "tradePairName": "ETH/BTC",
          "dealTime": 947586000,
          "price": 0.142789,
          "volume": 13.178,
          "orderType": 0
        }
      ]
    }
  }
}