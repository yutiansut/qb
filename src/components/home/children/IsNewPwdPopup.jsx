import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'

import exchangeViewBase from "../../ExchangeViewBase";
import Button from '../../../common/component/Button/index.jsx'
import Input from '../../../common/component/Input/index.jsx'
import {Regular} from "../../../core";

export default class IsNewPwdPopup extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      popupShow: true,
      to: '/home',
      pwdValue: "",
      againPwdValue: "",
      errPwd: "",
      errAgainPwd: "",
      setPassFlag: true, // 设置／绑定防连点
    }
    const {controller} = props
    //绑定view
    controller.setView(this)
    this.changePwd =  this.changePwd.bind(this)
    this.changeAgainPwd = this.changeAgainPwd.bind(this)
    this.checkPwd = this.checkPwd.bind(this)
    this.checkAgainPwd = this.checkAgainPwd.bind(this)
    this.setLoginPass = controller.setLoginPass.bind(controller)
  }
  componentWillUnmount() {

  }

  changePwd(value) {
    this.setState({pwdValue: value});
    this.state.errPwd && (this.setState({errPwd: ""}))
  }

  changeAgainPwd(value) {
    this.setState({againPwdValue: value});
    this.state.errAgainPwd && (this.setState({errAgainPwd: ""}))
  }

  checkPwd() {
    let reg = Regular('regPwd', this.state.pwdValue) // 密码
    if(!reg) {
      this.setState({
        errPwd: this.intl.get("user-checkNewPwd")
      })
      return
    }
    if(this.state.againPwdValue && (this.state.againPwdValue !== this.state.pwdValue)) { // 两次密码不一致
      this.setState({
        errAgainPwd: this.intl.get("user-checkAgainPwd")
      })
    }
    if (reg && (this.state.againPwdValue === this.state.pwdValue)) { // 两次密码一致
      this.state.errAgainPwd && (this.setState({errAgainPwd: ""}))
    }
  }

  checkAgainPwd() {
    let reg = Regular('regPwd', this.state.againPwdValue) // 再次输入密码
    if(!reg) { // 密码格式不对
      this.setState({
        errAgainPwd: this.intl.get("user-checkNewPwd")
      })
      return
    }
    if(this.state.pwdValue && (this.state.againPwdValue !== this.state.pwdValue)) { // 两次密码不一致
      this.setState({
        errAgainPwd: this.intl.get("user-checkAgainPwd")
      })
    }
    if (reg && (this.state.againPwdValue === this.state.pwdValue)) { // 两次密码一致
      this.state.errAgainPwd && (this.setState({errAgainPwd: ""}))
    }
  }

  canClick() {
    if (this.state.errPwd || this.state.errAgainPwd) return false
    if (this.state.pwdValue && this.state.againPwdValue) return true
    return false
  }

  render() {
    return (
      <div>
        {this.state.popupShow && <div className="new-pwd-wrap">
          <div className="new-pwd-info">
            <div className="title-wrap clearfix">
              <h1>{this.intl.get("user-popSetLoginPwd")}</h1>
              <img src={this.$imagesMap.$guanbi_hei} alt="" className="close-popup" onClick={() => {this.setState({popupShow: false})}}/>
            </div>
            <ul>
              <li>
                <span>{this.intl.get("login-passInput")}</span>
                <Input placeholder={this.intl.get("pwdRule")}
                       oriType="password"
                       value={this.state.pwdValue}
                       onInput={value => this.changePwd(value)}
                       onBlur={this.checkPwd}/>
                <em>{this.state.pwdValue && this.state.errPwd}</em>
              </li>
              <li>
                <span>{this.intl.get("user-inputAgainPwd")}</span>
                <Input placeholder={this.intl.get("pwdSameAgain")}
                       oriType="password"
                       value={this.state.againPwdValue}
                       onInput={value => this.changeAgainPwd(value)}
                       onBlur={this.checkAgainPwd}/>
                <em>{this.state.againPwdValue && this.state.errAgainPwd}</em>
              </li>
              <li className="btn-li">
                <Button title={this.intl.get("sure")}
                        className={`${this.canClick() ? 'can-click' : ''}`}
                        disable={this.canClick() ? false : true}
                        onClick={() => this.setLoginPass('', this.state.pwdValue, 0)}/>
                <i onClick={() => {this.setState({popupShow: false})}}>{this.intl.get("home-setPwdJump")}</i>
              </li>
              <li><Link to="/user">{this.intl.get("home-setPwdGo")}</Link></li>
            </ul>
          </div>
        </div>}
      </div>
    )
  }
}
