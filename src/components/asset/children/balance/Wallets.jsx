import React, { Component } from "react";
import exchangeViewBase from "../../../ExchangeViewBase";
import { NavLink } from "react-router-dom";
import Button from "../../../../common/component/Button";
import Input from "../../../../common/component/Input";
import "../../style/wallet.styl";
export default class Wallets extends exchangeViewBase {
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
      sortIcon: [
        "/static/images/rank_down.svg",
        "/static/images/rank_up.svg",
        "/static/images/rank_normal.svg"
      ]
    };
    this.sort = (k, v) => {
      let obj = {
        coinName: 2,
        availableCount: 2,
        frozenCount: 2,
        valuationBTC: 2
      };
      v > 1 && (v = 0);
      obj[k] = v;
      this.setState(obj);
    };

    let { controller } = this.props;
    this.filter = controller.filte.bind(controller);
    this.rank = controller.rank.bind(controller);
  }
  render() {
    let { wallet, controller } = this.props;
    let {
      value,
      hideLittle,
      hideZero,
      coinName,
      availableCount,
      frozenCount,
      valuationBTC,
      sortIcon
    } = this.state;
    let result = this.filter(wallet, value, hideLittle, hideZero);

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
            <i />
            {this.intl.get("asset-hideLittle_v1")}
            <b className="pop-parent">
              <img src="/static/images/yiwen.png" alt="" />
              <em className="pop-children uppop-children">{this.intl.get("asset-tip1_v1")}</em>
            </b>
          </span>
          <span className={`hide-zero ${this.state.hideZero ? "active" : ""}`} onClick={() => {
              this.setState({ hideZero: !this.state.hideZero });
            }}>
            <i />
            {this.intl.get("asset-hideZero_v1")}
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th className="currency" onClick={() => {
                  this.sort("coinName", coinName + 1);
                }}>
              {this.intl.get("asset-currency_v1")}<img className="img" src={sortIcon[coinName]} alt="" />
              </th>
              <th className="fullname">{this.intl.get("asset-fullname_v1")}</th>
              <th className="avail" onClick={() => {
                  this.sort("availableCount", availableCount + 1);
                }}>
                {this.intl.get("asset-avail_v1")}<img className="img" src={sortIcon[availableCount]} alt="" />
              </th>
              <th className="lock" onClick={() => {
                  this.sort("frozenCount", frozenCount + 1);
                }}>
                {this.intl.get("asset-lock_v1")}
                <b className="pop-parent">
                  <img src="/static/images/yiwen.png" alt="" />
                  <em className="pop-children uppop-children">
                    {this.intl.get("asset-tip2_v1")}
                  </em>
                </b>
                <img className="img" src={sortIcon[frozenCount]} alt="" />
              </th>
              <th className="tobtc" onClick={() => {
                  this.sort("valuationBTC", valuationBTC + 1);
                }}>
                {this.intl.get("asset-tobtc_v1")}
                <b className="pop-parent">
                  <img src="/static/images/yiwen.png" alt="" />
                  <em className="pop-children uppop-children">
                    {this.intl.get("asset-tip3_v1")}
                  </em>
                </b>
                <img className="img" src={sortIcon[valuationBTC]} alt="" />
              </th>
              <th className="handle">{this.intl.get("option_v1")}</th>
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
                    <NavLink to={{ pathname: `/wallet/charge/`, query: { currency: item.coinName } }}>
                      <Button type="base" theme="main" title={this.intl.get('deposit_v1')} />
                    </NavLink>
                    <NavLink to={{ pathname: `/wallet/extract/`, query: { currency: item.coinName } }}>
                      <Button type="base" className="withdraw" theme="main" title={this.intl.get('asset-withdraw_v1')} />
                    </NavLink>
                    <NavLink to={{ pathname: `/trade`, query: { currency: item.coinName } }}>
                      <Button type="base" theme="main" title={this.intl.get('asset-trade_v1')} />
                    </NavLink>
                  </td>
                </tr>;
            })}
          </tbody>
        </table>
      </div>;
  }
}
