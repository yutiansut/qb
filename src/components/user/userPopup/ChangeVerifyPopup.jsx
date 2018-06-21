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


export default class ChangeVerifyPopup extends exchangeViewBase {
  constructor(props) {
    super(props);
  }
  componentWillMount() {

  }
  componentWillUpdate(props, state, next) {
    // console.log(77999, this.props.isType, contentArr[this.props.isType])
  }
  render() {
    return (
      <div className="change-popup-wrap" style={{display: this.props.isChange}}>
        <div className="change-info">
          <img src="/static/img/guanbi_hei.svg" alt="" className="close-popup" onClick={() => {this.props.changeVerifyTypePopup('none')}}/>
          <h1>{this.props.isType !== 0 && contentList[2].title}</h1>
          <Input placeholder="请输入谷歌验证码" className={this.props.isType === 2 ? '' : 'hide'}/>
          <div className={`${this.props.isType === 3 ? '' : 'hide'} clearfix picture-div`}>
            <Input placeholder="请输图形验证码"/>
            <p>fffd</p>
          </div>
          <div className={`${this.props.isType === 2 ? 'hide' : ''} clearfix  verify-div`}>
            <Input placeholder={this.props.isType !== 0 && contentList[2].inputP || ''}/>
            <Button className="verify-btn"
                    title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && '重新获取' || `${this.props.verifyNum}s`) || this.props.verifyNum}
                    onClick={this.props.getVerify}/>
          </div>
          <Button title="确认" className="set-btn"/>
        </div>
      </div>
    );
  }
}
