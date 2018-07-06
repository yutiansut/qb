import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";
import "../style/simple.styl";
// props传入tradePairId 交易对ID
export default class Simple extends exchangeViewBase {
  constructor(props) {
    super(props);
    let { controller } = this.props;
    controller.setView(this);
    this.name = "simple";
    this.state = {
      tradePairId: 3 //交易对id
    };
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

  componentDidMount() {}

  componentWillUpdate() {}

  render() {
    let curPair = this.state.pairFees.filter(
      item => item.id === this.state.tradePairId
    )[0],
    currencyArr = curPair && curPair.name.split("/"),
    avail1 = this.state.wallet.filter(
      item => item.coinName === (currencyArr && currencyArr[0])
    )[0],
    avail2 = this.state.wallet.filter(
      item => item.coinName === (currencyArr && currencyArr[1])
    )[0];
    let lang = this.props.controller.configData.language;
    // console.log(this.state.totalAsset);
    let total =
      lang === "en-US"
        ? this.state.totalAsset.valuationEN
        : this.state.totalAsset.valuationCN;
    return (
      <div className="simple-asset clearfix">
        <p className="simple-asset-wrap">
          <span className="total">
            {this.intl.get("asset-totalAssets")}：{lang === "en-US" ? "$" : "¥"}
            {total && total.format({ number: "digital" })}{" "}
          </span>
          <img src="/static/images/xianghu.svg" alt="" />
          <span className="avail1">
            {this.intl.get("deal-use")}
            {currencyArr && currencyArr[0].toUpperCase()}：{avail1 &&
              avail1.availableCount.format({ number: "property" })}
          </span>
          <span className="avail2">
            {this.intl.get("deal-use")}
            {currencyArr && currencyArr[1].toUpperCase()}：{avail2 &&
              avail2.availableCount.format({ number: "property" })}
          </span>
          <span>
            {this.intl.get("fee")}:Maker: {curPair && curPair.maker}%,Taker:{" "}
            {curPair && curPair.taker}%
          </span>
        </p>
      </div>
    );
  }
}
