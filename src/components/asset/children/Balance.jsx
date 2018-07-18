import React, { Component } from 'react';
import exchangeViewBase from "../../ExchangeViewBase";
import TotalAsset from "./balance/TotalAsset";
import Wallets from "./balance/Wallets";

export default class Balance extends exchangeViewBase {
  constructor(props) {
    super(props)
    this.name = "balance";
    let { controller } = props;
    //绑定view
    controller.setView(this)
    this.state = {
      Qbt:null
    }
    let { totalAsset, wallet } = controller.initState;
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, { totalAsset, wallet });
    //绑定方法
    this.getAssets = controller.getAssets.bind(controller)
    // 获取Qbt
    this.getQbt = controller.getMyQbt.bind(controller);
  }

  async componentWillMount() {
    let qbt = await this.getQbt();
    console.log(qbt)
    await this.getAssets();
    if (qbt && this.state.wallet) {
      this.state.wallet.unshift(qbt);
      this.setState({ wallet: this.state.wallet})
    }
  }

  render() {
    return <div className="balance">
      <TotalAsset totalAsset={this.state.totalAsset} controller={this.props.controller} />
      <Wallets wallet={this.state.wallet} history={this.props.history} controller={this.props.controller} />
    </div>;
  }
}