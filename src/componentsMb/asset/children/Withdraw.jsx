import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../../components/ExchangeViewBase";
import Popup from "../../../common/component/Popup";

export default class Withdraw extends exchangeViewBase {
  constructor(props) {
    super(props);
    let { controller } = props;
    console.log(props.location);
    this.state = {
      currency: "",
      currencyAmount: {},
      curAddress:
        props.location.query && props.location.query.address
          ? props.location.query.address
          : null,
      address: {},
      walletExtract: {},
      userInfo: {},

      inputNum: 0, //提现数量
      inputPass: "", //资金密码
      inputCode: "",

      userTwoVerify: { withdrawVerify: -1, fundPwd: -1 }, //fundPwd: 0-未设置密码，1-已设置  withdrawVerify: 0 无 1 邮件 2 谷歌验证 3 短信
      verifyNum: 0, //验证码倒计时
      showVerify: false,
      showPopup: false,
      popType: '',
      popMsg: ''
    };
    //绑定view
    controller.setView(this);

    //获取当前币种资产信息
    this.getCurrencyAmount = controller.getCurrencyAmount.bind(controller);
    // 获取提笔最小数量和地址
    this.getExtract = controller.getExtract.bind(controller);
    // 获取矿工费
    this.getMinerFee = controller.getMinerFee.bind(controller);
    // 获取用户信息
    this.getUserInfo = controller.getUserInfo.bind(controller);
    // 发送验证码
    this.getVerify = controller.getVerify.bind(controller);
    // 提交提币订单
    this.extractOrder = controller.extractOrder.bind(controller);

    this.addContent = controller.headerController.addContent.bind(
      controller.headerController
    ); // 获取头部内容
  }

  async componentDidMount() {
    this.addContent({ con: this.intl.get("asset-withdraw") });
    // 获取路由参数
    let currency =
      this.props.controller.getQuery("currency").toUpperCase() || "";
    if (currency) {
      this.setState({ currency: currency });
      await this.getExtract();
      this.getMinerFee(currency, this.state.curAddress || this.state.address);
      this.getCurrencyAmount(currency);
      this.getUserInfo();
    }
  }

  render() {
    let { history } = this.props;
    let {
      verifyNum,
      currency,
      inputNum,
      inputPass,
      inputCode,
      showVerify,
      showPopup,
      popType,
      popMsg
    } = this.state;

    //可用，总额度，已用额度，可用额度
    //let currencyAmount = {availableCount:9987.755108, availableQuota:10, frozenCount:0.01144746, totalCount:9987.76655546, totalQuota:10, usedQuota:0}
    let { availableCount, totalQuota, usedQuota, availableQuota } =
      this.state.currencyAmount || {};

    //旷工费，最小提币量，提币地址
    //let walletExtract = {extractAddr: [{coinId: 9, coinName: "ltc", minCount: 0.1, addressList: []}], minerFee: 0.0005}
    let { minerFee, extractAddr } = this.state.walletExtract;
    let { minCount, addressList } =
      (extractAddr &&
        extractAddr.filter(
          item => item.coinName.toLowerCase() === currency.toLowerCase()
        )[0]) ||
      {};
    //let addressList = [{addressId:0, addressName:"xx", address:"xxx"}]

    // 这里应该是从addressList 里取到Address.jsx 点击的那个地址

    let { addressName, address } = this.state.curAddress || this.state.address;

    //实际到账
    let num = Number(inputNum);
    let toNum = num.minus(minerFee).toString();
    toNum = toNum > 0 && num >= minCount && num <= availableCount ? toNum : 0;

    //提币验证方式，是否设置资金密码
    let { withdrawVerify, fundPwd } = this.state.userTwoVerify || {};

    //验证码倒计时文本
    let verifyNumStr =
      verifyNum > 0 ? verifyNum + "s" : this.intl.get("sendCode");

    //是否能提交
    let canSubmit = address && toNum > 0 && inputPass && inputCode;

    return (
      <div className="withdraw">
        {/*选择币种*/}
        <div
          className="select"
          onClick={() => history.push(`/wallet/select?to=/wallet/withdraw`)}
        >
          <label>{this.intl.get("asset-selectCoin")}</label>
          <b className={currency ? "" : "gray"}>
            {currency || this.intl.get("h5-asset-selectCoin")}
          </b>
          <img src="/static/mobile/asset/icon_next@2x.png" />
        </div>

        {/*提币信息*/}
        {currency ? (
          <div className="form">
            {/*地址名称*/}
            <p className="addr-info">
              {this.intl.get("asset-address-name")} {addressName}
            </p>
            {/*提币地址*/}
            <div className="addr">
              <label>{this.intl.get("asset-withdrawAddress")}</label>
              <p>
                <span>{address || "-"}</span>
                <img
                  src="/static/mobile/asset/icon_position@2x.png"
                  onClick={() =>
                    history.push(`/wallet/address?currency=${currency}`)
                  }
                />
              </p>
            </div>
            {/*可用，提币额度，已用*/}
            <p className="num-info">
              <span className="s1">
                {this.intl.get("deal-use")} {availableCount}
              </span>
              {/* 24h提币额度：10BTC(已用0) */}
              <span className="s2">
                {this.intl.get("asset-24hQuota")}：{totalQuota}
                BTC(
                {this.intl.get("asset-usedAsset")}
                {usedQuota})
              </span>
            </p>
            {/*提币数量*/}
            <div className="num">
              <label>{this.intl.get("asset-withdrawAmount")}</label>
              <p className="p1">
                <input
                  type="text"
                  value={inputNum}
                  onInput={e => {
                    let value = e.target.value;
                    value = value.replace(/[^\d.]/g, "");
                    if (!/^[0-9]+\.?[0-9]{0,8}$/.test(value) && value !== "")
                      return;
                    this.setState({ inputNum: value });
                  }}
                />
                <i>{currency}</i>
                <a onClick={() => this.setState({ inputNum: availableCount })}>
                  {this.intl.get("all")}
                </a>
              </p>
              <p className="p2">
                <span>
                  {this.intl.get("asset-gasFee")}：{minerFee}
                  BTC
                </span>
                <span className="s2">
                  {this.intl.get("asset-withdrawActual")} {toNum}
                </span>
              </p>
            </div>

            {/*未设置资金密码*/}
            {fundPwd === 1 && (
              <div className="pass">
                <NavLink to="/user/setPwd?type=5">
                  <i>{this.intl.get("asset-setFundPassword")}</i>
                  <img src="/static/mobile/asset/icon_next@2x.png" />
                </NavLink>
              </div>
            )}

            {/*已设置资金密码*/}
            {fundPwd === 0 && (
              <div className="pass">
                {/*资金密码*/}
                <p>
                  <label>{this.intl.get("fundPass")}</label>
                  <input
                    type="password"
                    placeholder={this.intl.get("deal-inputpwd")}
                    value={inputPass}
                    onInput={e => this.setState({ inputPass: e.target.value })}
                  />
                </p>
                {/*短信验证码*/}
                {withdrawVerify === 3 && (
                  <p>
                    <label>{this.intl.get("user-verifySMS")}</label>
                    <input
                      type="text"
                      placeholder={this.intl.get("user-inputVerify")}
                      value={inputCode}
                      onInput={e =>
                        this.setState({ inputCode: e.target.value })
                      }
                    />
                    <a onClick={() => this.getVerify()}>{verifyNumStr}</a>
                  </p>
                )}
                {/*邮箱验证码*/}
                {withdrawVerify === 1 && (
                  <p>
                    <label>{this.intl.get("user-verifyEmail")}</label>
                    <input
                      type="text"
                      placeholder={this.intl.get("user-inputVerify")}
                      value={inputCode}
                      onInput={e =>
                        this.setState({ inputCode: e.target.value })
                      }
                    />
                    <a onClick={() => this.getVerify()}>{verifyNumStr}</a>
                  </p>
                )}
                {/*谷歌验证码*/}
                {withdrawVerify === 2 && (
                  <p>
                    <label>{this.intl.get("user-popGoole")}</label>
                    <input
                      type="text"
                      placeholder={this.intl.get("user-inputVerify")}
                      value={inputCode}
                      onInput={e =>
                        this.setState({ inputCode: e.target.value })
                      }
                    />
                  </p>
                )}
              </div>
            )}

            {/*提币须知*/}
            <div className="txt">
              <h3>{this.intl.get("h5-asset-withdraw-tip")}</h3>
              <p>
                {this.intl.get("asset-minWithdraw-tip", {
                  number: minCount,
                  currency: currency
                })}
              </p>
              <p>{this.intl.get("asset-charge-h5-tip3")}</p>
            </div>
            {/*提币*/}
            <div className="submit">
              <button
                className={canSubmit ? "" : "disable"}
                onClick={() => {
                  this.extractOrder({
                    coinName: currency,
                    toAddr: address,
                    amount: Number(inputNum),
                    fundPass: inputPass,
                    code: inputCode
                  }, true);
                }}
              >
                {this.intl.get("asset-withdraw")}
              </button>
            </div>
          </div>
        ) : (
          <div className="empty">
            {/*未选择币种*/}
            <b>{this.intl.get("h5-asset-empty3")}</b>
            <i>{this.intl.get("h5-asset-empty4")}</i>
          </div>
        )}

        {showVerify && <div className="layer-shadow" />}
        {/*弹框 -可用额度不足*/}
        {showVerify && (
          <div className="layer">
            <h3>
              <b>{this.intl.get("asset-reminder")}</b>
              <img src={this.$imagesMap.$h5_icon_cancel} onClick={()=>{
                  this.setState({showVerify:false})
              }}/>
            </h3>
            <p>{this.intl.get("h5-asset-withdraw-tip2")}</p>
            <button onClick={()=>{
               history.push({pathname:'/user/identity'})
            }}>{this.intl.get("user-name")}</button>
          </div>
        )}
        {showPopup && (
          <Popup
            type={popType}
            msg={popMsg}
            useType={true}
            h5={true}
            onClose={() => this.setState({ showPopup: false })}
            autoClose={true}
          />
        )}
      </div>
    );
  }
}
