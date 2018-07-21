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
      // 若orderList为undefined，则默认为空数组
      orderListArray: historyOrder && historyOrder.orderList || [],
      // total: historyOrder && this.view.state.page === 1 && historyOrder.totalCount || 0
    });
    historyOrder && this.view.state.page === 1 && (this.view.setState(
        {total: historyOrder.totalCount}
    ))
  }
  async exportHistory(type){
    let result = await this.store.getHistoryOrder({
      "tradePairId": [],
      "tradePairName": "xxx",
      "orderType": 2,
      "orderStatus": [2,3,4,5,6,7],
      "startTime": 0,
      "endTime": Math.floor(new Date().getTime() / 1000),
      "page": 0,
      "pageSize": 0
    });
    if (!result || !result.orderList || !result.orderList) return;
    let str;
    if (type === 'orderHistory'){
      // str = "时间,交易对,类型,价格,成交量,成交额,已成交,平均成交价,状态";
      str = `${this.view.intl.get("time")},${this.view.intl.get("pair")},${this.view.intl.get("notice-type")},${this.view.intl.get("price")},${this.view.intl.get("avgPrice")},${this.view.intl.get("total")},${this.view.intl.get("dealed")},${this.view.intl.get("avgPrice")},${this.view.intl.get("state")}`;
      result.orderList.forEach(v => {
        str +=
          "\n" +
          v.orderTime.toDate("yyyy-MM-dd HH:mm:ss") +
          "," +
          v.tradePairName +
          "," +
          (v.orderType ? this.view.intl.get('sell') : this.view.intl.get('buy')) +
          "," +
          (v.priceType ? this.view.intl.get('marketPrice') : v.price) +
          "," +
          v.count +
          "," +
          v.turnover +
          "," +
          v.dealDoneCount +
          "," +
          v.avgPrice +
          "," +
          this.view.state.orderStatusItems[v.orderStatus]
      });
      this.exportExcel(str, `${this.view.intl.get("order-history")}.xls`);
      return;
    }
    // str = "时间,交易对,类型,平均成交价,成交量,成交额,手续费";
      str = `${this.intl.get("time")},${this.intl.get("pair")},${this.intl.get("notice-type")},${this.intl.get("avgPrice")},${this.intl.get("volume")},${this.intl.get("total")},${this.intl.get("fee")}`;
      result.orderList.filter(v=>[ 2, 5, 6, 7].includes(v.orderStatus)).forEach(v => {
        str +=
          "\n" +
          v.orderTime.toDate("yyyy-MM-dd HH:mm:ss") +
          "," +
          v.tradePairName +
          "," +
          (v.orderType ? this.view.intl.get('sell') : this.view.intl.get('buy')) +
          "," +
          v.avgPrice +
          "," +
          v.count +
          "," +
          v.turnover +
          "," +
          v.fee
      });
      this.exportExcel(str, `${this.intl.get("order-deal")}.xls`);
      return;
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
    if(this.view.name !== 'tradeOrder')
      return
     let currentOrder = this.view.state.currentOrder;
     let historyOrder = this.view.state.historyOrder;
     // console.log('102102102102102102102', para)
     // let changeItem = currentOrder.find(v => v.orderId = para.orderId);
     let changeIndex = currentOrder.findIndex(v => JSON.stringify(v.orderId) === JSON.stringify(para.orderId));
     let historyIndex = historyOrder.findIndex(v => JSON.stringify(v.orderId) === JSON.stringify(para.orderId))
     // console.log('changeIndex', changeIndex, historyIndex)
     if((para.orderStatus === 0 || para.orderStatus === 1) && para.priceType === 0) {
       changeIndex !== -1 && currentOrder.splice(changeIndex, 1, para) || currentOrder.unshift(para);
        this.view.setState(currentOrder);
       // console.log('currentOrder22', currentOrder)
        return
     }
    para.priceType === 0 && changeIndex !== -1 && currentOrder.splice(changeIndex, 1);
     historyIndex !== -1 && historyOrder.splice(historyIndex, 1, para) || historyOrder.unshift(para);
    // console.log('currentOrder33', historyOrder)
     this.view.setState({
       historyOrder,
       currentOrder
     })
  }

  async cancelOrder(orderId, opType, dealType, tradePairId,v = 1) {
    let msg = await this.store.cancelOrder(orderId, opType, dealType, tradePairId);
    // console.log('xiadan', msg,orderId);
    let orderListArray = this.view.state.orderListArray
    if(orderListArray){
      let index = orderListArray.findIndex((item) => Number(item.orderId) === Number(orderId))
      orderListArray.splice(index,1)
      console.log(index,orderListArray)
      this.view.setState({
        orderListArray
      })
    }
    if(!v){
      this.view.setState({resetPopFlag:true}// 下单弹窗}
      );
    }
  }
}