import OrderListStore from '../OrderListStore'

export default class TradeOrderListStore extends OrderListStore{
  constructor() {
    super('userOrder', 'general');
    this.state={
      changeFlag: true,
      room: '',
      liveTradeList: {
        buy: [
          {
            id:0,
            "price": 1025.22,
            "priceCN": 1111.22,
            "priceEN": 1222.22,
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
            "price": 4,
            "priceCN": 2,
            "priceEN": 1,
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
    this.WebSocket.general.on('joinRoom', data => {
      console.log('joinRoom getWebSocketData', data, this.controller)
      // this.controller.updateRecommend(data.data)
      // this.recommendData = data.data
    });
    this.WebSocket.general.on('tradeDepth', data => {
      console.log(this.controller,'tradeDepth getWebSocketData', data);
      this.controller.liveTradeListHandle(data)
      // this.controller.kdepthController && this.controller.kdepthController.setData(data);todo: 放开
      // this.controller.updateRecommend(data.data)
      // this.recommendData = data.data
    })
  }

  emitTradeOrderWs(from , to){
    this.WebSocket.general.emit('joinRoom', {from, to});
  }
  async getDepth(tradePairName) {
    let orderListArray = await this.Proxy.getDepth(
        {
          'tradePairName': tradePairName,
          "level":0 //深度 可传6,5,4,3
        }
    );
    this.state.liveTrade = orderListArray;
    // this.controller.kdepthController && this.controller.kdepthController.setData(orderListArray);todo:放开
    return orderListArray
  }
  getWebSocketData() {
    console.log('getData', this.WebSocket)
    this.WebSocket.general.on('tradeDepth', data => {
      console.log('tradeDepth getWebSocketData', data)
      // this.controller.updateRecommend(data.data)
      // this.recommendData = data.data
    })
  }
}