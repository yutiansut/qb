import React, {Component} from 'react';
import {
  Route,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'
import "./login.styl"
import exchangeViewBase from "../ExchangeViewBase";
import Button from '../../common/component/Button/index.jsx'
import Input from '../../common/component/Input/index.jsx'


const titleList = ['验证登录', '密码登录']
export default class Login extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      titleIndex: 0 // 点击下标
    }
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getVerify = controller.getVerify.bind(controller)
    this.changeTitle = this.changeTitle.bind(this)
  }

  changeTitle(i) {
    this.setState({
      titleIndex: i
    })
  }

  componentWillMount() {
    // this.bannerSwiper()
  }

  componentDidMount() {

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    return (

        <div className="login-wrap">
          <h1>
            {titleList.map((v, index) => (<span key={index} className={this.state.titleIndex === index ? 'active' : ''} onClick={i => this.changeTitle(index)}>{v}</span>))}
          </h1>
          <ul>
            <li>
              <Input placeholder="手机号／邮箱"/>
            </li>
            <li className={`${this.state.titleIndex === 1 ? '' : 'hide'} pass-li clearfix`}>
              <Input placeholder="密码"/>
              <span><NavLink to="/findPass">忘记密码</NavLink></span>
            </li>
            <li className="verify-li"></li>
            <li className={`${this.state.titleIndex === 0 ? '' : 'hide'} send-code-li clearfix`}>
              <Input placeholder="请输入邮箱／手机验证码"/>
              <Button className="send-code-btn" title={typeof this.state.verifyNum === 'number' && (this.state.verifyNum === 0 && '重新获取' || `${this.state.verifyNum}s`) || this.state.verifyNum} onClick={this.getVerify}/>
            </li>
            <li>
              <Button title="登录" className="login-btn"/>
            </li>
          </ul>
          <p><input type="checkbox" />我已阅读并同意<a href="">用户协议</a></p>
        </div>
    );
  }
}