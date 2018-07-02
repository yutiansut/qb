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
import LoginVerification from './children/LoginVerification.jsx'


const titleList = ['验证登录', '密码登录']
export default class Login extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      titleIndex: 0, // 点击下标
      input1: "",
      input2: "",
      input3: "",
      userType: 0
    }
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getVerify = controller.getVerify.bind(controller)
    this.changeTitle = this.changeTitle.bind(this)
    this.changeInput1 = this.changeInput1.bind(this)
    this.changeInput2 = this.changeInput2.bind(this)
    this.changeInput3 = this.changeInput3.bind(this)
  }

  changeTitle(i) {
    this.setState({
      titleIndex: i
    })
  }

  changeInput1(value) {
    this.setState({input1: value});
    let reg = /^\w+@[0-9a-z]{2,}(\.[a-z\u4e00-\u9fa5]{2,8}){1,2}$/
    if (reg.test(value)){
      this.setState({userType: 1})
    } else {
      this.setState({userType: 0})
    }

  }
  changeInput2(value) {
    this.setState({input2: value});
    console.log(2, value)
  }
  changeInput3(value) {
    this.setState({input3: value});
    console.log(3, value)
  }

  componentWillMount() {
    // this.bannerSwiper()
  }

  componentDidMount() {

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    console.log('登录', this.state)
    return (
      <div className="login-wrap">
        <h1>
          {titleList.map((v, index) => (<span key={index} className={this.state.titleIndex === index ? 'active' : ''} onClick={i => this.changeTitle(index)}>{v}</span>))}
        </h1>
        <ul>
          <li>
            <Input placeholder="手机号／邮箱" value={this.state.input1} onInput={value => this.changeInput1(value)}/>
          </li>
          <li className={`${this.state.titleIndex === 1 ? '' : 'hide'} pass-li clearfix`}>
            <Input placeholder="密码" oriType="password" value={this.state.input2} onInput={value => this.changeInput2(value)}/>
            <span><NavLink to="/findPass">忘记密码</NavLink></span>
          </li>
          <li className="verify-li">
            <LoginVerification controller={this.props.controller}/>
          </li>
          <li className={`${this.state.titleIndex === 0 ? '' : 'hide'} send-code-li clearfix`}>
            <Input placeholder="请输入邮箱／手机验证码" value={this.state.input3} onInput={value => this.changeInput3(value)}/>
            <Button className="send-code-btn"
                    title={typeof this.state.verifyNum === 'number' && (this.state.verifyNum === 0 && '重新获取' || `${this.state.verifyNum}s`) || this.state.verifyNum}
                    onClick={()=>{this.getVerify(this.state.input1, this.state.userType, 0)}}/>
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