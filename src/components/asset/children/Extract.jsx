import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../ExchangeViewBase";
import Button from "../../../common/component/Button";
import Input from "../../../common/component/Input";
import Pagination from "../../../common/component/Pagination";
import SearchInput from "../components/SearchInput";
import TwoVerifyPopup from "../../viewsPopup/TwoVerifyPopup";
import Popup from "../components/popup";
import "../style/extract.styl";
const status = {
  0: "未通过",
  1: "审核中",
  2: "通过",
  3: "撤销"
};

export default class Extract extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      currency: "BTC",
      value: "BTC",
      showAddressPopup: false,
      address: "",
      extractAmount: "", //提现数量
      showTwoVerify: false,
      verifyNum: "获取验证码",
      page: 1
    };
    // 绑定视图，初始化数据
    let { controller } = this.props;
    controller.setView(this);

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
    this.getCurrencyAmount = controller.getCurrencyAmount.bind(controller);

    this.getExtract = controller.getExtract.bind(controller);
    this.getCurrencyList = controller.getCurrencyList.bind(controller);
    this.getHistory = controller.getHistory.bind(controller);
    this.appendAddress = controller.appendAddress.bind(controller);
    this.deletAddress = controller.deletAddress.bind(controller);
    // 请求验证码
    this.requestCode = controller.requestCode.bind(controller);
    // 二次验证倒计时
    this.getVerify = controller.getVerify.bind(controller);
  }

  async componentWillMount() {
    let currency =
      this.props.location.query && this.props.location.query.currency;
    currency && this.setState({ currency: currency, value: currency });
    await this.getExtract();
    await this.getCurrencyList();
    await this.getHistory();
  }

  componentDidMount() { }



  componentWillUpdate(nextProps, nextState) {
    if (nextState.currency !== this.state.currency) {
      this.getExtract()
    }
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
    let curExtract = extractAddr.filter(v => v.coinName === this.state.currency.toLowerCase())[0];
    return (
      <div className="extract">
        <h3>
          {this.intl.get("asset-withdraw_v1")}-{currency}
        </h3>
        <div className="select">
          <div className="search clearfix">
            <span className="title">
              {this.intl.get("asset-selectCoin_v1")}
            </span>
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
                  <span>{this.intl.get("asset-amount_v1")}</span>
                  <i>
                    {totalCount} {currency}
                  </i>
                </li>
                <li>
                  <span>{this.intl.get("asset-orderLock_v1")}</span>
                  <i>
                    {frozenCount} {currency}
                  </i>
                </li>
                <li>
                  <span>{this.intl.get("asset-avail_v1")}</span>
                  <i>
                    {availableCount} {currency}
                  </i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="address">
          <p className="tips">
            {this.intl.get("asset-minWithdraw_v1", {
              number: curExtract && curExtract.minCount,
              currency: currency
            })}
          </p>
          <div className="currency-address clearfix">
            <span className="title">
              {currency}
              {this.intl.get("asset-withdrawAddress_v1")}
            </span>
            <div className="content">
              <div className="select-address">
                <Input
                  type="select"
                  readOnly={true}
                  valueArr={curExtract && curExtract.addressList.map(item => item.address)}
                  onSelect={value => {
                    this.setState({ address: value });
                  }}
                  value={this.state.address}
                />
              </div>
              <a
                onClick={() => {
                  this.setState({ showAddressPopup: true });
                }}
              >
                {this.intl.get("asset-addAddress_v1")}
              </a>
            </div>
          </div>
          <div className="extract-amount clearfix">
            <span className="title">
              {this.intl.get("asset-withdrawAmount_v1")}
            </span>
            <div className="content">
              <p className="limit">
                {this.intl.get("asset-24hQuota_v1")}：{availableQuota}/{
                  totalQuota
                }{" "}
                BTC
                <NavLink to="/user/identity">
                  {this.intl.get("asset-limitApply_v1")}
                </NavLink>
              </p>
              <div className="input">
                <Input
                  placeholder={this.intl.get("asset-withdrawAmount_v1")}
                  value={this.state.extractAmount}
                  onInput={value => {
                    this.setState({ extractAmount: value });
                  }}
                />
                <a
                  onClick={() => {
                    this.setState({ extractAmount: availableCount });
                  }}
                >
                  {this.intl.get("asset-withdrawAvailable_v1")}:{" "}
                  {availableCount}
                </a>
                <span>{currency}</span>
              </div>
              <div className="fee">
                <p>
                  {this.intl.get("asset-gasFee_v1")}：{minerFee}
                  {` ${currency}`}
                  <span>
                    {this.intl.get("asset-withdrawActual_v1")} {this.state.extractAmount - minerFee} {currency}
                  </span>
                </p>
                {/* <p className="explain">
                  {this.intl.get("fee_v1")}={this.intl.get("asset-gasFee_v1")}+平台手续费{`=${minerFee}+${fee}=${minerFee -
                    0 +
                    (fee - 0)}`}
                </p> */}
              </div>
            </div>
          </div>
          <div className="password clearfix">
            <span className="title">{this.intl.get('setFund_v1')}</span>
            <div className="content">
              <Input oriType="password" placeholder={this.intl.get('asset-inputFundPassword_v1')} />
              <div className="set">
                <NavLink to="/user/safe">{this.intl.get('fundPass_v1')}</NavLink>
              </div>
            </div>
          </div>
          <div className="handel">
            <Button title={this.intl.get('asset-submit_v1')} type="base" />
          </div>
        </div>
        <div className="tip clearfix">
          <span className="title">{this.intl.get("asset-reminder_v1")}</span>
          <ol>
            <li>
              {this.intl.get('asset-depositTip_v1', {currency})}
            </li>
            <li>
              {this.intl.get("asset-depositReminder2-1_v1")} <NavLink
                to={`/wallet/dashboard`}
              >
                {this.intl.get("asset-records_v1")}
              </NavLink> {this.intl.get("asset-depositReminder2-2_v1")}
            </li>
          </ol>
        </div>
        <div className="to-trade clearfix">
          <span className="title">{this.intl.get('asset-toTrade_v1')}</span>
          <Button title="EOS/BTC" type="base" />
        </div>
        <div className="history clearfix">
          <span className="title">{this.intl.get('asset-withdrawalsHistory_v1')}</span>
          <table>
            <thead>
              <tr>
                <th className="time">{this.intl.get('asset-withdrawalsTime_v1')}</th>
                <th className="currency">{this.intl.get('asset-currency_v1')}</th>
                <th className="amount">{this.intl.get('asset-withdrawalsAmount_v1')}</th>
                <th className="send">{this.intl.get('asset-sendAddress_v1')}</th>
                <th className="receive">{this.intl.get('asset-receiveAddress_v1')}</th>
                <th className="state">{this.intl.get('state_v1')}</th>
                <th className="remark">{this.intl.get('remark_v1')}</th>
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
                    orderStatus,
                    fee
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
                        <span>{status[orderStatus]}</span>
                      </td>
                      <td>{fee}</td>
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
                this.getHistory()
              }}
              showQuickJumper={true}
              currentPage={this.state.page}
            />
          </div>
          <p className="more">
            <NavLink to={`/wallet/dashboard`}>{this.intl.get("asset-viewAll_v1")}→</NavLink>
          </p>
        </div>
        {this.state.showAddressPopup && (
          <Popup
            type="popup3"
            addressArr={curExtract && curExtract.addressList}
            onSave={add => {
              this.appendAddress(add);
            }}
            onDelete={add => {
              this.deletAddress(add);
            }}
            onClose={() => {
              this.setState({ showAddressPopup: false });
            }}
          />
        )}
        {this.state.showTwoVerify && (
          <TwoVerifyPopup
            isVerify={this.state.showTwoVerify}
            verifyNum={this.state.verifyNum}
            getVerify={this.getVerify}
            onClose={() => {
              this.setState({ showTwoVerify: false });
            }}
          />
        )}
      </div>
    );
  }
}
