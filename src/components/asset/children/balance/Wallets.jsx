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
      currency: 2,
      avail: 2,
      lock: 2,
      tobtc: 2,
      sortIcon: ['/static/images/rank_down.svg', '/static/images/rank_up.svg', '/static/images/rank_normal.svg']
    };
    this.sort = (k, v) => {
      let obj = {
        currency: 2,
        avail: 2,
        lock: 2,
        tobtc: 2
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
    let { value, hideLittle, hideZero, currency, avail, lock, tobtc, sortIcon } = this.state;
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
                  this.sort("currency", currency + 1);
                }}>
                币种<img className="img" src={sortIcon[currency]} alt="" />
              </th>
              <th className="fullname">全称</th>
              <th className="avail" onClick={() => {
                  this.sort("avail", avail + 1);
                }}>
                可用余额<img className="img" src={sortIcon[avail]} alt="" />
              </th>
              <th className="lock" onClick={() => {
                  this.sort("lock", lock + 1);
                }}>
                冻结中金额
                <b className="pop-parent">
                  <img src="/static/images/yiwen.png" alt="" />
                  <em className="pop-children uppop-children">
                    交易未匹配完成,处于挂单环节的金额
                  </em>
                </b>
                <img className="img" src={sortIcon[lock]} alt="" />
              </th>
            <th className="tobtc" onClick={() => {
              this.sort("tobtc", tobtc + 1);
            }}>BTC估值<img className="img" src={sortIcon[tobtc]} alt="" /></th>
              <th className="handle">操作</th>
            </tr>
          </thead>
          <tbody>
          {this.rank(result, { currency, avail, lock, tobtc}).map((item, index) => {
              return <tr key={index}>
                  <td className="currency">
                    <img src="/static/images/rank_normal.svg" alt="" />
                    {item.currency}
                  </td>
                  <td className="fullname">{item.codename}</td>
                  <td className="avail">{item.avail}</td>
                  <td className="lock">{item.lock}</td>
                  <td className="tobtc">{item.tobtc}</td>
                  <td className="handle">
                    <NavLink to={`/wallet/charge/:${item.currency.toLowerCase()}`}>
                      <Button type="base" theme="main" title="充币" />
                    </NavLink>
                    <NavLink to={`/wallet/extract/:${item.currency.toLowerCase()}`}>
                      <Button type="base" theme="main" title="提币" />
                    </NavLink>
                    <NavLink to={`/market/:${item.currency.toLowerCase()}`}>
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
