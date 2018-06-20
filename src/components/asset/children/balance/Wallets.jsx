import React, { Component } from "react";
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
      sortCurrency: 0,
      sortAvail: 0,
      sortLock: 0,
      sortIcon: ['/static/images/rank_normal.svg', '/static/images/rank_down.svg', '/static/images/rank_up.svg']
    };
    this.sort = (k, v) => {
      let obj = {
        sortCurrency: 0,
        sortAvail: 0,
        sortLock: 0
      };
      v > 2 && (v = 1)
      obj[k] = v;
      this.setState(obj)
    }
  }
  render() {
    let { wallet, controller } = this.props;
    let { sortCurrency, sortAvail, sortLock, sortIcon } = this.state;
    const filter = () => {
      let arr1 = controller.filter(wallet, item => {
        return (
          item.currency.includes(this.state.value.toUpperCase()) ||
          item.codename.includes(this.state.value.toUpperCase())
        );
      });
      let arr2 = controller.filter(arr1, item => {
        return !this.state.hideLittle || item.tobtc > 0.001
      })
      let result = controller.filter(arr2, item => {
        return !this.state.hideZero || item.tobtc > 0
      })
      return result
    }
    return (
      <div className="asset-wallet">
        <div className="input-wrap">
          <div className="input">
            <Input
              type="search2"
              value={this.state.value}
              onInput={value => {
                this.setState({ value });
              }}
            />
          </div>
          <span
            className={`hide-little ${this.state.hideLittle ? "active" : ""}`}
            onClick={() => {
              this.setState({ hideLittle: !this.state.hideLittle });
            }}
          >
            <i />隐藏小额资产
            <b className="pop-parent">
              <img src="/static/images/yiwen.png" alt="" />
              <em className="pop-children uppop-children">小于0.001btc</em>
            </b>
          </span>
          <span
            className={`hide-zero ${this.state.hideZero ? "active" : ""}`}
            onClick={() => {
              this.setState({ hideZero: !this.state.hideZero });
            }}
          >
            <i />隐藏0余额币种
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th className="currency" onClick={() => { this.sort('sortCurrency', sortCurrency + 1) }}>
                币种<img
                  className="img"
                  src={sortIcon[sortCurrency]}
                  alt=""
                />
              </th>
              <th className="fullname">全称</th>
              <th className="avail" onClick={() => { this.sort('sortAvail', sortAvail + 1) }}>
                可用余额<img
                  className="img"
                  src={sortIcon[sortAvail]}
                  alt=""
                />
              </th>
              <th className="lock" onClick={() => { this.sort('sortLock', sortLock + 1) }}>
                冻结中金额
                <b className="pop-parent">
                  <img src="/static/images/yiwen.png" alt="" />
                  <em className="pop-children uppop-children">
                    交易未匹配完成,处于挂单环节的金额
                  </em>
                </b>
                <img
                  className="img"
                  src={sortIcon[sortLock]}
                  alt=""
                />
              </th>
              <th className="tobtc">BTC估值</th>
              <th className="handle">操作</th>
            </tr>
          </thead>
          <tbody>
            {filter().map((item, index) => {
              return (
                <tr key={index}>
                  <td className="currency">
                    <img src="/static/images/rank_normal.svg" alt="" />
                    {item.currency}
                  </td>
                  <td className="fullname">{item.codename}</td>
                  <td className="avail">{item.avail}</td>
                  <td className="lock">{item.lock}</td>
                  <td className="tobtc">{item.tobtc}</td>
                  <td className="handle">
                    <Button type="base" theme="main" title="充币" />
                    <Button type="base" theme="main" title="提币" />
                    <Button type="base" theme="main" title="交易" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
