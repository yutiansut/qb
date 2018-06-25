import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../ExchangeViewBase";
import QRCode from "qrcode.react";
import Button from "../../../common/component/Button";
import Popup from "../../../common/component/Popup";
import Pagination from "../../../common/component/Pagination";
import SearchInput from "../components/SearchInput";
import "../style/charge.styl";

const status = {
  0: "未通过",
  1: "审核中",
  2: "通过",
  3: "撤销"
};
export default class Charge extends exchangeViewBase {
  constructor(props) {
    super(props);
    let { controller } = props;
    this.state = {
      currency: "BTC",
      value: "BTC",
      showQrcode: false,
      showPupup: false,
      copySuccess: true
    };
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    let {
      walletList,
      chargeHistory,
      currencyAmount,
      coinAddress
    } = controller.initState;

    this.state = Object.assign(this.state, {
      walletList,
      chargeHistory,
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

  componentWillMount() {
    let currency =
      this.props.location.query && this.props.location.query.currency;
    currency &&
      this.setState({
        currency: currency,
        value: currency
      });
    this.getCurrencyAmount();
    this.getCoinAddress();
    this.getHistory();
  }

  componentDidMount() {
    window.addEventListener("click", this.hideQrcode);
  }

  componentWillUpdate(props, state, next) {}

  componentWillUnmount() {
    window.removeEventListener("click", this.hideQrcode);
  }

  render() {
    let { totalCount, frozenCount, availableCount } = this.state.currencyAmount;
    let { total, page, pageSize, orderList } = this.state.chargeHistory;
    let address = this.state.coinAddress.filter(
      item => item.coinName === this.state.currency
    )[0];

    return (
      <div className="charge">
        <h3>充币-{this.state.currency}</h3>
        <div className="select">
          <div className="search clearfix">
            <span className="title">选择币种</span>
            <div className="currency-asset">
              <SearchInput
                filte={this.props.controller.filter}
                walletList={this.state.walletList}
                value={this.state.value}
                setValue={(value)=>{
                  this.setState({ value });
                }}
                setCurrency={(currency) => {
                  this.setState({ currency });
                }}
              />
              <ul>
                <li>
                  <span>总额</span>
                  <i>
                    {totalCount} {this.state.currency}
                  </i>
                </li>
                <li>
                  <span>下单冻结</span>
                  <i>
                    {frozenCount} {this.state.currency}
                  </i>
                </li>
                <li>
                  <span>可用余额</span>
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
            注意：禁止向{this.state.currency}地址充值除{this.state.currency}之外的资产，任何充入{
              this.state.currency
            }地址的非{this.state.currency}资产将不可找回。
          </p>
          <div className="currency-address clearfix">
            <span className="title">充值地址</span>
            <input
              ref="address"
              value={address ? address.coinAddress : ""}
              readOnly="readonly"
              onChange={() => {}}
            />
          </div>
          <div className="handel">
            <Button
              title="展示二维码"
              type="base"
              onClick={e => {
                e.nativeEvent.stopImmediatePropagation();
                this.setState({ showQrcode: true });
              }}
            />
            <Button
              title="复制到剪贴板"
              type="base"
              onClick={() => {
                this.copy(this.refs.address);
              }}
            />
            <div className={`qrcode ${this.state.showQrcode ? "show" : ""}`}>
              <QRCode value={address.coinAddress} level="M" />
            </div>
          </div>
        </div>
        <div className="tip clearfix">
          <span className="title">温馨提示</span>
          <ol>
            <li>
              使用{this.state.currency}地址充值需要{address &&
                address.verifyNumer}个网络确认才能到账
            </li>
            <li>
              充值完成后，你可以进入{" "}
              <NavLink to={`/wallet/dashboard`}>资产记录</NavLink> 页面跟踪进度
            </li>
          </ol>
        </div>
        <div className="to-trade clearfix">
          <span className="title">去交易</span>
          <Button title="EOS/BTC" type="base" />
        </div>
        <div className="history clearfix">
          <span className="title">充币记录</span>
          <table>
            <thead>
              <tr>
                <th className="time">充值时间</th>
                <th className="currency">币种</th>
                <th className="amount">充值数量</th>
                <th className="send">发送地址</th>
                <th className="receive">接收地址</th>
                <th className="confirm">确认数</th>
                <th className="state">状态</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map(
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
                    orderStatus,
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
                      <a href={blockSite}>{`${doneCount}/${verifyCount}`}</a>
                    </td>
                    <td><span>{status[orderStatus]}</span></td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div className="pagina">
            <Pagination
              total={this.state.chargeHistory.totalCount}
              pageSize={pageSize}
              showTotal={true}
              showQuickJumper={true}
              currentPage={page + 1}
            />
          </div>
          <p className="more">
            <NavLink to={`/wallet/dashboard`}>查看全部→</NavLink>
          </p>
        </div>
      </div>
    );
  }
}
