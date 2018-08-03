import React, { Component } from "react";
import exchangeViewBase from "../../../ExchangeViewBase";
import { NavLink } from "react-router-dom";
import Button from "../../../../common/component/Button";
import Input from "../../../../common/component/Input";
import "../../style/wallet.styl";
export default class Wallets extends exchangeViewBase {
  constructor(props) {
    super(props);
    let { controller } = this.props;
    this.state = {
      value: "",
      hideLittle: false,
      hideZero: false,
      coinName: 2,
      availableCount: 2,
      frozenCount: 2,
      valuationBTC: 2,
      coin: controller.configData.coin,
      sortIcon: [
        this.$imagesMap.$rank_down,
        this.$imagesMap.$rank_up,
        this.$imagesMap.$rank_normal
      ],
      lang: controller.configData.language
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

    this.filter = controller.filte.bind(controller);
    this.rank = controller.rank.bind(controller);
    // 充值前的身份认证状态验证
    this.verify = currency => {
      props.history.push({
        pathname: `/wallet/charge/`,
        query: { currency }
      });
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
            <i />
            {this.intl.get("asset-hideLittle")}
            <b className="pop-parent">
              <em className="img" />
              <em className="pop-children uppop-children">
                {this.intl.get("asset-tip1")}
              </em>
            </b>
          </span>
          {/* <span
            className={`hide-zero ${this.state.hideZero ? "active" : ""}`}
            onClick={() => {
              this.setState({ hideZero: !this.state.hideZero });
            }}
          >
            <i />
            {this.intl.get("asset-hideZero")}
          </span> */}
        </div>
        <table>
          <thead>
            <tr>
              <th
                className="currency"
                onClick={() => {
                  this.sort("coinName", coinName + 1);
                }}
              >
                {this.intl.get("asset-currency")}
                <img className="img" src={sortIcon[coinName]} alt="" />
              </th>
              <th className="fullname">{this.intl.get("asset-fullname")}</th>
              <th
                className="avail"
                onClick={() => {
                  this.sort("availableCount", availableCount + 1);
                }}
              >
                {this.intl.get("asset-avail")}
                <img className="img" src={sortIcon[availableCount]} alt="" />
              </th>
              <th
                className="lock"
                onClick={() => {
                  this.sort("frozenCount", frozenCount + 1);
                }}
              >
                {this.intl.get("asset-lock")}
                <b className="pop-parent">
                  <span className="img" />
                  <em className={`pop-children uppop-children ${this.state.lang === 'en-US' ? 'en' : 'cn'}`}>
                    {this.intl.get("asset-tip2")}
                  </em>
                </b>
                <img className="img" src={sortIcon[frozenCount]} alt="" />
              </th>
              <th
                className="tobtc"
                onClick={() => {
                  this.sort("valuationBTC", valuationBTC + 1);
                }}
              >
                {this.intl.get("asset-tobtc")}
                <b className="pop-parent">
                  <span className="img" />
                  <em className="pop-children uppop-children">
                    {this.intl.get("asset-tip3")}
                  </em>
                </b>
                <img className="img" src={sortIcon[valuationBTC]} alt="" />
              </th>
              <th className="handle">{this.intl.get("option")}</th>
            </tr>
          </thead>
          <tbody>
            {this.rank(result, {
              coinName,
              availableCount,
              frozenCount,
              valuationBTC
            }).map((item, index) => {
              return item.coinName !== this.state.coin ?
              (
                <tr key={index}>
                  <td className="currency">
                    <img src={item.coinIcon} alt="" />
                    {item.coinName.toUpperCase()}
                  </td>
                  <td className="fullname">
                    <NavLink
                      to={{
                        pathname: `/help/currency/`,
                        query: { currency: item.coinName }
                      }}
                    >
                      {item.fullName}
                    </NavLink>
                  </td>
                  <td className="avail">
                    {Number(item.availableCount).format({ number: "property" , style:{ decimalLength: 8}})}
                  </td>
                  <td className="lock">
                    {Number(item.frozenCount).format({ number: "property" , style:{ decimalLength: 8}})}
                  </td>
                  <td className="tobtc">
                    {Number(item.valuationBTC).format({ number: "property" , style:{ decimalLength: 8}})}
                  </td>
                  <td className="handle">
                    <Button
                      type="base"
                      theme="main"
                      disable={ item.c === 0 ? true : false}
                      title={this.intl.get("deposit")}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                        this.verify(item.coinName);
                      }}
                    />
                      <Button
                        type="base"
                        className="withdraw"
                        theme="main"
                        disable={item.w === 0 ? true : false}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          this.props.history.push({
                            pathname: `/wallet/extract/`,
                            query: {
                              currency: item.coinName
                            }
                          });
                        }}
                        title={this.intl.get("asset-withdraw")}
                      />
                      <Button
                        type="base"
                        theme="main"
                        disable={item.e === 0 ? true : false}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          this.props.history.push({
                            pathname: `/trade`,
                            query: {
                              pairName: item.coinName
                            }
                          });
                        }}
                        title={this.intl.get("asset-trade")}
                      />
                  </td>
                </tr>
              ) :
              (
                <tr key={index}>
                  <td className="currency">
                    <img src={item.coinIcon} alt="" />
                    {item.coinName.toUpperCase()}
                  </td>
                  <td className="fullname">
                    <a>{item.fullName}</a>
                  </td>
                  <td className="avail">
                    {Number(item.availableCount).format({ number: "property" , style:{ decimalLength: 8}})}
                  </td>
                  <td className="lock tac">{"—"}</td>
                  <td className="tobtc tac">{"—"}</td>
                  <td className="handle">
                    <Button
                      type="base"
                      theme="main"
                      disable={true}
                      title={this.intl.get("deposit")}
                    />
                    <Button
                      type="base"
                      className="withdraw"
                      theme="main"
                      disable={true}
                      title={this.intl.get("asset-withdraw")}
                    />
                    <Button
                      type="base"
                      theme="main"
                      disable={true}
                      title={this.intl.get("asset-trade")}
                    />
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
