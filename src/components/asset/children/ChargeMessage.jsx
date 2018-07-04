import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../ExchangeViewBase";
import "../style/chargeMessage.styl";
export default class ChargeMessage extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.controller = this.props.controller;
    this.state = {
      top1: 0,
      top2: 100,
      criticalArr: [0, 100],
      content: []
    };

    this.getChargeMessage = this.controller.getChargeMessage.bind(
      this.controller
    );
  }
  async componentWillMount() {
    let result = await this.controller.getChargeMessage();
    if (result.length) {
      this.setState(
        {
          top2: Math.ceil(result.length / 2) * 100,
          content: result,
          criticalArr: Array.from(
            { length: Math.ceil(result.length / 2 + 1) },
            (item, index) => index * 100
          )
        },
        () => {
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
      );
    }
  }
  componentDidMount() {
  }
  componentWillUnmount() {
    this.controller.swiperStop("carousel");
  }
  render() {
    return (
      <div className="asset-message">
        <p className="asset-message-title">{this.intl.get("message")}：</p>
        <ul className="clearfix" style={{ top: this.state.top1 + "%" }}>
          {this.state.content.map((v, i) => (
            <li key={i}>
              <NavLink to="/wallet/dashboard">
                【{this.intl.get("deposit")}】{v.orderTime.toDate()} {v.count}{" "}
                {v.coinName.toUpperCase()} {this.intl.get("asset-confirming")}({`${
                  v.doneCount
                  }/${v.verifyCount}`})
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="clearfix" style={{ top: this.state.top2 + "%" }}>
          {this.state.content.map((v, i) => (
            <li key={i}>
              <NavLink to="/wallet/dashboard">
                【{this.intl.get("deposit")}】{v.orderTime.toDate()} {v.count}{" "}
                {v.coinName.toUpperCase()} {this.intl.get("asset-confirming")}({`${
                  v.doneCount
                  }/${v.verifyCount}`})
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
