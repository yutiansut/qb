import React, { Component } from 'react';
import exchangeViewBase from "../../../components/ExchangeViewBase";
import TotalAsset from "./balance/TotalAsset";
import Wallets from "./balance/Wallets";
import {
    Link
} from "react-router-dom";

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
    // 获取Qbt
    this.getQbt = controller.getMyQbt.bind(controller);
  }

  async componentDidMount() {
    await this.getAssets();
    if (this.props.controller.configData.activityState) {
      let qbt = await this.getQbt();
      if (qbt && this.state.wallet) {
        this.state.wallet.unshift(qbt);
        this.setState({ wallet: this.state.wallet })
      }
    }
  }

  render() {
    return <div className="balance">
      <TotalAsset totalAsset={this.state.totalAsset} controller={this.props.controller} />
      <ul className="menu-ul">
        <li><Link to="/wallet/charge"><img src="/static/mobile/asset/icon_zc_cb@2x.png"/>{this.intl.get("asset-charge")}</Link></li>
        <li><a><img src="/static/mobile/asset/icon_zc_tb@2x.png"/>{this.intl.get("asset-withdraw")}</a></li>
        <li><Link to="/wallet/dashboard" className="assets-record"><img src="/static/mobile/asset/icon_dd_pre@2x.png"/>{this.intl.get("asset-records")}</Link></li>
      </ul>
      <Wallets wallet={this.state.wallet} history={this.props.history} controller={this.props.controller} />
    </div>
  }
}