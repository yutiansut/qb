import React, {Component} from 'react';
import {
  Link
} from 'react-router-dom'

import exchangeViewBase from "../../ExchangeViewBase";
import QRCode from "qrcode.react";
import Button from '../../../common/component/Button/index.jsx'
import Input from '../../../common/component/Input/index.jsx'
import RemindPopup from "../../../common/component/Popup/index.jsx";


export default class ModifyGooglePopup extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      googleValue: "",
      verifyValue: "",
      remindPopup: false,
      tip: ""
    }
    this.changeGoogle = this.changeGoogle.bind(this)
    this.changeVerify = this.changeVerify.bind(this)
    this.copy = this.copy.bind(this)
  }

  componentWillUnmount() {

  }

  copy(el) {
    this.setState({
      remindPopup: true,
      tip: this.props.copy(el) ? 'tip1' : 'tip3',
      popMsg: this.props.copy(el) ? this.intl.get("asset-copySuccess") : this.intl.get("asset-option-failed")
    });
  }

  changeGoogle(value) {
    this.setState({googleValue: value});
  }

  changeVerify(value) {
    this.setState({verifyValue: value});
  }

  canClick() {
    if (this.state.googleValue && this.state.verifyValue) return true
    return false
  }

  render() {
    return (
      <div className="modify-google-wrap">
        <div className="modify-google-info">
          <div className="title-wrap clearfix">
            {/*{this.intl.get("user-popSetLoginPwd")}*/}
            <h1>{this.intl.get("user-modifyGoogle")}</h1>
            <img src={this.$imagesMap.$guanbi_hei} alt="" className="close-popup" onClick={() => {this.props.onClose && this.props.onClose()}}/>
          </div>
          <ul>
            <li className="copy-li">
              <QRCode value={`otpauth://totp/exchange?secret=${this.props.googleSecret || ''}`} level="M" bgColor="#D5D6D6"/>
              <p>
                <input value={this.props.googleSecret} readOnly ref="key"/>
                <b onClick={el => this.copy(this.refs.key)}>{this.intl.get("copy")}</b>
              </p>
            </li>
            <li className="new-google-li">
              <span>{this.intl.get("user-newGoogle")}</span>
              <Input value={this.state.googleValue}
                     placeholder={this.intl.get("user-inputVerifyGoogle")}
                     onInput={value => this.changeGoogle(value)}/>
            </li>
            <li className="verify-li">
              <span>{this.props.phone ? this.intl.get("user-verifySMS") : this.intl.get("user-verifyEmail")}</span>
              <div className="clearfix">
                <Input value={this.state.verifyValue}
                       placeholder={this.props.phone ? this.intl.get("user-inputVerifyPhone") : this.intl.get("user-inputVerifyEmail")}
                       onInput={value => this.changeVerify(value)}/>
                <Button className="verify-btn"
                        title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && this.intl.get("sendAgain") || `${this.props.verifyNum}s`) || this.props.verifyNum}
                        onClick={()=>{this.props.getVerify(this.props.phone ? this.props.phone : this.props.email, this.props.phone ? 0 : 1, 9)}}/>
              </div>
            </li>
            <li className="remind-li">{this.intl.get("user-modifyGoogleRemind")}</li>
            <li className="btn-li">
              <Button className={`${this.canClick() ? 'can-click' : ''}`}
                      disable={this.canClick() ? false : true}
                      title={this.intl.get("sure")}/>
            </li>
          </ul>
        </div>
        {this.state.remindPopup && (
          <RemindPopup
            type={this.state.tip}
            msg={this.state.popMsg}
            autoClose={true}
            onClose={() => {
              this.setState({ remindPopup: false });
            }}
          />
        )}
      </div>
    )
  }
}
