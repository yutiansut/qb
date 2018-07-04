import React, {Component} from 'react';

import exchangeViewBase from "../../ExchangeViewBase";
import Button from '../../../common/component/Button/index.jsx'
import Input from '../../../common/component/Input/index.jsx'
import "../stylus/passPopup.styl"

const popupTypeList = [
  {title: '绑定邮箱', numTitle: '邮箱', numInput: '请输入邮箱账号', verifyTitle: '邮箱验证码', verifyInput: '请输入邮箱验证码', btnTitle: '绑定'},
  {title: '绑定手机', numTitle: '手机号码', numInput: '请输入手机号', verifyTitle: '手机号验证码', verifyInput: '请输入手机号验证码', btnTitle: '绑定'},
  {title: '设置登录密码', numTitle: '新密码', numInput: '请输入新密码', numTitle2: '再次输入新密码', numInput2: '请再次输入新密码', btnTitle: '设置'},
  {title: '修改登录密码', numTitleNew: '当前密码', numInputNew: '请输入当前登录密码', numTitle: '新密码', numInput: '请输入新密码', numTitle2: '再次输入新密码', numInput2: '请再次输入新密码', btnTitle: '修改'},
  {title: '设置资金密码', numTitle: '新密码', numInput: '请输入新密码', numTitle2: '再次输入密码', numInput2: '请再次输入密码', verifyTitle: '手机验证码', verifyInput: '请输入手机号验证码', btnTitle: '保存'},
  {title: '修改资金密码', numTitleNew: '当前密码', numInputNew: '请输入当前登录密码', numTitle: '新密码', numInput: '请输入新密码', numTitle2: '再次输入密码', numInput2: '请再次输入密码', verifyTitle: '手机验证码', verifyInput: '请输入手机号验证码', btnTitle: '保存'},
]

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
      errUser2: "" // 再次输入密码
    }
    this.changeInput1 = this.changeInput1.bind(this)
    this.changeInput2 = this.changeInput2.bind(this)
    this.changeInput3 = this.changeInput3.bind(this)
    this.changeInput4 = this.changeInput4.bind(this)
    this.changeInput5 = this.changeInput5.bind(this)
    this.changeInput6 = this.changeInput6.bind(this)
    this.checkInput2 = this.checkInput2.bind(this)
    this.checkInput3 = this.checkInput3.bind(this)
  }
  changeInput1(value) {
    this.setState({popupInput1: value});
    console.log(1, value)
  }
  changeInput2(value) {
    this.setState({popupInput2: value});
    console.log(2, value)
    this.props.popupInputErr2 && (this.props.clearErr2())
    this.state.errUser && (this.setState({errUser: ""}))
  }
  checkInput2() {
    let reg1 = /^\w+@[0-9a-z]{2,}(\.[a-z\u4e00-\u9fa5]{2,8}){1,2}$/,
        reg2 = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,18}$/
    if (this.props.isType === 1) { // 验证邮箱
      if(!reg1.test(this.state.popupInput2)) {
        this.setState({
          errUser: '请输入正确的邮箱'
        })
      }
    }
    if (this.props.isType === 3) { // 验证密码
      if(!reg2.test(this.state.popupInput2)) {
        this.setState({
          errUser: '请输入正确格式的密码'
        })
      }
    }
  }
  checkInput3() {
    if (this.props.isType === 3) { // 再次输入密码
      if(this.state.popupInput3 && (this.state.popupInput3 !== this.state.popupInput2)) {
        this.setState({
          errUser2: '两次密码不一致, 请重新输入'
        })
      }
    }
  }
  changeInput3(value) {
    this.setState({popupInput3: value});
    console.log(3, value)
  }
  changeInput4(value) {
    this.setState({popupInput4: value});
    console.log(4, value)
  }
  changeInput5(value) {
    this.setState({popupInput5: value});
    console.log(5, value)
  }
  changeInput6(value) {
    this.setState({popupInput6: value});
    console.log(6, value)
  }
  render() {
    return (
      <div className="pass-wrap" style={{display: this.props.isSet}}>
        <div className="pass-info">
          <img src="/static/img/guanbi_hei.svg" alt="" className="close-popup" onClick={() => {this.props.changeSetPopup('none')}}/>
          <h1 className="pop-title">{this.props.isType && popupTypeList[this.props.isType - 1].title}</h1>
          <div className="clearfix">
            <ul>
              <li className={[4, 6].includes(this.props.isType) ? 'long-li' : 'hide'}>
                <p>{this.props.isType && popupTypeList[this.props.isType - 1].numTitleNew}</p>
                <Input placeholder={this.props.isType && popupTypeList[this.props.isType - 1].numInputNew}
                       value={this.state.popupInput1}
                       oriType={[4, 6].includes(this.props.isType) ? 'password' : 'text'}
                       onInput={value => this.changeInput1(value)}/>
              </li>
              <li className="long-li">
                <p>{this.props.isType && popupTypeList[this.props.isType - 1].numTitle}</p>
                <Input placeholder={this.props.isType && popupTypeList[this.props.isType - 1].numInput}
                       value={this.state.popupInput2}
                       onInput={value => this.changeInput2(value)}
                       oriType={[3, 4, 5, 6].includes(this.props.isType) ? 'password' : 'text'}
                       onBlur={this.checkInput2}/>
                <em>{this.props.popupInputErr2 || this.state.errUser}</em>
              </li>
              <li className={[3, 4, 5, 6].includes(this.props.isType) ? 'long-li' : 'hide'}>
                <p>{this.props.isType && popupTypeList[this.props.isType - 1].numTitle2}</p>
                <Input placeholder={this.props.isType && popupTypeList[this.props.isType - 1].numInput2}
                       value={this.state.popupInput3}
                       onInput={value => this.changeInput3(value)}
                       oriType={[3, 4, 5, 6].includes(this.props.isType) ? 'password' : 'text'}
                       onBlur={this.checkInput3}/>
                <em>{this.state.errUser2}</em>
              </li>
              <li className={[3, 4].includes(this.props.isType) ? 'hide' : ''}>
                <p>图形验证码</p>
                <div className="clearfix pass-btn-group">
                  <Input placeholder="请输入右侧图形验证码"  value={this.state.popupInput4} onInput={value => this.changeInput4(value)}/>
                  <img src={this.props.captcha || ''} alt="" className="picture-btn btn" onClick={this.props.getCaptcha}/>
                </div>
              </li>
              <li className={([3, 4].includes(this.props.isType) || this.props.fundPassType === 2) ? 'hide' : ''}>
                <p>{this.props.isType && popupTypeList[this.props.isType - 1].verifyTitle}</p>
                <div className="clearfix pass-btn-group">
                  <Input placeholder={this.props.isType && popupTypeList[this.props.isType - 1].verifyInput} value={this.state.popupInput5} onInput={value => this.changeInput5(value)}/>
                  {this.props.isType === 1 && <Button title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && '重新获取' || `${this.props.verifyNum}s`) || this.props.verifyNum} className="verify-btn btn" onClick={() => {this.props.getVerify(this.state.popupInput2, 1, 3)}}/>}
                  {this.props.isType === 2 && <Button title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && '重新获取' || `${this.props.verifyNum}s`) || this.props.verifyNum} className="verify-btn btn" onClick={() => {this.props.getVerify(this.state.popupInput2, 0, 3)}}/>}
                  {[5, 6].includes(this.props.isType) && <Button title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && '重新获取' || `${this.props.verifyNum}s`) || this.props.verifyNum} className="verify-btn btn" onClick={() => {this.props.getVerify(this.props.fundPassType === 3 ? this.props.phone : this.props.email, this.props.fundPassType === 3 ? 0 : 1, 5)}}/>}
                </div>
              </li>
              <li className={this.props.fundPassType === 2 ? 'long-li' : 'hide'}>
                <p>谷歌验证码</p>
                <Input placeholder= "请输入谷歌验证码"
                       value={this.state.popupInput6}
                       onInput={value => this.changeInput6(value)}/>
              </li>
              <li className={[3, 4].includes(this.props.isType) ? 'remind-pass-li' : 'hide'}>
                <p>*新密码必须是 6 位以上英文字母、数字或符号，不能纯数字或纯字母</p>
                <p>*出于安全方面的考虑，修改密码后，你的账户将在 24 小时内无法提现</p>
              </li>
              <li>
                {this.props.isType === 1 && <Button className="set-btn btn" title="绑定" onClick={() => this.props.bindUser(this.state.popupInput2, 1, this.state.popupInput5, this.props.captchaId, this.state.popupInput4)}/>}
                {this.props.isType === 2 && <Button className="set-btn btn" title="绑定" onClick={() => this.props.bindUser(this.state.popupInput2, 0, this.state.popupInput5, this.props.captchaId, this.state.popupInput4)}/>}
                {this.props.isType === 3 && <Button className="set-btn btn" title="设置" onClick={() => this.props.setLoginPass('', this.state.popupInput2, 0)}/>}
                {this.props.isType === 4 && <Button className="set-btn btn" title="修改" onClick={() => this.props.setLoginPass(this.state.popupInput1, this.state.popupInput2, 1)}/>}
                {this.props.isType === 5 && <Button className="set-btn btn" title="保存" onClick={() => this.props.setFundPass(this.props.fundPassType === 3 ? this.props.phone : this.props.email, this.props.fundPassType === 3 ? 0 : 1, this.state.popupInput2, this.state.popupInput4, this.props.captchaId, this.state.popupInput5)}/>}
                {this.props.isType === 6 && <Button className="set-btn btn" title="保存" onClick={() => this.props.modifyFundPwd(this.props.phone ? this.props.phone : this.props.email, this.props.phone ? 0 : 1, this.state.popupInput2, this.state.popupInput4, this.props.captchaId, this.state.popupInput5)}/>}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
