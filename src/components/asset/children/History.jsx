import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";
import SelectButton from "../../../common/component/SelectButton";
import Button from "../../../common/component/Button";
import DatePicker from "../../../common/component/DatePicker/DatePicker";
import Pagination from "../../../common/component/Pagination";
import "../style/history.styl";
export default class History extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    let { controller } = this.props;
    controller.setView(this);
    let { wallList, assetHistory } = controller.initState;
    this.state = Object.assign(this.state, {
      wallList,
      assetHistory
    });
    //绑定方法
    this.getHistory = controller.getHistory.bind(controller);
    this.getWalletList = controller.getWalletList.bind(controller);
    // this.state = {
    // console.log(this.controller)
    // }
  }
  async componentWillMount() {
    await this.getWalletList();
    await this.getHistory({});
  }

  componentDidMount() {}

  componentWillUpdate() {}

  render() {
    let { total, orderList } = this.state.assetHistory;
    return (
      <div className="hist">
        <h3 className="title">
          {this.intl.get("asset-records")}{" "}
          <Button type="export" title={this.intl.get("asset-export")} />
        </h3>
        <div className="filtrate clearfix">
          <ul className="clearfix">
            <li className="item">
              <span>{this.intl.get("asset-currency")}</span>
              <SelectButton
                title={this.intl.get("all")}
                type="main"
                className="select"
                valueArr={[this.intl.get("all"), "BTC", "LTC", "ETH"]}
              />
            </li>
            <li className="item">
              <span>{this.intl.get("type")}</span>
              <SelectButton
                title={this.intl.get("all")}
                type="main"
                className="select"
                valueArr={[
                  this.intl.get("all"),
                  this.intl.get("deposit"),
                  this.intl.get("asset-withdraw"),
                  this.intl.get("asset-transfer")
                ]}
              />
            </li>
            <li className="item">
              <span>{this.intl.get("state")}</span>
              <SelectButton
                title={this.intl.get("all")}
                type="main"
                className="select"
                valueArr={[
                  this.intl.get("all"),
                  this.intl.get("passed"),
                  this.intl.get("failed"),
                  this.intl.get("pending")
                ]}
              />
            </li>
          </ul>
          <div className="datepicker">
            <DatePicker />
          </div>
          <div className="handel">
            <Button type="base" title={this.intl.get('search')} className="search" />
            <Button type="base" title={this.intl.get('reset')} className="reset" />
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="time">{this.intl.get('time')}</th>
              <th className="currency">{this.intl.get('asset-currency')}</th>
              <th className="type">{this.intl.get('type')}</th>
              <th className="cash">{this.intl.get('asset-amount2')}</th>
              <th className="balan">{this.intl.get('asset-balan')}</th>
              <th className="send">{this.intl.get('asset-sendAddress')}</th>
              <th className="receive">{this.intl.get('asset-receiveAddress')}</th>
              <th className="confirm">{this.intl.get('asset-confirm')}</th>
              <th className="state">{this.intl.get('asset-checkState')}</th>
              <th className="fee">{this.intl.get('fee')}</th>
            </tr>
          </thead>
          <tbody>
            {orderList &&
              orderList.map(
                (
                  {
                    orderTime,
                    coinName,
                    coinIcon,
                    orderType,
                    count,
                    balance,
                    postAddress,
                    receiveAddress,
                    verifyCount, //确认数
                    doneCount, //已确认数
                    orderStatus,
                    fee
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td className="time">{orderTime}</td>
                    <td>
                      <img src={coinIcon} alt="" />
                      {coinName}
                    </td>
                    <td>
                      {!orderType ? "充币" : orderType === 1 ? "提币" : "转账"}
                    </td>
                    <td className="cash red">{count}</td>
                    <td>{balance}</td>
                    <td className="send">{postAddress}</td>
                    <td>{receiveAddress}</td>
                    <td className="confirm">
                      <a href="#">{`${doneCount}/${verifyCount}`}</a>
                    </td>
                    <td className="state passing">
                      <span>
                        {!orderStatus
                          ? "未通过"
                          : orderStatus === 1
                            ? "审核中"
                            : "通过"}
                      </span>
                    </td>
                    <td className="fee">{fee}</td>
                  </tr>
                )
              )}
          </tbody>
        </table>
        <Pagination
          total={this.state.assetHistory.total}
          pageSize={10}
          showTotal={true}
          onChange={page => {
            this.setState({ page });
            this.getHistory(page);
          }}
          showQuickJumper={true}
          currentPage={this.state.page}
        />
      </div>
    );
  }
}
