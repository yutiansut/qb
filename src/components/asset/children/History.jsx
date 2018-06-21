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
    this.state = {};
    let { controller } = this.props;
    controller.setView(this);
    let { wallList, assetHistory } = controller.initState;
    this.state = Object.assign(this.state, {
      wallList,
      assetHistory
    });
    //绑定方法
    this.getHistory = controller.getHistory.bind(controller);
    // this.state = {
    // console.log(this.controller)
    // }
  }
  componentWillMount() {
    this.getHistory()
  }

  componentDidMount() {}

  componentWillUpdate() {}

  render() {
    let { total, cur_page, page_size, orderList } = this.state.assetHistory;
    return (
      <div className="hist">
        <h3 className="title">
          资产记录 <Button type="export" title="导出资产记录" />
        </h3>
        <div className="filtrate clearfix">
          <ul className="clearfix">
            <li className="item">
              <span>币种</span>
              <SelectButton
                title="全部"
                type="main"
                className="select"
                valueArr={["全部", "BTC", "LTC", "ETH"]}
              />
            </li>
            <li className="item">
              <span>类型</span>
              <SelectButton
                title="全部"
                type="main"
                className="select"
                valueArr={["全部", "充币", "提币"]}
              />
            </li>
            <li className="item">
              <span>状态</span>
              <SelectButton
                title="全部"
                type="main"
                className="select"
                valueArr={["全部", "通过", "未通过", "审核中"]}
              />
            </li>
          </ul>
          <div className="datepicker">
            <DatePicker />
          </div>
          <div className="handel">
            <Button type="base" title="搜索" className="search" />
            <Button type="base" title="重置" className="reset" />
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="time">时间</th>
              <th className="currency">币种</th>
              <th className="type">类型</th>
              <th className="cash">金额数量</th>
              <th className="balan">余额</th>
              <th className="send">发送地址</th>
              <th className="receive">接受地址</th>
              <th className="confirm">确认数</th>
              <th className="state">审核状态</th>
              <th className="fee">手续费</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map(({
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
            }, index) => (
              <tr key={index}>
                  <td className="time">{orderTime}</td>
                  <td>
                    <img src={coinIcon} alt=""/>
                    {coinName}
                  </td>
                  <td>{!orderType ? '充币' : (orderType === 1 ? '提币': '转账')}</td>
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
            ))}
          </tbody>
        </table>
        <Pagination
          total={120}
          pageSize={20}
          showTotal={true}
          showQuickJumper={true}
        />
      </div>
    );
  }
}
