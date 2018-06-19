import React, {Component} from 'react';
import "./forgetPass.styl"
import exchangeViewBase from "../ExchangeViewBase";
import Button from '../../common/component/Button/index.jsx'
import Input from '../../common/component/Input/index.jsx'

export default class ForgetPass extends exchangeViewBase {
  constructor(props) {
    super(props);
    const {controller} = props
    this.state = {

    }
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getVerify = controller.getVerify.bind(controller)
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    return (
      <div className="find-pass-wrap">
        <h1>找回密码</h1>
        <ul>
          <li>
            <p>手机号/邮箱</p>
            <Input placeholder="手机号／邮箱"/>
          </li>
          <li className="send-verify-li">
            <p>验证码</p>
            <div className="clearfix">
              <Input placeholder="请输入邮箱／手机验证码"/>
              <Button className="send-code-btn" title={typeof this.state.verifyNum === 'number' && (this.state.verifyNum === 0 && '重新获取' || `${this.state.verifyNum}s`) || this.state.verifyNum} onClick={this.getVerify}/>
            </div>
          </li>
          <li className="pass-li">
            <p>密码</p>
            <Input placeholder="请输入密码"/>
            <span>必须是 6-18 位英文字母、数字或符号，不能纯数字或纯字母</span>
          </li>
          <li>
            <p>再输一遍</p>
            <Input placeholder="请再输入一遍密码"/>
          </li>
          <li className="send-picture-li">
            <p>图形验证码</p>
            <div className="clearfix">
              <Input placeholder="请输入图形验证码"/>
              <b>bbbbb</b>
            </div>
          </li>
          <li>
            <Button title="确定" className="pass-btn"/>
          </li>
        </ul>
      </div>
    );
  }
}