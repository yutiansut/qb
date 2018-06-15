import React, { Component } from 'react';
import exchangeViewBase from "../ExchangeViewBase";
import TotalAsset from "./balance/TotalAsset";
import Wallets from "./balance/Wallets";

export default class Balance extends exchangeViewBase {
  constructor(props) {
    super(props)
    //绑定方法
    // this.getData = controller.getData.bind(controller)
    // this.state = {
    // console.log(this.controller)
    // }
  }
  render() {
    return <div className="balance">
      <TotalAsset totalAsset={this.props.data.totalAsset} />
      <Wallets wallet={this.props.data.wallet} />
    </div>;
  }

}