import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";

import "../stylus/orderHeader.styl"

export default class OrderHeader extends exchangeViewBase{
  constructor(props){
    super(props);
  }
  componentWillMount(){
  }
  componentDidMount(){
  }
  render(){
    return(
        <div className='order-header clearfix'>
          <div className="back fl" onClick={() =>{alert('返回函数还没写！')}}>
            <img src="../../../../static/img/order/Back@3x.png"/>
            <span>返回</span>
          </div>
          <div className="name">{this.props.type === "current" ? "当前订单" : "历史订单"}</div>
          <div className="filter fr" onClick={() =>{this.props.changeFilter()}}>
            <img src="../../../../static/img/order/nav_shaixuan@3x.png"/>
          </div>
        </div>
    )
  }
}