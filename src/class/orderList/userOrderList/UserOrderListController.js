import OrderListController from '../OrderListController.js'
import UserOrderListStore from  './UserOrderListStore'

const order = {
  orderCurrent: 'currentOrder',
  orderHistory: 'historyOrder',
  orderDeal: 'historyOrder',
}
export default class UserOrderListController extends OrderListController{
  constructor(props){
    super(props);
    this.store = new UserOrderListStore()
  }
  setView(view){
    super.setView(view)
  }
  // 数据的请求以及处理
  orderListHandle(type, params){
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
  async getCurrentOrder(trade, params){
    let currentOrder = await this.store.getCurrentOrder(params);
    if(!trade){
      this.view.setState({
        currentOrder
      });
      return
    }
    this.view.setState({
      orderListArray: currentOrder,
    })
  }
  async getHistoryOrder(trade, params){
    let historyOrder = await this.store.getHistoryOrder(params);
    if(!trade){
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
  async getOrderDetail(id){
    let orderDetail = await this.store.getOrderDetail(id);
    this.view.setState({
      detailFlag: true,
      orderDetail
    })
  }
}