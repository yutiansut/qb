import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import ExchangeViewBase from "../../../components/ExchangeViewBase";
import Button from '../../../common/component/Button/index.jsx'
import Input from '../../../common/component/Input/index.jsx'
import RemindPopup from '../../../common/component/Popup/index.jsx'

import {AsyncAll, Regular} from "../../../core";

export default class SetPwd extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      to: "/user/safe",
      currentPwdValue: "", // 当前密码输入框
      userValue: "", // 手机号／邮箱／新密码输入框
      againPwdValue: "", // 再次输入密码输入框
      pictureValue: "", // 图形验证码输入框
      verifyValue: "", // 短信／邮箱验证码输入框
      googleValue: "", // 谷歌验证码输入框
      errUser: "", // 新密码/手机／邮箱
      errAgainPwd: "", // 再次输入密码
      errCurrentPwd: "", // 修改密码
      isType: 0, // 判断来源
      verifyNum: this.intl.get("sendCode"),
      remindPopup: false,
      popType: "tip1",
      popMsg: "",
      inputType: true,
      popupTypeList: [
        {
          title: this.intl.get("user-popSetLoginPwd"),
          numTitle: this.intl.get("user-newPwd"),
          numInput: this.intl.get("user-inputNewPwd"),
          numTitle2: this.intl.get("user-inputAgainPwd"),
          numInput2: this.intl.get("user-inputAgainPwd"),
          btnTitle: this.intl.get("set")
        },
        {
          title: this.intl.get("user-popRecoverLoginPwd"),
          numTitleNew: this.intl.get("user-currentPwd"),
          numInputNew: this.intl.get("user-inputNowPwd"),
          numTitle: this.intl.get("user-newPwd"),
          numInput: this.intl.get("user-inputNewPwd"),
          numTitle2: this.intl.get("user-inputAgainPwd"),
          numInput2: this.intl.get("user-inputAgainPwd"),
          btnTitle: this.intl.get("alter")
        },
        {
          title: this.intl.get("user-popSetFundPwd"),
          numTitle: this.intl.get("user-newPwd"),
          numInput: this.intl.get("user-inputNewPwd"),
          numTitle2: this.intl.get("user-inputAgainPwd"),
          numInput2: this.intl.get("user-inputAgainPwd"),
          verifyTitle: "",
          verifyInput: "",
          btnTitle: this.intl.get("save")},
        {
          title: this.intl.get("user-popRecoverFundPwd"),
          numTitle: this.intl.get("user-newPwd"),
          numInput: this.intl.get("user-inputNewPwd"),
          numTitle2: this.intl.get("user-inputAgainPwd"),
          numInput2: this.intl.get("user-inputAgainPwd"),
          verifyTitle: "",
          verifyInput: "",
          btnTitle: this.intl.get("save")
        },
      ],
      setPassFlag: true,
    }
    const {controller,history} = props;
    this.history = history;
    //绑定view
    controller.setView(this)
    this.getVerify = controller.getVerify.bind(controller) // 发送短信验证码
    this.setLoginPass = controller.setLoginPass.bind(controller) // 设置登录密码
    this.modifyFundPwd = controller.modifyFundPwd.bind(controller) // 设置修改资金密码
    this.getCaptcha = controller.getCaptchaVerify.bind(controller) // 获取图形验证码
    this.initData = controller.initData.bind(controller) // 获取基本数据
    this.destroy = controller.clearVerify.bind(controller); // 清除定时器

    this.eyeChange = this.eyeChange.bind(this)
    // this.changeCurrentPwd = this.changeCurrentPwd.bind(this) // 当前密码输入框
    this.changeUser = this.changeUser.bind(this) // 手机号／邮箱／新密码输入框
    this.changeAgainPwd = this.changeAgainPwd.bind(this) // 再次输入密码
    this.changePicture = this.changePicture.bind(this) // 输入图形验证码
    this.changeVerify = this.changeVerify.bind(this) // 输入验证码
    this.changeGoogle = this.changeGoogle.bind(this) // 输入谷歌验证码
    // 校验部分
    this.checkCurrentPwd = this.checkCurrentPwd.bind(this)
    this.checkUser = this.checkUser.bind(this)
    this.checkAgainPwd = this.checkAgainPwd.bind(this)
  }
  // changeCurrentPwd(value) { // 输入
  //   this.setState({currentPwdValue: value});
  //   // console.log(1, value)
  //   this.state.errCurrentPwd && (this.setState({errCurrentPwd: ""}))
  // }
  changeUser(value) { // 输入
    this.setState({userValue: value});
    // console.log(2, value)
    this.state.errUser && (this.setState({errUser: ""}))
  }
  changeAgainPwd(value) {
    this.setState({againPwdValue: value});
    // console.log(3, value)
    this.state.errAgainPwd && (this.setState({errAgainPwd: ""}))
  }
  changePicture(value) {
    this.setState({pictureValue: value});
    // console.log(4, value)
  }
  changeVerify(value) {
    this.setState({verifyValue: value});
    // console.log(5, value)
  }
  changeGoogle(value) {
    this.setState({googleValue: value});
    // console.log(6, value)
  }

  // 检验部分
  checkCurrentPwd() { // 检验当前密码
    let reg = Regular('regPwd', this.state.currentPwdValue)
    if (this.state.isType === 2) {
      if(!reg) {
        this.setState({
          errCurrentPwd: this.intl.get("user-checkNewPwd")
        })
      }
    }
  }

  checkUser() { // 离开
    let reg = Regular('regPwd', this.state.userValue) // 密码
    if(!reg) {
      this.setState({
        errUser: this.intl.get("user-checkNewPwd")
      })
    }
    if(this.state.againPwdValue && (this.state.userValue !== this.state.againPwdValue)) {
      this.setState({
        errAgainPwd: this.intl.get("user-checkAgainPwd")
      })
    }
    if (reg && (this.state.againPwdValue === this.state.userValue)) {
      this.state.errAgainPwd && (this.setState({errAgainPwd: ""}))
    }
  }


  checkAgainPwd() { // 离开
    let reg = Regular('regPwd', this.state.againPwdValue) // 密码
    if(!reg) {
      this.setState({
        errAgainPwd: this.intl.get("user-checkNewPwd")
      })
      return
    }
    if(this.state.userValue && (this.state.againPwdValue !== this.state.userValue)) {
      this.setState({
        errAgainPwd: this.intl.get("user-checkAgainPwd")
      })
    }
    if (reg && (this.state.againPwdValue === this.state.userValue)) {
      this.state.errAgainPwd && (this.setState({errAgainPwd: ""}))
    }
  }

  eyeChange() { // 点击眼睛变化
    let eyechangeShow = this.props.controller.headerController.view.state.eyeChangeShow
    this.props.controller.headerController.changeHeaderEye()
    this.setState({
      inputType: !eyechangeShow
    })
  }

  canClick() {
    if (this.state.errUser || this.state.errAgainPwd || this.state.errCurrentPwd) return false
    if (this.state.isType === 1 && this.state.userValue && this.state.againPwdValue) return true // 设置登录密码
    if (this.state.isType === 2 && this.state.currentPwdValue && this.state.userValue && this.state.againPwdValue) return true // 修改登录密码
    if (this.state.isType === 3 && this.state.userValue && this.state.againPwdValue && this.state.pictureValue && this.state.verifyValue) return true // 设置资金密码
    if (this.state.isType === 4 && this.state.userValue && this.state.againPwdValue && this.state.pictureValue && this.state.verifyValue) return true // 修改资金密码
    return false
  }


  componentWillMount() {
    let url = window.location.search, str1, str2;
    str1 = url.split('?')
    str2 = str1[1].split('=')
    this.setState({
      isType: str2[1] * 1
    })
  }

  async componentDidMount() {
    // this.state.userInfo.fundPassVerify === 3 ? '手机验证码' : '邮箱验证码'
    // verifyTitle: this.state.userInfo.fundPassVerify === 3 ? '手机验证码' : '邮箱验证码',
    // verifyInput: this.state.userInfo.fundPassVerify === 3 ? '请输入手机号验证码' : '请输入邮箱验证码',
    // verifyTitle: this.state.userInfo.fundPassVerify === 3 ? '手机验证码' : (this.state.userInfo.fundPassVerify === 1 ?' 邮箱验证码' : '谷歌验证码'),
    //   verifyInput: this.state.userInfo.fundPassVerify === 3 ? '请输入手机验证码' : (this.state.userInfo.fundPassVerify === 1 ?' 请输入邮箱验证码' : '请输入谷歌验证码'),
    await AsyncAll([this.initData(), this.getCaptcha()])
    let popupTypeList = this.state.popupTypeList
    this.props.addContent({con: this.state.popupTypeList[this.state.isType - 1].title, navBtn: false, eye: true, selectFn: this.eyeChange})
    popupTypeList[2].verifyTitle =  this.state.userInfo.fundPassVerify === 3 ? this.intl.get("user-verifyPhone") : this.intl.get("user-verifyEmail");
    popupTypeList[2].verifyInput =  this.state.userInfo.fundPassVerify === 3 ? this.intl.get("user-inputVerifyPhone") : this.intl.get("user-inputVerifyEmail");
    popupTypeList[3].verifyTitle =  this.state.userInfo.fundPassVerify === 3 ? this.intl.get("user-verifyPhone") : (this.state.userInfo.fundPassVerify === 1 ? this.intl.get("user-verifyEmail") : this.intl.get("user-popGoole")),
    popupTypeList[3].verifyInput =  this.state.userInfo.fundPassVerify === 3 ? this.intl.get("user-inputVerifyPhone") : (this.state.userInfo.fundPassVerify === 1 ? this.intl.get("user-inputVerifyEmail") : this.intl.get('user-inputVerifyGoogle')),
    this.setState({
      popupTypeList
    })
  }

  componentWillUnmount() {
    this.destroy && this.destroy();
  }

  render() {
    const {url} = this.props
    let regEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, regPhone = /^1[3456789]\d{9}$/ // 邮箱/手机
    return (
      <div className="set-pass-wrap">
        {/* <div className="safe-center-header">
          <div className="back">
            <img src="../../../../static/mobile/user/Back@3x.png"/>
            <NavLink to="/user/safe">{this.intl.get("back")}</NavLink>
            <span>{this.state.isType && this.state.popupTypeList[this.state.isType - 1].title}</span>
          </div>
        </div> */}
        <div className="pass-info">
          <div className="clearfix">
            <ul>
              <li className={[2].includes(this.state.isType) ? 'long-li' : 'hide'}>
                <p>{this.state.isType && this.state.popupTypeList[this.state.isType - 1].numTitleNew}</p>
                <Input placeholder={this.state.isType && this.state.popupTypeList[this.state.isType - 1].numInputNew}
                       value={this.state.currentPwdValue}
                       oriType={this.state.inputType ? 'password' : 'text'}
                       onBlur={this.checkCurrentPwd}/>
                <em>{this.state.errCurrentPwd}</em>
              </li>
              <li className="long-li">
                <p>{this.state.isType && this.state.popupTypeList[this.state.isType - 1].numTitle}</p>
                <Input placeholder={this.state.isType && this.state.popupTypeList[this.state.isType - 1].numInput}
                       value={this.state.userValue}
                       onInput={value => this.changeUser(value)}
                       oriType={this.state.inputType ? 'password' : 'text'}
                       onBlur={this.checkUser}/>
                <em>{this.state.userValue && (this.props.popupInputErr2 || this.state.errUser)}</em>
              </li>
              <li className='long-li'>
                <p>{this.state.isType && this.state.popupTypeList[this.state.isType - 1].numTitle2}</p>
                <Input placeholder={this.state.isType && this.state.popupTypeList[this.state.isType - 1].numInput2}
                       value={this.state.againPwdValue}
                       onInput={value => this.changeAgainPwd(value)}
                       oriType={this.state.inputType ? 'password' : 'text'}
                       onBlur={this.checkAgainPwd}/>
                <em>{this.state.againPwdValue && this.state.errAgainPwd}</em>
              </li>
              <li className={[1, 2].includes(this.state.isType) ? 'hide' : ''}>
                <p>{this.intl.get("user-popPicture")}</p>
                <div className="clearfix pass-btn-group">
                  <Input placeholder={this.intl.get("user-popPicturePlaceholder")}  value={this.state.pictureValue} onInput={value => this.changePicture(value)}/>
                  <img src={this.state.captcha || ''} alt="" className="picture-btn btn" onClick={this.getCaptcha}/>
                </div>
              </li>
              <li className={([1, 2].includes(this.state.isType) || this.state.userInfo && this.state.userInfo.fundPassVerify === 2) ? 'hide' : ''}>
                <p>{this.state.isType && this.state.popupTypeList[this.state.isType - 1].verifyTitle}</p>
                <div className="clearfix pass-btn-group">
                  <Input placeholder={this.state.isType && this.state.popupTypeList[this.state.isType - 1].verifyInput} value={this.state.verifyValue} onInput={value => this.changeVerify(value)}/>
                  {[3, 4].includes(this.state.isType) && <Button title={typeof this.state.verifyNum === 'number' && (this.state.verifyNum === 0 && this.intl.get("sendAgain") || `${this.state.verifyNum}s`) || this.state.verifyNum} className="verify-btn btn" onClick={() => {this.getVerify(this.state.userInfo.fundPassVerify === 3 ? this.state.userInfo.phone : this.state.userInfo.email, this.state.userInfo.fundPassVerify === 3 ? 0 : 1, this.state.isType+2, 4)}}/>}
                </div>
              </li>
              <li className={this.state.userInfo && this.state.userInfo.fundPassVerify === 2 ? 'long-li' : 'hide'}>
                <p>{this.intl.get("user-popGoole")}</p>
                <Input placeholder= {this.intl.get("user-inputVerifyGoogle")}
                       value={this.state.googleValue}
                       onInput={value => this.changeGoogle(value)}/>
              </li>
              <li className="submit-li">
                {this.state.isType === 1 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("set")} onClick={() => this.setLoginPass('', this.state.userValue, 0)}/>}
                {this.state.isType === 2 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("alter")} onClick={() => this.setLoginPass(this.state.currentPwdValue, this.state.userValue, 1)}/>}
                {this.state.isType === 3 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("save")}
                                                    onClick={() => this.modifyFundPwd(this.state.userInfo && this.state.userInfo.fundPassVerify === 3 ? this.state.userInfo.phone : this.state.userInfo.email,
                                                      this.state.userInfo && this.state.userInfo.fundPassVerify === 3 ? 0 : 1,
                                                      0,
                                                      this.state.userValue,
                                                      this.state.pictureValue,
                                                      this.state.captchaId,
                                                      this.state.verifyValue, 4)}/>}
                {this.state.isType === 4 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("save")}
                                                    onClick={() => this.modifyFundPwd(this.state.userInfo && this.state.userInfo.fundPassVerify === 3 ? this.state.userInfo.phone : (this.state.userInfo && this.state.userInfo.fundPassVerify === 1 ?this.state.userInfo.email : ''),
                                                      this.state.userInfo && this.state.userInfo.fundPassVerify === 3 ? 0 : (this.state.userInfo && this.state.userInfo.fundPassVerify === 1 ? 1 : 0),
                                                      1,
                                                      this.state.userValue,
                                                      this.state.pictureValue,
                                                      this.state.captchaId,
                                                      this.state.userInfo && this.state.userInfo.fundPassVerify === 2 ? this.state.googleValue : this.state.verifyValue, 4)}/>}
              </li>
              <li className={[1, 2].includes(this.state.isType) ? 'remind-pass-li' : 'hide'}>
                <p>{this.intl.get("user-popPwdRule")}</p>
                <p>{this.intl.get("user-popFundRule")}</p>
              </li>
              {[3, 4].includes(this.state.isType) && <li className="password-tip">
                <p>{this.intl.get('user-popPwdRule')}</p>
                <p>{this.intl.get('user-popPassSame')}</p>
                <p>{this.intl.get('user-popFundRule')}</p>
              </li>}
            </ul>
          </div>
        </div>
        {this.state.remindPopup && <RemindPopup
          type={this.state.popType}
          msg={this.state.popMsg}
          h5={true}
          autoClose = {true}
          onClose={() => {this.setState({ remindPopup: false });}}/>}
      </div>
    );
  }
}

