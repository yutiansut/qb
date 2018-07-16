import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../ExchangeViewBase";
import QRCode from "qrcode.react";
import Popup from '../../../common/component/Popup'

import "../style/charge.styl";

export default class Charge extends exchangeViewBase {
    constructor(props) {
        super(props);
        let { controller } = props;
        this.state = {
            currency: "BTC",
            address: "",

            showPopup: false,
            popMsg: "",
            popType: "",

            showSelect: false

        };
        //绑定view
        controller.setView(this);
        //初始化数据，数据来源即store里面的state
        let {
            walletList,
            coinAddress
        } = controller.initState;

        this.state = Object.assign(this.state, {
            walletList,
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
        this.getCoinAddress = controller.getCoinAddress.bind(controller);
    }

    async componentWillMount() {
        let currency = this.props.location.query && this.props.location.query.currency;
        currency && this.setState({currency: currency});
        await this.getWalletList();
        this.getCoinAddress(currency || this.state.currency);
    }

    componentDidMount() {}

    render() {
        let address = this.state.coinAddress.coinAddress || "-";
        let walletList=Object.keys(this.state.walletList);
        return (
            <div className="charge">
                <div className="nav">
                    <a className="left">&lt; 返回</a>
                    <h3>充币</h3>
                    <a className="right">充币记录</a>
                </div>
                <div className="filter" onClick={()=>{
                    this.setState({showSelect:true});
                }}>
                    <label>选择币种</label>
                    <b>{this.state.currency}</b>
                    <i>&gt;</i>
                </div>
                <div className="info">
                    <QRCode value={address} level="M" size={160} className="qrcode"/>
                    {/* <a className="save-qrcode">保存二维码</a>*/}
                    <input type="text" ref="addr" value={address} disabled="disabled"/>
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
                {/*选择币种*/}
                {this.state.showSelect && <div className="select">
                    <div className="nav sl-head">
                        <a className="left" onClick={()=>{
                            this.setState({showSelect:false});
                        }}>&lt; 返回</a>
                        <h3>选择币种</h3>
                    </div>
                    <ul>
                        {walletList && walletList.map((item,index)=>{
                            return <li key={index} onClick={()=>{
                                this.setState({currency:item,showSelect:false},()=>{
                                    this.getCoinAddress(this.state.currency);
                                })
                            }}>{item.toUpperCase()}</li>
                        })}
                    </ul>
                </div>}
            </div>
        );
    }
}
