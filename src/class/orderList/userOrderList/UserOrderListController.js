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
    let currentParams = {
      // 'userId': JSON.parse(this.userController.userId),
      "tradePairId": idArray,
      "orderType": 2,
    };
    let historyParams = {
      // 'userId': JSON.parse(this.userController.userId),
      "tradePairId": idArray,
      "orderType": 2,
      "orderStatus": [1, 2, 3, 4, 5, 6],
      startTime: 1509484067,
      endTime: 1530088867,
      // "startTime": new Date().getTime() - 7 * 24 * 60 * 60,
      // "endTime": new Date().getTime(),
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
        historyOrder: historyOrder.orderList
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
}