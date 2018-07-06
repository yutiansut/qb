import React, {Component} from 'react';
import "./forgetPass.styl"
import exchangeViewBase from "../ExchangeViewBase";
import Button from '../../common/component/Button/index.jsx'
import Input from '../../common/component/Input/index.jsx'
import Popup from '../../common/component/Popup/index.jsx'

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
      captchaId: ""

    }
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getVerify = controller.getVerify.bind(controller) // 短信验证码
    this.getCaptchaVerify = controller.getCaptchaVerify.bind(controller) // 图形验证码
    this.forgetLoginPass = controller.forgetLoginPass.bind(controller) // 图形验证码
  }

  changeUserInput(value) {
    this.setState({userInput: value});
    console.log(1, value)
    let reg = /^\w+@[0-9a-z]{2,}(\.[a-z\u4e00-\u9fa5]{2,8}){1,2}$/
    if (reg.test(value)){
      this.setState({userType: 1})
    } else {
      this.setState({userType: 0})
    }
  }

  changeVerifyInput(value) {
    this.setState({verifyInput: value});
    console.log(2, value)
  }

  changePassInput(value) {
    this.setState({passInput: value});
    console.log(3, value)
  }

  changeAgainInput(value) {
    this.setState({againInput: value});
    console.log(4, value)
  }

  changePicInput(value) {
    this.setState({picInput: value});
    console.log(5, value)
  }

  canClick() { // 能否点击
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
        <div className="find-pass-wrap">
          <h1>找回密码</h1>
          <ul>
            <li>
              <p>{this.intl.get("login-userInput")}</p>
              <Input placeholder={this.intl.get("login-userInput")} value={this.state.userInput} onInput={value => this.changeUserInput(value)}/>
            </li>
            <li className="send-verify-li">
              <p>{this.intl.get("login-code")}</p>
              <div className="clearfix">
                <Input placeholder="请输入邮箱／手机验证码" value={this.state.verifyInput} onInput={value => this.changeVerifyInput(value)}/>
                <Button className="send-code-btn"
                        title={typeof this.state.verifyNum === 'number' && (this.state.verifyNum === 0 && '重新获取' || `${this.state.verifyNum}s`) || this.state.verifyNum}
                        onClick={() => {this.getVerify(this.state.userInput, this.state.userType, 1)}}/>
              </div>
            </li>
            <li className="pass-li">
              <p>{this.intl.get("login-passInput")}</p>
              <Input placeholder="请输入密码" oriType="password" value={this.state.passInput} onInput={value => this.changePassInput(value)}/>
              <span>必须是 6-18 位英文字母、数字或符号，不能纯数字或纯字母</span>
            </li>
            <li>
              <p>再输一遍</p>
              <Input placeholder="请再输入一遍密码" oriType="password" value={this.state.againInput} onInput={value => this.changeAgainInput(value)}/>
            </li>
            <li className="send-picture-li">
              <p>图形验证码</p>
              <div className="clearfix">
                <Input placeholder="请输入图形验证码" value={this.state.picInput} onInput={value => this.changePicInput(value)}/>
                <img src={this.state.captcha || ''} alt="" className="picture-btn btn" onClick={this.getCaptchaVerify} />
              </div>
            </li>
            <li>
              <Button title="确定"
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