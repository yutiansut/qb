import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../ExchangeViewBase";
import QRCode from "qrcode.react";
import Button from "../../../common/component/Button";
import Popup from "../../../common/component/Popup";
import Pagination from "../../../common/component/Pagination";
import SearchInput from "../components/SearchInput";
import ToTrade from "../components/ToTrade";
import "../style/charge.styl";

export default class Charge extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.name = "charge";
    let { controller } = props;
    controller.setView(this);
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
      showQrcode: false,
      showPopup: false,
      copySuccess: false,
      page: 1,
      tradePair: null
    };
    controller.initHistory(true);
    //绑定view
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

    //绑定方法
    this.hideQrcode = () => {
      if (!this.state.showQrcode) return;
      this.setState({
        showQrcode: false
      });
    };
    this.copy = el => {
      this.setState({
        showPopup: true,
        copySuccess: controller.copy(el)
      });
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
    let currency = this.props.controller
      .getQuery("currency")
      .toUpperCase() || (this.props.location.query && this.props.location.query.currency);
    currency &&
      this.setState({
        currency: currency,
        value: currency
      });
    await this.getWalletList();
    this.getTradePair();
    this.getCurrencyAmount(currency || this.state.currency);
    this.getCoinAddress(currency || this.state.currency);
    let coin = currency || 'BTC';
    this.getHistory({
      page: 0,
      pageSize: 10,
      coinId: this.state.walletList[coin.toUpperCase()],
      coinName: coin.toUpperCase(),
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
      this.props.controller.changeUrl("currency", state.currency.toLowerCase());
      this.getCoinAddress(state.currency);
      this.getCurrencyAmount(state.currency);
      this.props.controller.initHistory();
      this.getHistory({
        page: this.state.page - 1,
        pageSize: 10,
        coinId: this.state.walletList[state.currency],
        coinName: state.currency,
        orderType: 1,
        orderStatus: -1,
        startTime: -1,
        endTime: -1
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextState) !== JSON.stringify(this.state)) return true;
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.hideQrcode);
  }

  render() {
    let { totalCount, frozenCount, availableCount } = this.state.currencyAmount;
    let { total, orderList } = this.state.assetHistory;
    let address = this.state.coinAddress;
    // console.log(address);
    return (
      <div className="charge">
        <h3>
          {this.intl.get("deposit")}-{this.state.currency}
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
                totalCount = {totalCount}
                frozenCount = {frozenCount}
                availableCount = {availableCount}
                currency = {this.state.currency}
              />
            </div>
          </div>
        </div>
        <div className="address">
          <p className="tips">
            {this.intl.get("asset-depositTip", {
              currency: this.state.currency
            })}
          </p>
          <div className="currency-address clearfix">
            <span className="title">
              {this.intl.get("asset-depositAddress")}
            </span>
            <input
              ref="address"
              type="text"
              value={this.state.address}
              readOnly="readonly"
            />
          </div>
          <div className="handel">
            <Button
              title={this.intl.get("asset-showQrcode")}
              type="base"
              onClick={e => {
                e.nativeEvent.stopImmediatePropagation();
                this.setState({ showQrcode: true });
              }}
            />
            <Button
              title={this.intl.get("asset-copy")}
              type="base"
              onClick={() => {
                if (address && address.coinAddress) {
                  this.copy(this.refs.address);
                }
              }}
            />
            {this.state.address && (
              <div className={`qrcode ${this.state.showQrcode ? "show" : ""}`}>
                <QRCode value={this.state.address} level="M" bgColor="#D5D6D6" />
              </div>
            )}
          </div>
        </div>
        <div className="tip clearfix">
          <span className="title">{this.intl.get("asset-reminder")}</span>
          <ol>
            <li>
              {this.intl.get("asset-depositReminder1", {
                currency: this.state.currency,
                number: address && address.verifyNumber
              })}
            </li>
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
          <span className="title">{this.intl.get("asset-depositHistory")}</span>
          {this.state.assetHistory.total ? (
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th className="time">
                      {this.intl.get("asset-depositTime")}
                    </th>
                    <th className="currency">
                      {this.intl.get("asset-depositTime")}
                    </th>
                    <th className="amount">
                      {this.intl.get("asset-depositAmount")}
                    </th>
                    <th className="send">
                      {this.intl.get("asset-sendAddress")}
                    </th>
                    <th className="receive">
                      {this.intl.get("asset-receiveAddress")}
                    </th>
                    <th className="confirm">
                      {this.intl.get("asset-confirm")}
                    </th>
                    <th className="state">{this.intl.get("state")}</th>
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
                          verifyCount,
                          doneCount,
                          blockSite,
                          orderStatus
                        },
                        index
                      ) => (
                          <tr key={index}>
                            <td>{orderTime.toDate()}</td>
                            <td>{coinName.toUpperCase()}</td>
                            <td className="amount"><i>{count}</i></td>
                            <td>{"—"}</td>
                            <td className="receive"><i>{receiveAddress}</i></td>
                            <td>
                              <a
                                href={blockSite}
                                target="_blank"
                              >{`${doneCount || 0}/${verifyCount}`}</a>
                            </td>
                            <td>
                              <span>{this.status[orderStatus]}</span>
                            </td>
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
                      orderType: 1,
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
          {this.state.showPopup && (
            <Popup
              type={this.state.copySuccess ? "tip1" : "tip3"}
              msg={
                this.state.copySuccess
                  ? this.intl.get("asset-copySuccess")
                  : this.intl.get("asset-option-failed")
              }
              onClose={() => {
                this.setState({ showPopup: false });
              }}
              autoClose={true}
            />
          )}
        </div>
      </div>
    );
  }
}
