import React from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";

import "../stylus/orderItem.styl"

const orderStatusClass = {
  2: 'deal',
  3: 'cancel',
  5: 'end',
  6: 'partdeal',
  7: 'partdeal'
}

export default class OrderItem extends exchangeViewBase{
  constructor(props){
    super(props);
    this.state = {
      orderStatus: {
          0: this.intl.get("unDeal"),
          1: this.intl.get("partDeal"),
          2: this.intl.get("dealed"),
          3: this.intl.get("reseted"),
          4: this.intl.get("reseting"),
          5: this.intl.get("overed"),
          6: this.intl.get("partDeal"),
          7: this.intl.get("partDeal")
      }
    }

    this.controller = this.props.controller;

    this.goDetailDisplay = this.goDetailDisplay.bind(this);
  }
  componentWillMount(){

  }
  componentDidMount(){

  }
  goDetailDisplay() {
    if (this.props.type === "current") {
      this.props.setDetailsDisplay(this.props.index);
    } else {
      const orderStatus = this.props.orderInfo.orderStatus;
      if (orderStatus === 2 || orderStatus === 6 || orderStatus === 7) {
        this.props.setDetailsDisplay(this.props.index);
      }
    }
  }
  render(){
    const {type, orderInfo, index} = this.props;
    const tradePairName = orderInfo.tradePairName.toUpperCase();
    const tradePairArr = tradePairName.split('/');
    return(
        <div className='order-item'>
          <div className="order-item-head clearfix">
            <div className={`${orderInfo.orderType === 0 ? "buy" : "sell"} fl`}>
              <span className="way">{orderInfo.orderType === 0 ? this.intl.get("buy") : this.intl.get("sell")}</span>
              <span>{tradePairName}</span>
            </div>
            {type === "current" && <div className="time-current fl">{Number(orderInfo.orderTime).toDate('HH:mm MM-dd')}</div>}
            {type === "current" ? (
              <div className="cancel-current fr" onClick={() => {this.props.cancelOrder(index)}}>
                <img src="../../../../static/mobile/order/btn_chexiaoheibg@3x.png"/>
                <span>{this.intl.get("cancel")}</span>
              </div>
            ) : (
              <div className="info-history fr" onClick={this.goDetailDisplay}>
                <span className={orderStatusClass[orderInfo.orderStatus]}>{this.state.orderStatus[orderInfo.orderStatus]}</span>
                {(orderInfo.orderStatus === 2 || orderInfo.orderStatus === 6 || orderInfo.orderStatus === 7) && <img src="../../../../static/mobile/order/icon_qianjb@3x.png"/>}
              </div>
            )}
          </div>
          <div className="order-item-content clearfix" onClick={this.goDetailDisplay}>
            <div className="fl">
              <div>{type === "current" ? this.intl.get("price") : this.intl.get("time")}{type === "current" && ` (${tradePairArr[1]})`}</div>
              <div>{type==="current" ? orderInfo.price : Number(orderInfo.orderTime).toDate('HH:mm MM-dd')}</div>
            </div>
            <div className="fl">
              <div>{type === "current" ? this.intl.get("amount") : this.intl.get("dealPrice")}{type === "current" ? ` (${tradePairArr[0]})` : ` (${tradePairArr[1]})`}</div>
              {type === "current" && <div>{orderInfo.count}</div>}
              {type === "history" && <div>{orderInfo.priceType ? this.intl.get('marketPrice') : orderInfo.price}</div>}
            </div>
            <div className="fr">
              <div>{type === "current" ? this.intl.get("daelAmount") : this.intl.get("amount")}{` (${tradePairArr[0]})`}</div>
              <div>{type==="current" ? orderInfo.dealDoneCount : orderInfo.count}</div>
            </div>
          </div>
        </div>
    );
  }
}