import React, { Component } from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";
import Button from "../../../common/component/Button";
import { Link, NavLink } from "react-router-dom";


export default class BalanceDetail extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.name = "balance";
    let { controller } = props;
    //绑定view
    controller.setView(this);
    controller.marketController.setView(this);
    this.state = {
        result: {},
        tradePair: {},
        showCoinInfo: false,
    };
    let { wallet } = controller.initState;
    let { coinInfo } = controller.marketController.initState;
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, { wallet, coinInfo});
    //绑定方法
    this.getAssets = controller.getAssets.bind(controller);
    this.getCoinInfo = controller.marketController.getCoinInfo.bind(controller.marketController);
    this.getCoinPair = controller.getCoinPair.bind(controller);
    this.getTradePair = controller.getTradePair.bind(controller);
    //头部
    this.addContent = controller.headerController.addContent.bind(controller.headerController) // 获取头部内容
  }

  async componentWillMount(){
    this.addContent({con: this.intl.get("asset-detail"),link: false, url: "/wallet"});

    await this.getAssets();
    //获取路由参数,选取对应币种
    let coin = (this.props.location.query && this.props.location.query.currency) || "BTC";
    let result = (this.state.wallet && this.state.wallet.filter(item => item.coinName.toUpperCase() === coin.toUpperCase())[0]) || {};
    //加载币种信息和交易对

    this.getCoinInfo(result.coinId);
    this.getTradePair();
    this.state.result = result;
  }

  render() {
    let result = this.state.result || {};
    let coinPair = this.getCoinPair(this.state.tradePair,result.coinName) || [];
    let {
      name,
      enName,
      priceCN,
      priceEN,
      releaseTime,
      totalValueCN,
      totalValueEN,
      totalVolume,
      circulationVolume,
      description,
      webSite,
      whitePaper,
      blockSites
    } = this.state.coinInfo;
    let lang = this.props.controller.configData.language;

    return (
      <div className="balance-detail">

        {/*币种详情*/}
        <div className="detail">
            <div className="d1">
                <img src={result.coinIcon} />
                <b>{result.coinName && result.coinName.toUpperCase()}</b>
                <span>{result.fullName}</span>
            </div>
            <div className="d2">
                <p>
                    <span>{this.intl.get("asset-valuation")} (BTC)</span>
                    <i>{(result.valuationBTC || 0).format({number: "property", style: { decimalLength: 8 }})}</i>
                </p>
                <p>
                    <span>{this.intl.get("asset-valuation")} ({lang==="zh-CN" ? "¥" : "$"})</span>
                    <i>{lang==="zh-CN" ? result.valuationCN : result.valuationEN}</i>
                </p>
            </div>
            <div className="d3">
                <p>
                    <span>{this.intl.get("asset-amount")}</span>
                    <i>{(result.totalCount || 0).format({number: "property", style: { decimalLength: 8 }})}</i>
                </p>
                <p>
                    <span>{this.intl.get("asset-avail")}</span>
                    <i>{(result.availableCount || 0).format({number: "property", style: { decimalLength: 8 }})}</i>
                </p>
                <p>
                    <span>{this.intl.get("asset-orderLock")}</span>
                    <i>{(result.frozenCount || 0).format({number: "property", style: { decimalLength: 8 }})}</i>
                </p>
            </div>
            <div className="to-trade">
                <h3>{this.intl.get("asset-toTrade")}</h3>
                <p>{coinPair && coinPair.map((item,i) => <a key={i}>{item.name && item.name.toUpperCase()}</a>)}</p>
            </div>
        </div>

        {/*底部充提按钮*/}
        <div className="footer">
          <Button
            title={this.intl.get("asset-charge")}
            className="active"
            disable={result.c === 0 ? true : false}
            onClick={() => {
                this.props.history.push({ pathname: "/wallet/charge", query: { currency: result.coinName }})
            }}
          />
          <Button title={this.intl.get("asset-withdraw")} />
        </div>

        {/*币种简介*/}
        <div className={`coin-data ${this.state.showCoinInfo ? "show" : ""}`} ref="coinData">
          <a className="title" onClick={()=>this.setState({showCoinInfo:!this.state.showCoinInfo})}>
              {this.intl.get("market-currencyInfo")}
              <img src={this.state.showCoinInfo ? "/static/mobile/asset/icon_zc_select_click@2x.png" : "/static/mobile/asset/icon_zc_select_normal@2x.png"} />
          </a>
          <h3>{enName}&nbsp;({name && name.toUpperCase()})</h3>
          <div className="data-li">
              <label>{this.intl.get('helo-coin-date')}：</label>
              <span>{releaseTime.toDate("yyyy-MM-dd")}</span>
          </div>
          <div className="data-li">
              <label>{this.intl.get('helo-coin-total')}：</label>
              <span>{totalVolume.format({ number: "general" })}</span>
          </div>
          <div className="data-li">
              <label>{this.intl.get('helo-coin-market')}：</label>
              <span>{lang === "zh-CN" ? `¥${Number(totalValueCN).format({ number: "legal" })}` : `$${Number(totalValueEN).format({number: "legal"})}`}</span>
          </div>
          <div className="data-li">
              <label>{this.intl.get('helo-coin-liquidity')}：</label>
              <span>{circulationVolume.format({ number: "general" })}</span>
          </div>
          <div className="data-li">
              <label>{this.intl.get('helo-coin-price')}：</label>
              <span>{lang === "zh-CN" ? `¥${Number(priceCN).format({ number: "legal" })}` : `$${Number(priceEN).format({ number: "legal" })}`}</span>
          </div>
          <div className="data-li">
              <label>{this.intl.get('helo-coin-website')}：</label>
              <span>{webSite && webSite[0]}</span>
          </div>
          <div className="data-li">
              <label>{this.intl.get('helo-coin-browser')}：</label>
              <span>{blockSites && blockSites[0]}</span>
          </div>
          <div className="data-li">
              <label>{this.intl.get('helo-coin-white')}：</label>
              <span>{whitePaper && whitePaper[0]}</span>
          </div>
          <div className="detail">
              <label>{this.intl.get('helo-coin-introduction')}</label>
              <p>{description && this.intl.get(description) ? this.intl.get(description) : description}</p>
          </div>
        </div>

      </div>
    );
  }
}
