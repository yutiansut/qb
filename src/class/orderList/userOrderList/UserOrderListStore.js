import OrderListStore from '../OrderListStore'

export default class UserOrderListStore extends OrderListStore {
  constructor() {
    super('userOrder', 'general');
    this.state = {
      currentOrder: [],
      orderListArray: [],
      currentArray: [],
      historyArray: [],
      dealArray: [],
      orderDetail: {}
    };
    this.WebSocket.general.on('userOrderUpdate', data => {
      let dataAf = {
        "tradePairId": data.id,
        "tradePairName": data.name,
        "orderType": data.ot,//订单类型 0买单 1卖单
        "priceType": data.pt,//市价限价 0限价 1市价
        "orderId": data.oi,
        "orderTime": data.t,
        "orderStatus": data.ost,
        "price": data.p,//数字币价格
        "count": data.c,//交易量
        "dealDoneCount": data.ddc,//已成交量
        "priceCN": data.pc,//人民币价格
        "priceEN": data.pe,//美元价格
        "avgPrice": data.ap,//成交均价
        "avgPriceCN": data.apc,
        "avgPriceEN": data.ape,
        "undealCount": data.c - data.ddc,//未成交量
        "turnover": data.to,//成交额
        "turnoverCN": data.toc,
        "turnoverEN": data.toe,
        "fee": data.fee//手续费
      }
      this.controller.updateUserOrder(dataAf);
      this.controller.TradeRecentController && this.controller.TradeRecentController.updateRecentOrderUser(dataAf)
    })
  }
  
  wsOrderList() {
    this.WebSocket.general.on('userOrderUpdate', data => {
    })
  }
  
  async getCurrentOrder(params) {
    let currentList = await this.Proxy.currentOrder(
        {
          token: this.controller.userController.userToken,
          tpd: params.idArray,
          tpn: 'xxx',
          ot: params.orderType,
        }
    );
    let currentListAf = currentList.ol.map(v => {
      return {
        "tradePairId": v.id,
        "tradePairName": v.name,
        "orderType": v.ot, //0买 1卖
        "priceType": v.pt, //0限价 1市价
        "orderId": v.oi,
        "orderTime": v.t,
        "orderStatus": v.ost,//订单状态 0未成交 1部分成交 2全部成交 3已撤单 4撤单中 5已结束(市价单独有的。市价买单没买到任何东西时) 6部分成交(市价单没买够) 7部分成交(限价单部分成交后撤单)
        "price": v.p,
        "count": v.c,//总的量
        "dealDoneCount": v.ddc,//已完成的量
        "priceCN": v.pc,
        "priceEN": v.pe,
        "avgPrice": v.ap,//平均价格
        "avgPriceCN": v.apc,
        "avgPriceEN": v.ape,
        "fee": v.fee//手续费
      }
    });
    this.state.currentOrder = currentList && currentListAf || [];
    return currentList && currentListAf || []
  };
  
  async getHistoryOrder(params) {
    let historyList = await this.Proxy.historyOrder(
        {
          token: this.controller.userController.userToken,
          tpd: params.idArray,
          ot: params.orderType,
          ost: params.orderStatus,
          st: params.startTime,
          et: params.endTime,
          p: params.page,
          s: params.pageSize
        }
    );
    let historyListAf = {
      orderList: histortList.ol.map(v => {
        return {
          "tradePairId": v.id,
          "tradePairName": v.na,
          "orderType": v.ot,//订单类型 0买  1卖
          "priceType": v.pt,//价格类型 0限价  1市价
          "orderId": v.oi,
          "orderTime": v.t,
          "orderStatus": v.ost,//订单状态 0未成交 1部分成交 2全部成交 3已撤单 4撤单中 5已结束(市价单独有的。市价买单没买到任何东西时) 6部分成交(市价单没买够) 7部分成交(限价单部分成交后撤单)
          "price": v.p,
          "count": v.c,//总量
          "dealDoneCount": v.ddc,//已成交的量
          "priceCN": v.pc,
          "priceEN": v.pe,
          "avgPrice": v.ap,//均价
          "avgPriceCN": v.apc,
          "avgPriceEN": v.ape,
          "undealCount": v.uc,//未成交的量
          "turnover": v.to,//成交额
          "turnoverCN": v.toc,
          "turnoverEN": v.toe,
          "fee": v.fee//手续费
        }
      }),
      "page": historyList.p,
      "totalCount": historyList.c
    };
    this.state.historyOrder = historyListAf;
    return historyListAf
  }
  
  //订单明细
  async getOrderDetail(id) {
    let orderDetail = await this.Proxy.orderDetail(
        {
          token: this.controller.userController.userToken,
          oi: id
        }
    );
    let orderDetailAf = {
      "orderId": orderDetail.oi,
      "orderType": orderDetail.ot,//订单类型0 买 1卖
      "tradePairId": orderDetail.id,
      "tradePairName": orderDetail.na,
      "orderStatus": orderDetail.ost,//订单状态 0未成交 1部分成交 2全部成交 3已撤单 4撤单中 5已结束(市价单独有的。市价买单没买到任何东西时) 6部分成交(市价单没买够) 7部分成交(限价单部分成交后撤单)
      "price": orderDetail.p,//价格
      "count": orderDetail.c,//数量
      "dealedMoney": orderDetail.dm,//已成交金额
      "doneCount": orderDetail.dc,//已成交的量
      "undoneCount": orderDetail.udc,//未成交的量
      "priceCN": orderDetail.pc,
      "priceEN": orderDetail.pe,
      "dealedMoneyCN": orderDetail.dmc,
      "dealedMoneyEN": orderDetail.dme,
      "fee": orderDetail.fee,
      "orderList": orderDetail.ol.map(v => {
        return {
          "orderTime": v.t,
          "price": v.p,
          "priceCN": v.pc,
          "priceEN": v.pe,
          "buyer": v.br,
          "seller": v.sr,
          "volume": v.vol,
          "turnover": v.to,
          "turnoverCN": v.toc,
          "turnoverEN": v.toe
        }
      })
    }
    this.state.orderDetail = orderDetailAf;
    return orderDetailAf
  }
  
  //撤单操作
  async cancelOrder(orderId, opType, dealType, tradePairId) {
    let msg = await this.Proxy.cancelOrder(
        {
          token: this.controller.userController.userToken,
          id: tradePairId,
          oi: orderId,
          ot: opType, //0默认 1买单全部  2卖单全部  3所有
          d: dealType
        }
    )
    console.log('receiveMSG', msg)
  }
}