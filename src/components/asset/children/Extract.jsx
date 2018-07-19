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
      quotaTip: false,
      tip: false,
      tipSuccess: true,
      tipContent: "",
      orderTip: false,
      orderTipContent: "",
      userTwoVerify: { withdrawVerify: -1, fundPwd: -1 },
      showSelect: false
    };
    controller.initHistory(true);
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

    this.hideSelect = () => {
      this.setState({ showSelect: false });
    };
  }

  async componentWillMount() {
    let currency =
      this.props.controller.getQuery("currency").toUpperCase() ||
      (this.props.location.query && this.props.location.query.currency);
    currency && this.setState({ currency: currency, value: currency });
    await this.getWalletList();
    await this.getExtract();
    this.getMinerFee(currency || this.state.currency, this.state.address);
    this.getTradePair(currency || this.state.currency);
    this.getCurrencyAmount(currency || this.state.currency);
    this.getUserInfo();
    let coin = currency || "BTC";
    this.getHistory({
      page: 0,
      pageSize: 10,
      coinId: this.state.walletList[coin.toUpperCase()],
      coinName: coin.toUpperCase(),
      orderType: 2,
      orderStatus: -1,
      startTime: -1,
      endTime: -1
    });
  }

  componentDidMount() {
    window.addEventListener("click", this.hideSelect);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.hideSelect);
  }
  componentWillUpdate(nextProps, nextState) {
    // 切换地址后重新请求矿工费
    if (
      JSON.stringify(nextState.walletExtract) !==
      JSON.stringify(this.state.walletExtract)
    ) {
      let curExtract = nextState.walletExtract.extractAddr.filter(
        v => v.coinName === nextState.currency.toLowerCase()
      )[0];
      this.setState(
        {
          address:
            (curExtract &&
              curExtract.addressList[0] && this.props.controller.sort(curExtract.addressList, ["addressName"], 1)[0] || ""),
          extractAmount: ""
        },
        () => {
          this.getMinerFee(nextState.currency, this.state.address);
        }
      );
    }
    if (nextState.currency !== this.state.currency) {
      this.props.controller.changeUrl(
        "currency",
        nextState.currency.toLowerCase()
      );
      // 切换币种后，重新set address，之后根据address和currency请求矿工费
      let curExtract = this.state.walletExtract.extractAddr.filter(
        v => v.coinName === nextState.currency.toLowerCase()
      )[0];
      this.setState(
        {
          address:
            (curExtract &&
              curExtract.addressList[0] && this.props.controller.sort(curExtract.addressList, ["addressName"], 1)[0]||""),
          extractAmount: "",
          password: "",
          noSufficTip: false, // 余额不足提示
          quotaTip: false
        },
        () => {
          this.getMinerFee(nextState.currency, this.state.address);
        }
      );
      this.getCurrencyAmount(nextState.currency);
      this.props.controller.initHistory();
      this.getHistory({
        page: this.state.page - 1,
        pageSize: 10,
        coinId: this.state.walletList[nextState.currency],
        coinName: nextState.currency,
        orderType: 2,
        orderStatus: -1,
        startTime: -1,
        endTime: -1
      });
    }
    // if (nextState.address !== this.state.address) this.getMinerFee(nextState.currency, this.state.address);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextState) !== JSON.stringify(this.state)) return true;
    return false;
  }

  render() {
    console.log('his...................', this.state.assetHistory.total);
    let {
      totalCount,
      frozenCount,
      availableCount,
      totalQuota,
      availableQuota,
      usedQuota
    } = this.state.currencyAmount;
    let currency = this.state.currency,
      { fee, minerFee, extractAddr } = this.state.walletExtract,
      { total, orderList } = this.state.assetHistory;
    let curExtract = extractAddr.filter(
      v => v.coinName === this.state.currency.toLowerCase()
    )[0];
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
                    {Number(totalCount).format({ number: "property" })}{" "}
                    {currency}
                  </i>
                </li>
                <li>
                  <span>{this.intl.get("asset-orderLock")}</span>
                  <i>
                    {Number(frozenCount).format({ number: "property" })}{" "}
                    {currency}
                  </i>
                </li>
                <li>
                  <span>{this.intl.get("asset-avail")}</span>
                  <i>
                    {Number(availableCount).format({ number: "property" })}{" "}
                    {currency}
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
                <div
                  className="select-input"
                  onClick={e => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    this.setState({ showSelect: true });
                  }}
                >
                  <p>
                    <span>{this.state.address.addressName}</span>
                    <span />
                    <span>{this.state.address.address}</span>
                  </p>
                  {this.state.showSelect && (
                    <ul className="search-list">
                      {curExtract &&
                        this.props.controller
                          .sort(curExtract.addressList, ["addressName"], 1)
                          .map((v, i) => (
                            <li
                              key={i}
                              onClick={e => {
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation();
                                this.setState({
                                  showSelect: false,
                                  address: {
                                    address: v.address,
                                    addressName: v.addressName
                                  }
                                });
                                this.getMinerFee(this.state.currency, v);
                              }}
                            >
                              <span>{v.addressName}</span>
                              <span />
                              <span>{v.address}</span>
                            </li>
                          ))}
                    </ul>
                  )}
                </div>
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
                {this.intl.get("asset-24hQuota")}：{Number(usedQuota)}/{
                  totalQuota
                }{" "}
                BTC
                {totalQuota > 2 ? (
                  <span className="apply">
                    {this.intl.get("asset-limitApply")}
                  </span>
                ) : (
                  <NavLink to="/wuser/identity">
                    {this.intl.get("asset-limitApply")}
                  </NavLink>
                )}
                {this.state.quotaTip && (
                  <span>
                    {this.intl.get("asset-minWithdraw-tip", {
                      number: curExtract && curExtract.minCount,
                      currency: currency
                    })}
                  </span>
                )}
                {this.state.noSufficTip && (
                  <span>{this.intl.get("asset-not-enough")}</span>
                )}
              </p>
              <div className="input">
                <Input
                  placeholder={this.intl.get("asset-withdrawAmount")}
                  value={this.state.extractAmount}
                  onInput={value => {
                    value = value.replace(/[^\d.]/g, "");
                    if (!/^[0-9]+\.?[0-9]{0,8}$/.test(value) && value !== "")
                      return;
                    this.setState({ extractAmount: value });
                  }}
                  onFocus={() => {
                    this.setState({
                      quotaTip: false,
                      noSufficTip: false
                    });
                  }}
                  onBlur={() => {
                    if (this.state.extractAmount === "") return;
                    if (
                      Number(this.state.extractAmount) < curExtract.minCount
                    ) {
                      this.setState({
                        quotaTip: true
                      });
                      return;
                    }
                    availableCount < Number(this.state.extractAmount) &&
                      !this.state.noSufficTip &&
                      this.setState({ noSufficTip: true });
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
                    {Number(Number(this.state.extractAmount).minus(minerFee)) >
                      0 &&
                    Number(this.state.extractAmount) <= availableCount &&
                    Number(this.state.extractAmount) >= curExtract.minCount
                      ? Number(Number(this.state.extractAmount).minus(minerFee))
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
                {this.state.userTwoVerify.fundPwd === 1 ? (
                  <NavLink to="/wuser/safe" target="_blank">
                    {this.intl.get("asset-setFundPassword")}
                  </NavLink>
                ) : this.state.userTwoVerify.fundPwd === 0 ? (
                  <NavLink to="/wuser/safe" target="_blank">
                    {this.intl.get("login-forget")}
                  </NavLink>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="handel">
            <Button
              title={this.intl.get("asset-submit")}
              type="base"
              onClick={() => {
                if (this.state.quotaTip || this.state.noSufficTip) return;
                let { currency, address, password, extractAmount } = this.state;
                this.beforeExtract(
                  curExtract && curExtract.minCount,
                  this.state.password
                );
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
                            <i>{"—"}</i>
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
                    this.setState({ page });
                    this.getHistory({
                      page: page - 1,
                      pageSize: 10,
                      coinId: this.state.walletList[this.state.currency],
                      coinName: this.state.currency,
                      orderType: 2,
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
              let result = await this.appendAddress(
                Object.assign({ coinName: this.state.currency }, add),
                curExtract
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
            type={this.state.userTwoVerify.withdrawVerify} //短信验证码
            getVerify={this.getVerify}
            onClose={() => {
              this.setState({ showTwoVerify: false });
            }}
            destroy={this.destroy}
            onConfirm={code => {
              let { currency, address, password, extractAmount } = this.state;
              this.extractOrder({
                coinName: currency,
                toAddr: address.address,
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
              if (
                this.state.orderTipContent === this.intl.get("asset-auth-tip")
              ) {
                this.props.history.push({
                  pathname: `/wuser/identity/`
                });
              }
              this.setState({ orderTip: false });
            }}
            autoClose={
              this.state.orderTipContent !== this.intl.get("asset-auth-tip")
            }
          />
        )}
      </div>
    );
  }
}
