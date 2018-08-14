import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";
import SelectButton from "../../../common/component/SelectButton";
import Button from "../../../common/component/Button";
import DatePicker from "../../../common/component/DatePicker/DatePicker";
import Pagination from "../../../common/component/Pagination";
import BasePopup from "../../../common/component/Popup";
// import "../style/history.styl";
export default class History extends exchangeViewBase {
  constructor(props) {
    super(props);
    let { controller } = this.props;
    let type = controller.getQuery('type') && Number(controller.getQuery('type'));
    controller.setView(this);
    // 生成充提币类型及进度的状态码映射表；
    this.staticData = {
      orderType: {
        1: this.intl.get("deposit"),
        2: this.intl.get("asset-withdraw"),
        4: this.intl.get("asset-transfer"),
        8: this.intl.get("asset-funds-transfer"),
        // 1: this.intl.get("deposit"),
        // 15000: this.intl.get("asset-withdraw")
        // 5: this.intl.get("asset-transfer"),
      },
      status: {
        0: this.intl.get("pending"),
        1: this.intl.get("passed"),
        2: this.intl.get("failed"),
        3: this.intl.get("canceled"),
        4: this.intl.get("dealing"),
        5: this.intl.get("dealing")
      }
    };
    for (const k in this.staticData.orderType) {
      this.staticData.orderType[this.staticData.orderType[k]] = Number(k);
    }
    for (const k in this.staticData.status) {
      this.staticData.status[this.staticData.status[k]] = Number(k);
    }
    this.name = "history";
    this.dealTime = () => {
      let now = new Date();
      let start =
        new Date(now.getFullYear(), now.getMonth(), now.getDate()) - 604800000;
      let end =
        new Date(now.getFullYear(), now.getMonth(), now.getDate()) -
        0 +
        86399999;
      return {
        start: parseInt(start / 1000),
        end: parseInt(end / 1000)
      };
    };
    this.state = {
      page: 1,
      tip: false,
      tipSuccess: true,
      tipContent: "",
      // 搜索条件
      currency: this.intl.get("all"),
      orderType: [1,2,4,8].includes(type) && this.staticData.orderType[type] || this.intl.get("all"),
      status: this.intl.get("all"),
      startTime: this.dealTime().start,
      endTime: this.dealTime().end,
      //选择条件
      currency_s: this.intl.get("all"),
      orderType_s: [1,2,4,8].includes(type) && this.staticData.orderType[type] || this.intl.get("all"),
      status_s: this.intl.get("all"),
      startTime_s: this.dealTime().start,
      endTime_s: this.dealTime().end
    };
    controller.initHistory(true);
    let { wallList, assetHistory } = controller.initState;
    this.state = Object.assign(this.state, {
      wallList,
      assetHistory
    });
    //绑定方法
    this.getHistory = controller.getHistory.bind(controller);
    this.getWalletList = controller.getWalletList.bind(controller);
    this.cancelOreder = controller.cancelOreder.bind(controller);
    this.exportHistory = controller.exportHistory.bind(controller);
    this.initSearch = () => {
      this.setState(
        {
          page: 1,
          currency: this.intl.get("all"),
          orderType: this.intl.get("all"),
          status: this.intl.get("all"),
          startTime: this.dealTime().start,
          endTime: this.dealTime().end,
          currency_s: this.intl.get("all"),
          orderType_s: this.intl.get("all"),
          status_s: this.intl.get("all"),
          startTime_s: this.dealTime().start,
          endTime_s: this.dealTime().end
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
      startTime: this.dealTime().start,
      endTime: this.dealTime().end
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
          <Button
            type="export"
            title={this.intl.get("asset-export")}
            onClick={this.exportHistory}
          />
        </h3>
        <div className="filtrate clearfix">
          <ul className="clearfix">
            <li className="item">
              <span>{this.intl.get("asset-currency")}</span>
              <SelectButton
                title={this.state.currency_s}
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
                  this.setState({ currency_s: value });
                }}
              />
            </li>
            <li className="item type">
              <span>{this.intl.get("type")}</span>
              <SelectButton
                title={this.state.orderType_s}
                type="main"
                className="select type"
                valueArr={[
                  this.intl.get("all"),
                  this.intl.get("deposit"),
                  this.intl.get("asset-withdraw"),
                  this.intl.get("asset-transfer"),
                  this.intl.get("asset-funds-transfer")
                ]}
                onSelect={value => {
                  this.setState({ orderType_s: value });
                }}
              />
            </li>
            <li className="item">
              <span>{this.intl.get("state")}</span>
              <SelectButton
                title={this.state.status_s}
                type="main"
                className="select"
                valueArr={[
                  this.intl.get("all"),
                  this.intl.get("passed"),
                  this.intl.get("failed"),
                  this.intl.get("pending")
                ]}
                onSelect={value => {
                  this.setState({ status_s: value });
                }}
              />
            </li>
          </ul>
          <div className="datepicker">
            <DatePicker
              startTime={this.state.startTime_s}
              endTime={this.state.endTime_s}
              onChangeStart={time => {
                this.setState({ startTime_s: parseInt(time / 1000) });
              }}
              onChangeEnd={time => {
                this.setState({ endTime_s: parseInt(time / 1000) });
              }}
            />
          </div>
          <div className="handel">
            <Button
              type="base"
              title={this.intl.get("search")}
              className="search"
              onClick={() => {
                this.props.controller.initHistory();
                this.setState({
                  page: 1,
                  currency: this.state.currency_s,
                  orderType: this.state.orderType_s,
                  status: this.state.status_s,
                  startTime: this.state.startTime_s,
                  endTime: this.state.endTime_s
                },()=>{
                  this.search(0);
                });
              }}
            />
            <Button
              type="base"
              title={this.intl.get("reset")}
              className="reset"
              onClick={() => {
                this.props.controller.initHistory();
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
                  <th className="confirm">{this.intl.get("asset-confirm")}</th>
                  <th className="state">{this.intl.get("asset-checkState")}</th>
                  <th className="fee">{this.intl.get("fee")}</th>
                  {/* <th className="option">{this.intl.get("option")}</th> */}
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
                        blockSite,
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
                        <td className="time pop-parent">
                          {orderTime.toDate("yyyy-MM-dd")}
                          <b className="pop-children uppop-children">
                            {orderTime.toDate("yyyy-MM-dd HH:mm:ss")}
                          </b>
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
                          <i>
                            {orderType === 2 ? "-" : orderType === 1 ? "+" : ""}
                            {Number(count)}
                          </i>
                        </td>
                        <td className="balan">
                          <i>
                            {Number(balance).format({ number: "property" , style:{ decimalLength: 8}})}
                          </i>
                        </td>
                        <td className="send pop-parent">
                            <i>{"—"}</i>
                          {/* <b className="pop-children uppop-children">
                            {postAddress}
                          </b> */}
                        </td>
                        <td className="receive pop-parent">
                          <i>{receiveAddress}</i>
                          <b className="pop-children uppop-children">
                            {receiveAddress}
                          </b>
                        </td>
                        <td className="confirm">
                          {orderType === 1 ? (
                            <a
                              href={blockSite}
                              target="_blank"
                            >{`${doneCount || 0}/${verifyCount}`}</a>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td
                          className={`state ${
                            !orderStatus
                              ? "pending"
                              : orderStatus === 2
                                ? "failed"
                                : ""
                          }`}
                        >
                          <span>{this.staticData.status[orderStatus]}</span>
                        </td>
                        <td className="fee">{fee || "—"}</td>
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
                this.setState({
                  currency_s: this.state.currency,
                  orderType_s: this.state.orderType,
                  status_s: this.state.status,
                  startTime_s: this.state.startTime,
                  endTime_s: this.state.endTime
                });
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
