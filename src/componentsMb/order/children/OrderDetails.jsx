import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";

import "../stylus/orderDetails.styl"
import { userInfo } from "os";

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
  0: 'end',
  1: 'partdeal',
  2: 'deal',
  3: '已撤销',
  4: '撤单中',
  5: '已结束',
  6: 'partdeal',
};

export default class orderDetails extends exchangeViewBase{
  constructor(props){
    super(props);
    this.state = {};
    const {orderInfo, controller} = this.props
    controller.setView(this)
    this.state = Object.assign(this.state, controller.initState);
    
    controller.getOrderDetail(orderInfo.orderId);
    setTimeout(() => {
      console.log("9999999999",this.state.orderDetail);
    }, 5000);
  }
  componentWillMount(){
  }
  componentDidMount(){
  }
  render(){
    const orderDetail = this.state.orderDetail;
    const type = this.props.type;
    const tradePairName = this.props.orderInfo.tradePairName.toUpperCase();
    const tradePairArr = tradePairName.split('/');
    return(
      <div className="order-details">
        <div className="order-details-header">
          <div className="back" onClick={() => {this.props.setListDisplay()}}>
            <img src="../../../../static/img/order/Back Copy@3x.png"/>
            <span>返回</span>
          </div>
          <div className="name">成交明细</div>
        </div>
        <div className="order-details-info">
          <h1>{orderDetail.orderType === 0 ? "买入" : "卖出"}{tradePairName}</h1>
          <h2 className={orderStatusClass[orderDetail.orderStatus]}>{orderStatus[orderDetail.orderStatus]}</h2>
          <div className="info-item clearfix">
            <span className="fl">订单类型</span>
            <span className="fr">{type === "current" ? "当前订单" : "历史订单"}</span>
          </div>
          <div className="info-item clearfix">
            <span className="fl">{type === "current" ? "价格" : "成交均价"}</span>
            <span className="fl">({tradePairArr[1]})</span>
            <span className="fr">{orderDetail.price}</span>
          </div>
          <div className="info-item clearfix">
            <span className="fl">{type === "current" ? "数量" : "成交量"}</span>
            <span className="fl">({tradePairArr[0]})</span>
            <span className="fr">{orderDetail.doneCount}</span>
          </div>
          <div className="info-item clearfix">
            <span className="fl">{type === "current" ? "成交金额" : "成交总额"}</span>
            <span className="fl">({tradePairArr[1]})</span>
            <span className="fr">{orderDetail.dealedMoney}</span>
          </div>
          {orderDetail.orderStatus !== 0 && <div className="info-item clearfix">
            <span className="fl">手续费</span>
            <span className="fl">({tradePairArr[0]})</span>
            <span className="fr">{orderDetail.fee}</span>
          </div>}
          {type === "current" && <div className="info-item clearfix">
            <span className="fl">已成交</span>
            <span className="fl">({tradePairArr[0]})</span>
            <span className="fr">{orderDetail.doneCount}</span>
          </div>}
          {type === "current" && <div className="info-item clearfix">
            <span className="fl">尚未成交</span>
            <span className="fl">({tradePairArr[0]})</span>
            <span className="fr">{orderDetail.undoneCount}</span>
          </div>}
        </div>
        {type === "history" && <div className="order-deal-info">
          <h3>成交详情</h3>
          <table>
            <tr className="clearfix">
              <th className="fl set-width">日期</th>
              <th className="fl">成交价</th>
              <th className="fr">成交量</th>
            </tr>
            {orderDetail.orderList && orderDetail.orderList.map((order, index) => {
              return (
                <tr className="clearfix" key={index}>
                  <td className="fl set-width">{order.orderTime}</td>
                  <td className="fl">{order.price}</td>
                  <td className="fr">{order.turnover}</td>
                </tr>
              )
            })}
          </table>
        </div>}
      </div>
    )
  }
}