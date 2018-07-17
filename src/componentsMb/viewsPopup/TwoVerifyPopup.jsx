import React, { Component } from 'react';

import exchangeViewBase from "../../components/ExchangeViewBase";
import Button from '../../common/component/Button/index.jsx'
import Input from '../../common/component/Input/index.jsx'
import "./viewsPopup.styl"
// destroy 组件销毁时执行的方法
// onClose 关闭弹窗
// type 验证类型1 邮件 3 短信 2 谷歌验证
// getVerif 获取验证码
// onConfirm 确认时的操作
// verifyNum 倒计时位置文案


export default class TwoVerifyPopup extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  componentWillUnmount() {
    this.props.destroy && this.props.destroy();
  }
  render() {
    let { onClose, type, getVerify, verifyNum, onConfirm } = this.props;
    return (
      <div className="h5-view-popup-wrap">
        <div className="view-info">
          <img src="/static/img/guanbi_hei.svg" alt="" className="close-popup" onClick={() => { onClose && onClose() }} />
          <h2>{this.intl.get('twoStep')}</h2>
          <div className="clearfix">
            <Input
              placeholder={this.intl.get('asset-input-twoVerify')}
              value={this.state.value}
              onInput={(value) => { this.setState({ value }) }}
            />
            <Button type="base" disable={type !== 1 && type !== 3} title={(typeof verifyNum === "number" && ((verifyNum === 0 && this.intl.get("sendAgain")) || `${verifyNum}s`)) || verifyNum} className="verify-btn" onClick={() => { getVerify && getVerify() }} />
          </div>
          <Button title={this.intl.get('asset-submit')} disable={this.state.value === ''} type="base" className="set-btn" onClick={() => { onConfirm && onConfirm(this.state.value); }} />
        </div>
      </div>)
  }
}
