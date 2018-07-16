import React from 'react';
import exchangeViewBase from '../../ExchangeViewBase';

import '../stylus/orderDetails.styl';

const orderStatus = {
  0: '未成交',    // 当前订单——未成交
  1: '部分成交',  // 当前订单——部分成交
  2: '已成交',    // 历史订单——已成交
  6: '部分成交',  // 历史订单——部分成交
};
const orderStatusClass = {
  0: 'end',       // 当前订单——未成交
  1: 'partdeal',  // 当前订单——部分成交
  2: 'deal',      // 历史订单——已成交
  6: 'partdeal',  // 历史订单——部分成交
};

export default class OrderDetails extends exchangeViewBase {
  constructor(props){
    super(props);
    this.state = {};

    const {orderInfo, controller} = this.props;
    controller.setView(this);
    this.state = Object.assign(this.state, controller.initState);
    controller.getOrderDetail(orderInfo.orderId);
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
            <span>{this.intl.get("back")}</span>
          </div>
          <div className="name">{this.intl.get("orderDetail")}</div>
        </div>
        <div className="order-details-info">
          <h1>{orderDetail.orderType === 0 ? this.intl.get("buy") : this.intl.get("sell")}{tradePairName}</h1>
          <h2 className={orderStatusClass[orderDetail.orderStatus]}>{orderStatus[orderDetail.orderStatus]}</h2>
          <div className="info-item clearfix">
            <span className="fl">{this.intl.get("orderType")}</span>
            <span className="fr">{type === "current" ? this.intl.get("order-current") : this.intl.get("order-history")}</span>
          </div>
          <div className="info-item clearfix">
            <span className="fl">{type === "current" ? this.intl.get("price") : this.intl.get("avgDealPrice")}</span>
            <span className="fl">({tradePairArr[1]})</span>
            <span className="fr">{orderDetail.price}</span>
          </div>
          <div className="info-item clearfix">
            <span className="fl">{type === "current" ? this.intl.get("amount") : this.intl.get("volume")}</span>
            <span className="fl">({tradePairArr[0]})</span>
            <span className="fr">{type === "current" ? orderDetail.count : orderDetail.doneCount}</span>
          </div>
          <div className="info-item clearfix">
            <span className="fl">{type === "current" ? this.intl.get("order-deal-money") : this.intl.get("dealTurnover")}</span>
            <span className="fl">({tradePairArr[1]})</span>
            <span className="fr">{orderDetail.dealedMoney}</span>
          </div>
          {orderDetail.orderStatus !== 0 && <div className="info-item clearfix">
            <span className="fl">{this.intl.get("fee")}</span>
            <span className="fl">({tradePairArr[0]})</span>
            <span className="fr">{orderDetail.fee}</span>
          </div>}
          {type === "current" && <div className="info-item clearfix">
            <span className="fl">{this.intl.get("dealed")}</span>
            <span className="fl">({tradePairArr[0]})</span>
            <span className="fr">{orderDetail.doneCount}</span>
          </div>}
          {type === "current" && <div className="info-item clearfix">
            <span className="fl">{this.intl.get("order-unDeal")}</span>
            <span className="fl">({tradePairArr[0]})</span>
            <span className="fr">{orderDetail.undoneCount}</span>
          </div>}
        </div>
        {type === "history" && <div className="order-deal-info">
          <h3>{this.intl.get("orderDetail")}</h3>
          <table>
            <tr className="clearfix">
              <th className="fl set-width">{this.intl.get("date")}</th>
              <th className="fl">{this.intl.get("dealPrice")}</th>
              <th className="fr">{this.intl.get("volume")}</th>
            </tr>
            {orderDetail.orderList && orderDetail.orderList.map((order, index) => {
              return (
                <tr className="clearfix" key={index}>
                  <td className="fl set-width">{Number(order.orderTime).toDate('HH:mm MM/dd')}</td>
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