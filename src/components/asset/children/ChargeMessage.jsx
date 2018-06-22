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
          <li className="asset-message-title">消息：</li>
          <li>【充币】2018-01-01 12:30:22 0.09 BTC 确认中(1/5)</li>
          <li>【充币】2018-01-01 12:30:22 0.09 BTC 确认中(1/5)</li>
        </ul>
      </div>
    );
  }
}
