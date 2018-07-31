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
  }

  changeTradePairId(value) {
    let idArray = [];
    idArray.push(value);
    let currentParams = {
       idArray,
      "orderType": 2,
    };
    let historyParams = {
       idArray,
      "orderType": 2,
      "orderStatus": [2, 3, 4, 5, 6, 7],
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
    historyOrder && this.view.state.page === 1 && this.view.setState(
        {total: historyOrder.totalCount}
    )
  }
  async exportHistory(type){
    let result = await this.store.getHistoryOrder({
      "tradePairId": [],
      "tradePairName": "xxx",
      "orderType": 2,
      "orderStatus": [2,3,4,5,6,7],
      "startTime": 0,
      "endTime": Math.floor(new Date().getTime() / 1000),
      "page": 1,
      "pageSize": 0
    });
    if (!result || !result.orderList || !result.orderList) return;
    let str;
    if (type === 'orderHistory'){
      // str = "时间,交易对,类型,价格,成交量,成交额,已成交,平均成交价,状态";
      str = `${this.view.intl.get("time")},${this.view.intl.get("pair")},${this.view.intl.get("notice-type")},${this.view.intl.get("price")},${this.view.intl.get("amount")},${this.view.intl.get("total")},${this.view.intl.get("dealed")},${this.view.intl.get("avgPrice")},${this.view.intl.get("state")}`;
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
      str = `${this.view.intl.get("time")},${this.view.intl.get("pair")},${this.view.intl.get("notice-type")},${this.view.intl.get("avgPrice")},${this.view.intl.get("volume")},${this.view.intl.get("total")},${this.view.intl.get("fee")}`;
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
          v.fee + (v.orderType ? v.tradePairName.split('/')[1].toUpperCase() : v.tradePairName.split('/')[0].toUpperCase())
      });
      this.exportExcel(str, `${this.view.intl.get("order-deal")}.xls`);
      return;
  }
  async getOrderDetail(id) {
    let orderDetail =  await this.store.getOrderDetail(id);
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
     let changeIndex = currentOrder.findIndex(v => JSON.stringify(v.orderId) === JSON.stringify(para.orderId));
     let historyIndex = historyOrder.findIndex(v => JSON.stringify(v.orderId) === JSON.stringify(para.orderId))
     if((para.orderStatus === 0 || para.orderStatus === 1) && para.priceType === 0) {
       changeIndex !== -1 && currentOrder.splice(changeIndex, 1, para) || currentOrder.unshift(para);
        this.view.setState(currentOrder);
        return
     }
    para.priceType === 0 && changeIndex !== -1 && currentOrder.splice(changeIndex, 1);
     historyIndex !== -1 && historyOrder.splice(historyIndex, 1, para) || historyOrder.unshift(para);
     this.view.setState({
       historyOrder,
       currentOrder
     })
  }
  async cancelOrder(orderId, opType, dealType, tradePairId,v = 1) {
    let msg = await this.store.cancelOrder(orderId, opType, dealType, tradePairId);
    let orderListArray = this.view.state.orderListArray
    if(orderListArray){
      let index = orderListArray.findIndex((item) => Number(item.orderId) === Number(orderId))
      orderListArray.splice(index,1)
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