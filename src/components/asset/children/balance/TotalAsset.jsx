import React, { Component } from 'react'
import "../../style/total.styl"

export default class TotalAsset extends Component {
  constructor(props){
    super(props)
    this.state={
      unit: 1
    }
  }
  render() {
    let { totalAsset } = this.props;
    return <div className="total-asset">
        <h3>账户余额</h3>
        <div className="item total">
          <span>总资产约:</span>
          <b>{totalAsset.btc}</b>
          {this.state.unit ? <span>≈ {totalAsset.cny} CNY</span> : <span>≈ {totalAsset.usd} USD</span>}
          <button />
        </div>
        <div className="item limit">
          <span>24H提币额度:</span>
          <b>{totalAsset.limit} BTC</b>
          <a href="#">提额申请</a>
        </div>
        <div className="item used">
          <span>已用:</span>
          <b>{totalAsset.usedlimit} BTC</b>
        </div>
      </div>;
  }
}
