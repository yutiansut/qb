import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../ExchangeViewBase";
import assetController from "../../../class/asset/AssetController";
import "../style/chargeMessage.styl";
const arr = [
  '1111111111111111111','22222222222222222222', '333333333333333333333','4444444444444444444444','555555555555555555555'
]
export default class ChargeMessage extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.controller = this.props.controller;
    this.state = {
      top1: 0,
      top2: 100,
      criticalArr: [0,100],
      content: []
    };
  }
  // async componentWillMount() {
  //   let result = await this.controller.getChargeMessage();
  //   if(result.length) {
  //     this.setState({ top2: Math.ceil(result.length / 2) * 100, content: result, content: Array.from({ length: Math.ceil(result.length / 2 + 1) }, (item, index) => index*100)})
  //   }
  // }
  componentDidMount() {
    this.controller.swiper(
      "carousel",
      this,
      "top1",
      "top2",
      this.state.criticalArr,
      10,
      3000
    );
  }
  componentWillUnmount() {
    this.controller.swiperStop("carousel");
  }
  render() {
    return <div className="asset-message">
        <p className="asset-message-title">{this.intl.get("message")}：</p>
        <ul className="clearfix" style={{ top: this.state.top1 + "%" }}>
          <li>
            <NavLink to="/wallet/dashboard">
              【{this.intl.get("deposit")}】2018-01-01 12:30:22 0.09 BTC{" "}
              {this.intl.get("asset-confirming")}(1/5)
            </NavLink>
          </li>
          <li>
            <NavLink to="/wallet/dashboard">
              【{this.intl.get("deposit")}】2018-01-01 12:30:22 0.09 BTC{" "}
              {this.intl.get("asset-confirming")}(1/5)
            </NavLink>
          </li>
        </ul>
        <ul className="clearfix" style={{ top: this.state.top2 + "%" }}>
          <li>
            <NavLink to="/wallet/dashboard">
              【{this.intl.get("deposit")}】2018-01-01 12:30:22 0.09 BTC{" "}
              {this.intl.get("asset-confirming")}(1/5)
            </NavLink>
          </li>{" "}
          <li>
            <NavLink to="/wallet/dashboard">
              【{this.intl.get("deposit")}】2018-01-01 12:30:22 0.09 BTC{" "}
              {this.intl.get("asset-confirming")}(1/5)
            </NavLink>
          </li>
        </ul>
      </div>;
  }
}
