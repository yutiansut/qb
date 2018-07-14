import React from 'react';
import exchangeViewBase from '../../ExchangeViewBase';

import OrderHeader from './OrderHeader.jsx';
import OrderFilter from './OrderFilter.jsx';
import OrderItem from './OrderItem.jsx';
import OrderDetails from './OrderDetails.jsx';

export default class OrderCurrent extends exchangeViewBase{
  constructor(props){
    super(props);
    this.state = {
      displayType: 'list',
      idArray: [],  // 交易对
      orderType: 2, // 订单状态
      filterShow: false,
      viewIndex: 0,
      pairIdMsg : {}
    };
    const {controller} = props;
    controller.setView(this);
    this.state = Object.assign(this.state, controller.initState);

    this.getOrderList = this.getOrderList.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.orderSelect = this.orderSelect.bind(this);
    this.setListDisplay = this.setListDisplay.bind(this);
    this.setDetailsDisplay = this.setDetailsDisplay.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
  }
  componentWillMount(){
    this.getOrderList();
  }
  async componentDidMount(){
    let pairIdMsg = await this.props.controller.marketController.getTradePairHandle();
    this.setState(
        {pairIdMsg}
    )
  }

  // 获取当前订单数据
  getOrderList() {
    const {controller} = this.props;
    const params = {
      idArray: this.state.idArray,
      orderType: this.state.orderType,
    }
    controller.getCurrentOrder(true, params)
  }
  // 筛选下拉组件的显示与关闭
  changeFilter() {
    if (this.state.filterShow) {
      this.setState({filterShow: false});
    } else {
      this.setState({filterShow: true});
    }
  }
  // 根据筛选项获取订单数据
  orderSelect(filterPramas) {
    this.setState(filterPramas);
    this.setState({filterShow: false});
    setTimeout(() => {      // xmzxgd
      this.getOrderList();
    }, 0);
  }
  // 返回列表模式
  setListDisplay() {
    this.setState({displayType: 'list'})
  }
  // 进入详情模式
  setDetailsDisplay(index) {
    this.setState({viewIndex: index});
    this.setState({displayType: 'details'})
  }
  // 取消订单
  cancelOrder(index) {
    let v = this.state.orderListArray[index];
    let orderId, opType, dealType;
    orderId = JSON.parse(JSON.stringify(v.orderId)) ;
    opType = 0;
    dealType =v.orderType;
    this.props.controller.cancelOrder(orderId, opType, dealType)
  }
  render(){
    return (this.state.displayType === 'list' ? 
    (
      <div className='order-current'>
        <OrderHeader type="current" changeFilter={this.changeFilter} history={this.props.history}/>
        {this.state.filterShow && <OrderFilter type="current" pairIdMsg={this.state.pairIdMsg} orderSelect={this.orderSelect}/>}
        <div className="order-list">
          {this.state.orderListArray.map((order, index) => {
            return (
              <OrderItem type="current" index={index} key={index} orderInfo={order} cancelOrder={this.cancelOrder} setDetailsDisplay={this.setDetailsDisplay}/>
            )
          })}
        </div>
      </div>
    ) : (
      <OrderDetails type="current"  orderInfo={this.state.orderListArray[this.state.viewIndex]} setListDisplay={this.setListDisplay} controller={this.props.controller}/>
    ))
  }
}