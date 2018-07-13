import OrderListController from '../OrderListController.js'
import UserOrderListStore from './UserOrderListStore'

const order = {
  orderCurrent: 'currentOrder',
  orderHistory: 'historyOrder',
  orderDeal: 'historyOrder',
}
export default class UserOrderListController extends OrderListController {
  constructor(props) {
    super(props);
    this.store = new UserOrderListStore();
    this.store.setController(this)
  }

  setView(view) {
    super.setView(view)
  }

  // 数据的请求以及处理
  orderListHandle(type, params) {
    type === 'orderCurrent' && this.getCurrentOrder(type, params);
    type !== 'orderCurrent' && this.getHistoryOrder(type, params);
    // this.view.setState(
    //   type !== 'orderDeal' &&  {
    //   orderListArray: this.store.state[order[type]]
    // } || {
    //   orderListArray: this.store.state[order[type]].filter(v => v.orderStatus === 0)
    //     },
    // )
    // type === 'orderHistory' && this.view.setState(
    //     {preArray:  this.store.state[order[type]]}
    // )
  }

  changeTradePairId(value) {
    let idArray = [];
    idArray.push(value);
    // console.log(123123123123,idArray)
    let currentParams = {
      // 'userId': JSON.parse(this.userController.userId),
       idArray,
      "orderType": 2,
    };
    let historyParams = {
      // 'userId': JSON.parse(this.userController.userId),
       idArray,
      "orderType": 2,
      "orderStatus": [2, 3, 4, 5, 6, 7],
      // startTime: 1509484067,
      // endTime: 1530088867,
      "startTime": Math.floor(new Date().getTime() / 1000) - 7 * 24 * 60 * 60,
      "endTime": Math.floor(new Date().getTime() / 1000),
      "page": 1,
      "pageSize": 10
    };
    this.getCurrentOrder(false, currentParams);
    this.getHistoryOrder(false, historyParams);
  }

  async getCurrentOrder(trade, params) {
    let currentOrder = await this.store.getCurrentOrder(params);
    if (!trade) {
      this.view.setState({
        currentOrder
      });
      return
    }
    this.view.setState({
      orderListArray: currentOrder,
    })
  }

  async getHistoryOrder(trade, params) {
    let historyOrder = await this.store.getHistoryOrder(params);
    if (!trade) {
      this.view.setState({
        historyOrder: historyOrder && historyOrder.orderList || []
      });
      return
    }
    this.view.setState({
      orderListArray: historyOrder.orderList,
      total: historyOrder.totalCount
    })
  }

  async getOrderDetail(id) {
    let orderDetail = await this.store.getOrderDetail(id);
    this.view.setState({
      detailFlag: true,
      orderDetail
    })
  }

  wsOrderList(){
    this.store.wsOrderList();
  }

  updateUserOrder(para) {
    // let para = {
    //       "tradePairId": 2,
    //       "tradePairName": 1,
    //       "orderType": 0,//订单类型 0买  1卖
    //       "priceType": 1,//价格类型 0限价  1市价
    //       "oderId": 0,
    //       "orderTime": 947586000,
    //       "orderStatus": 0,//订单状态 0已成交 1部分成交  2未成交  3已撤销
    //       "price": 1.23,
    //       "count": 2.33,//总量
    //       "dealDoneCount": 1.99,//已成交的量
    //       "priceCN": 1.23,
    //       "priceEN": 1.23,
    //       "avgPrice": 1.22,//均价
    //       "avgPriceCN": 1.11,
    //       "avgPriceEN": 1.12,
    //       "undealCount": 0.34,//未成交的量
    //       "turnover": 23232.2,//成交额
    //       "turnoverCN": 23232.2,
    //       "turnoverEN": 23232.2,
    //       "fee": 0.04//手续费
    //     }
    // console.log('uupp', para,this.view.state.currentOrder,this.view.state.historyOrder)
     let currentOrder = this.view.state.currentOrder;
     let historyOrder = this.view.state.historyOrder;
     // let changeItem = currentOrder.find(v => v.orderId = para.orderId);
     let changeIndex = currentOrder.findIndex(v => JSON.stringify(v.orderId) === JSON.stringify(para.orderId));
     console.log('changeIndex', changeIndex)
     if(para.orderStatus === 0 || para.orderStatus === 1) {
       changeIndex !== -1 && currentOrder.splice(changeIndex, 1, para) || currentOrder.unshift(para);
        this.view.setState(currentOrder);
       // console.log('currentOrder22', currentOrder)
        return
     }
     currentOrder.splice(changeIndex, 1);
     historyOrder.unshift(para);
    // console.log('currentOrder33', historyOrder)
     this.view.setState({
       historyOrder,
       currentOrder
     })
  }

  async cancelOrder(orderId, opType, dealType, v = 1) {
    let msg = await this.store.cancelOrder(orderId, opType, dealType);
    console.log('xiadan', msg)
    if(!v){
      this.view.setState({resetPopFlag:true}// 下单弹窗}
      );
    }
  }
}