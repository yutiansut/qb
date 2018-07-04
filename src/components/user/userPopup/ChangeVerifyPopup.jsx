import React, {Component} from 'react';

import exchangeViewBase from "../../ExchangeViewBase";
import Button from '../../../common/component/Button/index.jsx'
import Input from '../../../common/component/Input/index.jsx'
import "../stylus/changeVerifyPopup.styl"
// 2, 谷歌验证  1, 邮件  3, 短信  0,无      let verifyArr = [3, 1, 0, 2]
const contentList = [
  {title: '谷歌验证', inputP: '请输入谷歌验证码'},
  {title: '邮件验证', inputP: '请输入邮件验证码'},
  {title: '短信验证', inputP: '请输入短信验证码'}
]
const contentArr = [3, 1, 0, 2]
const typeArr = [2, 1, 3, 0]

export default class ChangeVerifyPopup extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      popupInput1: "",
      popupInput2: "",
      popupInput3: "",
    }
    this.changeInput1 = this.changeInput1.bind(this)
    this.changeInput2 = this.changeInput2.bind(this)
    this.changeInput3 = this.changeInput3.bind(this)
  }
  changeInput1(value) {
    this.setState({popupInput1: value});
    console.log(1, value)
  }
  changeInput2(value) {
    this.setState({popupInput2: value});
    console.log(2, value)
  }
  changeInput3(value) {
    this.setState({popupInput3: value});
    console.log(3, value)
  }
  componentWillMount() {

  }
  componentWillUpdate(props, state, next) {
  }
  render() {
    // console.log(77999, this.props.isType, this.props.isTwoVerify, contentArr[this.props.isType], this.props.sureTwoVerify)
    return (
      <div className="change-popup-wrap" style={{display: this.props.isChange}}>
        <div className="change-info">
          <img src="/static/img/guanbi_hei.svg" alt="" className="close-popup" onClick={() => {this.props.changeVerifyTypePopup('none')}}/>
          <h1 className="pop-title">{this.props.isType !== 0 && contentList[contentArr[this.props.isType]].title}</h1>
          <Input placeholder="请输入谷歌验证码" className={this.props.isType === 2 ? '' : 'hide'} value={this.state.popupInput1} onInput={value => this.changeInput1(value)}/>
          <div className={`${this.props.isType === 3 ? '' : 'hide'} clearfix picture-div`}>
            <Input placeholder="请输图形验证码" value={this.state.popupInput2} onInput={value => this.changeInput2(value)}/>
            <p><img src={this.props.captcha || ''} alt="" className="picture-btn btn" onClick={this.props.getCaptcha}/></p>
          </div>
          <div className={`${this.props.isType === 2 ? 'hide' : ''} clearfix  verify-div`}>
            <Input placeholder={this.props.isType !== 0 && contentList[contentArr[this.props.isType]].inputP || ''} value={this.state.popupInput3} onInput={value => this.changeInput3(value)}/>
            <Button className="verify-btn"
                    title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && '重新获取' || `${this.props.verifyNum}s`) || this.props.verifyNum}
                    onClick={()=>{this.props.getVerify(this.props.isType === 3 ? this.props.phone : (this.props.isType === 1 ? this.props.email : ''), this.props.isType === 3 ? 0 : (this.props.isType === 1 ? 1 : ''), 7)}}/>
          </div>
          <Button className="set-btn" title="确认" onClick={() => this.props.setTwoVerify(this.props.isType === 3 ? this.props.phone : (this.props.isType === 1 ? this.props.email : '') ,
                                                                this.props.isType === 3 ? 0 : this.props.isType,
                                                                this.state.popupInput3,
                                                                this.state.popupInput2,
                                                                this.props.captchaId,
                                                                this.props.isTwoVerify + 1,
                                                                typeArr[this.props.sureTwoVerify])}/>
        </div>
      </div>
    );
  }
}
