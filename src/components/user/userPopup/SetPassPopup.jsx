import React, {Component} from 'react';

import exchangeViewBase from "../../ExchangeViewBase";
import Button from '../../../common/component/Button/index.jsx'
import "../stylus/passPopup.styl"

const popupTypeList = [
  {title: '绑定邮箱', numTitle: '邮箱', numInput: '请输入邮箱账号', verifyTitle: '邮箱', verifyInput: '请输入邮箱验证码'},
  {title: '绑定手机', numTitle: '手机号码', numInput: '请输入手机号', verifyTitle: '手机号', verifyInput: '请输入手机号验证码'},
  {title: '设置密码', numTitle: '手机号码', numInput: '请输入手机号', verifyTitle: '手机号', verifyInput: '请输入手机号验证码'},
  {title: '设置资金密码', numTitle: '新密码', numInput: '请输入新密码', numTitle2: '再次输入密码', numInput2: '请再次输入密码', verifyTitle: '手机验证码', verifyInput: '请输入手机号验证码'},
]

export default class SetPassPopup extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pass-wrap" style={{display: this.props.isSet}}>
        <div className="pass-info">
          <img src="/static/img/guanbi_hei.svg" alt="" className="close-popup" onClick={() => {this.props.changeSetPopup('none')}}/>
          <h1>{this.props.isType && popupTypeList[this.props.isType - 1].title}</h1>
          <div className="clearfix">
            <ul>
              <li>
                <p>{this.props.isType && popupTypeList[this.props.isType - 1].numTitle}</p>
                <input type="text" placeholder={this.props.isType && popupTypeList[this.props.isType - 1].numInput}/>
              </li>
              <li className={this.props.isType === 4 ? '' : 'hide'}>
                <p>{this.props.isType && popupTypeList[this.props.isType - 1].numTitle2}</p>
                <input type="text" placeholder={this.props.isType && popupTypeList[this.props.isType - 1].numInput2}/>
              </li>
              <li>
                <p>图形验证码</p>
                <div>
                  <input type="text" placeholder="请输入右侧图形验证码"/>
                  <Button title="dddd" className="picture-btn btn"/>
                </div>
              </li>
              <li>
                <p>{this.props.isType && popupTypeList[this.props.isType - 1].verifyTitle}</p>
                <div>
                  <input type="text" placeholder={this.props.isType && popupTypeList[this.props.isType - 1].verifyInput}/>
                  <Button title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && '重新获取' || `${this.props.verifyNum}s`) || this.props.verifyNum} className="verify-btn btn" onClick={this.props.getVerify}/>
                </div>
              </li>
              <li>
                <Button title="绑定" className="set-btn btn"/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
