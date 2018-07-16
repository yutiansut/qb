import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../ExchangeViewBase";
import QRCode from "qrcode.react";
import Popup from '../../../common/component/Popup'

import "../style/charge.styl";

export default class Charge extends exchangeViewBase {
    constructor(props) {
        super(props);
        this.name = "charge";
        let { controller } = props;
        this.status = {
            0: this.intl.get("pending"),
            1: this.intl.get("passed"),
            2: this.intl.get("failed"),
            3: this.intl.get("cancel")
        };
        this.state = {
            currency: "BTC",
            value: "BTC",
            address: "",

            showPopup: false,
            popMsg: "",
            popType: "",

        };
        //绑定view
        controller.setView(this);
        //初始化数据，数据来源即store里面的state
        let {
            walletList,
            assetHistory,
            currencyAmount,
            coinAddress
        } = controller.initState;

        this.state = Object.assign(this.state, {
            walletList,
            assetHistory,
            currencyAmount,
            coinAddress
        });

        // 绑定方法
        this.copy = el => {
            if(controller.copy(el)){
                this.setState({showPopup:true,popMsg:"复制成功",popType:"tip1"})
            }else{
                this.setState({showPopup:true,popMsg:"复制失败",popType:"tip3"})
            }
        };

        this.getWalletList = controller.getWalletList.bind(controller);

        this.getCurrencyAmount = controller.getCurrencyAmount.bind(controller);

        this.getCoinAddress = controller.getCoinAddress.bind(controller);

        this.getHistory = controller.getHistory.bind(controller);

        this.getTradePair = controller.getTradePair.bind(controller);
        // 处理出币种对应的交易对数组
        this.getCoinPair = controller.getCoinPair.bind(controller);
    }

    async componentWillMount() {
        let currency =
            this.props.location.query && this.props.location.query.currency;
        currency &&
        this.setState({
            currency: currency,
            value: currency
        });
        await this.getWalletList();
        this.getTradePair();
        this.getCurrencyAmount(currency || this.state.currency);
        this.getCoinAddress(currency || this.state.currency);
        this.getHistory({
            page: 0,
            pageSize: 10,
            coinId: -1,
            coinName: -1,
            orderType: 1,
            orderStatus: -1,
            startTime: -1,
            endTime: -1
        });
    }

    componentDidMount() {
        window.addEventListener("click", this.hideQrcode);
    }

    componentWillUpdate(props, state, next) {
        if (this.state.currency !== state.currency) {
            this.getCoinAddress(state.currency);
            this.getCurrencyAmount(state.currency);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(nextState) !== JSON.stringify(this.state)) return true;
        return false;
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.hideQrcode);
    }

    copy(el){
        if(this.props.controller.copy(el)){

        }else{

        }
    };

    render() {
        let { totalCount, frozenCount, availableCount } = this.state.currencyAmount;
        let { total, orderList } = this.state.assetHistory;
        let address = this.state.coinAddress;

        return (
            <div className="charge">
                <div className="nav">
                    <a>&lt; 返回</a>
                    <h3>充币</h3>
                    <a>充币记录</a>
                </div>
                <div className="filter">
                    <label>选择币种</label>
                    <b>BTC</b>
                    <i>&gt;</i>
                </div>
                <div className="info">
                    <QRCode value={this.state.address} level="M" size="160" className="qrcode"/>
                    {/* <a className="save-qrcode">保存二维码</a>*/}
                    <input type="text" ref="addr">1HzAeTtq1MvjcrzU7RtgMb1y4Lps3tg67r</input>
                    <a className="copy-addr"
                       onClick={()=>{
                           this.copy(this.refs.addr);
                       }}>
                        复制地址</a>
                    <p>请勿向上述地址充值任何非USDT资产，否则资产将不可找回。</p>
                    <p>您充值至上述地址后，需要整个网络节点的确认，5次网络确认后到账。</p>
                    <p>最小充值金额：10ETH，小于最小金额的充值将不会上账。</p>
                    <p>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</p>
                </div>
                {/*提示框*/}
                {this.state.showPopup && (
                    <Popup
                        type={this.state.popType}
                        msg={this.state.popMsg}
                        onClose={() => {
                            this.setState({ showPopup: false });
                        }}
                        autoClose = {true}
                    />
                )}
            </div>
        );
    }
}
