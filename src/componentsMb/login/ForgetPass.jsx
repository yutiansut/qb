import React, {Component} from 'react';
import "./stylus/forgetPass.styl"
import exchangeViewBase from "../../components/ExchangeViewBase";
import Button from '../../common/component/Button/index.jsx'
import Input from '../../common/component/Input/index.jsx'
import Popup from '../../common/component/Popup/index.jsx'
import {Regular} from '../../core'

export default class ForgetPass extends exchangeViewBase {
  constructor(props) {
    super(props);
    const {controller} = props
    this.state = {
      userInput: "",
      verifyInput: "",
      passInput: "",
      againInput: "",
      picInput: "",
      userType: 0,
      showPopup: false,
      popType: "tip1",
      popMsg: "成功",
      captcha: "",
      captchaId: "",
      userErr: "",
      errPassAgain: "",
      verifyNum: this.intl.get("sendCode"),
      to: "/login",
      passTest: true // 判断密码输入对错显示
    }
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.history = props.history
    this.state = Object.assign(this.state, controller.initState);
    this.getVerify = controller.getVerify.bind(controller) // 短信验证码
    this.getCaptchaVerify = controller.getCaptchaVerify.bind(controller) // 图形验证码
    this.forgetLoginPass = controller.forgetLoginPass.bind(controller) // 图形验证码
    this.checkPassInput = this.checkPassInput.bind(this) // 检验密码
    this.checkAgainInput = this.checkAgainInput.bind(this) // 检验密码
    this.checkUserInput = this.checkUserInput.bind(this) // 检验用户
  }

  changeUserInput(value) {
    this.setState({userInput: value});
    let reg = Regular('regEmail', value)
    if (reg){
      this.setState({userType: 1})
    } else {
      this.setState({userType: 0})
    }
  }

  changeVerifyInput(value) {
    this.setState({verifyInput: value});
  }

  changePassInput(value) {
    this.setState({passInput: value});
  }

  changeAgainInput(value) {
    this.setState({againInput: value});
    this.state.errPassAgain && (this.setState({errPassAgain: ""}))
  }

  changePicInput(value) {
    this.setState({picInput: value});
  }

  // 检验部分
  checkUserInput() { // 手机号／邮箱
    let reg1 = Regular('regEmail', this.state.userInput),
      reg2 = Regular('regPhone', this.state.userInput);

    if (!reg1 && !reg2) {
      this.setState({
        userErr: this.intl.get("login-inputVerifyPhoneAndEmail")
      })
    }
  }

  checkPassInput() {
    let reg = Regular('regPwd', this.state.passInput)
    this.setState({
      passTest: this.state.passInput ? reg : true
    })
    if(this.state.againInput && (this.state.againInput !== this.state.passInput)) { // 两次密码不一致
      this.setState({
        errPassAgain: this.intl.get("user-checkAgainPwd")
      })
    }
    if (reg && (this.state.againInput === this.state.passInput)) { // 两次密码一致
      this.state.errPassAgain && (this.setState({errPassAgain: ""}))
    }
  }

  checkAgainInput() {
    let reg = Regular('regPwd', this.state.againInput) // 再次输入密码
    if(!reg) { // 密码格式不对
      this.setState({
        errPassAgain: this.intl.get("login-passRule")
      })
      return
    }
    if(this.state.passInput && (this.state.againInput !== this.state.passInput)) { // 两次密码不一致
      this.setState({
        errPassAgain: this.intl.get("user-checkAgainPwd")
      })
    }
    if (reg && (this.state.againInput === this.state.passInput)) { // 两次密码一致
      this.state.errPassAgain && (this.setState({errPassAgain: ""}))
    }
  }

  canClick() { // 能否点击
    if (this.state.errPassAgain || this.state.errPass) return false
    if (this.state.userInput && this.state.verifyInput && this.state.passInput && this.state.againInput && this.state.picInput) return true
    return false
  }

  componentWillMount() {

  }

  async componentDidMount() {
    await this.getCaptchaVerify()
  }

  componentWillUpdate(...parmas) {

  }

  render() {

    return (
      <div>
        <div className="find-pass-wrap-mb">
          <h1>{this.intl.get("login-findPass")}</h1>
          <ul>
            <li>
              <Input placeholder={this.intl.get("login-userInput")}
                     value={this.state.userInput}
                     onInput={value => this.changeUserInput(value)}
                     onBlur={this.checkUserInput}/>
              <em>{this.state.userInput && this.state.userErr}</em>
            </li>
            <li className="send-verify-li">
              <div className="clearfix">
                <Input placeholder={this.intl.get("login-placeholderPhoneAndEmail")} value={this.state.verifyInput} onInput={value => this.changeVerifyInput(value)}/>
                <Button className={`${(typeof this.state.verifyNum === 'number' || this.state.verifyNum === this.intl.get("sendAgain")) ? 'disabled-btn' : ''} send-code-btn`}
                        title={typeof this.state.verifyNum === 'number' && (this.state.verifyNum === 0 && this.intl.get("sendAgain") || `${this.state.verifyNum}s`) || this.state.verifyNum}
                        onClick={() => {this.getVerify(this.state.userInput, this.state.userType, 1)}}/>
              </div>
            </li>
            <li className="pass-li">
              <Input placeholder={this.intl.get("user-inputNewPwd")}
                     oriType="password"
                     value={this.state.passInput}
                     onBlur={this.checkPassInput}
                     onInput={value => this.changePassInput(value)}/>
              <em className={this.state.passTest ? 'normal-remind' : 'err-remind'}>{this.intl.get("login-passRule")}</em>
            </li>
            <li>
              <Input placeholder={this.intl.get("login-passAgainPlaceholder")}
                     oriType="password"
                     value={this.state.againInput}
                     onBlur={this.checkAgainInput}
                     onInput={value => this.changeAgainInput(value)}/>
              <em>{this.state.againInput && this.state.errPassAgain}</em>
            </li>
            <li className="send-picture-li">
              <div className="clearfix">
                <Input placeholder={this.intl.get("user-popPicturePlaceholder")} value={this.state.picInput} onInput={value => this.changePicInput(value)}/>
                <img src={this.state.captcha || ''} alt="" className="picture-btn btn" onClick={this.getCaptchaVerify} />
              </div>
            </li>
            <li className="submit-li">
              <Button title={this.intl.get("sure")}
                      className={` ${this.canClick() ? 'can-click' : ''} pass-btn`}
                      disable={this.canClick() ? false : true}
                      onClick={() => {this.forgetLoginPass(this.state.userInput, this.state.userType, this.state.verifyInput, this.state.passInput, this.state.captchaId, this.state.picInput)}}/>
            </li>
          </ul>
        </div>
        {this.state.showPopup && (
          <Popup
            type={this.state.popType}
            msg={this.state.popMsg}
            h5={true}
            onClose={() => {
              this.setState({ showPopup: false });
            }}
            autoClose = {true}
          />
        )}
      </div>
    );
  }
}