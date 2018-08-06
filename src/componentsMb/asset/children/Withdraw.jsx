import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../../components/ExchangeViewBase";

export default class Withdraw extends exchangeViewBase {
    constructor(props) {
        super(props);
        let { controller } = props;
        this.state = {
            currency: "",
            currencyAmount: {},
            address: "",
            walletExtract: {},

            inputNum: 0,            //提现数量
            inputPass: 0,      //资金密码
            inputCode: 0,      //短信验证码

            userTwoVerify: {withdrawVerify: -1, fundPwd: -1},   //fundPwd: 0-未设置密码，1-已设置  withdrawVerify: 0 无 1 邮件 2 谷歌验证 3 短信
            showLayer: false,   //超过可用额度弹框
        };
        //绑定view
        controller.setView(this);

        //获取当前币种资产信息
        this.getCurrencyAmount = controller.getCurrencyAmount.bind(controller);
        // 获取提笔最小数量和地址
        this.getExtract = controller.getExtract.bind(controller);
        // 获取矿工费
        this.getMinerFee = controller.getMinerFee.bind(controller);
        // 请求验证码
        this.requestCode = controller.requestCode.bind(controller);
        // 获取资金密码设置状态和两步验证方式
        this.getUserInfo = controller.getUserInfo.bind(controller);

        this.addContent = controller.headerController.addContent.bind(controller.headerController) // 获取头部内容
    }

    async componentDidMount() {
        this.addContent({con: this.intl.get("asset-withdraw")});
        // 获取路由参数
        let currency = this.props.controller.getQuery("currency").toUpperCase() || "";
        if(currency){
            this.setState({currency: currency});
            await this.getExtract();
            this.getMinerFee(currency , this.state.address);
            this.getCurrencyAmount(currency);
            this.getUserInfo();
        }
    }

    render() {
        let {history} = this.props;
        let {
            currency,
            showLayer,
            inputNum,
            inputPass,
            inputCode } = this.state;

        //可用，总额度，已用额度
        //let currencyAmount = {availableCount:9987.755108, availableQuota:10, frozenCount:0.01144746, totalCount:9987.76655546, totalQuota:10, usedQuota:0}
        let {availableCount,totalQuota,usedQuota} = this.state.currencyAmount || {};

        //旷工费，最小提币量，提币地址
        //let walletExtract = {extractAddr: [{coinId: 9, coinName: "ltc", minCount: 0.1, addressList: []}], minerFee: 0.0005}
        let {minerFee,extractAddr} = this.state.walletExtract;
        let {minCount,addressList} = extractAddr && extractAddr.filter(item => item.coinName.toLowerCase() === currency.toLowerCase())[0] || {};
        //let addressList = [{addressId:0, addressName:"xx", address:"xxx"}]
        let {addressName,address} = addressList && addressList.sort((a,b) => a.addressName<b.addressName?-1:1)[0] || {};

        //实际到账
        let num = Number(inputNum);
        let toNum = num.minus(minerFee);
        toNum = toNum>0 && num>minCount && num<availableCount ? toNum : 0;

        //两步验证状态
        let {withdrawVerify,fundPwd} = this.state.userTwoVerify || {};

        return (
            <div className="withdraw">
                {/*选择币种*/}
                <div className="select" onClick={()=>history.push(`/wallet/select?to=/wallet/withdraw`)}>
                    <label>{this.intl.get("asset-selectCoin")}</label>
                    <b className={currency ? "":"gray"}>{currency || this.intl.get("h5-asset-selectCoin")}</b>
                    <img src="/static/mobile/asset/icon_next@2x.png"/>
                </div>

                {/*提币信息*/}
                {currency ?
                    <div className="form">
                        {/*地址名称*/}
                        <p className="addr-info">{this.intl.get("name")} {addressName}</p>
                        {/*提币地址*/}
                        <div className="addr">
                            <label>{this.intl.get("asset-withdrawAddress")}</label>
                            <p>
                                <span>{address || "-"}</span>
                                <img src="/static/mobile/asset/icon_position@2x.png"/>
                            </p>
                        </div>
                        {/*可用，提币额度，已用*/}
                        <p className="num-info">
                            <span className="s1">{this.intl.get("deal-use")} {availableCount}</span>
                            {/* 24h提币额度：10BTC(已用0) */}
                            <span className="s2">{this.intl.get("asset-24hQuota")}：{totalQuota}BTC({this.intl.get("asset-usedAsset")}{usedQuota})</span>
                        </p>
                        {/*提币数量*/}
                        <div className="num">
                            <label>{this.intl.get("asset-withdrawAmount")}</label>
                            <p className="p1">
                                <input type="text" value={inputNum} onInput={e=>{
                                    console.log(e.target.value);
                                    this.setState({inputNum:e.target.value})
                                }}/>
                                <i>{currency}</i>
                                <a>{this.intl.get("all")}</a>
                            </p>
                            <p className="p2">
                                <span>{this.intl.get("asset-gasFee")}：{minerFee}BTC</span>
                                <span className="s2">{this.intl.get("asset-withdrawActual")} {toNum}</span>
                            </p>
                        </div>
                        {/*未设置资金密码*/}
                        {fundPwd === 1 &&
                            <div className="pass">
                                <NavLink to="/user/setPwd?type=5">
                                    <i>{this.intl.get("asset-setFundPassword")}</i>
                                    <img src="/static/mobile/asset/icon_next@2x.png"/>
                                </NavLink>
                            </div>}
                        {/*已设置资金密码*/}
                        {fundPwd === 0 &&
                            <div className="pass">
                                {/*资金密码*/}
                                <p>
                                    <label>{this.intl.get("fundPass")}</label>
                                    <input type="password" placeholder={this.intl.get("deal-inputpwd")}/>
                                </p>

                                {/*短信验证码*/}
                                {withdrawVerify === 3 &&
                                    <p>
                                        <label>{this.intl.get("user-verifyPhone")}</label>
                                        <input type="text" placeholder={this.intl.get("user-inputVerify")}/>
                                        <a>{this.intl.get("login-sendCode")}</a>
                                    </p>}
                                {/*邮箱验证码*/}
                                {withdrawVerify === 1 &&
                                    <p>
                                        <label>{this.intl.get("user-verifyEmail")}</label>
                                        <input type="text" placeholder={this.intl.get("user-inputVerify")}/>
                                        <a>{this.intl.get("login-sendCode")}</a>
                                    </p>}
                                {/*谷歌验证码*/}
                                {withdrawVerify === 2 &&
                                    <p>
                                        <label>{this.intl.get("user-popGoole")}</label>
                                        <input type="text" placeholder={this.intl.get("user-inputVerify")}/>
                                    </p>}
                            </div>}
                        {/*提币须知*/}
                        <div className="txt">
                            <h3>{this.intl.get("h5-asset-withdraw-tip")}</h3>
                            <p>{this.intl.get("asset-minWithdraw-tip",{number:minCount,currency:currency})}</p>
                            <p>{this.intl.get("asset-charge-h5-tip3")}</p>
                        </div>
                        {/*提币*/}
                        <div className="submit">
                            <button>提币</button>
                        </div>
                    </div>
                    :
                    <div className="empty">
                        {/*未选择币种*/}
                        <b>{this.intl.get("h5-asset-empty3")}</b>
                        <i>{this.intl.get("h5-asset-empty4")}</i>
                    </div>}

                {/*遮罩层*/}
                {showLayer && <div className="layer-shadow"/>}
                {/*弹框 -超过可用额度*/}
                {showLayer &&
                    <div className="layer">
                        <h3>
                            <b>温馨提示</b>
                            <img src="/static/mobile/asset/icon_cancel@3x.png"/>
                        </h3>
                        <p>您已超过2BTC可用额度，请先进行实名认证方可提币～～</p>
                        <button>实名认证</button>
                    </div>}
            </div>
        );
    }
}
