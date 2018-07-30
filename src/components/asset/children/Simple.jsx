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
    this.updataMarketAvaile = controller.updataMarketAvaile.bind(controller);
  }
  async componentDidMount() {
    await this.getPairFees();
    await this.getAssets();
    this.updataMarketAvaile();
    // !this.state.wallet && this.getWallet();
  }


  componentDidUpdate(prevProps, prevState) {
    this.updataMarketAvaile();
  }

  // componentWillUpdate() {
  // }

  render() {
    let lang = this.props.controller.configData.language;
    // console.log(this.state.totalAsset);
    let { avail1, avail2, currencyArr, curPair } = this.updataMarketAvaile(true);
    let total =
      lang === "en-US"
        ? this.state.totalAsset.valuationEN
        : this.state.totalAsset.valuationCN;
    return (
      <div className="simple-asset clearfix">
        <div className="simple-asset-wrap">
          {this.props.controller.token && <p>
            <span className="total">
              {this.intl.get("asset-totalAssets")}：{lang === "en-US" ? "$" : "¥"}
              {total && Number(total).format({ number: "legal" })}{" "}
            </span>
            <img src={this.$imagesMap.$xianghu} alt="" />
            <span className="avail1">
              {this.intl.get("deal-use")}
              {currencyArr && currencyArr[0].toUpperCase()}：{avail1 &&
                Number(avail1.availableCount || 0).format({ number: "property" , style:{ decimalLength: 8}})}
            </span>
            <span className="avail2">
              {this.intl.get("deal-use")}
              {currencyArr && currencyArr[1].toUpperCase()}：{avail2 &&
                Number(avail2.availableCount || 0).format({ number: "property" , style:{ decimalLength: 8}})}
            </span>
          </p>}
          <span>
            {this.intl.get("fee")}:Maker: {curPair && curPair.maker*100}%,Taker:{" "}
            {curPair && curPair.taker*100}%
          </span>
        </div>
      </div>
    );
  }
}
