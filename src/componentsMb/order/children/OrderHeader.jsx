import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";
import NavLink from "react-router-dom";

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
          <div className="back fl" onClick={() =>{this.props.history.goBack()}}>
            <img src="../../../../static/img/order/Back@3x.png"/>
            <span>{this.intl.get("back")}</span>
          </div>
          <div className="name">{this.props.type === "current" ? this.intl.get("order-current") : this.intl.get("order-history")}</div>
          {this.props.type === "current" && <div className="history fr">
            <img src="../../../../static/img/order/nav_lishidingdan@3x.png" onClick={() => {this.props.history.replace({pathname: '/morder/history'})}}/>
          </div>}
          <div className="filter fr" onClick={() =>{this.props.changeFilter()}}>
            <img src="../../../../static/img/order/nav_shaixuan@3x.png"/>
          </div>
        </div>
    )
  }
}