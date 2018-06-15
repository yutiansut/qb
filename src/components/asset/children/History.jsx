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
    //绑定方法
    // this.getData = controller.getData.bind(controller)
    // this.state = {
    // console.log(this.controller)
    // }
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUpdate() {}

  render() {
    return <div className="hist">
        <h3>资产记录</h3>
        <div className="filtrate clearfix">
          <ul className="clearfix">
            <li>
              <span>币种</span>
              <SelectButton title="全部" type="main" className="select" />
            </li>
            <li>
              <span>类型</span>
              <SelectButton title="全部" type="main" className="select" />
            </li>
            <li>
              <span>状态</span>
              <SelectButton title="全部" type="main" className="select" />
            </li>
          </ul>
          <p className="datepicker">datePicker</p>
          <div className="handel">
            <Button type="base" title="搜索" className="search" />
            <Button type="base" title="重置" className="reset" />
          </div>
        </div>
        <table>
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
            <tr>
              <td className="time">2018-01-01</td>
              <td>BTC</td>
              <td>充币</td>
              <td className="cash red">+11.3142</td>
              <td>3.365165</td>
              <td className="send">18766554332</td>
              <td>morXXEXFS3ZjP6qk6V…</td>
              <td className="confirm">
                <a>1/5</a>
              </td>
              <td className="state passing">审核中</td>
              <td className="fee">—</td>
            </tr>
          <tr>
            <td className="time">2018-01-01</td>
            <td>BTC</td>
            <td>充币</td>
            <td className="cash red">+11.3142</td>
            <td>3.365165</td>
            <td className="send">18766554332</td>
            <td>morXXEXFS3ZjP6qk6V…</td>
            <td className="confirm">
              <a>1/5</a>
            </td>
            <td className="state passing">审核中</td>
            <td className="fee">—</td>
          </tr>
          <tr>
            <td className="time">2018-01-01</td>
            <td>BTC</td>
            <td>充币</td>
            <td className="cash red">+11.3142</td>
            <td>3.365165</td>
            <td className="send">18766554332</td>
            <td>morXXEXFS3ZjP6qk6V…</td>
            <td className="confirm">
              <a>1/5</a>
            </td>
            <td className="state passing">审核中</td>
            <td className="fee">—</td>
          </tr>
          <tr>
            <td className="time">2018-01-01</td>
            <td>BTC</td>
            <td>充币</td>
            <td className="cash red">+11.3142</td>
            <td>3.365165</td>
            <td className="send">18766554332</td>
            <td>morXXEXFS3ZjP6qk6V…</td>
            <td className="confirm">
              <a>1/5</a>
            </td>
            <td className="state passing">审核中</td>
            <td className="fee">—</td>
          </tr>
          <tr>
            <td className="time">2018-01-01</td>
            <td>BTC</td>
            <td>充币</td>
            <td className="cash red">+11.3142</td>
            <td>3.365165</td>
            <td className="send">18766554332</td>
            <td>morXXEXFS3ZjP6qk6V…</td>
            <td className="confirm">
              <a>1/5</a>
            </td>
            <td className="state passing">审核中</td>
            <td className="fee">—</td>
          </tr>
          <tr>
            <td className="time">2018-01-01</td>
            <td>BTC</td>
            <td>充币</td>
            <td className="cash red">+11.3142</td>
            <td>3.365165</td>
            <td className="send">18766554332</td>
            <td>morXXEXFS3ZjP6qk6V…</td>
            <td className="confirm">
              <a>1/5</a>
            </td>
            <td className="state passing">审核中</td>
            <td className="fee">—</td>
          </tr>
          <tr>
            <td className="time">2018-01-01</td>
            <td>BTC</td>
            <td>充币</td>
            <td className="cash red">+11.3142</td>
            <td>3.365165</td>
            <td className="send">18766554332</td>
            <td>morXXEXFS3ZjP6qk6V…</td>
            <td className="confirm">
              <a>1/5</a>
            </td>
            <td className="state passing">审核中</td>
            <td className="fee">—</td>
          </tr>
          </tbody>
        </table>
        <Pagination
          total={120}
          pageSize={20}
          showTotal={true}
          showQuickJumper={true}
        />
      </div>;
  }
}
