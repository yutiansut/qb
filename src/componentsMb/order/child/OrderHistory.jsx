import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";

import OrderItem from "./OrderItem.jsx"
import OrderHeader from "./OrderHeader.jsx"
import OrderFilter from "./OrderFilter.jsx"
import OrderDetails from "./OrderDetails.jsx"

export default class OrderHistory extends exchangeViewBase{
  constructor(props){
    super(props);
    const {controller} = props;
    this.state = {
      idArray: [],
      orderType: 2,
      orderStatus: [2, 3, 5, 6],
      startTime: Math.floor(new Date().getTime() / 1000) - 1000 * 24 * 60 * 60,
      endTime: Math.floor(new Date().getTime() / 1000),
      page: 1,
      pageSize: 100,
      filterShow: false,
      displayType: "list",
      viewIndex: 0,
      pairIdMsg : {},
    };
    controller.setView(this)
    this.state = Object.assign(this.state, controller.initState);

    this.changeFilter = this.changeFilter.bind(this);
    this.getOrderList = this.getOrderList.bind(this);
    this.orderSelect = this.orderSelect.bind(this);
    this.setDetailsDisplay = this.setDetailsDisplay.bind(this);
    this.setListDisplay = this.setListDisplay.bind(this);
  }
  componentWillMount(){
    this.getOrderList()
  }
  async componentDidMount(){
    let pairIdMsg = await this.props.controller.marketController.getTradePairHandle();
    this.setState(
        {pairIdMsg}
    )
  }
  getOrderList() {
    const {controller} = this.props;
    const params = {
      idArray: this.state.idArray,
      orderType: this.state.orderType,
      orderStatus: this.state.orderStatus,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      page: this.state.page,
      pageSize: this.state.pageSize
    }
    controller.getHistoryOrder(true, params)

    setTimeout(() => {
      console.log(this.state.orderListArray)
    }, 5000);
  }
  changeFilter() {
    if (this.state.filterShow) {
      this.setState({filterShow: false});
    } else {
      this.setState({filterShow: true});
    }
  }
  orderSelect(filterPramas) {
    this.setState(filterPramas);
    this.setState({filterShow: false});
    setTimeout(() => {
      this.getOrderList();
    }, 0);
  }
  setListDisplay() {
    this.setState({displayType: "list"})
  }
  setDetailsDisplay(index) {
    console.log('index1111111111111111', index)
    this.setState({viewIndex: index});
    this.setState({displayType: "details"})
  }
  render(){
    const displayType = this.state.displayType;
    return(displayType ==="list" ? (
      <div className='order-history'>
        <OrderHeader type="history" changeFilter={this.changeFilter}/>
        {this.state.filterShow && <OrderFilter type="history" pairIdMsg={this.state.pairIdMsg} orderSelect={this.orderSelect}/>}
        <div className="order-list">
          {this.state.orderListArray.map((order, index) => {
            return (
              <OrderItem type="history" index={index} setDetailsDisplay={this.setDetailsDisplay} orderInfo={order} key={index}/>
            )
          })}
        </div>
      </div>
    ) : (
      <OrderDetails type="history" setListDisplay={this.setListDisplay} orderInfo={this.state.orderListArray[this.state.viewIndex]} controller={this.props.controller}/>
    ))
  }
}