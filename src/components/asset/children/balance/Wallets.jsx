import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from "../../../../common/component/Button";
import Input from "../../../../common/component/Input";
import "../../style/wallet.styl";
export default class Wallets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      hideLittle: false,
      hideZero: false,
      coinName: 2,
      availableCount: 2,
      frozenCount: 2,
      valuationBTC: 2,
      sortIcon: ['/static/images/rank_down.svg', '/static/images/rank_up.svg', '/static/images/rank_normal.svg']
    };
    this.sort = (k, v) => {
      let obj = {
        coinName: 2,
        availableCount: 2,
        frozenCount: 2,
        valuationBTC: 2
      };
      v > 1 && (v = 0)
      obj[k] = v;
      this.setState(obj)
    }

    let { controller } = this.props
    this.filter = controller.filte.bind(controller);
    this.rank = controller.rank.bind(controller);
  }
  render() {
    let { wallet, controller } = this.props;
    let { value, hideLittle, hideZero, coinName, availableCount, frozenCount, valuationBTC, sortIcon } = this.state;
    let result = this.filter(wallet, value, hideLittle, hideZero);
    console.log(this.props.router);
    return <div className="asset-wallet">
        <div className="input-wrap">
          <div className="input">
            <Input type="search2" value={this.state.value} onInput={value => {
                this.setState({ value });
              }} />
          </div>
          <span className={`hide-little ${this.state.hideLittle ? "active" : ""}`} onClick={() => {
              this.setState({ hideLittle: !this.state.hideLittle });
            }}>
            <i />隐藏小额资产
            <b className="pop-parent">
              <img src="/static/images/yiwen.png" alt="" />
              <em className="pop-children uppop-children">小于0.001btc</em>
            </b>
          </span>
          <span className={`hide-zero ${this.state.hideZero ? "active" : ""}`} onClick={() => {
              this.setState({ hideZero: !this.state.hideZero });
            }}>
            <i />隐藏0余额币种
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th className="currency" onClick={() => {
                  this.sort("coinName", coinName + 1);
                }}>
                币种<img className="img" src={sortIcon[coinName]} alt="" />
              </th>
              <th className="fullname">全称</th>
              <th className="avail" onClick={() => {
                  this.sort("availableCount", availableCount + 1);
                }}>
                可用余额<img className="img" src={sortIcon[availableCount]} alt="" />
              </th>
              <th className="lock" onClick={() => {
                  this.sort("frozenCount", frozenCount + 1);
                }}>
                冻结中金额
                <b className="pop-parent">
                  <img src="/static/images/yiwen.png" alt="" />
                  <em className="pop-children uppop-children">
                    交易未匹配完成,处于挂单环节的金额
                  </em>
                </b>
                <img className="img" src={sortIcon[frozenCount]} alt="" />
              </th>
              <th className="tobtc" onClick={() => {
                  this.sort("valuationBTC", valuationBTC + 1);
                }}>
                BTC估值<img className="img" src={sortIcon[valuationBTC]} alt="" />
              </th>
              <th className="handle">操作</th>
            </tr>
          </thead>
          <tbody>
            {this.rank(result, {
              coinName,
              availableCount,
              frozenCount,
              valuationBTC
            }).map((item, index) => {
              return <tr key={index}>
                  <td className="currency">
                    <img src={item.coinIcon} alt="" />
                    {item.coinName}
                  </td>
                  <td className="fullname">{item.fullname}</td>
                  <td className="avail">{item.availableCount}</td>
                  <td className="lock">{item.frozenCount}</td>
                  <td className="tobtc">{item.valuationBTC}</td>
                  <td className="handle">
                    <NavLink to={`/wallet/charge/?${item.coinName.toLowerCase()}`}>
                      <Button type="base" theme="main" title="充币" />
                    </NavLink>
                    <NavLink to={`/wallet/extract/?${item.coinName.toLowerCase()}`}>
                      <Button type="base" theme="main" title="提币" />
                    </NavLink>
                    <NavLink to={`/market/?${item.coinName.toLowerCase()}`}>
                      <Button type="base" theme="main" title="交易" />
                    </NavLink>
                  </td>
                </tr>;
            })}
          </tbody>
        </table>
      </div>;
  }
}
