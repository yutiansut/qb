import React, { Component } from "react";
import exchangeViewBase from "../../../ExchangeViewBase";
import { NavLink } from "react-router-dom";
import SelectButton from "../../../../common/component/SelectButton";
import "../../style/total.styl";

export default class TotalAsset extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      unit: this.intl.get("cny")
    };
  }
  render() {
    let { totalAsset } = this.props;
    return <div className="total-asset clearfix">
        <h3>{this.intl.get("asset-balance")}</h3>
        <div className="item total clearfix">
          <div className="content">
            <span>{this.intl.get("asset-totalAssets")}:</span>
            <b>{totalAsset.valuationBTC}BTC</b>
            {this.state.unit === this.intl.get("cny") ? <span>
                ≈ {totalAsset.valuationCN} CNY
              </span> : <span>≈ {totalAsset.valuationEN} USD</span>}
            <div className="select">
              <SelectButton type="main" title={this.state.unit} simple={true} valueArr={[this.intl.get("cny"), this.intl.get("usd")]} onSelect={item => {
                  this.setState({ unit: item });
                }} />
            </div>
          </div>
        </div>
        <div className="item limit">
          <span>{this.intl.get("asset-24hQuota")}:</span>
          <b>{this.props.controller.userVerif === 1 ? 10 : 2} BTC</b>
          {this.props.controller.userVerif === 1 ? <span className="disable">
              {this.intl.get("asset-limitApply")}
            </span> : <NavLink to="/user/identity">
              {this.intl.get("asset-limitApply")}
            </NavLink>}
        </div>
        <div className="item used">
          <span>{this.intl.get("asset-usedAsset")}:</span>
          <b>{totalAsset.totalQuota - totalAsset.availableQuota} BTC</b>
        </div>
      </div>;
  }
}