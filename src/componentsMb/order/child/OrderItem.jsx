import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch
} from "react-router-dom";
import exchangeViewBase from "../../ExchangeViewBase";

import "../stylus/orderItem.styl"

const orderStatus = {
  0: '未成交',
  1: '部分成交',
  2: '已成交',
  3: '已撤销',
  4: '撤单中',
  5: '已结束',
  6: '部分成交',
};
const orderStatusClass = {
  2: 'deal',
  3: 'cancel',
  5: 'end',
  6: 'partdeal'
}

export default class OrderItem extends exchangeViewBase{
  constructor(props){
    super(props);
    this.controller = this.props.controller;
  }
  componentWillMount(){
  
  }
  componentDidMount(){
    
  }
  render(){
    const {type, orderInfo, index} = this.props;
    const tradePairName = orderInfo.tradePairName.toUpperCase();
    const tradePairArr = tradePairName.split('/');
    return(
        <div className='order-item'>
          <div className="order-item-head clearfix">
            <div className={`${orderInfo.orderType === 0 ? "buy" : "sell"} fl`}>
              <span className="way">{orderInfo.orderType === 0 ? "买入" : "卖出"}</span>
              <span>{tradePairName}</span>
            </div>
            {type === "current" && <div className="time-current fl">{orderInfo.orderTime}</div>}
            {type === "current" ? (
              <div className="cancel-current fr">
                <img src="../../../../static/img/order/btn_chexiaoheibg@3x.png"/>
                <span className="">撤销</span>
              </div>
            ) : (
              <div className="info-history fr" onClick={() => {this.props.setDetailsDisplay(index)}}>
                <span className={orderStatusClass[orderInfo.orderStatus]}>{orderStatus[orderInfo.orderStatus]}</span>
                {(orderInfo.orderStatus === 2 || orderInfo.orderStatus === 6) && <img src="../../../../static/img/order/icon_qianjb@3x.png"/>}
              </div>
            )}
          </div>
          <div className="order-item-content clearfix" onClick={() => {this.props.setDetailsDisplay(index)}}>
            <div className="fl">
              <div>{type === "current" ? "价格" : "时间"}{type === "current" ? ` (${tradePairArr[1]})` : ""}</div>
              <div>{type==="current" ? orderInfo.price : orderInfo.orderTime}</div>
            </div>
            <div className="fl">
              <div>{type === "current" ? "数量" : "成交价"}{type === "current" ? ` (${tradePairArr[0]})` : ` (${tradePairArr[1]})`}</div>
              <div>{type==="current" ? orderInfo.count : orderInfo.price}</div>
            </div>
            <div className="fr">
              <div>{type === "current" ? "实际成交" : "数量"}{` (${tradePairArr[0]})`}</div>
              <div>{type==="current" ? orderInfo.dealDoneCount : orderInfo.count}</div>
            </div>
          </div>
        </div>
    );
  }
}