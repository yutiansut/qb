import React, {Component} from 'react';

import exchangeViewBase from "../../ExchangeViewBase";
import Button from '../../../common/component/Button/index.jsx'
import Input from '../../../common/component/Input/index.jsx'
import "../stylus/passPopup.styl"

const popupTypeList = [
  {title: '绑定邮箱', numTitle: '邮箱', numInput: '请输入邮箱账号', verifyTitle: '邮箱', verifyInput: '请输入邮箱验证码', btnTitle: '绑定'},
  {title: '绑定手机', numTitle: '手机号码', numInput: '请输入手机号', verifyTitle: '手机号', verifyInput: '请输入手机号验证码', btnTitle: '绑定'},
  {title: '设置登录密码', numTitle: '新密码', numInput: '请输入新密码', numTitle2: '再次输入新密码', numInput2: '请再次输入新密码', btnTitle: '设置'},
  {title: '修改登录密码', numTitleNew: '当前密码', numInputNew: '请输入当前登录密码', numTitle: '新密码', numInput: '请输入新密码', numTitle2: '再次输入新密码', numInput2: '请再次输入新密码', btnTitle: '修改'},
  {title: '设置资金密码', numTitle: '新密码', numInput: '请输入新密码', numTitle2: '再次输入密码', numInput2: '请再次输入密码', verifyTitle: '手机验证码', verifyInput: '请输入手机号验证码', btnTitle: '保存'},
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
              <li className={this.props.isType === 4 ? 'long-li' : 'hide'}>
                <p>{this.props.isType && popupTypeList[this.props.isType - 1].numTitleNew}</p>
                <Input placeholder={this.props.isType && popupTypeList[this.props.isType - 1].numInputNew}/>
              </li>
              <li className="long-li">
                <p>{this.props.isType && popupTypeList[this.props.isType - 1].numTitle}</p>
                <Input placeholder={this.props.isType && popupTypeList[this.props.isType - 1].numInput}/>
              </li>
              <li className={[3, 4, 5].includes(this.props.isType) ? 'long-li' : 'hide'}>
                <p>{this.props.isType && popupTypeList[this.props.isType - 1].numTitle2}</p>
                <Input placeholder={this.props.isType && popupTypeList[this.props.isType - 1].numInput2}/>
              </li>
              <li className={[3, 4].includes(this.props.isType) ? 'hide' : ''}>
                <p>图形验证码</p>
                <div className="clearfix pass-btn-group">
                  <Input placeholder="请输入右侧图形验证码"/>
                  <Button title="dddd" className="picture-btn btn"/>
                </div>
              </li>
              <li className={[3, 4].includes(this.props.isType) ? 'hide' : ''}>
                <p>{this.props.isType && popupTypeList[this.props.isType - 1].verifyTitle}</p>
                <div className="clearfix pass-btn-group">
                  <Input placeholder={this.props.isType && popupTypeList[this.props.isType - 1].verifyInput}/>
                  <Button title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && '重新获取' || `${this.props.verifyNum}s`) || this.props.verifyNum} className="verify-btn btn" onClick={this.props.getVerify}/>
                </div>
              </li>
              <li className={[3, 4].includes(this.props.isType) ? 'remind-pass-li' : 'hide'}>
                <p>*新密码必须是 6 位以上英文字母、数字或符号，不能纯数字或纯字母</p>
                <p>*出于安全方面的考虑，修改密码后，你的账户将在 24 小时内无法提现</p>
              </li>
              <li>
                <Button title={this.props.isType && popupTypeList[this.props.isType - 1].btnTitle} className="set-btn btn"/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
