import React, { Component } from "react";
import exchangeViewBase from "../ExchangeViewBase";
import Button from "../../common/component/Button";
import "./style/extract.styl";
export default class Extract extends exchangeViewBase {
  constructor(props) {
    super(props);
    //绑定方法
    // this.getData = controller.getData.bind(controller)
    // this.state = {
    // console.log(this.controller)
    // }
  }
  render() {
    return <div className="extract">
        <h3>提币-ETH</h3>
        <div className="select">
          <div className="search clearfix">
            <span className="title">选择币种</span>
            <div className="currency-asset">
              <p />
              <ul>
                <li>
                  <span>总额</span>
                  <i>2.006 BTC</i>
                </li>
                <li>
                  <span>下单冻结</span>
                  <i>1 BTC</i>
                </li>
                <li>
                  <span>可用余额</span>
                  <i>1.006 BTC</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="address">
          <p className="tips">
            注意：最小提现数量为0.1ETH;请勿直接提现至众筹或ICO地址
            ，我们不会处理未来代币的发放。
          </p>
          <div className="currency-address clearfix">
            <span className="title">充值地址</span>
            <div className="content">
              <p>sfhghdfjhsa5yrehhjj35ahdhgjhjhtjdrheadhf</p>
              <a>添加地址</a>
            </div>
          </div>
          <div className="extract-amount clearfix">
            <span className="title">提现数量</span>
            <div className="content">
              <p className="limit">
                24H提现额度：1/2 BTC <a>提额申请</a>
              </p>
              <p className="input">
                <input type="text" placeholder="提现数量" />
                <a>可提现余额: 0</a>
                <span>ETH</span>
              </p>
              <div className="fee">
                <p>
                  手续费：0 EOS
                  <span>实际到账 0 BTC</span>
                </p>
                <p className="explain">手续费=矿工费+平台手续费</p>
              </div>
            </div>
          </div>
          <div className="password clearfix">
            <span className="title">提现数量</span>
            <div className="content">
              <input type="passwword" palce="请输入您的资金密码" />
              <div className="set">
                <a>设置资金密码</a>
              </div>
            </div>
          </div>
          <div className="handel">
            <Button title="确认提交" type="base" />
          </div>
        </div>
        <div className="tip clearfix">
          <span className="title">温馨提示</span>
          <ol>
            <li>
              禁止向ETH地址充值除ETH之外的资产，任何充入ETH地址的非ETH资产将不可找回
            </li>
            <li>
              充值完成后，你可以进入 <a href="#">资产记录</a> 页面跟踪进度
            </li>
          </ol>
        </div>
        <div className="to-trade clearfix">
          <span className="title">去交易</span>
          <Button title="EOS/BTC" type="base" />
        </div>
        <div className="history clearfix">
          <span className="title">提币记录</span>
          <table>
            <thead>
              <tr>
                <th className="time">提币时间</th>
                <th className="currency">币种</th>
                <th className="amount">提币数量</th>
                <th className="send">发送地址</th>
                <th className="receive">接收地址</th>
                <th className="state">状态</th>
                <th className="remark">确认数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2018-12-23 09:09:23</td>
                <td>BTC</td>
                <td>+0.044</td>
                <td>18878665623</td>
                <td>0x046e2222….22227e3543</td>
                <td>
                  <a href="#">1/6</a>
                </td>
                <td>
                  <span>审核中</span>
                </td>
              </tr>
              <tr>
                <td>2018-12-23 09:09:23</td>
                <td>BTC</td>
                <td>+0.044</td>
                <td>18878665623</td>
                <td>0x046e2222….22227e3543</td>
                <td>
                  <a href="#">1/6</a>
                </td>
                <td>
                  <span>审核中</span>
                </td>
              </tr>
              <tr>
                <td>2018-12-23 09:09:23</td>
                <td>BTC</td>
                <td>+0.044</td>
                <td>18878665623</td>
                <td>0x046e2222….22227e3543</td>
                <td>
                  <a href="#">1/6</a>
                </td>
                <td>
                  <span>审核中</span>
                </td>
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
