import React, {Component} from 'react';

import exchangeViewBase from "../ExchangeViewBase";
import Button from '../../common/component/Button/index.jsx'
import Input from '../../common/component/Input/index.jsx'
import "./viewsPopup.styl"



export default class TwoVerifyPopup extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state={
      value:''
    }
  }

  render() {
    return <div className="view-popup-wrap">
        <div className="view-info">
          <img src="/static/img/guanbi_hei.svg" alt="" className="close-popup" onClick={this.props.onClose} />
          <h2>两步验证</h2>
          <div className="clearfix">
            <Input
              placeholder="请输入邮箱／手机验证码"
              value={this.state.value}
              onInput={(value)=>{this.setState({value})}}
            />
            {/*<input type="text" placeholder="请输入邮箱／手机验证码"/>*/}
            <Button type="base"  title={(typeof this.props.verifyNum === "number" && ((this.props.verifyNum === 0 && "重新获取") || `${this.props.verifyNum}s`)) || this.props.verifyNum} className="verify-btn" onClick={this.props.getVerify} />
          </div>
        <Button title="确认" disable={this.state.value === '' && true } type="base" className="set-btn" />
        </div>
      </div>;
  }
}
