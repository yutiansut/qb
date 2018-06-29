import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";
import "../style/chargeMessage.styl";

export default class ChargeMessage extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  render() {
    return (
      <div className="asset-message">
        <ul className="clearfix">
          <li className="asset-message-title">{this.intl.get('message')}：</li>
          <li>【{this.intl.get("deposit")}】2018-01-01 12:30:22 0.09 BTC {this.intl.get("asset-confirming")}(1/5)</li>
          <li>【{this.intl.get("deposit")}】2018-01-01 12:30:22 0.09 BTC {this.intl.get("asset-confirming")}(1/5)</li>
        </ul>
      </div>
    );
  }
}
