<<<<<<< 53d1f768ee5b2efc6560752875113aa5a8a18835
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
    console.log(this.props.totalAsset);
    return <div className="total-asset clearfix">
        <h3>{this.intl.get("asset-balance")}</h3>
        <div className="item total clearfix">
          <div className="content">
            <span>{this.intl.get("asset-totalAssets")}:</span>
            <b>
              {totalAsset.valuationBTC.format({ number: "property" })}BTC
            </b>
            {this.state.unit === this.intl.get("cny") ? <span>
                ≈ {totalAsset.valuationCN.format({ number: "legal" })} CNY
              </span> : <span>
              ≈ {totalAsset.valuationEN.format({ number: "legal" })} USD
              </span>}
            <div className="select">
              <SelectButton type="main" title={this.state.unit} simple={true} valueArr={[this.intl.get("cny"), this.intl.get("usd")]} onSelect={item => {
                  this.setState({ unit: item });
                }} />
            </div>
          </div>
        </div>
        <div className="item limit">
          <span>{this.intl.get("asset-24hQuota")}:</span>
          <b>{totalAsset.totalQuota} BTC</b>
              {totalAsset.totalQuota === 10 ? <span className="disable">
              {this.intl.get("asset-limitApply")}
            </span> : <NavLink to="/user/identity">
              {this.intl.get("asset-limitApply")}
            </NavLink>}
        </div>
        <div className="item used">
          <span>{this.intl.get("asset-usedAsset")}:</span>
          <b>{(totalAsset.totalQuota*100000000 - totalAsset.availableQuota*100000000)/100000000} BTC</b>
        </div>
      </div>;
  }
}
=======
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
            <b>
              {totalAsset.valuationBTC.format({ number: "property" })}BTC
            </b>
            {this.state.unit === this.intl.get("cny") ? <span>
                ≈ {totalAsset.valuationCN.format({ number: "legal" })} CNY
              </span> : <span>
              ≈ {totalAsset.valuationEN.format({ number: "legal" })} USD
              </span>}
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
          <b>{(totalAsset.totalQuota*100000000 - totalAsset.availableQuota*100000000)/100000000} BTC</b>
        </div>
      </div>;
  }
}
>>>>>>> h3代码
