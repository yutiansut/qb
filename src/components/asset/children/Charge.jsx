import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../ExchangeViewBase";
import QRCode from "qrcode.react";
import Button from "../../../common/component/Button";
import Popup from "../../../common/component/Popup";
import Pagination from "../../../common/component/Pagination";
import SearchInput from "../components/SearchInput";
import "../style/charge.styl";

export default class Charge extends exchangeViewBase {
  constructor(props) {
    super(props);
    let { controller } = props;
    this.status = {
      0: this.intl.get("failed"),
      1: this.intl.get("pending"),
      2: this.intl.get("passed"),
      3: this.intl.get("cancel")
    };
    this.state = {
      currency: "BTC",
      value: "BTC",
      showQrcode: false,
      showPupup: false,
      copySuccess: true,
      page: 1
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

    //绑定方法
    this.hideQrcode = () => {
      if (!this.state.showQrcode) return;
      this.setState({
        showQrcode: false
      });
    };
    this.copy = el => {
      controller.copy(el);
    };
    this.getCurrencyAmount = controller.getCurrencyAmount.bind(controller);
    this.getCoinAddress = controller.getCoinAddress.bind(controller);
    this.getHistory = controller.getHistory.bind(controller);
  }

  async componentWillMount() {
    let currency =
      this.props.location.query && this.props.location.query.currency;
    currency &&
      this.setState({
        currency: currency,
        value: currency
      });
    await this.getCurrencyAmount();
    await this.getCoinAddress(this.state.currency);
    await this.getHistory();
  }

  componentDidMount() {
    window.addEventListener("click", this.hideQrcode);
  }

  componentWillUpdate(props, state, next) {
    if(this.state.currency !== state.currency) {
      this.getCoinAddress(state.currency);
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
    return <div className="charge">
        <h3>
          {this.intl.get("deposit")}-{this.state.currency}
        </h3>
        <div className="select">
          <div className="search clearfix">
            <span className="title">
              {this.intl.get("asset-selectCoin")}
            </span>
            <div className="currency-asset">
              <SearchInput filte={this.props.controller.filter} walletList={Object.keys(this.state.walletList)} value={this.state.value} setValue={value => {
                  this.setState({ value });
                }} setCurrency={currency => {
                  this.setState({ currency });
                }} />
              <ul>
                <li>
                  <span>{this.intl.get("asset-amount")}</span>
                  <i>
                    {totalCount} {this.state.currency}
                  </i>
                </li>
                <li>
                  <span>{this.intl.get("asset-orderLock")}</span>
                  <i>
                    {frozenCount} {this.state.currency}
                  </i>
                </li>
                <li>
                  <span>{this.intl.get("asset-avail")}</span>
                  <i>
                    {availableCount} {this.state.currency}
                  </i>
                </li>
              </ul>
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
            <input ref="address" value={address ? address.coinAddress : ""} readOnly="readonly" onChange={() => {}} />
          </div>
          <div className="handel">
            <Button title={this.intl.get("asset-showQrcode")} type="base" onClick={e => {
                e.nativeEvent.stopImmediatePropagation();
                this.setState({ showQrcode: true });
              }} />
            <Button title={this.intl.get("asset-copy")} type="base" onClick={() => {
                this.copy(this.refs.address);
              }} />
            <div className={`qrcode ${this.state.showQrcode ? "show" : ""}`}>
              <QRCode value={address && address.coinAddress || ""} level="M" />
            </div>
          </div>
        </div>
        <div className="tip clearfix">
          <span className="title">
            {this.intl.get("asset-reminder")}
          </span>
          <ol>
            <li>
              {this.intl.get("asset-depositReminder1", {
                currency: this.state.currency,
                number: address && address.verifyNumber
              })}
            </li>
            <li>
              {this.intl.get("asset-depositReminder2-1")} <NavLink
                to={`/wallet/dashboard`}
              >
                {this.intl.get("asset-records")}
              </NavLink> {this.intl.get("asset-depositReminder2-2")}
            </li>
          </ol>
        </div>
        <div className="to-trade clearfix">
          <span className="title">{this.intl.get("asset-toTrade")}</span>
          <Button title="EOS/BTC" type="base" />
        </div>
        <div className="history clearfix">
          <span className="title">
            {this.intl.get("asset-depositHistory")}
          </span>
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
              {orderList && orderList.map(
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
                      <td>{orderTime}</td>
                      <td>{coinName}</td>
                      <td>{count}</td>
                      <td>{postAddress}</td>
                      <td>{receiveAddress}</td>
                      <td>
                        <a
                          href={blockSite}
                        >{`${doneCount}/${verifyCount}`}</a>
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
            <Pagination total={this.state.assetHistory.total} pageSize={10} showTotal={true} onChange={page => {
                this.setState({ page });
                this.getHistory();
              }} showQuickJumper={true} currentPage={this.state.page} />
          </div>
          <p className="more">
            <NavLink to={`/wallet/dashboard`}>
              {this.intl.get("asset-viewAll")}→
            </NavLink>
          </p>
        </div>
      </div>;
  }
}
