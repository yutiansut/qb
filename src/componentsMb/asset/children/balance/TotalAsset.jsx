
import React, { Component } from "react";
import exchangeViewBase from "../../../ExchangeViewBase";
import { NavLink } from "react-router-dom";
import SelectButton from "../../../../common/component/SelectButton";

export default class TotalAsset extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      unit: this.intl.get("cny")
    };
  }
  render() {
    let { totalAsset } = this.props;
    console.log(this.props.totalAsset);
    return <div className="total-asset">
        <div className="item total">
            <label>{this.intl.get("asset-totalAssets")}:</label>
            <b>{Number(totalAsset.valuationBTC).format({ number: "property" })}BTC</b>
            {this.state.unit === this.intl.get("cny") ?
                <span>≈{Number(totalAsset.valuationCN).format({ number: "legal" })}CNY</span> :
                <span>≈{Number(totalAsset.valuationEN).format({ number: "legal" })}USD</span>}
        </div>
        <div className="item limit">
          <label>{this.intl.get("asset-24hQuota")}:</label>
          <b>{totalAsset.totalQuota} BTC</b>
              {totalAsset.totalQuota === 10 ? <span className="disable">
              {this.intl.get("asset-limitApply")}
            </span> : <NavLink to="/wuser/identity">
              {this.intl.get("asset-limitApply")}
            </NavLink>}
        </div>
        <div className="item used">
          <label>{this.intl.get("asset-usedAsset")}:</label>
          <b>{(totalAsset.totalQuota*100000000 - totalAsset.availableQuota*100000000)/100000000} BTC</b>
        </div>
      </div>;
  }
}