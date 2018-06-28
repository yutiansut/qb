import React, { Component } from "react";
import exchangeViewBase from "../../../ExchangeViewBase";
import { NavLink } from "react-router-dom";
import SelectButton from "../../../../common/component/SelectButton";
import "../../style/total.styl";

export default class TotalAsset extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      unit: this.intl.get("cny_v1")
    };
  }
  render() {
    let { totalAsset } = this.props;
    return (
      <div className="total-asset clearfix">
        <h3>{this.intl.get("asset-balance_v1")}</h3>
        <div className="item total clearfix">
          <div className="content">
            <span>{this.intl.get("asset-totalAssets_v1")}:</span>
            <b>{totalAsset.valuationBTC}BTC</b>
            {this.state.unit === this.intl.get("cny_v1") ? (
              <span>≈ {totalAsset.valuationCN} CNY</span>
            ) : (
                <span>≈ {totalAsset.valuationEN} USD</span>
              )}
            <div className="select">
              <SelectButton
                type="main"
                title={this.state.unit}
                simple={true}
                valueArr={[this.intl.get("cny_v1"), this.intl.get("usd_v1")]}
                onSelect={item => {
                  this.setState({ unit: item });
                }}
              />
            </div>
          </div>
        </div>
        <div className="item limit">
          <span>{this.intl.get("asset-24hQuota_v1")}:</span>
          <b>{totalAsset.totalQuota} BTC</b>
          {totalAsset.totalQuota > 2 ? (
            <span className="disable">
              {this.intl.get("asset-limitApply_v1")}
            </span>
          ) : (
              <NavLink to="/user/identity">
                {this.intl.get("asset-limitApply_v1")}
              </NavLink>
            )}
        </div>
        <div className="item used">
          <span>{this.intl.get("asset-usedAsset_v1")}:</span>
          <b>{totalAsset.availableQuota} BTC</b>
        </div>
      </div>
    );
  }
}