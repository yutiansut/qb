import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";
import assetController from "../../../class/asset/AssetController"
import "../style/chargeMessage.styl";

export default class ChargeMessage extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.controller = new assetController();
    this.state = {
      top1: 0,
      top2: 100
    }
  }

  componentDidMount() {
    this.controller.swiper('carousel', this, 'top1', 'top2', [0, 100], 10, 3000)
  }
  componentWillUnmount() {
    this.controller.swiperStop('carousel');
  }
  render() {
    return (
      <div className="asset-message">
        <p className="asset-message-title">{this.intl.get('message')}：</p>
        <ul className="clearfix" style={{ top: this.state.top1 + '%' }}>
          <li>【{this.intl.get("deposit")}】2018-01-01 12:30:22 0.09 BTC {this.intl.get("asset-confirming")}(1/5)</li>
          <li>【{this.intl.get("deposit")}】2018-01-01 12:30:22 0.09 BTC {this.intl.get("asset-confirming")}(1/5)</li>
        </ul>
        <ul className="clearfix" style={{ top: this.state.top2 + '%' }}>
          <li>【{this.intl.get("deposit")}】2018-01-01 12:30:22 0.09 BTC {this.intl.get("asset-confirming")}(1/5)</li>
          <li>【{this.intl.get("deposit")}】2018-01-01 12:30:22 0.09 BTC {this.intl.get("asset-confirming")}(1/5)</li>
        </ul>
      </div>
    );
  }
}
