import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";
import Button from "../../../common/component/Button";
import "../style/charge.styl"
export default class Charge extends exchangeViewBase {
  constructor(props) {
    super(props)
    //绑定方法
    // this.getData = controller.getData.bind(controller)
    // this.state = {
    // console.log(this.controller)
    // }
  }
  render() {
    return <div className="charge">
      <h3>充币-BTC</h3>
      <div className="select">
        <div className="search clearfix">
          <span className="title">选择币种</span>
          <div className="currency-asset">
            <p></p>
            <ul>
              <li><span>总额</span><i>2.006 BTC</i></li>
              <li><span>下单冻结</span><i>1 BTC</i></li>
              <li><span>可用余额</span><i>1.006 BTC</i></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="address">
        <p className="tips">注意：禁止向BTC地址充值除BTC之外的资产，任何充入BTC地址的非BTC资产将不可找回。</p>
        <div className="currency-address clearfix">
          <span className="title">充值地址</span>
          <p>sfhghdfjhsa5yrehhjj35ahdhgjhjhtjdrheadhf</p>
        </div>
        <div className="handel">
          <Button title="展示二维码" type="base"></Button>
          <Button title="复制到剪贴板" type="base"></Button>
          <div className="qrcode"></div>
        </div>
      </div>
      <div className="tip clearfix">
        <span className="title">温馨提示</span>
        <ol>
          <li>使用EOS地址充值需要<a href="#">12</a>个网络确认才能到账</li>
          <li>充值完成后，你可以进入 <a href="#">资产记录</a> 页面跟踪进度</li>
        </ol>
      </div>
      <div className="to-trade clearfix">
        <span className="title">去交易</span>
        <Button title="EOS/BTC" type="base"></Button>
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
            <tr>
              <td>2018-12-23 09:09:23</td>
              <td>BTC</td>
              <td>+0.044</td>
              <td>18878665623</td>
              <td>0x046e2222….22227e3543</td>
              <td><a href="#">1/6</a></td>
              <td><span>审核中</span></td>
            </tr>
            <tr>
              <td>2018-12-23 09:09:23</td>
              <td>BTC</td>
              <td>+0.044</td>
              <td>18878665623</td>
              <td>0x046e2222….22227e3543</td>
              <td><a href="#">1/6</a></td>
              <td><span>审核中</span></td>
            </tr>
            <tr>
              <td>2018-12-23 09:09:23</td>
              <td>BTC</td>
              <td>+0.044</td>
              <td>18878665623</td>
              <td>0x046e2222….22227e3543</td>
              <td><a href="#">1/6</a></td>
              <td><span>审核中</span></td>
            </tr>
          </tbody>
        </table>
        <p className="more">
          <a href="#">查看全部→</a>
        </p>
      </div>
    </div>;
  }
}