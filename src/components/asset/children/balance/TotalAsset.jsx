import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import SelectButton from "../../../../common/component/SelectButton";
import "../../style/total.styl";

export default class TotalAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: "人民币"
    };
  }
  render() {
    let { totalAsset } = this.props;
    return <div className="total-asset  clearfix">
        <h3>账户余额</h3>
        <div className="item total clearfix">
          <div className="content">
            <span>总资产约:</span>
            <b>{totalAsset.valuationBTC}BTC</b>
            {this.state.unit === "人民币" ? <span>
                ≈ {totalAsset.valuationCN} CNY
              </span> : <span>≈ {totalAsset.valuationEN} USD</span>}
            <div className="select">
              <SelectButton type="main" title={this.state.unit} simple={true} valueArr={["人民币", "美元"]} onSelect={item => {
                  this.setState({ unit: item });
                }} />
            </div>
          </div>
        </div>
        <div className="item limit">
          <span>24H提币额度:</span>
          <b>{totalAsset.totalQuota} BTC</b>
          {totalAsset.totalQuota > 2 ? <span className="disable">提额申请</span> : <NavLink to="/user/identity">提额申请</NavLink>}
        </div>
        <div className="item used">
          <span>已用:</span>
          <b>{totalAsset.availableQuota} BTC</b>
        </div>
      </div>;
  }
}
