import React, { Component } from "react";
import exchangeViewBase from "../../../../components/ExchangeViewBase";

export default class TotalAsset extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      unit: this.intl.get("cny")
    };
  }
  render() {
    let { totalAsset } = this.props;
    return <div className="total-asset">
        <div className="total">
            <label>{this.intl.get("asset-totalAssets")}:</label>
            <b>{Number(totalAsset.valuationBTC).format({ number: "property" , style:{ decimalLength: 8}})} BTC</b>
        </div>
        <div className="total-cny">
            {this.state.unit === this.intl.get("cny") ?
                <span>≈{Number(totalAsset.valuationCN).format({ number: "legal" })} CNY</span> :
                <span>≈{Number(totalAsset.valuationEN).format({ number: "legal" })} USD</span>}
        </div>
      </div>;
  }
}