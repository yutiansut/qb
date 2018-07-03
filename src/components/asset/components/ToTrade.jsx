import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from "../../../common/component/Button";
import exchangeViewBase from "../../ExchangeViewBase";

export default class ToTrade extends exchangeViewBase {
  constructor(props) {
    super();
  }
  dealData(o, coin) {
    if (!o) return [];
    if (coin !== 'USDT') {
      return o.pairNameCoin[coin.toLowerCase()].map(v => {
        return {
          name: `${coin}/${v.toUpperCase()}`,
          id: o.pairIdCoin[coin.toLowerCase()][v]
        }
      })
    }
    if (coin === 'USDT') {
      return o.pairNameMarke[coin.toLowerCase()].map(v => {
        return {
          name: `${v.toUpperCase()}/USDT`,
          id: o.pairIdMarket[coin.toLowerCase()][v]
        }
      })
    }
  }

  render() {
    let { tradePair, currency } = this.props;
    return (<div className="to-trade clearfix">
      <span className="title">{this.intl.get("asset-toTrade")}</span>
      {this.dealData(tradePair, currency).map((v, index) => (
        <NavLink
          to={{
            pathname: `/trade`,
            query: { id: v.id }
          }}
          key={index}
        >
          <Button
            title={v.name}
            type="base"
            key={index}
          />
        </NavLink>
      ))}
    </div>)
  }
}
