import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../../components/ExchangeViewBase";

export default class Withdraw extends exchangeViewBase {
    constructor(props) {
        super(props);
        let { controller } = props;
        this.state = {
           currency: "",
        };
        //绑定view
        controller.setView(this);
        //初始化数据，数据来源即store里面的state

        this.addContent = controller.headerController.addContent.bind(controller.headerController) // 获取头部内容

    }

    async componentWillMount() {
        this.addContent({con: this.intl.get("asset-withdraw")});

        let currency = this.props.location.query && this.props.location.query.currency;
        currency && (currency=currency.toUpperCase()) && this.setState({currency: currency.toUpperCase()});

    }

    componentDidMount() {}

    render() {
        let {currency} = this.state;

        return (
            <div className="withdraw">
                {/*选择币种*/}
                <p className="select">
                    <label>选择币种</label>
                    <span>btc</span>
                    <img src="/static/mobile/asset/icon_next@2x.png"/>
                </p>
                {/*地址名称*/}
                <p className="addr-info">
                    地址名称：USDT-adress-1
                </p>
                {/*提币地址*/}
                <div className="addr">
                    <label>提币地址</label>
                    <p>
                        <span>12345asd91324749kadgflas32465729983wqer912345asd91324749kadgflas32465729983wqer9</span>
                        <img src="/static/mobile/asset/icon_position@2x.png"/>
                    </p>
                </div>
                {/*可用，提币额度，已用*/}
                <p className="num-info">
                    <span className="s1">可用：20.8781USDT</span>
                    <span className="s2">24h提币额度：10BTC(已用0)</span>
                </p>
                {/*提币数量*/}
                <div className="num">
                    <label>提币数量</label>
                    <p className="p1">
                        <input type="text"/>
                        <i>USDT</i>
                        <a>全部</a>
                    </p>
                    <p className="p2">
                        <span>矿工费：0.01USDT</span>
                        <span className="s2">到账数量：0.000000USDT</span>
                    </p>
                </div>
                {/*资金密码*/}
                <div className="pass">
                    <a><i>设置资金密码</i><img src="/static/mobile/asset/icon_next@2x.png"/></a>
                </div>

                <div className="pass">
                    <p>
                        <label>资金密码</label>
                        <input type="text" placeholder="输入资金密码"/>
                    </p>
                    <p>
                        <label>短信验证码</label>
                        <input type="text" placeholder="输入验证码"/>
                        <a>发送验证码</a>
                    </p>
                </div>
                {/*提币须知*/}
                <div className="txt">
                    <h3>提币须知：</h3>
                    <p>最小提币数量为：200 USDT</p>
                    <p>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</p>
                </div>
                {/*提币*/}
                <div className="submit">
                    <button>提币</button>
                </div>

            </div>
        );
    }
}
