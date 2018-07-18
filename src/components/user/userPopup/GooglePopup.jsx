import React, {Component} from 'react';

import exchangeViewBase from "../../ExchangeViewBase";
import Button from '../../../common/component/Button/index.jsx'
import Input from '../../../common/component/Input/index.jsx'
import QRCode from "qrcode.react";

import "../stylus/googlePopup.styl"

export default class GooglePopup extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      codeValue: ''
    }
  }

  changeInput(value) {
    this.setState({codeValue: value});
    console.log(1, value)
  }

  async componentDidMount() {

  }

  render() {
    return (
      <div className="google-wrap">
        <div className="google-info">
          <img src="/static/img/guanbi_hei.svg" alt="" className="close-popup" onClick={() => {this.props.onClose && this.props.onClose()}}/>
          <h1 className="pop-title">{this.intl.get("user-googleStart")}</h1>
          <div className="clearfix">
            <ul>
              <li>1</li>
              <li>{this.intl.get("user-googleInstall")}: Google Authenticator</li>
              <li><Button title="App Store" className="google-btn"/></li>
              <li><Button title="Google.play" className="google-btn"/></li>
              <li>Google Authenticator on other devices</li>
            </ul>
            <ul>
              <li>2</li>
              <li>{this.intl.get("user-googleExplain1")}</li>
              <li><QRCode value={`otpauth://totp/exchange?secret= ${this.props.googleSecret || ''}`} level="M" bgColor="#D5D6D6"/></li>
              <li>{this.intl.get("user-googleExplain2")} {this.props.googleSecret}</li>
            </ul>
            <ul>
              <li>3</li>
              <li>{this.intl.get("user-googleWarnings")}:</li>
              <li>
                <i>{this.intl.get("user-googleRemind1")}</i>
                <em>{this.props.googleSecret}</em>
              </li>
              <li>{this.intl.get("user-googleRemind2")}</li>
              <li>{this.intl.get("user-googleInput")}</li>
              <li className="clearfix">
                <Input placeholder={this.intl.get("user-inputVerify")}  value={this.state.codeValue} onInput={value => this.changeInput(value)}/>
                <Button title={this.intl.get("user-submit")}
                        className={`${this.state.codeValue ? 'can-click' : 'no-click'} name-btn`}
                        onClick={() => {this.state.codeValue && this.props.setGoogleVerify(this.state.codeValue)}}/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
