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
      popupInput1: "",
      popupInput2: "",
      popupInput3: "",
      popupInput4: "",
      popupInput5: "",
      popupInput6: "",
      errUser: "", // 新密码
      errUser2: "", // 再次输入密码
      errUser3: "", // 修改密码
      popupTypeList: [
        {
          title: this.intl.get("user-popBindEmail"),
          numTitle: this.intl.get("user-popEmail"),
          numInput: this.intl.get("user-inputEmail"),
          verifyTitle: this.intl.get("user-verifyEmail"),
          verifyInput: this.intl.get("user-inputVerifyEmail"),
          btnTitle: this.intl.get("user-popBind")
        },
        {
          title: this.intl.get("help-phone-bind"),
          numTitle: this.intl.get("phone"),
          numInput: this.intl.get("user-inputPhone"),
          verifyTitle: this.intl.get("user-verifyPhone"),
          verifyInput: this.intl.get("user-inputVerifyPhone"),
          btnTitle: this.intl.get("user-popBind")
        },
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
          verifyTitle: this.props.fundPassType === 3 ? this.intl.get("user-verifyPhone") : this.intl.get("user-verifyEmail"),
          verifyInput: this.props.fundPassType === 3 ? this.intl.get("user-inputVerifyPhone") : this.intl.get("user-inputVerifyEmail"),
          btnTitle: this.intl.get("save")},
        {
          title: this.intl.get("user-popRecoverFundPwd"),
          // numTitleNew: this.intl.get("user-currentPwd"),
          // numInputNew: this.intl.get("user-inputNowPwd"),
          numTitle: this.intl.get("user-newPwd"),
          numInput: this.intl.get("user-inputNewPwd"),
          numTitle2: this.intl.get("user-inputAgainPwd"),
          numInput2: this.intl.get("user-inputAgainPwd"),
          verifyTitle: this.props.fundPassType === 3 ? this.intl.get("user-verifyPhone") : (this.props.fundPassType === 1 ? this.intl.get("user-verifyEmail") : this.intl.get("user-popGoole")),
          verifyInput: this.props.fundPassType === 3 ? this.intl.get("user-inputVerifyPhone") : (this.props.fundPassType === 1 ? this.intl.get("user-inputVerifyEmail") : this.intl.get("user-inputVerifyGoogle")),
          btnTitle: this.intl.get("save")
        },
      ]
    }
    this.changeInput1 = this.changeInput1.bind(this)
    this.changeInput2 = this.changeInput2.bind(this)
    this.changeInput3 = this.changeInput3.bind(this)
    this.changeInput4 = this.changeInput4.bind(this)
    this.changeInput5 = this.changeInput5.bind(this)
    this.changeInput6 = this.changeInput6.bind(this)
    // 校验部分
    this.checkInput1 = this.checkInput1.bind(this)
    this.checkInput2 = this.checkInput2.bind(this)
    this.checkInput3 = this.checkInput3.bind(this)
  }
  changeInput1(value) { // 输入
    this.setState({popupInput1: value});
    // console.log(1, value)
    this.state.errUser3 && (this.setState({errUser3: ""}))
  }
  changeInput2(value) { // 输入
    this.setState({popupInput2: value});
    // console.log(2, value)
    this.state.errUser && (this.setState({errUser: ""}))
  }
  changeInput3(value) {
    this.setState({popupInput3: value});
    // console.log(3, value)
    this.state.errUser2 && (this.setState({errUser2: ""}))
  }
  changeInput4(value) {
    this.setState({popupInput4: value});
    // console.log(4, value)
  }
  changeInput5(value) {
    this.setState({popupInput5: value});
    // console.log(5, value)
  }
  changeInput6(value) {
    this.setState({popupInput6: value});
    // console.log(6, value)
  }

  // 检验部分
  checkInput1() {
    let reg1 = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, // 邮箱
        reg2 = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,18}$/ // 密码
    if (this.props.isType === 4) { // 验证密码
      if(!reg2.test(this.state.popupInput1)) {
        this.setState({
          errUser3: this.intl.get("user-checkNewPwd")
        })
      }
    }
  }

  checkInput2() { // 离开
    let reg1 = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, // 邮箱
        reg2 = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,18}$/, // 密码
        reg3 = /^1[3456789]\d{9}$/ // 手机
    if (this.props.isType === 1) { // 验证邮箱
      if(!reg1.test(this.state.popupInput2)) {
        this.setState({
          errUser: this.intl.get("user-checkEmail")
        })
      }
    }
    if (this.props.isType === 2) { // 验证手机
      if(!reg3.test(this.state.popupInput2)) {
        this.setState({
          errUser: this.intl.get("user-checkPhone")
        })
      }
    }
    if ([3, 4, 5, 6].includes(this.props.isType)) { // 验证密码
      if(!reg2.test(this.state.popupInput2)) {
        this.setState({
          errUser: this.intl.get("user-checkNewPwd")
        })
      }
    }
  }

  checkInput3() { // 离开
    if ([3, 4, 5, 6].includes(this.props.isType)) { // 再次输入密码
      if(this.state.popupInput3 && (this.state.popupInput3 !== this.state.popupInput2)) {
        this.setState({
          errUser2: this.intl.get("user-checkAgainPwd")
        })
      }
    }
  }

  canClick() {
    if (this.state.errUser || this.state.errUser2 || this.state.errUser3) return false
    if ((this.props.isType === 1 || this.props.isType === 2) && this.state.popupInput2 && this.state.popupInput4 && this.state.popupInput5) return true // 绑定
    if (this.props.isType === 3 && this.state.popupInput2 && this.state.popupInput3) return true // 设置登录密码
    if (this.props.isType === 4 && this.state.popupInput1 && this.state.popupInput2 && this.state.popupInput3) return true // 修改登录密码
    if (this.props.isType === 5 && this.state.popupInput2 && this.state.popupInput3 && this.state.popupInput4 && this.state.popupInput5) return true // 设置资金密码
    if (this.props.isType === 6 && this.state.popupInput2 && this.state.popupInput3 && this.state.popupInput4 && (this.state.popupInput5 || this.state.popupInput6)) return true // 修改资金密码
    return false
  }

  componentWillUnmount() {
    this.props.destroy && this.props.destroy();
  }

  render() {
    // console.log(222, this.props.isType, this.props.fundPassType)
    let regEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, regPhone = /^1[3456789]\d{9}$/ // 邮箱/手机
    return (
      <div className="pass-wrap">
        <div className="pass-info">
          <img src={this.$imagesMap.$guanbi_hei} alt="" className="close-popup" onClick={() => {this.props.onClose && this.props.onClose()}}/>
          <h1 className="pop-title">{this.props.isType && this.state.popupTypeList[this.props.isType - 1].title}</h1>
          <div className="clearfix">
            <ul>
              <li className={[4].includes(this.props.isType) ? 'long-li' : 'hide'}>
                <p>{this.props.isType && this.state.popupTypeList[this.props.isType - 1].numTitleNew}</p>
                <Input placeholder={this.props.isType && this.state.popupTypeList[this.props.isType - 1].numInputNew}
                       value={this.state.popupInput1}
                       oriType={[4].includes(this.props.isType) ? 'password' : 'text'}
                       onInput={value => this.changeInput1(value)}
                       onBlur={this.checkInput1}/>
                <em>{this.state.errUser3}</em>
              </li>
              <li className="long-li">
                <p>{this.props.isType && this.state.popupTypeList[this.props.isType - 1].numTitle}</p>
                <Input placeholder={this.props.isType && this.state.popupTypeList[this.props.isType - 1].numInput}
                       value={this.state.popupInput2}
                       onInput={value => this.changeInput2(value)}
                       oriType={[3, 4, 5, 6].includes(this.props.isType) ? 'password' : 'text'}
                       onBlur={this.checkInput2}/>
                <em>{this.props.popupInputErr2 || this.state.errUser}</em>
              </li>
              <li className={[3, 4, 5, 6].includes(this.props.isType) ? 'long-li' : 'hide'}>
                <p>{this.props.isType && this.state.popupTypeList[this.props.isType - 1].numTitle2}</p>
                <Input placeholder={this.props.isType && this.state.popupTypeList[this.props.isType - 1].numInput2}
                       value={this.state.popupInput3}
                       onInput={value => this.changeInput3(value)}
                       oriType={[3, 4, 5, 6].includes(this.props.isType) ? 'password' : 'text'}
                       onBlur={this.checkInput3}/>
                <em>{this.state.errUser2}</em>
              </li>
              <li className={[3, 4].includes(this.props.isType) ? 'hide' : ''}>
                <p>{this.intl.get("user-popPicture")}</p>
                <div className="clearfix pass-btn-group">
                  <Input placeholder={this.intl.get("user-popPicturePlaceholder")}  value={this.state.popupInput4} onInput={value => this.changeInput4(value)}/>
                  <img src={this.props.captcha || ''} alt="" className="picture-btn btn" onClick={this.props.getCaptcha}/>
                </div>
              </li>
              <li className={([3, 4].includes(this.props.isType) || (this.props.isType === 6 && this.props.fundPassType === 2)) ? 'hide' : ''}>
                <p>{this.props.isType && this.state.popupTypeList[this.props.isType - 1].verifyTitle}</p>
                <div className="clearfix pass-btn-group">
                  <Input placeholder={this.props.isType && this.state.popupTypeList[this.props.isType - 1].verifyInput} value={this.state.popupInput5} onInput={value => this.changeInput5(value)}/>
                  {this.props.isType === 1 && <Button title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && this.intl.get("sendAgain") || `${this.props.verifyNum}s`) || this.props.verifyNum} className="verify-btn btn" onClick={() => {regEmail.test(this.state.popupInput2) && this.props.getVerify(this.state.popupInput2, 1, 3)}}/>}
                  {this.props.isType === 2 && <Button title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && this.intl.get("sendAgain") || `${this.props.verifyNum}s`) || this.props.verifyNum} className="verify-btn btn" onClick={() => {regPhone.test(this.state.popupInput2) && this.props.getVerify(this.state.popupInput2, 0, 3)}}/>}
                  {[5, 6].includes(this.props.isType) && <Button title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && this.intl.get("sendAgain") || `${this.props.verifyNum}s`) || this.props.verifyNum} className="verify-btn btn" onClick={() => {this.props.getVerify(this.props.fundPassType === 3 ? this.props.phone : this.props.email, this.props.fundPassType === 3 ? 0 : 1, this.props.isType)}}/>}
                </div>
              </li>
              <li className={this.props.isType === 6 && this.props.fundPassType === 2 ? 'long-li' : 'hide'}>
                <p>{this.intl.get("user-popGoole")}</p>
                <Input placeholder= {this.intl.get("user-inputVerifyGoogle")}
                       value={this.state.popupInput6}
                       onInput={value => this.changeInput6(value)}/>
              </li>
              <li className={[3, 5].includes(this.props.isType) ? 'remind-pass-li' : 'hide'}>
                <p>{this.intl.get("user-popPwdRule")}</p>
              </li>
              <li className={[4, 6].includes(this.props.isType) ? 'remind-pass-li' : 'hide'}>
                <p>{this.intl.get("user-popPwdRule")}</p>
                <p>{this.intl.get("user-popFundRule")}</p>
              </li>
              <li className={[2].includes(this.props.isType) ? 'remind-pass-li' : 'hide'}>
                <p>*{this.intl.get("user-supportPhone")}</p>
              </li>
              <li>
                {this.props.isType === 1 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("user-popBind")} onClick={() => this.props.bindUser(this.state.popupInput2, 1, this.state.popupInput5, this.props.captchaId, this.state.popupInput4)}/>}
                {this.props.isType === 2 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("user-popBind")} onClick={() => this.props.bindUser(this.state.popupInput2, 0, this.state.popupInput5, this.props.captchaId, this.state.popupInput4)}/>}
                {this.props.isType === 3 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("set")} onClick={() => this.props.setLoginPass('', this.state.popupInput2, 0)}/>}
                {this.props.isType === 4 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("alter")} onClick={() => this.props.setLoginPass(this.state.popupInput1, this.state.popupInput2, 1)}/>}
                {this.props.isType === 5 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("save")}
                                                    onClick={() => this.props.modifyFundPwd(this.props.fundPassType === 3 ? this.props.phone : this.props.email,
                                                                   this.props.fundPassType === 3 ? 0 : 1,
                                                                   0,
                                                                   this.state.popupInput2,
                                                                   this.state.popupInput4,
                                                                   this.props.captchaId,
                                                                   this.state.popupInput5)}/>}
                {this.props.isType === 6 && <Button className={`${this.canClick() ? 'can-click' : ''} set-btn btn`} disable={this.canClick() ? false : true} title={this.intl.get("save")}
                                                    onClick={() => this.props.modifyFundPwd(this.props.fundPassType === 3 ? this.props.phone : (this.props.fundPassType === 1 ?this.props.email : ''),
                                                                   this.props.fundPassType === 3 ? 0 : (this.props.fundPassType === 1 ? 1 : 2),
                                                                   1,
                                                                   this.state.popupInput2,
                                                                   this.state.popupInput4,
                                                                   this.props.captchaId,
                                                                   this.props.fundPassType === 2 ? this.state.popupInput6 : this.state.popupInput5)}/>}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
