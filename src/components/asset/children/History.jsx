import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";
import SelectButton from "../../../common/component/SelectButton";
import Button from "../../../common/component/Button";
import DatePicker from "../../../common/component/DatePicker/DatePicker";
import Pagination from "../../../common/component/Pagination";
import BasePopup from "../../../common/component/Popup";
import "../style/history.styl";
export default class History extends exchangeViewBase {
  constructor(props) {
    super(props);
    let { controller } = this.props;
    controller.setView(this);
    // 生成充提币类型及进度的状态码映射表；
    this.staticData = {
      orderType: {
        1: this.intl.get("deposit"),
        2: this.intl.get("asset-withdraw"),
        4: this.intl.get("asset-transfer")
        // 1: this.intl.get("deposit"),
        // 15000: this.intl.get("asset-withdraw")
        // 5: this.intl.get("asset-transfer"),
      },
      status: {
        0: this.intl.get("pending"),
        1: this.intl.get("passed"),
        2: this.intl.get("failed"),
        3: this.intl.get("cancel")
      }
    };
    for (const k in this.staticData.orderType) {
      this.staticData.orderType[this.staticData.orderType[k]] = Number(k);
    }
    for (const k in this.staticData.status) {
      this.staticData.status[this.staticData.status[k]] = Number(k);
    }
    this.name = "history";
    this.state = {
      page: 1,
      tip: false,
      tipSuccess: true,
      tipContent: "",
      currency: this.intl.get("all"),
      orderType: this.intl.get("all"),
      status: this.intl.get("all"),
      startTime: parseInt((new Date() - 604800000) / 1000),
      endTime: parseInt((new Date() - 0) / 1000)
    };

    let { wallList, assetHistory } = controller.initState;
    this.state = Object.assign(this.state, {
      wallList,
      assetHistory
    });
    //绑定方法
    this.getHistory = controller.getHistory.bind(controller);
    this.getWalletList = controller.getWalletList.bind(controller);
    this.cancelOreder = controller.cancelOreder.bind(controller);

    this.initSearch = () => {
      this.setState(
        {
          page: 1,
          currency: this.intl.get("all"),
          orderType: this.intl.get("all"),
          status: this.intl.get("all"),
          startTime: parseInt((new Date() - 604800000) / 1000),
          endTime: parseInt((new Date() - 0) / 1000)
        },
        () => {
          this.search(0);
        }
      );
    };
    this.search = page => {
      let { currency, orderType, startTime, endTime, status } = this.state;
      this.getHistory({
        coinId:
          currency === this.intl.get("all")
            ? -1
            : this.state.walletList[currency],
        coinName:
          currency === this.intl.get("all") ? -1 : currency.toLowerCase(),
        orderType:
          orderType === this.intl.get("all")
            ? -1
            : this.staticData.orderType[orderType], //充0提1转2  注意:交易所内充提显示为转账
        startTime: startTime,
        endTime: endTime,
        orderStatus:
          status === this.intl.get("all") ? -1 : this.staticData.status[status], //未通过 审核中1 通过2  撤销3
        page: page,
        pageSize: 20
      });
    };
    // this.state = {
    // console.log(this.controller)
    // }
  }
  async componentWillMount() {
    await this.getWalletList();
    await this.getHistory({
      page: 0,
      pageSize: 20,
      coinId: -1,
      coinName: -1,
      orderType: -1,
      orderStatus: -1,
      startTime: parseInt((new Date() - 604800000) / 1000),
      endTime: parseInt((new Date() - 0) / 1000)
    });
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
                title={this.state.currency}
                type="main"
                className="select"
                valueArr={
                  this.state.walletList
                    ? [
                        this.intl.get("all"),
                        ...Object.keys(this.state.walletList)
                      ]
                    : []
                }
                onSelect={value => {
                  console.log(value);
                  this.setState({ currency: value });
                }}
              />
            </li>
            <li className="item">
              <span>{this.intl.get("type")}</span>
              <SelectButton
                title={this.state.orderType}
                type="main"
                className="select"
                valueArr={[
                  this.intl.get("all"),
                  this.intl.get("deposit"),
                  this.intl.get("asset-withdraw"),
                  this.intl.get("asset-transfer")
                ]}
                onSelect={value => {
                  this.setState({ orderType: value });
                }}
              />
            </li>
            <li className="item">
              <span>{this.intl.get("state")}</span>
              <SelectButton
                title={this.state.status}
                type="main"
                className="select"
                valueArr={[
                  this.intl.get("all"),
                  this.intl.get("passed"),
                  this.intl.get("failed"),
                  this.intl.get("pending")
                ]}
                onSelect={value => {
                  this.setState({ status: value });
                }}
              />
            </li>
          </ul>
          <div className="datepicker">
            <DatePicker
              startTime={this.state.startTime}
              EndTime={this.state.EndTime}
              onChangeStart={time => {
                this.setState({ startTime: parseInt(time / 1000) });
              }}
              onChangeEnd={time => {
                this.setState({ endTime: parseInt(time / 1000) });
              }}
            />
          </div>
          <div className="handel">
            <Button
              type="base"
              title={this.intl.get("search")}
              className="search"
              onClick={() => {
                this.search(this.state.page - 1);
              }}
            />
            <Button
              type="base"
              title={this.intl.get("reset")}
              className="reset"
              onClick={() => {
                this.initSearch();
              }}
            />
          </div>
        </div>
        {this.state.assetHistory.total ? (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th className="time">{this.intl.get("time")}</th>
                  <th className="currency">
                    {this.intl.get("asset-currency")}
                  </th>
                  <th className="type">{this.intl.get("type")}</th>
                  <th className="cash">{this.intl.get("asset-amount2")}</th>
                  <th className="balan">{this.intl.get("asset-balan")}</th>
                  <th className="send">{this.intl.get("asset-sendAddress")}</th>
                  <th className="receive">
                    {this.intl.get("asset-receiveAddress")}
                  </th>
                  <th className="state">{this.intl.get("asset-checkState")}</th>
                  <th className="fee">{this.intl.get("fee")}</th>
                  <th className="option">{this.intl.get("option")}</th>
                </tr>
              </thead>
              <tbody>
                {orderList &&
                  orderList.map(
                    (
                      {
                        orderId,
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
                        <td className="time">
                          {orderTime.toDate("yyyy-MM-dd")}
                        </td>
                        <td>
                          <img src={coinIcon} alt="" />
                          {coinName.toUpperCase()}
                        </td>
                        <td>{this.staticData.orderType[orderType]}</td>
                        <td
                          className={`cash ${
                            orderType === 2
                              ? "red"
                              : orderType === 1
                                ? "green"
                                : ""
                          }`}
                        >
                          {orderType === 2 ? "-" : orderType === 1 ? "+" : ""}
                          {count}
                        </td>
                        <td className="balan">
                          <i>{balance}</i>
                        </td>
                        <td className="send">
                          <i>{postAddress}</i>
                        </td>
                        <td className="receive">
                          <i title={receiveAddress}>{receiveAddress}</i>
                        </td>
                        <td className="state passing">
                          <span>{this.staticData.status[orderStatus]}</span>
                        </td>
                        <td className="fee">{fee}</td>
                        <td className="option">
                          {orderStatus === 0 ? (
                            <a
                              onClick={() => {
                                this.cancelOreder(orderId);
                              }}
                            >
                              {this.intl.get("cancel")}
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
            <Pagination
              total={this.state.assetHistory.total}
              pageSize={20}
              showTotal={true}
              onChange={page => {
                this.setState({ page });
                this.search(page - 1);
              }}
              showQuickJumper={true}
              currentPage={this.state.page}
            />
          </div>
        ) : (
          <div className="kong">{this.intl.get("noRecords")}</div>
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
      </div>
    );
  }
}
