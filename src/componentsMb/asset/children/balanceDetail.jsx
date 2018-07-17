import React, { Component } from 'react';
import exchangeViewBase from "../../../components/ExchangeViewBase";
import {
    Link,
    NavLink
} from "react-router-dom";

import "../style/balanceDetail.styl"

export default class BalanceDetail extends exchangeViewBase {
    constructor(props) {
        super(props);
        this.name = "balance";
        let { controller } = props;
        //绑定view
        controller.setView(this);
        this.state = {};
        let { totalAsset, wallet } = controller.initState;
        //初始化数据，数据来源即store里面的state
        this.state = Object.assign(this.state, { totalAsset, wallet });
        //绑定方法
        this.getAssets = controller.getAssets.bind(controller);
    }

    async componentWillMount() {
        await this.getAssets();
    }

    render() {
        //获取路由参数,选取对应币种
        let coin = this.props.location.query && this.props.location.query.currency || "BTC";
        let i=0;
        this.state.wallet && this.state.wallet.map((item,index)=>{
            item.coinName.toUpperCase()===coin.toUpperCase() && (i=index);
        });
        let result=this.state.wallet[i];
        !result && (result={});
        //
        return <div className="balance-detail">
            <div className="nav">
                <NavLink to="/mwallet" className="left">&lt; {this.intl.get("back")}</NavLink>
                <h3>{this.intl.get("asset-detail")}</h3>
            </div>
            <div className="d1">
                <img src={result.coinIcon}/>
                <b>{result.coinName.toUpperCase()}</b>
                <span>{result.fullName}</span>
            </div>
            <div className="d2">
                <p><span>{this.intl.get("asset-valuation")} (BTC)</span><i>{result.valuationBTC}</i></p>
                <p><span>{this.intl.get("asset-valuation")} (CNY)</span><i>{result.valuationCN}</i></p>
            </div>
            <div className="d3">
                <p><span>{this.intl.get("asset-avail")}</span><i>{result.availableCount}</i></p>
                <p><span>{this.intl.get("asset-orderLock")}</span><i>{result.frozenCount}</i></p>
            </div>
            <Link className="coin-info" to={{pathname: `/mhelp/currency/`, query: {currency: result.coinName}}}>
                {this.intl.get("market-currencyInfo")}<img src="/static/mobile/btn_jy_dqddzk.png"/>
            </Link>
            <div className="footer">
                <NavLink to={{pathname: "/mwallet/charge", query: {currency:result.coinName}}} className="active">{this.intl.get("asset-charge")}</NavLink>
                <a>{this.intl.get("asset-withdraw")}</a>
            </div>
        </div>
    }
}