import React, { Component } from 'react';
import exchangeViewBase from "../../ExchangeViewBase";
import {
    Link
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
        !result && (result={
                coinName: "BTC",
                coinIcon: "http://www.cointalks.com/res/btc.png",
                fullName: "Bitcoin",
                valuationBTC: 0,
                valuationCN: 0,
                availableCount: 0,
                frozenCount: 0,
            });
        //
        return <div className="balance-detail">
            <div className="d1">
                <img src={result.coinIcon}/>
                <b>{result.coinName}</b>
                <span>{result.fullName}</span>
            </div>
            <div className="d2">
                <p><span>估值 (BTC)</span><i>{result.valuationBTC}</i></p>
                <p><span>估值 (CNY)</span><i>{result.valuationCN}</i></p>
            </div>
            <div className="d3">
                <p><span>可用余额</span><i>{result.availableCount}</i></p>
                <p><span>下单冻结</span><i>{result.frozenCount}</i></p>
            </div>
            <Link className="coin-info" to={{pathname: `/mhelp/currency/`, query: {currency: result.coinName}}}>
                币种简介<img src="/static/mobile/btn_jy_dqddzk.png"/>
            </Link>
            <div className="footer">
                <a className="active">充币</a>
                <a>提币</a>
            </div>
        </div>
    }
}