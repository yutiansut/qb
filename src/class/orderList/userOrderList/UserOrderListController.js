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
  orderListHandle(type){
    this.view.setState(
      type !== 'orderDeal' &&  {
      orderListArray: this.store.state[order[type]]
    } || {
      orderListArray: this.store.state[order[type]].filter(v => v.orderStatus === 0)
        },
    )
    type === 'orderHistory' && this.view.setState(
        {preArray:  this.store.state[order[type]]}
    )
  }
}