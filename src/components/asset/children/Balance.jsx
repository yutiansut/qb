import React, { Component } from 'react';
import exchangeViewBase from "../../ExchangeViewBase";
import TotalAsset from "./balance/TotalAsset";
import Wallets from "./balance/Wallets";

export default class Balance extends exchangeViewBase {
  constructor(props) {
    super(props)
    let { controller } = props;
    this.state = {}
    //绑定view
    controller.setView(this)
    let { totalAsset, wallet } = controller.initState;
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, { totalAsset, wallet });
    //绑定方法
    this.getAssets = controller.getAssets.bind(controller)
    this.getWallet = controller.getWallet.bind(controller)
  }

  componentWillMount() {
    this.getAssets()
    this.getWallet();
  }

  render() {
    return <div className="balance">
      <TotalAsset totalAsset={this.state.totalAsset} />
      <Wallets wallet={this.state.wallet} controller={this.props.controller} />
    </div>;
  }

}