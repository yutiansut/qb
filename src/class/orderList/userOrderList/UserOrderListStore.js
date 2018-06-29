import OrderListStore from '../OrderListStore'

export default class UserOrderListStore extends OrderListStore {
  constructor() {
    super('userOrder');
    this.state = {
      // currentOrder: [
      //   {
      //     "tradePairId": 2,
      //     "tradePairName": 1,
      //     "orderType": 0, //0买 1卖
      //     "priceType": 0, //0限价 1市价
      //     "orderId": 0,
      //     "orderTime": 947586000,
      //     "orderStatus": 0,//订单状态 0已成交 1部分成交  2未成交  3已撤销
      //     "price": 11.23,
      //     "count": 2.33,//总的量
      //     "dealDoneCount": 1.99,//已完成的量
      //     "priceCN": 21.23,
      //     "priceEN": 31.23,
      //     "avgPrice": 1.22,//平均价格
      //     "avgPriceCN": 1.11,
      //     "avgPriceEN": 1.12,
      //     "undealCount": 0.34,
      //     "turnover": 2323.2,//成交额
      //     "turnoverCN": 3222.223,
      //     "turnoverEN": 3322.22
      //   },
      //   {
      //     "tradePairId": 2,
      //     "tradePairName": 1,
      //     "orderType": 1,
      //     "priceType": 0,
      //     "oderId": 0,
      //     "orderTime": 947586000,
      //     "orderStatus": 1,
      //     "price": 1.23,
      //     "count": 2.33,
      //     "dealDoneCount": 1.99,
      //     "priceCN": 1.23,
      //     "priceEN": 1.23,
      //     "avgPrice": 1.22,
      //     "avgPriceCN": 1.11,
      //     "avgPriceEN": 1.12,
      //     "undealCount": 0.34,
      //     "turnover": 2323.2,
      //     "turnoverCN": 22.223,
      //     "turnoverEN": 22.22
      //   },
      //   {
      //     "tradePairId": 2,
      //     "tradePairName": 1,
      //     "orderType": 0,
      //     "priceType": 0,
      //     "oderId": 0,
      //     "orderTime": 947586000,
      //     "orderStatus": 2,
      //     "price": 1.23,
      //     "count": 2.33,
      //     "dealDoneCount": 1.99,
      //     "priceCN": 1.23,
      //     "priceEN": 1.23,
      //     "avgPrice": 1.22,
      //     "avgPriceCN": 1.11,
      //     "avgPriceEN": 1.12,
      //     "undealCount": 0.34,
      //     "turnover": 2323.2,
      //     "turnoverCN": 22.223,
      //     "turnoverEN": 22.22
      //   },
      //   {
      //     "tradePairId": 2,
      //     "tradePairName": 1,
      //     "orderType": 0,
      //     "priceType": 0,
      //     "oderId": 0,
      //     "orderTime": 947586000,
      //     "orderStatus": 2,
      //     "price": 1.23,
      //     "count": 2.33,
      //     "dealDoneCount": 1.99,
      //     "priceCN": 1.23,
      //     "priceEN": 1.23,
      //     "avgPrice": 1.22,
      //     "avgPriceCN": 1.11,
      //     "avgPriceEN": 1.12,
      //     "undealCount": 0.34,
      //     "turnover": 2323.2,
      //     "turnoverCN": 22.223,
      //     "turnoverEN": 22.22
      //   },
      //   {
      //     "tradePairId": 2,
      //     "tradePairName": 1,
      //     "orderType": 0,
      //     "priceType": 0,
      //     "oderId": 0,
      //     "orderTime": 947586000,
      //     "orderStatus": 1,
      //     "price": 1.23,
      //     "count": 2.33,
      //     "dealDoneCount": 1.99,
      //     "priceCN": 1.23,
      //     "priceEN": 1.23,
      //     "avgPrice": 1.22,
      //     "avgPriceCN": 1.11,
      //     "avgPriceEN": 1.12,
      //     "undealCount": 0.34,
      //     "turnover": 2323.2,
      //     "turnoverCN": 22.223,
      //     "turnoverEN": 22.22
      //   }
      // ],
      currentOrder:[],
      historyOrder: [
        {
          "tradePairId": 2,
          "tradePairName": 1,
          "orderType": 0,//订单类型 0买  1卖
          "priceType": 1,//价格类型 0限价  1市价
          "oderId": 0,
          "orderTime": 947586000,
          "orderStatus": 0,//订单状态 0已成交 1部分成交  2未成交  3已撤销
          "price": 1.23,
          "count": 2.33,//总量
          "dealDoneCount": 1.99,//已成交的量
          "priceCN": 1.23,
          "priceEN": 1.23,
          "avgPrice": 1.22,//均价
          "avgPriceCN": 1.11,
          "avgPriceEN": 1.12,
          "undealCount": 0.34,//未成交的量
          "turnover": 23232.2,//成交额
          "turnoverCN": 23232.2,
          "turnoverEN": 23232.2,
          "fee": 0.04//手续费
        },
        {
          "tradePairId": 2,
          "tradePairName": 1,
          "orderType": 1,
          "priceType": 0,
          "oderId": 0,
          "orderTime": 947586000,
          "orderStatus": 0,
          "price": 1.23,
          "count": 2.33,
          "dealDoneCount": 1.99,
          "priceCN": 1.23,
          "priceEN": 1.23,
          "avgPrice": 1.22,
          "avgPriceCN": 1.11,
          "avgPriceEN": 1.12,
          "undealCount": 0.34,
          "turnover": 23232.2,
          "turnoverCN": 23232.2,
          "turnoverEN": 23232.2,
          "fee": 0.04
        },
        {
          "tradePairId": 2,
          "tradePairName": 1,
          "orderType": 0,//订单类型 0买  1卖
          "priceType": 0,//价格类型 0限价  1市价
          "oderId": 0,
          "orderTime": 947586000,
          "orderStatus": 1,//订单状态 0已成交 1部分成交  2未成交  3已撤销
          "price": 1.23,
          "count": 2.33,//总量
          "dealDoneCount": 1.99,//已成交的量
          "priceCN": 1.23,
          "priceEN": 1.23,
          "avgPrice": 1.22,//均价
          "avgPriceCN": 1.11,
          "avgPriceEN": 1.12,
          "undealCount": 0.34,//未成交的量
          "turnover": 23232.2,//成交额
          "turnoverCN": 23232.2,
          "turnoverEN": 23232.2,
          "fee": 0.04//手续费
        },
        {
          "tradePairId": 2,
          "tradePairName": 1,
          "orderType": 0,
          "priceType": 0,
          "oderId": 0,
          "orderTime": 947586000,
          "orderStatus": 3,
          "price": 1.23,
          "count": 2.33,
          "dealDoneCount": 1.99,
          "priceCN": 1.23,
          "priceEN": 1.23,
          "avgPrice": 1.22,
          "avgPriceCN": 1.11,
          "avgPriceEN": 1.12,
          "undealCount": 0.34,
          "turnover": 23232.2,
          "turnoverCN": 23232.2,
          "turnoverEN": 23232.2,
          "fee": 0.04
        }
      ],
      orderListArray:[],
      currentArray:[],
      historyArray:[],
      dealArray:[],
    }
    
  }
  async getCurrentOrder(){
    let currentList = await this.Proxy.currentOrder(
        {
          "userId": 20001,
          "tradePairId": 10001,
          "tradePairName": "xxx",
          "orderType": 2,
          "hideOther": 0
        }
    );
    this.state.currentOrder = currentList.orderList
    return currentList.orderList
  };
  async getHistoryOrder(){
    let historyList = await this.Proxy.historyOrder(
        {
          "userId": 20001,
          "tradePairId": 0,
          "tradePairName": "xxx",
          "orderType": 2,
          "orderStatus": [0,1,4],
          "startTime": 1509484067,
          "endTime": 1690088867,
          "page":1,
          "pageSize":20
        }
    );
    this.state.historyOrder = historyList.orderList;
    return historyList.orderList
  }
}