import React, { Component } from "react";
import exchangeViewBase from "../../../ExchangeViewBase";
import { NavLink } from "react-router-dom";
import Button from "../../../../common/component/Button";
import Input from "../../../../common/component/Input";

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
    // 充值前的身份认证状态验证
    this.verify = currency => {
      // let state = controller.userVerif;
      // if (state === 1) {
        props.history.push({
          pathname: `/wallet/charge/`,
          query: { currency }
        });
        // return;
      // }
      // this.props.changeVerify(controller.userVerif);
    };
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
        <table>
          <thead>
            <tr>
              <th width="20%">名称</th>
              <th width="40%">可用余额</th>
              <th width="40%">冻结金额</th>
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
                    <td>
                        <img src={item.coinIcon} alt="" />
                        {item.coinName.toUpperCase()}
                    </td>
                    <td>
                      <span>{Number(item.availableCount).format({number: "property" })}</span>
                    </td>
                    <td>
                        <span>{Number(item.frozenCount).format({number: "property" })}</span>
                    </td>
              </tr>;
          })}
          </tbody>
        </table>
      </div>;
  }
}
