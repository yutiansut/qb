import React, {Component} from 'react';
import {
  Route,
  NavLink,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import "./stylus/login.styl"
import exchangeViewBase from "../ExchangeViewBase";
import Button from '../../common/component/Button/index.jsx'
import Popup from '../../common/component/Popup/index.jsx'
import Input from '../../common/component/Input/index.jsx'
import TwoVerifyPopup from  '../viewsPopup/TwoVerifyPopup.jsx'

import DetectOS from '../../class/lib/Os'
import Browser from '../../class/lib/Browser'

export default class Login extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      titleList: [this.intl.get("login-verify"), this.intl.get("login-pass")],
      titleIndex: 0, // 点击下标
      userInput: "",
      passInput: "",
      codeInput: "",
      picInput: "",
      userType: 0, //0 phone 1email
      verifyNum: this.intl.get("sendCode"),

      showPopup: false, // 提示弹窗
      popType: "tip1",
      popMsg: "登录成功",

      showTwoVerify: false,
      verifyType: "", // 密码登录两步认证弹窗
      checkState: true // checkbox判断
    }
    const {controller} = props
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.history = props.history
    this.state = Object.assign(this.state, controller.initState);
    this.getVerify = controller.getVerify.bind(controller)
    this.login = controller.login.bind(controller)
    this.getCaptchaVerify = controller.getCaptchaVerify.bind(controller)
    this.destroy = controller.clearVerify.bind(controller); // 清除定时器
    this.changeTitle = this.changeTitle.bind(this)
    this.changeUser = this.changeUser.bind(this)
    this.changePass = this.changePass.bind(this)
    this.changeCode = this.changeCode.bind(this)
    this.changePic = this.changePic.bind(this)
    this.checkUser = this.checkUser.bind(this)

  }

  changeTitle(i) { // 登录切换
    this.setState({
      titleIndex: i,
      userInput: "",
      picInput: "",
    })
    this.getCaptchaVerify()
  }

  changeUser(value) {
    this.setState({userInput: value});
    let reg = /^\w+@[0-9a-z]{2,}(\.[a-z\u4e00-\u9fa5]{2,8}){1,2}$/
    if (reg.test(value)){
      this.setState({userType: 1})
    } else {
      this.setState({userType: 0})
    }
  }
  changePass(value) {
    this.setState({passInput: value});
    console.log(2, value)

  }
  changeCode(value) {
    this.setState({codeInput: value});
    console.log(3, value)
  }
  changePic(value) {
    this.setState({picInput: value});
    console.log(4, value)
  }

  canClick() {
    if (this.state.checkState && this.state.userInput && this.state.codeInput && this.state.picInput) return true
    if (this.state.checkState && this.state.userInput && this.state.passInput && this.state.picInput) return true
    return false
  }

  checkUser(event) {
    this.setState({
      checkState: event.target.checked
    });
  }
  componentWillMount() {
    // this.bannerSwiper()
  }

  componentDidMount() {
    this.getCaptchaVerify()
  }

  componentWillUpdate(...parmas) {

  }

  componentWillUnmount() {
    this.destroy()
  }

  render() {
    let verifyTypeObj = {
      2008: 2,
      2009: 1,
      2010: 3
    }
    return (
      <div>
        <div className="login-wrap-mb">
          <div className="tab-ul">
            {this.state.titleList.map((v, index) => (<span key={index} className={this.state.titleIndex === index ? 'active' : ''} onClick={i => this.changeTitle(index)}>{v}</span>))}
          </div>
          <ul>
            <li>
              <Input placeholder={this.intl.get("login-userInput")} value={this.state.userInput} onInput={value => this.changeUser(value)}/>
            </li>
            <li className={`${this.state.titleIndex === 1 ? '' : 'hide'} pass-li clearfix`}>
              <Input placeholder={this.intl.get("login-passInput")} oriType="password" value={this.state.passInput} onInput={value => this.changePass(value)}/>
              <span><NavLink to="/mfindPass">{this.intl.get("login-forget")}</NavLink></span>
            </li>
            <li className="verify-li">
              <Input placeholder={this.intl.get("user-popPicturePlaceholder")} value={this.state.picInput} onInput={value => this.changePic(value)}/>
              <div className="picture-btn" >
                <img src={this.state.captcha || ''} alt="" onClick={this.getCaptchaVerify}/>
              </div>
            </li>
            <li className={`${this.state.titleIndex === 0 ? '' : 'hide'} send-code-li clearfix`}>
              <Input placeholder={this.intl.get("login-placeholderPhoneAndEmail")} value={this.state.codeInput} onInput={value => this.changeCode(value)}/>
              <Button className="send-code-btn"
                      title={typeof this.state.verifyNum === 'number' && (this.state.verifyNum === 0 && this.intl.get("sendAgain") || `${this.state.verifyNum}s`) || this.state.verifyNum}
                      onClick={()=>{this.getVerify(this.state.userInput, this.state.userType, 0)}}/>
            </li>
            <li>
              <Button title={this.intl.get("login")}
                      className={`${this.canClick() ? 'can-click' : ''} login-btn`}
                      disable={this.canClick() ? false : true}
                      onClick={()=>{this.login(this.state.userInput, this.state.titleIndex === 0 ? this.state.codeInput : this.state.passInput, this.state.userType, this.state.titleIndex === 0 ? 0 : 1, this.state.captchaId, this.state.picInput, DetectOS(), Browser())}}/>
            </li>
          </ul>
          <label className="agree"><input type="checkbox" checked={this.state.checkState} onChange={this.checkUser}/>{this.intl.get("login-read")}
              <Link to="/mhelp/terms" className="userAgree">《{this.intl.get("login-readUser")}》</Link>
          </label>
        </div>
        {this.state.showPopup && (
          <Popup
            type={this.state.popType}
            msg={this.state.popMsg}
            onClose={() => {
              this.setState({ showPopup: false });
            }}
            autoClose = {true}
          />
        )}
        {this.state.showTwoVerify && <TwoVerifyPopup verifyNum={this.state.verifyNum} type={verifyTypeObj[this.state.verifyType]} getVerify={() => {this.getVerify(this.state.userInput, this.state.userType, 7)}} onClose={() => {
          this.setState({ showTwoVerify: false });
        }} destroy={this.destroy} onConfirm={code => {
          this.login(this.state.userInput, code, this.state.userType, this.state.verifyType === 2009 ? 2 : 0, this.state.captchaId, this.state.picInput);
        }} />}
      </div>
    );
  }
}