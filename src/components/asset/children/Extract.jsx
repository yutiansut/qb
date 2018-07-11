
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../ExchangeViewBase";
import Button from "../../../common/component/Button";
import Input from "../../../common/component/Input";
import Pagination from "../../../common/component/Pagination";
import SearchInput from "../components/SearchInput";
import ToTrade from "../components/ToTrade";
import TwoVerifyPopup from "../../viewsPopup/TwoVerifyPopup";
import Popup from "../components/popup";
import BasePopup from "../../../common/component/Popup";
import "../style/extract.styl";
export default class Extract extends exchangeViewBase {
  constructor(props) {
    super(props);
    // 绑定视图，初始化数据
    let { controller } = this.props;
    controller.setView(this);
    this.name = "extract";
    this.status = {
      0: this.intl.get("pending"),
      1: this.intl.get("passed"),
      2: this.intl.get("failed"),
      3: this.intl.get("cancel")
    };
    this.state = {
      currency: "BTC",
      value: "BTC",
      showAddressPopup: false,
      address: "",
      extractAmount: "", //提现数量
      password: "",
      showTwoVerify: false,
      verifyNum: this.intl.get("sendCode"),
      tradePair: null,
      page: 1,
      noSufficTip: false, // 余额不足提示
      tip: false,
      tipSuccess: true,
      tipContent: "",
      orderTip: false,
      orderTipContent: "",
      userTwoVerify: {withdrawVerify: -1 , fundPwd: -1 }
    };

    let {
      walletExtract,
      walletList,
      currencyAmount,
      assetHistory
    } = controller.initState;
    this.state = Object.assign(this.state, {
      walletExtract,
      walletList,
      assetHistory,
      currencyAmount
    });

    //绑定方法
    //获取市场下交易对
    this.getTradePair = controller.getTradePair.bind(controller);
    // 处理出币种对应的交易对数组
    this.getCoinPair = controller.getCoinPair.bind(controller);
    //获取当前币种资产信息
    this.getCurrencyAmount = controller.getCurrencyAmount.bind(controller);
    // 获取提笔最小数量和地址
    this.getExtract = controller.getExtract.bind(controller);
    // 获取矿工费
    this.getMinerFee = controller.getMinerFee.bind(controller);
    // 获取币种列表
    this.getWalletList = controller.getWalletList.bind(controller);
    // 获取提币信息
    this.getHistory = controller.getHistory.bind(controller);
    // 添加提币地址
    this.appendAddress = controller.appendAddress.bind(controller);
    // 删除提币地址
    this.deletAddress = controller.deletAddress.bind(controller);
    // 提交提币订单前的验证
    this.beforeExtract = controller.beforeExtract.bind(controller);
    // 提交提币订单
    this.extractOrder = controller.extractOrder.bind(controller);
    // 请求验证码
    this.requestCode = controller.requestCode.bind(controller);
    // 二次验证倒计时
    this.getVerify = controller.getVerify.bind(controller);
    // 清除定时器
    this.destroy = controller.clearVerify.bind(controller);
    // 获取资金密码设置状态和两步验证方式
    this.getUserInfo = controller.getUserInfo.bind(controller);
  }

  async componentWillMount() {
    let currency =
      this.props.location.query && this.props.location.query.currency;
    currency && this.setState({ currency: currency, value: currency });
    await this.getWalletList();
    await this.getExtract();
    this.getMinerFee(currency || this.state.currency, this.state.address);
    this.getTradePair(currency || this.state.currency);
    this.getCurrencyAmount(currency || this.state.currency);
    this.getUserInfo();
    this.getHistory({
      page: 0,
      pageSize: 10,
      coinId: -1,
      coinName: -1,
      orderType: 15000,
      orderStatus: -1,
      startTime: -1,
      endTime: -1
    });
  }

  componentDidMount() {}

  componentWillUpdate(nextProps, nextState) {
    if (nextState.currency !== this.state.currency) {
      // 切换币种后，重新set address，之后根据address和currency请求矿工费
      let curExtract = this.state.walletExtract.extractAddr.filter(v => v.coinName === nextState.currency.toLowerCase())[0];
      this.setState({
        address:
          (curExtract &&
            curExtract.addressList[0] &&
            curExtract.addressList[0].address) ||
          "",
        extractAmount: ""
      },()=>{
        this.getMinerFee(nextState.currency, this.state.address);
      });
      this.getCurrencyAmount(nextState.currency);
    }
    // if (nextState.address !== this.state.address) this.getMinerFee(nextState.currency, this.state.address);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextState) !== JSON.stringify(this.state)) return true;
    return false;
  }

  render() {
    let {
      totalCount,
      frozenCount,
      availableCount,
      totalQuota,
      availableQuota
    } = this.state.currencyAmount;
    let currency = this.state.currency,
      { fee, minerFee, extractAddr } = this.state.walletExtract,
      { total, orderList } = this.state.assetHistory;
    let curExtract = extractAddr.filter(
      v => v.coinName === this.state.currency.toLowerCase()
    )[0];
    console.log(curExtract);
    return (
      <div className="extract">
        <h3>
          {this.intl.get("asset-withdraw")}-{currency}
        </h3>
        <div className="select">
          <div className="search clearfix">
            <span className="title">{this.intl.get("asset-selectCoin")}</span>
            <div className="currency-asset">
              <SearchInput
                filte={this.props.controller.filter}
                walletList={Object.keys(this.state.walletList)}
                value={this.state.value}
                setValue={value => {
                  this.setState({ value });
                }}
                setCurrency={currency => {
                  this.setState({ currency });
                }}
              />
              <ul>
                <li>
                  <span>{this.intl.get("asset-amount")}</span>
                  <i>
                    {Number(totalCount).format({ number: "property" })} {currency}
                  </i>
                </li>
                <li>
                  <span>{this.intl.get("asset-orderLock")}</span>
                  <i>
                    {Number(frozenCount).format({ number: "property" })} {currency}
                  </i>
                </li>
                <li>
                  <span>{this.intl.get("asset-avail")}</span>
                  <i>
                    {Number(availableCount).format({ number: "property" })} {currency}
                  </i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="address">
          <p className="tips">
            {this.intl.get("asset-minWithdraw", {
              number: curExtract && curExtract.minCount,
              currency: currency
            })}
          </p>
          <div className="currency-address clearfix">
            <span className="title">
              {currency}
              {this.intl.get("asset-withdrawAddress")}
            </span>
            <div className="content">
              <div className="select-address">
                <Input
                  type="select"
                  readOnly={true}
                  valueArr={
                    curExtract &&
                    curExtract.addressList.map(item => item.address)
                  }
                  onSelect={value => {
                    this.setState({ address: value });
                    this.getMinerFee(this.state.currency, value);
                  }}
                  value={this.state.address}
                />
              </div>
              <a
                onClick={() => {
                  this.setState({ showAddressPopup: true });
                }}
              >
                {this.intl.get("asset-addAddress")}
              </a>
            </div>
          </div>
          <div className="extract-amount clearfix">
            <span className="title">
              {this.intl.get("asset-withdrawAmount")}
            </span>
            <div className="content">
              <p className="limit">
                {this.intl.get("asset-24hQuota")}：{(totalQuota * 100000000 -
                  availableQuota * 100000000) /
                  100000000}/{Number(totalQuota)} BTC
                <NavLink to="/user/identity">
                  {this.intl.get("asset-limitApply")}
                </NavLink>
                {this.state.noSufficTip && (
                  <span>{this.intl.get("asset-not-enough")}</span>
                )}
              </p>
              <div className="input">
                <Input
                  placeholder={this.intl.get("asset-withdrawAmount")}
                  value={this.state.extractAmount}
                  onInput={value => {
                    availableCount < value &&
                      !this.state.noSufficTip &&
                      this.setState({ noSufficTip: true });
                    availableCount >= value &&
                      this.state.noSufficTip &&
                      this.setState({ noSufficTip: false });
                    this.setState({ extractAmount: value });
                  }}
                />
                <a
                  onClick={() => {
                    this.setState({ extractAmount: availableCount });
                  }}
                >
                  {this.intl.get("asset-withdrawAvailable")}: {availableCount}
                </a>
                <span>{currency}</span>
              </div>
              <div className="fee">
                <p>
                  {this.intl.get("asset-gasFee")}：{minerFee}
                  {` ${currency}`}
                  <span>
                    {this.intl.get("asset-withdrawActual")}{" "}
                    {this.state.extractAmount - minerFee > 0
                      ? (this.state.extractAmount * 100000000 - minerFee * 100000000)/100000000
                      : 0}{" "}
                    {currency}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="password clearfix">
            <span className="title">{this.intl.get("fundPass")}</span>
            <div className="content">
              <Input
                oriType="password"
                value={this.state.password}
                placeholder={this.intl.get("asset-inputFundPassword")}
                onInput={value => {
                  this.setState({ password: value });
                }}
              />
              <div className="set">
                {this.state.userTwoVerify.fundPwd === 1 ? <NavLink to="/user/safe" target="_blank">
                  {this.intl.get("asset-setFundPassword")}
                </NavLink> : this.state.userTwoVerify.fundPwd === 0 ? <NavLink to="/user/safe" target="_blank">
                    {this.intl.get("login-forget")}
                </NavLink> : ''}
              </div>
            </div>
          </div>
          <div className="handel">
            <Button
              title={this.intl.get("asset-submit")}
              type="base"
              onClick={() => {
                let { currency, address, password, extractAmount } = this.state;
                this.beforeExtract(curExtract.minCount, this.state.password);
              }}
            />
          </div>
        </div>
        <div className="tip clearfix">
          <span className="title">{this.intl.get("asset-reminder")}</span>
          <ol>
            <li>{this.intl.get("asset-depositTip", { currency })}</li>
            <li>
              {this.intl.get("asset-depositReminder2-1")}{" "}
              <NavLink to={`/wallet/dashboard`}>
                {this.intl.get("asset-records")}
              </NavLink>{" "}
              {this.intl.get("asset-depositReminder2-2")}
            </li>
          </ol>
        </div>
        <ToTrade
          pairArr={this.getCoinPair(this.state.tradePair, this.state.currency)}
        />
        <div className="history clearfix">
          <span className="title">
            {this.intl.get("asset-withdrawalsHistory")}
          </span>

          {this.state.assetHistory.total ? (
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th className="time">
                      {this.intl.get("asset-withdrawalsTime")}
                    </th>
                    <th className="currency">
                      {this.intl.get("asset-currency")}
                    </th>
                    <th className="amount">
                      {this.intl.get("asset-withdrawalsAmount")}
                    </th>
                    <th className="send">
                      {this.intl.get("asset-sendAddress")}
                    </th>
                    <th className="receive">
                      {this.intl.get("asset-receiveAddress")}
                    </th>
                    <th className="state">{this.intl.get("state")}</th>
                    <th className="remark">{this.intl.get("remark")}</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList &&
                    orderList.map(
                      (
                        {
                          orderTime,
                          coinName,
                          count,
                          postAddress,
                          receiveAddress,
                          orderStatus,
                          fee
                        },
                        index
                      ) => (
                        <tr key={index}>
                          <td className="time">{orderTime.toDate()}</td>
                          <td className="currency">{coinName.toUpperCase()}</td>
                          <td className="amount">
                            <i>-{count}</i>
                          </td>
                          <td className="send">
                            <i>{postAddress}</i>
                          </td>
                          <td className="receive">
                            <i>{receiveAddress}</i>
                          </td>
                          <td className="state">
                            <span>{this.status[orderStatus]}</span>
                          </td>
                          <td className="remark">{fee}</td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
              <div className="pagina">
                <Pagination
                  total={this.state.assetHistory.total}
                  pageSize={10}
                  showTotal={true}
                  onChange={page => {
                    console.log(page);
                    this.setState({ page });
                    this.getHistory({
                      page: page - 1,
                      pageSize: 10,
                      coinId: -1,
                      coinName: -1,
                      orderType: 15000,
                      orderStatus: -1,
                      startTime: -1,
                      endTime: -1
                    });
                  }}
                  showQuickJumper={true}
                  currentPage={this.state.page}
                />
              </div>
              <p className="more">
                <NavLink to={`/wallet/dashboard`}>
                  {this.intl.get("asset-viewAll")}→
                </NavLink>
              </p>
            </div>
          ) : (
            <div className="kong">{this.intl.get("noRecords")}</div>
          )}
        </div>
        {this.state.showAddressPopup && (
          <Popup
            type="popup3"
            addressArr={curExtract && curExtract.addressList}
            onSave={async add => {
              let result = this.appendAddress(
                Object.assign({ coinName: this.state.currency }, add)
              );
              return result;
            }}
            onDelete={del => {
              this.deletAddress(
                Object.assign({ coinName: this.state.currency }, del)
              );
            }}
            onClose={() => {
              this.setState({ showAddressPopup: false });
            }}
          />
        )}
        {this.state.showTwoVerify && (
          <TwoVerifyPopup
            verifyNum={this.state.verifyNum}
            type={this.state.userTwoVerify.withdrawVerify}//短信验证码
            getVerify={this.getVerify}
            onClose={() => {
              this.setState({ showTwoVerify: false });
            }}
            destroy={this.destroy}
            onConfirm={code => {
              let { currency, address, password, extractAmount } = this.state;
              this.extractOrder({
                coinName: currency,
                toAddr: address,
                amount: Number(extractAmount),
                fundPass: password,
                code: code
              });
            }}
          />
        )}
        {this.state.tip && (
          <BasePopup
            type={this.state.tipSuccess ? "tip1" : "tip3"}
            msg={this.state.tipContent}
            onClose={() => {
              this.setState({ tip: false });
            }}
            autoClose={true}
          />
        )}
        {this.state.orderTip && (
          <BasePopup
            type="confirm"
            msg={this.state.orderTipContent}
            onClose={() => {
              this.setState({ orderTip: false });
            }}
            onConfirm={() => {
              this.setState({ orderTip: false });
            }}
            autoClose={true}
          />
        )}
      </div>
    );
  }
}