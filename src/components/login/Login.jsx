import React, {Component} from 'react';
import {
  Route,
  NavLink,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import "./login.styl"
import exchangeViewBase from "../ExchangeViewBase";
import Button from '../../common/component/Button/index.jsx'
import Popup from '../../common/component/Popup/index.jsx'
import Input from '../../common/component/Input/index.jsx'
import TwoVerifyPopup from '../viewsPopup/TwoVerifyPopup.jsx'


import DetectOS from '../../class/lib/Os'
import Browser from '../../class/lib/Browser'
// import queryString from "querystring";
// import LoginVerification from './children/LoginVerification.jsx'


// const titleList = ['验证登录', '密码登录']
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
      checkState: true, // checkbox判断
      userErr: "", // 手机号/邮箱错误
      pwdErr: "", // 密码错误
      twoVerifyUser: "", // 两步认证用户信息
      from: props.location.state && props.location.state.from.pathname || '/whome'
    }
    const {controller, match} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.history = props.history
    this.state = Object.assign(this.state, controller.initState);
    // console.log("marthc........................", match.params);
    let query = match.params && match.params.uid || null;
    this.state.query = query
    console.log('query', query)
    this.getAward = controller.getAward.bind(controller)
    this.getVerify = controller.getVerify.bind(controller)
    this.clearVerify = controller.clearVerify.bind(controller)
    this.login = controller.login.bind(controller)
    this.getCaptchaVerify = controller.getCaptchaVerify.bind(controller)
    this.destroy = controller.clearVerify.bind(controller); // 清除定时器
    this.changeTitle = this.changeTitle.bind(this)
    this.changeUser = this.changeUser.bind(this)
    this.changePass = this.changePass.bind(this)
    this.changeCode = this.changeCode.bind(this)
    this.changePic = this.changePic.bind(this)
    this.checkUser = this.checkUser.bind(this)
    this.checkUserInput = this.checkUserInput.bind(this)
    this.checkPassInput = this.checkPassInput.bind(this)

  }

  changeTitle(i) { // 登录切换
    this.setState({
      titleIndex: i,
      userInput: "",
      picInput: "",
      codeInput: "",
      passInput: "",
      userErr: "", // 手机号/邮箱错误
      pwdErr: "", // 密码错误
      verifyNum: this.intl.get("sendCode"),
    });
    this.getCaptchaVerify();
    this.clearVerify();
  }

  changeUser(value) {
    this.setState({userInput: value});
    let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (reg.test(value)) {
      this.setState({userType: 1})
    } else {
      this.setState({userType: 0})
    }
    this.state.userErr && (this.setState({userErr: ""}))
  }

  changePass(value) {
    this.setState({passInput: value});
    console.log(2, value)
    this.state.pwdErr && (this.setState({pwdErr: ""}))
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
    if (this.state.titleIndex === 0 && this.state.userErr) return false
    if (this.state.titleIndex === 1 && this.state.userErr && this.state.pwdErr) return false
    if (this.state.titleIndex === 0 && this.state.checkState && this.state.userInput && this.state.codeInput && this.state.picInput) return true
    if (this.state.titleIndex === 1 && this.state.checkState && this.state.userInput && this.state.passInput && this.state.picInput) return true
    return false
  }

  checkUser() {
    this.setState({
      checkState: !this.state.checkState
    });
  }

  checkUserInput() { // 手机号／邮箱
    // let reg1 = /^\w+@[0-9a-z]{2,}(\.[a-z\u4e00-\u9fa5]{2,8}){1,2}$/,
    let reg1 = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
        reg2 = /^1[3456789]\d{9}$/;

    if (!reg1.test(this.state.userInput) && !reg2.test(this.state.userInput)) {
      this.setState({
        userErr: this.intl.get("login-inputVerifyPhoneAndEmail")
      })
    }
  }

  checkPassInput() { // 密码
    let reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,18}$/
    if (!reg.test(this.state.passInput)) {
      this.setState({
        pwdErr: this.intl.get("user-checkNewPwd")
      })
    }
  }


  componentWillMount() {
    // this.props.controller.Storage.userToken.get() && (this.props.history.push({pathname:"/whome"}));
  }

  componentDidMount() {
    this.getCaptchaVerify()
    let queryIndex = this.props.location.query && this.props.location.query.titleIndex
    if (queryIndex) {
      this.setState({
        titleIndex: queryIndex
      })
    }

  }

  componentWillUpdate(...parmas) {

  }

  componentWillUnmount() {
    this.destroy()
  }

  render() {
    // console.log('地址', this.props.params && this.props.params)
    let verifyTypeObj = {
      2008: 2,
      2009: 1,
      2010: 3
    }
    return (
      <div>
        <div className="login-wrap">
          <h1>
            {this.state.titleList.map((v, index) => (
              <span key={index} className={this.state.titleIndex === index ? 'active' : ''}
                    onClick={i => this.changeTitle(index)}>{v}</span>))}
          </h1>
          <ul>
            <li>
              <Input placeholder={this.intl.get("login-userInput")}
                     value={this.state.userInput}
                     onInput={value => this.changeUser(value)}
                     onBlur={this.checkUserInput}/>
              <em>{this.state.userInput && this.state.userErr}</em>
            </li>
            <li className={`${this.state.titleIndex === 1 ? '' : 'hide'} pass-li clearfix`}>
              <Input placeholder={this.intl.get("login-passInput")}
                     oriType="password"
                     value={this.state.passInput}
                     onInput={value => this.changePass(value)}
                     onBlur={this.checkPassInput}/>
              <span><NavLink to="/wfindPass">{this.intl.get("login-forget")}</NavLink></span>
              <em>{this.state.passInput && this.state.pwdErr}</em>
            </li>
            <li className="verify-li">
              <Input placeholder={this.intl.get("user-popPicturePlaceholder")} value={this.state.picInput}
                     onInput={value => this.changePic(value)}/>
              <div className="picture-btn">
                <img src={this.state.captcha || ''} alt="" onClick={this.getCaptchaVerify}/>
              </div>
              {/*<LoginVerification controller={this.props.controller}/>*/}
            </li>
            <li className={`${this.state.titleIndex === 0 ? '' : 'hide'} send-code-li clearfix`}>
              <Input placeholder={this.intl.get("login-placeholderPhoneAndEmail")} value={this.state.codeInput}
                     onInput={value => this.changeCode(value)}/>
              <Button className="send-code-btn"
                      title={typeof this.state.verifyNum === 'number' && (this.state.verifyNum === 0 && this.intl.get("sendAgain") || `${this.state.verifyNum}s`) || this.state.verifyNum}
                      onClick={() => {
                        this.getVerify(this.state.userInput, this.state.userType, 0)
                      }}/>
            </li>
            <li>
              <Button title={this.intl.get("login")}
                      className={`${this.canClick() ? 'can-click' : ''} login-btn`}
                      disable={this.canClick() ? false : true}
                      onClick={async () => {
                        let res = this.state.query && await this.getAward({
                          inviter: JSON.parse(this.state.query),
                          invited: this.state.userInput
                        }) || true
                        if(!res)
                          return
                        this.login(this.state.userInput, this.state.titleIndex === 0 ? this.state.codeInput : this.state.passInput, this.state.userType, this.state.titleIndex === 0 ? 0 : 1, this.state.captchaId, this.state.picInput, DetectOS(), Browser())
                      }}/>
            </li>
          </ul>
          <div className="checkbox-wrap">
            {/*<input type="checkbox"*/}
                    {/*className="check-select"*/}
                    {/*checked={this.state.checkState}*/}
                    {/*onChange={this.checkUser}/>*/}
              <p onClick={this.checkUser}>
                {this.state.checkState ? (<img src={this.$imagesMap.$checkbox_check} alt=""/>) : (<span></span>)}
              </p>
              {this.intl.get("login-read")}
            <Link to="/help/terms" className="userAgree">{this.intl.get("login-readUser")}</Link>
          </div>
        </div>
        {this.state.showPopup && (
          <Popup
            type={this.state.popType}
            msg={this.state.popMsg}
            onClose={() => {
              this.setState({showPopup: false});
            }}
            autoClose={true}
          />
        )}
        {this.state.showTwoVerify && <TwoVerifyPopup verifyNum={this.state.verifyNum} type={verifyTypeObj[this.state.verifyType]} getVerify={() => {this.getVerify(this.state.twoVerifyUser, this.state.verifyType === 2009 ? 1 : 0,  0)}} onClose={() => {
          this.setState({ showTwoVerify: false });
          this.getCaptchaVerify()
        }} destroy={this.destroy} onConfirm={code => {
          this.login(this.state.verifyType === 2008 ? this.state.userInput : this.state.twoVerifyUser, code, this.state.verifyType === 2008 ? this.state.userType : (this.state.verifyType === 2009 ? 1 : 0), this.state.verifyType === 2008 ? 2 : 3, this.state.captchaId, this.state.picInput);
        }} />}
      </div>
    );
  }
}