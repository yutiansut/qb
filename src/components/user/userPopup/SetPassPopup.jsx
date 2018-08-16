import React, {Component} from 'react';

import exchangeViewBase from "../../ExchangeViewBase";
import Button from '../../../common/component/Button/index.jsx'
import Input from '../../../common/component/Input/index.jsx'
import "../stylus/passPopup.styl"
import {Regular} from '../../../core'

export default class SetPassPopup extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      currentPwdValue: "", // 当前密码输入框
      userValue: "", // 手机号／邮箱／新密码输入框
      againPwdValue: "", // 再次输入密码输入框
      pictureValue: "", // 图形验证码输入框
      verifyValue: "", // 短信／邮箱验证码输入框
      googleValue: "", // 谷歌验证码输入框
      errUser: "", // 新密码/手机／邮箱
      errAgainPwd: "", // 再次输入密码
      errCurrentPwd: "", // 修改密码
      popupTypeList: [
        { // 绑定邮箱
          title: this.intl.get("user-popBindEmail"),
          numTitle: this.intl.get("user-popEmail"),
          numInput: this.intl.get("user-inputEmail"),
          verifyTitle: this.intl.get("user-verifyEmail"),
          verifyInput: this.intl.get("user-inputVerifyEmail"),
          btnTitle: this.intl.get("user-popBind")
        },
        { // 绑定手机
          title: this.intl.get("help-phone-bind"),
          numTitle: this.intl.get("phone"),
          numInput: this.intl.get("user-inputPhone"),
          verifyTitle: this.intl.get("user-verifyPhone"),
          verifyInput: this.intl.get("user-inputVerifyPhone"),
          btnTitle: this.intl.get("user-popBind")
        },
        { // 设置密码
          title: this.intl.get("user-popSetLoginPwd"),
          numTitle: this.intl.get("user-newPwd"),
          numInput: this.intl.get("pwdRule"),
          numTitle2: this.intl.get("user-inputAgainPwd"),
          numInput2: this.intl.get("pwdSameAgain"),
          btnTitle: this.intl.get("set")
        },
        { // 修改密码
          title: this.intl.get("user-popRecoverLoginPwd"),
          numTitleNew: this.intl.get("user-currentPwd"),
          numInputNew: this.intl.get("user-inputNowPwd"),
          numTitle: this.intl.get("user-newPwd"),
          numInput: this.intl.get("pwdRule"),
          numTitle2: this.intl.get("user-inputAgainPwd"),
          numInput2: this.intl.get("pwdSameAgain"),
          btnTitle: this.intl.get("alter")
        },
        { // 设置资金密码
          title: this.intl.get("user-popSetFundPwd"),
          numTitle: this.intl.get("user-newPwd"),
          numInput: this.intl.get("fundPwdRule"),
          numTitle2: this.intl.get("user-inputAgainPwd"),
          numInput2: this.intl.get("pwdSameAgain"),
          verifyTitle: this.props.fundPassType === 3 ? this.intl.get("user-verifyPhone") : this.intl.get("user-verifyEmail"),
          verifyInput: this.props.fundPassType === 3 ? this.intl.get("user-inputVerifyPhone") : this.intl.get("user-inputVerifyEmail"),
          btnTitle: this.intl.get("save")},
        { // 修改资金密码
          title: this.intl.get("user-popRecoverFundPwd"),
          numTitle: this.intl.get("user-newPwd"),
          numInput: this.intl.get("fundPwdRule"),
          numTitle2: this.intl.get("user-inputAgainPwd"),
          numInput2: this.intl.get("pwdSameAgain"),
          verifyTitle: this.props.fundPassType === 3 ? this.intl.get("user-verifyPhone") : (this.props.fundPassType === 1 ? this.intl.get("user-verifyEmail") : this.intl.get("user-popGoole")),
          verifyInput: this.props.fundPassType === 3 ? this.intl.get("user-inputVerifyPhone") : (this.props.fundPassType === 1 ? this.intl.get("user-inputVerifyEmail") : this.intl.get("user-inputVerifyGoogle")),
          btnTitle: this.intl.get("save")
        },
        { // 解绑手机
          title: "修改手机号",
          numTitle: "新手机号",
          numInput: this.intl.get("user-inputPhone"),
          verifyTitle: this.intl.get("user-verifyPhone"),
          verifyInput: this.intl.get("user-inputVerifyPhone"),
          btnTitle: "确定"
        },
      ]
    }
    this.changeCurrentPwd = this.changeCurrentPwd.bind(this) // 当前密码输入框
    this.changeUser = this.changeUser.bind(this) // 手机号／邮箱／新密码输入框
    this.changeAgainPwd = this.changeAgainPwd.bind(this) // 再次输入密码
    this.changePicture = this.changePicture.bind(this) // 输入图形验证码
    this.changeVerify = this.changeVerify.bind(this) // 输入验证码
    this.changeGoogle = this.changeGoogle.bind(this) // 输入谷歌验证码
    this.selectBtn = this.selectBtn.bind(this) // 选择button
    // 校验部分
    // this.checkCurrentPwd = this.checkCurrentPwd.bind(this)
    this.checkUser = this.checkUser.bind(this)
    this.checkAgainPwd = this.checkAgainPwd.bind(this)
  }
  changeCurrentPwd(value) { // 输入
    this.setState({currentPwdValue: value});
    // console.log(1, value)
    this.state.errCurrentPwd && (this.setState({errCurrentPwd: ""}))
  }
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
  // checkCurrentPwd() { // 检验当前密码
  //   let reg1 = Regular('regPwd', this.state.currentPwdValue)
  //   if (this.props.isType === 4) {
  //     if(!reg1) {
  //       this.setState({
  //         errCurrentPwd: this.intl.get("user-checkNewPwd")
  //       })
  //     }
  //   }
  // }

  checkUser() { // 离开
    let reg1 = Regular('regEmail', this.state.userValue), // 邮箱
        reg2 = Regular('regPwd', this.state.userValue), // 密码
        reg3 = Regular('regPhone', this.state.userValue), // 手机
        reg4 = Regular('regFundPwd', this.state.userValue) // 资金密码
    if (this.props.isType === 1) { // 验证邮箱
      if(!reg1) {
        this.setState({
          errUser: this.intl.get("user-checkEmail")
        })
      }
    }
    if (this.props.isType === 2) { // 验证手机
      if(!reg3) {
        this.setState({
          errUser: this.intl.get("user-checkPhone")
        })
      }
    }
    if ([3, 4].includes(this.props.isType)) { // 验证登录密码
      if(!reg2) {
        this.setState({
          errUser: this.intl.get("user-checkNewPwd")
        })
      }
      if(this.state.againPwdValue && (this.state.userValue !== this.state.againPwdValue)) {
        this.setState({
          errAgainPwd: this.intl.get("user-checkAgainPwd")
        })
      }
      if (reg2 && (this.state.againPwdValue === this.state.userValue)) {
        this.state.errAgainPwd && (this.setState({errAgainPwd: ""}))
      }
    }
    if ([5, 6].includes(this.props.isType)) { // 验证资金密码
      if(!reg4) {
        this.setState({
          errUser: this.intl.get("user-checkNewPwd")
        })
      }
      if(this.state.againPwdValue && (this.state.userValue !== this.state.againPwdValue)) {
        this.setState({
          errAgainPwd: this.intl.get("user-checkAgainPwd")
        })
      }
      if (reg4 && (this.state.againPwdValue === this.state.userValue)) {
        this.state.errAgainPwd && (this.setState({errAgainPwd: ""}))
      }
    }
  }

  checkAgainPwd() { // 离开
    let reg = Regular('regPwd', this.state.againPwdValue), // 密码
        reg2 = Regular('regFundPwd', this.state.userValue) // 资金密码
    if ([3, 4].includes(this.props.isType)) { // 再次输入密码
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
    if ([5, 6].includes(this.props.isType)) { // 再次输入密码
      if(!reg2) {
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
      if (reg2 && (this.state.againPwdValue === this.state.userValue)) {
        this.state.errAgainPwd && (this.setState({errAgainPwd: ""}))
      }
    }
  }

  canClick() {
    if (this.state.errUser || this.state.errAgainPwd || this.state.errCurrentPwd) return false
    if ((this.props.isType === 1 || this.props.isType === 2) && this.state.userValue && this.state.pictureValue && this.state.verifyValue) return true // 绑定
    if (this.props.isType === 3 && this.state.userValue && this.state.againPwdValue) return true // 设置登录密码
    if (this.props.isType === 4 && this.state.currentPwdValue && this.state.userValue && this.state.againPwdValue) return true // 修改登录密码
    if (this.props.isType === 5 && this.state.userValue && this.state.againPwdValue && this.state.pictureValue && this.state.verifyValue) return true // 设置资金密码
    if (this.props.isType === 6 && this.state.userValue && this.state.againPwdValue && this.state.pictureValue && (this.state.verifyValue || this.state.googleValue)) return true // 修改资金密码
    return false
  }

  selectBtn(type) { // 根据传入参数生成所需btn
    let clickType, // 选择点击事件
        userValue = this.state.userValue, // 手机号/邮箱/密码
        typeFlag = 0, // 参数类型
        verifyValue = this.state.verifyValue, // 验证码
        captchaId = this.props.captchaId, // 图形验证码Id
        pictureValue = this.state.pictureValue, // 图形验证码
        currentPwdValue = this.state.currentPwdValue, // 当前密码
        fundValue = this.props.fundPassType === 3 ? this.props.phone : (this.props.fundPassType === 1 ? this.props.email : ''), // 资金密码信息
        fundType = this.props.fundPassType === 3 ? 0 : (this.props.fundPassType === 1 ? 1 : 2), // 资金密码类型
        fundTypeValue = this.props.fundPassType === 2 ? this.state.googleValue : this.state.verifyValue; // 资金密码验证码
    if ([1, 4, 6].includes(type)) {
      typeFlag = 1
    }
    if (type === 3) {
      currentPwdValue = ''
    }
    if ([1, 2].includes(type)) {
      clickType = 0
    }
    if ([3, 4].includes(type)) {
      clickType = 1
    }
    if ([5, 6].includes(type)) {
      clickType = 2
    }
    let btnClickArr = [
      ()=>this.props.bindUser(userValue, typeFlag, verifyValue, captchaId, pictureValue),
      ()=>this.props.setLoginPass(currentPwdValue, userValue, typeFlag),
      ()=>this.props.modifyFundPwd(fundValue, fundType, typeFlag, userValue, pictureValue, captchaId, fundTypeValue)
    ]
    return (<Button title={type && this.state.popupTypeList[type - 1].btnTitle}
                    className={`${this.canClick() ? 'can-click' : ''} set-btn btn`}
                    disable={this.canClick() ? false : true}
                    onClick={() => btnClickArr[clickType]()} />)
  }

  componentWillUnmount() {
    this.props.destroy && this.props.destroy();
  }

  render() {
    // console.log(222, this.props.isType, this.props.fundPassType)
    // Regular('regEmail', this.state.userValue)
    // let regEmail = /^\w+@[0-9a-z]{2,}(\.[a-z\u4e00-\u9fa5]{2,8}){1,2}$/, regPhone = /^1[3456789]\d{9}$/ // 邮箱/手机
    return (
      <div className="pass-wrap">
        <div className="pass-info">
          <img src={this.$imagesMap.$guanbi_hei} alt="" className="close-popup" onClick={() => {this.props.onClose && this.props.onClose()}}/>
          <h1 className="pop-title">{this.props.isType && this.state.popupTypeList[this.props.isType - 1].title}</h1>
          <div className="clearfix">
            <ul>
              {/*<li className={this.props.isType === 8 ? '' : 'hide'}>*/}
                {/*<p>{this.props.isType && this.state.popupTypeList[this.props.isType - 1].numTitleNew}</p>*/}
              {/*</li>*/}
              <li className={[4].includes(this.props.isType) ? 'long-li' : 'hide'}>
                <p>{this.props.isType && this.state.popupTypeList[this.props.isType - 1].numTitleNew}</p>
                <Input placeholder={this.props.isType && this.state.popupTypeList[this.props.isType - 1].numInputNew}
                       value={this.state.currentPwdValue}
                       oriType={[4].includes(this.props.isType) ? 'password' : 'text'}
                       onInput={value => this.changeCurrentPwd(value)}/>
                <em>{this.state.currentPwdValue && this.state.errCurrentPwd}</em>
              </li>
              <li className="long-li">
                <p>{this.props.isType && this.state.popupTypeList[this.props.isType - 1].numTitle}</p>
                <Input placeholder={this.props.isType && this.state.popupTypeList[this.props.isType - 1].numInput}
                       value={this.state.userValue}
                       onInput={value => this.changeUser(value)}
                       oriType={[3, 4, 5, 6].includes(this.props.isType) ? 'password' : 'text'}
                       onBlur={this.checkUser}/>
                <em>{this.state.userValue && (this.props.popupInputErr2 || this.state.errUser)}</em>
              </li>
              <li className={[3, 4, 5, 6].includes(this.props.isType) ? 'long-li' : 'hide'}>
                <p>{this.props.isType && this.state.popupTypeList[this.props.isType - 1].numTitle2}</p>
                <Input placeholder={this.props.isType && this.state.popupTypeList[this.props.isType - 1].numInput2}
                       value={this.state.againPwdValue}
                       onInput={value => this.changeAgainPwd(value)}
                       oriType={[3, 4, 5, 6].includes(this.props.isType) ? 'password' : 'text'}
                       onBlur={this.checkAgainPwd}/>
                <em>{this.state.againPwdValue && this.state.errAgainPwd}</em>
              </li>
              <li className={[3, 4, 7].includes(this.props.isType) ? 'hide' : ''}>
                <p>{this.intl.get("user-popPicture")}</p>
                <div className="clearfix pass-btn-group">
                  <Input placeholder={this.intl.get("user-popPicturePlaceholder")}  value={this.state.pictureValue} onInput={value => this.changePicture(value)}/>
                  <img src={this.props.captcha || ''} alt="" className="picture-btn btn" onClick={this.props.getCaptcha}/>
                </div>
              </li>
              <li className={this.props.isType === 7 ? '' : 'hide'}>
                <p>{this.props.isType && this.state.popupTypeList[this.props.isType - 1].verifyTitle}</p>
                <div className="clearfix pass-btn-group">
                  <Input placeholder={this.props.isType && this.state.popupTypeList[this.props.isType - 1].verifyInput} value={this.state.verifyValue} onInput={value => this.changeVerify(value)}/>
                  <Button title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && this.intl.get("sendAgain") || `${this.props.verifyNum}s`) || this.props.verifyNum} className="verify-btn btn" onClick={() => {Regular('regEmail', this.state.userValue) && this.props.getVerify(this.state.userValue, 1, 3)}}/>
                </div>
              </li>
              <li className={([3, 4].includes(this.props.isType) || (this.props.isType === 6 && this.props.fundPassType === 2)) ? 'hide' : ''}>
                <p>{this.props.isType && this.state.popupTypeList[this.props.isType - 1].verifyTitle}</p>
                <div className="clearfix pass-btn-group">
                  <Input placeholder={this.props.isType && this.state.popupTypeList[this.props.isType - 1].verifyInput} value={this.state.verifyValue} onInput={value => this.changeVerify(value)}/>
                  {this.props.isType === 1 && <Button title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && this.intl.get("sendAgain") || `${this.props.verifyNum}s`) || this.props.verifyNum} className="verify-btn btn" onClick={() => {Regular('regEmail', this.state.userValue) && this.props.getVerify(this.state.userValue, 1, 3)}}/>}
                  {[2, 7].includes(this.props.isType) && <Button title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && this.intl.get("sendAgain") || `${this.props.verifyNum}s`) || this.props.verifyNum} className="verify-btn btn" onClick={() => {Regular('regPhone', this.state.userValue) && this.props.getVerify(this.state.userValue, 0, 3)}}/>}
                  {[5, 6].includes(this.props.isType) && <Button title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && this.intl.get("sendAgain") || `${this.props.verifyNum}s`) || this.props.verifyNum} className="verify-btn btn" onClick={() => {this.props.getVerify(this.props.fundPassType === 3 ? this.props.phone : this.props.email, this.props.fundPassType === 3 ? 0 : 1, this.props.isType)}}/>}
                </div>
              </li>
              <li className={(this.props.isType === 6 && this.props.fundPassType === 2) || this.props.isType === 7 ? 'long-li' : 'hide'}>
                <p>{this.intl.get("user-popGoole")}</p>
                <Input placeholder= {this.intl.get("user-inputVerifyGoogle")}
                       value={this.state.googleValue}
                       onInput={value => this.changeGoogle(value)}/>
              </li>
              <li className={[4, 6].includes(this.props.isType) ? 'remind-pass-li' : 'hide'}>
                <p>{this.intl.get("user-popFundRule")}</p>
              </li>
              <li className={[2].includes(this.props.isType) ? 'remind-pass-li' : 'hide'}>
                <p>*{this.intl.get("user-supportPhone")}</p>
              </li>
              {/*<li>*/}
                {/*{this.props.isType === 1 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("user-popBind")} onClick={() => this.props.bindUser(this.state.userValue, 1, this.state.verifyValue, this.props.captchaId, this.state.pictureValue)}/>}*/}
                {/*{this.props.isType === 2 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("user-popBind")} onClick={() => this.props.bindUser(this.state.userValue, 0, this.state.verifyValue, this.props.captchaId, this.state.pictureValue)}/>}*/}
                {/*{this.props.isType === 3 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("set")} onClick={() => this.props.setLoginPass('', this.state.userValue, 0)}/>}*/}
                {/*{this.props.isType === 4 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("alter")} onClick={() => this.props.setLoginPass(this.state.currentPwdValue, this.state.userValue, 1)}/>}*/}
                {/*{this.props.isType === 5 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("save")}*/}
                                                    {/*onClick={() => this.props.modifyFundPwd(this.props.fundPassType === 3 ? this.props.phone : this.props.email,*/}
                                                                   {/*this.props.fundPassType === 3 ? 0 : 1,*/}
                                                                   {/*0,*/}
                                                                   {/*this.state.userValue,*/}
                                                                   {/*this.state.pictureValue,*/}
                                                                   {/*this.props.captchaId,*/}
                                                                   {/*this.state.verifyValue)}/>}*/}
                {/*{this.props.isType === 6 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("save")}*/}
                                                    {/*onClick={() => this.props.modifyFundPwd(this.props.fundPassType === 3 ? this.props.phone : (this.props.fundPassType === 1 ? this.props.email : ''),*/}
                                                                   {/*this.props.fundPassType === 3 ? 0 : (this.props.fundPassType === 1 ? 1 : 2),*/}
                                                                   {/*1,*/}
                                                                   {/*this.state.userValue,*/}
                                                                   {/*this.state.pictureValue,*/}
                                                                   {/*this.props.captchaId,*/}
                                                                   {/*this.props.fundPassType === 2 ? this.state.googleValue : this.state.verifyValue)}/>}*/}
              {/*</li>*/}
              <li>{this.selectBtn(this.props.isType)}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
