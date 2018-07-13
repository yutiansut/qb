import React, { Component } from 'react';
import exchangeViewBase from "../../ExchangeViewBase";
import TotalAsset from "./balance/TotalAsset";
import Wallets from "./balance/Wallets";
import {
    Link
} from "react-router-dom";

import "../style/balance.styl"

export default class Balance extends exchangeViewBase {
  constructor(props) {
    super(props)
    this.name = "balance";
    let { controller } = props;
    //绑定view
    controller.setView(this);
    this.state = {};
    let { totalAsset, wallet } = controller.initState;
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, { totalAsset, wallet });
    //绑定方法
    this.getAssets = controller.getAssets.bind(controller);
  }

  async componentWillMount() {
    await this.getAssets();
  }

  render() {
    return <div className="balance">
      <TotalAsset totalAsset={this.state.totalAsset} controller={this.props.controller} />
      <ul className="menu-ul">
        <li><a>充币</a></li>
        <li><a>提币</a></li>
        <li><Link to="/mwallet/dashboard">资产记录</Link></li>
      </ul>
      <Wallets wallet={this.state.wallet} history={this.props.history} controller={this.props.controller} />
    </div>
  }
}