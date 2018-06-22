import OrderListController from '../OrderListController.js'
import UserOrderListStore from  './UserOrderListStore'

export default class UserOrderListController extends OrderListController{
  constructor(props){
    super(props);
    this.store = new UserOrderListStore()
  }
  setView(view){
    super.setView(view)
  }
}