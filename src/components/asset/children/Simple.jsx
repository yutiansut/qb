import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";
import "../style/simple.styl";
// props传入tradePairId 交易对ID
export default class Simple extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {};
    let { controller } = this.props;
    controller.setView(this);
    let { pairFees, totalAsset, wallet } = controller.initState;
    this.state = Object.assign(this.state, { pairFees, totalAsset, wallet });
    //绑定方法
    this.getAssets = controller.getAssets.bind(controller);
    // this.getWallet = controller.getWallet.bind(controller);
    this.getPairFees = controller.getPairFees.bind(controller);
  }
  async componentWillMount() {
    await this.getPairFees();
    await this.getAssets();
    // !this.state.wallet && this.getWallet();
  }

  componentDidMount() { }

  componentWillUpdate() { }

  render() {
    let curPair = this.state.pairFees.filter(
      item => item.id === this.props.tradePairId
    )[0];
    let currencyArr = curPair.name.split("/");
    let avail1 = this.state.wallet.filter(
      item => item.coinName === currencyArr[0]
    )[0].availableCount;
    let avail2 = this.state.wallet.filter(
      item => item.coinName === currencyArr[1]
    )[0].availableCount;
    return <div className="simple-asset clearfix">
      <p className="simple-asset-wrap">
        <span className="total">
          {this.intl.get('asset-totalAssets')}：¥{this.state.totalAsset.valuationCN}{" "}
        </span>
        <img src="/static/images/xianghu.svg" alt="" />
        <span className="avail1">
          {this.intl.get('deal-use')}{currencyArr[0].toUpperCase()}：{avail1}
        </span>
        <span className="avail2">
          {this.intl.get('deal-use')}{currencyArr[1].toUpperCase()}：{avail2}
        </span>
        <span>
          {this.intl.get('fee')}:Maker: {curPair.maker}%,Taker: {curPair.taker}%
          </span>
      </p>
    </div>;
  }
}
