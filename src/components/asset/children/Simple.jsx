import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";
import "../style/simple.styl"
// props传入tradePairId 交易对ID
export default class Simple extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      tradePairId: this.props.tradePairId
    };
    let { controller } = this.props;
    controller.setView(this);
    let { pairFees, totalAsset, wallet } = controller.initState;
    this.state = Object.assign(this.state, { pairFees, totalAsset, wallet });
    //绑定方法
    this.getAssets = controller.getAssets.bind(controller);
    this.getWallet = controller.getWallet.bind(controller);
    this.getPairFees = controller.getPairFees.bind(controller);
  }
  componentWillMount() {
    !this.state.pairFees && this.getPairFees();
    !this.state.totalAsset && this.getAssets();
    !this.state.wallet && this.getWallet();
  }

  componentDidMount() { }

  componentWillUpdate() { }

  render() {
    let curPair = this.state.pairFees.filter(item => item.tradePairId === this.state.tradePairId)[0];
    let currencyArr = curPair.tradePairName.split('/');
    let avail1 = this.state.wallet.filter(item => item.coinName === currencyArr[0])[0].availableCount;
    let avail2 = this.state.wallet.filter(item => item.coinName === currencyArr[1])[0].availableCount;
    return (
      <div className="simple-asset clearfix">
        <p className="simple-asset-wrap">
          <span className="total">总资产约：¥{this.state.totalAsset.valuationBTC} </span>
          <img src="/static/images/xianghu.svg" alt="" />
          <span className="avail1">可用{currencyArr[0]}：{avail1}</span>
          <span className="avail2">可用{currencyArr[1]}：{avail2}</span>
          <span>手续费:Maker: {curPair.makerFee}%,Taker: {curPair.takerFee}%</span>
        </p>
      </div>
    );
  }
}
