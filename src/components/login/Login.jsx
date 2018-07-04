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
      userType: 0,
      verifyNum:"获取验证码"
    }
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getVerify = controller.getVerify.bind(controller)
    this.login = controller.login.bind(controller)
    this.getCaptchaVerify = controller.getCaptchaVerify.bind(controller)
    this.changeTitle = this.changeTitle.bind(this)
    this.changeUser = this.changeUser.bind(this)
    this.changePass = this.changePass.bind(this)
    this.changeCode = this.changeCode.bind(this)
    this.changePic = this.changePic.bind(this)
  }

  changeTitle(i) { // 登录切换
    this.setState({
      titleIndex: i
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

  componentWillMount() {
    // this.bannerSwiper()
  }

  async componentDidMount() {
    await this.getCaptchaVerify()
  }

  componentWillUpdate(...parmas) {

  }

  render() {
    // console.log('登录', this.state)
    return (
      <div className="login-wrap">
        <h1>
          {this.state.titleList.map((v, index) => (<span key={index} className={this.state.titleIndex === index ? 'active' : ''} onClick={i => this.changeTitle(index)}>{v}</span>))}
        </h1>
        <ul>
          <li>
            <Input placeholder={this.intl.get("login-userInput")} value={this.state.userInput} onInput={value => this.changeUser(value)}/>
          </li>
          <li className={`${this.state.titleIndex === 1 ? '' : 'hide'} pass-li clearfix`}>
            <Input placeholder={this.intl.get("login-passInput")} oriType="password" value={this.state.passInput} onInput={value => this.changePass(value)}/>
            <span><NavLink to="/findPass">{this.intl.get("login-forget")}</NavLink></span>
          </li>
          <li className="verify-li">
            <Input placeholder="请输入图形验证码" value={this.state.picInput} onInput={value => this.changePic(value)}/>
            <div className="picture-btn" >
              <img src={this.state.captcha || ''} alt="" onClick={this.getCaptchaVerify}/>
            </div>
            {/*<LoginVerification controller={this.props.controller}/>*/}
          </li>
          <li className={`${this.state.titleIndex === 0 ? '' : 'hide'} send-code-li clearfix`}>
            <Input placeholder="请输入邮箱／手机验证码" value={this.state.codeInput} onInput={value => this.changeCode(value)}/>
            <Button className="send-code-btn"
                    title={typeof this.state.verifyNum === 'number' && (this.state.verifyNum === 0 && '重新获取' || `${this.state.verifyNum}s`) || this.state.verifyNum}
                    onClick={()=>{this.getVerify(this.state.userInput, this.state.userType, 0)}}/>
          </li>
          <li>
            <Button title={this.intl.get("login")} className="login-btn" onClick={()=>{this.login(this.state.userInput, this.state.codeInput, this.state.userType, 0, this.state.captchaId, this.state.picInput)}}/>
          </li>
        </ul>
        <p><input type="checkbox" />{this.intl.get("login-read")}<a href="">{this.intl.get("login-readUser")}</a></p>
      </div>
    );
  }
}