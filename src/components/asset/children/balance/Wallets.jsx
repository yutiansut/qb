import React, { Component } from "react";
import Button from "../../../../common/component/Button";
import Input from "../../../../common/component/Input";
import "../../style/wallet.styl";
export default class Wallets extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { wallet } = this.props;
    return <div className="asset-wallet">
        <div className="input-wrap">
          <div className="input">
            <Input type="search2"></Input>
          </div>
          <span className="hide-little">
            <i />隐藏小额资产
            <b className="pop-parent">
              <img src="/static/images/yiwen.png" alt="" />
              <em className="pop-children uppop-children">小于0.001btc</em>
            </b>
          </span>
          <span className="hide-zero">
            <i />隐藏0余额币种
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th className="currency">
                币种<img className="img" src="/static/images/rank_normal.svg" alt="" />
              </th>
              <th className="fullname">全称</th>
              <th className="avail">
                可用余额<img className="img" src="/static/images/rank_normal.svg" alt="" />
              </th>
              <th className="lock">
                冻结中金额
                <b className="pop-parent">
                  <img src="/static/images/yiwen.png" alt="" />
                  <em className="pop-children uppop-children">
                    小于0.001btc
                  </em>
                </b>
                <img className="img" src="/static/images/rank_normal.svg" alt="" />
              </th>
              <th className="tobtc">BTC估值</th>
              <th className="handle">操作</th>
            </tr>
          </thead>
          <tbody>
            {wallet.map((item, index) => {
              return <tr key={index}>
                  <td className="currency">
                    <img src="/static/images/rank_normal.svg" alt="" />
                    {item.currency}
                  </td>
                  <td className="fullname">{item.fullname}</td>
                  <td className="avail">{item.avail}</td>
                  <td className="lock">{item.lock}</td>
                  <td className="tobtc">{item.tobtc}</td>
                  <td className="handle">
                    <Button type="base" theme="main" title="充币" />
                    <Button type="base" theme="main" title="提币" />
                    <Button type="base" theme="main" title="交易" />
                  </td>
                </tr>;
            })}
          </tbody>
        </table>
      </div>;
  }
}
