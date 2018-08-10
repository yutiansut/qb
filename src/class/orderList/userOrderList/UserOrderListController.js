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
      this.store.state.currentOrder = currentOrder;
      // this.view.setState({
      //   currentOrder
      // });
      this.changeRenderUseOrder(0)
      return
    }
    this.view.setState({
      orderListArray: currentOrder,
    })
  }

  async getHistoryOrder(trade, params) {
    let historyOrder = await this.store.getHistoryOrder(params);
    if (!trade) {
      this.store.state.historyOrder = historyOrder;
      // this.view.setState({
      //   historyOrder: historyOrder && historyOrder.orderList || []
      // });
      this.changeRenderUseOrder(1)
      return
    }
    this.view.setState({
      // 若orderList为undefined，则默认为空数组
      orderListArray: historyOrder && historyOrder.orderList || [],
      // total: historyOrder && this.view.state.page === 1 && historyOrder.totalCount || 0
    });
    historyOrder && historyOrder.page === 1 && this.view.setState(
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
          (v.priceType ? this.view.intl.get('marketPrice') : v.price.format({style:{thousandSign:false}})) +
          "," +
          v.count.format({style:{thousandSign:false}}) +
          "," +
          (v.turnover.format({style:{thousandSign:false}}) + ' ' + v.tradePairName.split('/')[1].toUpperCase()) +
          "," +
          v.dealDoneCount.format({style:{thousandSign:false}}) +
          "," +
          v.avgPrice.format({style:{thousandSign:false}}) +
          "," +
          this.view.state.orderStatusItems[v.orderStatus]
      });
      this.exportExcel(str, `${this.view.intl.get("order-history")}.xls`);
      return;
    }
    // str = "时间,交易对,类型,平均成交价,成交量,成交额,手续费";
      str = `${this.view.intl.get("time")},${this.view.intl.get("pair")},${this.view.intl.get("notice-type")},${this.view.intl.get("avgPrice")},${this.view.intl.get("volume")},${this.view.intl.get("total")},${this.view.intl.get("fee")}`;
      console.log(result.orderList.filter(v=>[ 2, 5, 6, 7].includes(v.orderStatus)))
      result.orderList.filter(v=>[ 2, 5, 6, 7].includes(v.orderStatus)).forEach(v => {
        str +=
          "\n" +
          v.orderTime.toDate("yyyy-MM-dd HH:mm:ss") +
          "," +
          v.tradePairName +
          "," +
          (v.orderType ? this.view.intl.get('sell') : this.view.intl.get('buy')) +
          "," +
          v.avgPrice.format({style:{thousandSign:false}}) +
          "," +
          v.count.format({style:{thousandSign:false}}) +
          "," + (
          v.turnover.format({style:{thousandSign:false}}) + ' ' +  v.tradePairName.split('/')[1].toUpperCase()) +
          "," +
          v.fee.format({style:{thousandSign:false}}) + ' ' + (v.orderType ? v.tradePairName.split('/')[1].toUpperCase() : v.tradePairName.split('/')[0].toUpperCase())
      });
      console.log(str)
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
     let currentOrder = this.store.state.currentOrder;
     let historyOrder = this.store.state.historyOrder && this.store.state.historyOrder.orderList || [];
     let changeIndex = currentOrder.findIndex(v => JSON.stringify(v.orderId) === JSON.stringify(para.orderId));
     let historyIndex = historyOrder.findIndex(v => JSON.stringify(v.orderId) === JSON.stringify(para.orderId))
     if((para.orderStatus === 0 || para.orderStatus === 1) && para.priceType === 0) {
       changeIndex !== -1 && currentOrder.splice(changeIndex, 1, para) || currentOrder.unshift(para);
        // this.view.setState(currentOrder);
        this.store.state.currentOrder = currentOrder;
       this.changeRenderUseOrder(0)
        return
     }
    para.priceType === 0 && changeIndex !== -1 && currentOrder.splice(changeIndex, 1);
     historyIndex !== -1 && historyOrder.splice(historyIndex, 1, para) || historyOrder.unshift(para);
     this.store.state.historyOrder.orderList = historyOrder;
     this.store.state.currentOrder = currentOrder;
     // this.view.setState({
     //   historyOrder,
     //   currentOrder
     // })
    this.changeRenderUseOrder(2)
  }
  async cancelOrder(orderId, opType, dealType, tradePairId,v = 1) {
    let orderListArray = this.view.state.orderListArray;
    let msg = await this.store.cancelOrder(orderId, opType, dealType, tradePairId);
    if(orderListArray){
      let index = orderListArray.findIndex((item) => Number(item.orderId) === Number(orderId))
      orderListArray.splice(index,1)
      this.view.setState({
        orderListArray
      })
    }
    if(!v){
      this.view.setState({
        resetPopFlag:true,
        resetPopMsg: this.view.intl.get('cancel-successful')},// 下单弹窗}
      );
    }
  }
  setUnitsType(v){
    this.view.setState({
      unitsType: v
    });
    this.store.state.unitsType = v;
    this.changeRenderUseOrder(2)
  }
  changeRenderUseOrder(type){
  let historyOrder = this.store.state.historyOrder && this.store.state.historyOrder.orderList || [];
  let currentOrder = this.store.state.currentOrder;
  let unitsType = this.store.state.unitsType;
    let items = {
      CNY: 'priceCN',
      USD: 'priceEN'
    };
    let formatKey = (unitsType === "CNY" || unitsType === 'USD') ? 'legal' : 'digital';
    let formatProperty = (unitsType === "CNY" || unitsType === 'USD') ? 'legal' : 'property';
    let itemsAvg = {
      CNY: 'avgPriceCN',
      USD: 'avgPriceEN',
    };
    let itemsTurnover = {
      CNY: 'turnoverCN',
      USD: 'turnoverEN'
    };
    let formatObj = {
      digital: {number: 'digital', style: {decimalLength: this.accuracy.priceAccuracy}},
      legal: {number: 'legal', style: {name: unitsType && unitsType.toLowerCase()}},
      property: {number: 'property', style: {decimalLength: this.accuracy.priceAccuracy + this.accuracy.volumeAccuracy}}
    };
  if(type !== 1){
  currentOrder = currentOrder && currentOrder.map(v => {
    v.priceH = items[unitsType] ? v[items[unitsType]] : v.price;
    v.priceR = Number(v.priceH).format(formatObj[formatKey]);
    v.countR = Number(v.count).formatFixNumberForAmount(this.accuracy.volumeAccuracy, false);
    v.turnoverR = Number(Number(v.priceH).multi(v.count)).format(formatObj[formatProperty]);
    v.dealDoneCountR = Number(v.dealDoneCount).formatFixNumberForAmount(this.accuracy.volumeAccuracy, false);
    v.undealCountR = Number(v.undealCount).formatFixNumberForAmount(this.accuracy.volumeAccuracy, false);
    return v
  })
    this.view.setState({
      currentOrder
    })
  }
  if(type !== 0){
    historyOrder = historyOrder.slice(0,10);
    historyOrder = historyOrder && historyOrder.map(v => {
      v.priceH = items[unitsType] ? v[items[unitsType]] : v.price;
      v.priceR = Number(v.priceH).format(formatObj[formatKey]);
      v.countR = Number(v.count).formatFixNumberForAmount(this.accuracy.volumeAccuracy, false);
      v.dealDoneCountR = Number(v.dealDoneCount).formatFixNumberForAmount(this.accuracy.volumeAccuracy, false);
      v.undealCountR = Number(v.undealCount).formatFixNumberForAmount(this.accuracy.volumeAccuracy, false);
      v.avgPriceR = itemsAvg[unitsType] ? Number(v[itemsAvg[unitsType]]).format(formatObj.digital) : Number(v.avgPrice).toFixed(this.accuracy.priceAccuracy);
      v.turnoverH = itemsTurnover[unitsType] ? v[itemsTurnover[unitsType]] : v.turnover;
      v.turnoverR = Number(v.turnoverH).format(formatObj[formatProperty]);
      return v
    });
    this.view.setState({
      historyOrder
    })
  }
  }
}