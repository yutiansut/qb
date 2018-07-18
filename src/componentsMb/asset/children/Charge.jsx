import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../../components/ExchangeViewBase";
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
        let {coinAddress,verifyNumer} = this.state.coinAddress;
        let walletList=Object.keys(this.state.walletList);
        let currency=this.state.currency;
        return (
            <div className="charge">
                <div className="nav">
                    <NavLink to="/mwallet" className="left">&lt; {this.intl.get("back")}</NavLink>
                    <h3>{this.intl.get("asset-charge")}</h3>
                    <NavLink to={{pathname: "/mwallet/dashboard", query: {type:1}}} className="right"><img src="/static/mobile/asset/icon_dd_pre@2x.png"/></NavLink>
                </div>
                <div className="filter" onClick={()=>{
                    this.setState({showSelect:true});
                }}>
                    <label>{this.intl.get("asset-selectCoin")}</label>
                    <b>{currency}</b>
                    <i>&gt;</i>
                </div>
                <div className="info">
                    <QRCode value={coinAddress || "-"} level="M" size={160} className="qrcode"/>
                    {/* <a className="save-qrcode">保存二维码</a>*/}
                    <input type="text" ref="addr" value={coinAddress || "-"} disabled="disabled"/>
                    <a className="copy-addr"
                       onClick={()=>{
                           this.copy(this.refs.addr);
                       }}>
                        {this.intl.get("asset-copy")}</a>
                    <p>{this.intl.get("asset-depositTip",{currency:currency})}</p>
                    <p>{this.intl.get("asset-depositReminder1",{currency:currency,number:verifyNumer})}</p>
                    <p>{this.intl.get("asset-charge-h5-tip3")}</p>
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
