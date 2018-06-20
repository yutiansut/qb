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
            <b>{totalAsset.btc}</b>
            {this.state.unit === "人民币" ? <span>
                ≈ {totalAsset.cny} CNY
              </span> : <span>≈ {totalAsset.usd} USD</span>}
            <div className="select">
              <SelectButton type="main" title={this.state.unit} simple={true} valueArr={["人民币", "美元"]} onSelect={item => {
                  this.setState({ unit: item });
                }} />
            </div>
          </div>
        </div>
        <div className="item limit">
          <span>24H提币额度:</span>
          <b>{totalAsset.limit_24H} BTC</b>
          <NavLink to="/user/identity">提额申请</NavLink>
        </div>
        <div className="item used">
          <span>已用:</span>
          <b>{totalAsset.limit_used} BTC</b>
        </div>
      </div>;
  }
}
