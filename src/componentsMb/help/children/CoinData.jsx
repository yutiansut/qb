import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../../components/ExchangeViewBase";
import Input from "../../../common/component/Input";
import Button from "../../../common/component/Button";

export default class CoinData extends exchangeViewBase {
  constructor(props) {
    super(props);
    const { controller } = props;
    controller.setView(this);
    controller.marketController.setView(this);
    this.state = {
      showSearch: false,
      currency: "ETH",
      unit: controller.configData.language === "zh-CN" ? 1 : 0,
      value: "ETH",
      walletList: {},
      tradePair: null
    };
    let { coinInfo } = controller.marketController.initState;

    this.state = Object.assign(this.state, {
      coinInfo
    });

    this.getWalletList = controller.getWalletList.bind(controller);

    this.getCoinInfo = controller.marketController.getCoinInfo.bind(
      controller.marketController
    );
    // 获取币种对应交易对
    this.getTradePair = controller.getTradePair.bind(controller);
    // 处理出币种对应的交易对数组
    this.getCoinPair = controller.getCoinPair.bind(controller);

    this.show = () => {
      this.setState({ showSearch: true });
    };
    this.hide = () => {
      this.setState({ showSearch: false });
    };
    this.setValue = value => {
      this.setState({ value });
    };
    this.setCurrency = currency => {
      this.setState({ currency });
    };
    this.search = () => {
      let value = (this.state.value !== "" && this.searchArr[0]) || "ETH";
      this.setValue(value);
      this.setCurrency(value);
      this.hide();
    };
  }
  async componentWillMount() {
    await this.getWalletList();
    let currency =
      this.props.location.query && this.props.location.query.currency.toUpperCase();
    currency && this.setState({ currency: currency, value: currency });

    (!currency || currency === this.state.currency) && await this.getCoinInfo(this.state.walletList[currency || this.state.currency]);

    this.getTradePair();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.currency !== this.state.currency) {
      console.log('updateing', nextState.currency, this.state.currency);
      this.getCoinInfo(this.state.walletList[nextState.currency]);
    }
    if (JSON.stringify(nextState) === JSON.stringify(this.state)) return false;
    return true;
  }

  render() {
    console.log(this.state.coinInfo);
    let {
      name,
      enName,
      icoPriceCN,
      icoPriceEN,
      priceCN,
      priceEN,
      logo_url,
      releaseTime,
      totalValueCN,
      totalValueEN,
      totalVolume,
      circulationVolume,
      description,
      webSite,
      blockSites,
      whitePaper
    } = this.state.coinInfo;
    let { controller } = this.props;
    this.searchArr = controller.filter(
      Object.keys(this.state.walletList),
      this.state.value.toUpperCase()
    );
    return (
      <div className="help-coin">
        <h2 className="title">
          {this.intl.get('market-currencyInfo')} - <a>{this.state.currency}</a>
        </h2>
        <div className="search clearfix">
          <div className="input">
            <Input
              type="search2"
              placeholder={this.intl.get('helo-coin-search')}
              value={this.state.value}
              onInput={value => {
                this.setValue(value);
              }}
              onFocus={this.show}
              onEnter={this.search}
              clickOutSide={this.search}
            >
              {this.state.showSearch && this.searchArr.length ? (
                <ul className="search-list">
                  {this.searchArr.map((item, index) => (
                    <li
                      key={index}
                      onClick={e => {
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                        this.setValue(item);
                        this.setCurrency(item);
                        this.hide();
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                  ""
                )}
            </Input>
          </div>
          <button
            className={`${!this.state.unit && "active"}`}
            onClick={() => {
              this.setState({ unit: 0 });
            }}
          >
            $
          </button>
          <button
            className={`${this.state.unit && "active"}`}
            onClick={() => {
              this.setState({ unit: 1 });
            }}
          >
            ¥
          </button>
        </div>
        <div className="content">
          <img src={logo_url} alt="" />
          <div className="left">
              <p>
                  {name.toUpperCase()}({enName})
              </p>
              <p>
                  {this.state.unit
                      ? `¥${Number(priceCN).format({ number: "legal" })}`
                      : `$${Number(priceEN).format({ number: "legal" })}`}
              </p>
              <NavLink
                  to={{
                      pathname: "/wallet/charge",
                      query: { currency: this.state.currency }
                  }}
              >
                  {this.intl.get('helo-coin-deposit')}
              </NavLink>
          </div>
          <div className="right">
            <p>
              <span>
                  <b>{this.intl.get('helo-coin-market')}：</b>{this.state.unit
                  ? `¥${Number(totalValueCN).format({ number: "legal" })}`
                  : `$${Number(totalValueEN).format({
                    number: "legal"
                  })}`}
              </span>
              <span>
                  <b>{this.intl.get('helo-coin-total')}：</b>{totalVolume.format({ number: "general" })}
              </span>
              <span>
                  <b>{this.intl.get('helo-coin-liquidity')}：</b>{circulationVolume.format({ number: "general" })}
              </span>
            </p>
            <p>
              <span>
                  <b>{this.intl.get('helo-coin-price')}：</b>{this.state.unit
                  ? `¥${Number(priceCN).format({ number: "legal" })}`
                  : `$${Number(priceEN).format({ number: "legal" })}`}
              </span>
                <span><b>{this.intl.get('helo-coin-date')}：</b>{releaseTime.toDate("yyyy-MM-dd")}</span>
            </p>
            <p className="to-trade">
              <h3>{this.intl.get('helo-coin-trade')}：</h3>
              {this.getCoinPair(
                this.state.tradePair,
                this.state.currency
              ).map((v, index) => (
                <NavLink
                  to={{
                    pathname: `/trade`,
                    query: { id: v.id }
                  }}
                  key={index}
                >
                  {v.name}
                </NavLink>
              ))}
            </p>
          </div>
          <div className="detail">
            <h3>{this.intl.get('helo-coin-introduction')}<br /></h3>
            <p>
              {description && this.intl.get(description) ? this.intl.get(description) : description}
            </p>
            <div className="button">
              <Button type="base" title={this.intl.get('helo-coin-website')} href={webSite && webSite[0]} target={true} />
              <Button type="base" title={this.intl.get('helo-coin-browser')} href={blockSites && blockSites[0]} target={true} />
              <Button type="base" title={this.intl.get('helo-coin-white')} href={whitePaper && whitePaper[0]} target={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}