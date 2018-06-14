import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import exchangeViewBase from '../../../components/ExchangeViewBase'
import Button from '../../../common/component/Button/index.jsx'

export default class userIdentity extends exchangeViewBase {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // super.componentWillMount();
    console.log('testApp componentWillMount')
  }

  componentDidMount() {
    // super.componentDidMount();
    console.log('testApp componenDidMount')
  }

  componentWillUpdate(...parmas) {
    console.log('testApp componentWillUpdate', ...parmas)
  }


  render() {
    return (
      <div>
        <h1>身份认证</h1>
        <div className="identify-result">
          <img src="" alt="" />
          <span>未进行证件认证</span>
        </div>
        <div className="name-identify clearfix">
          <h2>实名认证</h2>
          <div className="fl">
            <span>*实名信息必须真实可靠，并与充值提现银行账户登记信息保持一致。实名信息一旦确认，不可修改。</span>
            <ul>
              <li>姓氏</li>
              <li>
                <input type="text" placeholder="输入姓氏"/>
              </li>
            </ul>
            <ul>
              <li>名字</li>
              <li>
                <input type="text" placeholder="输入名字"/>
              </li>
            </ul>
            <b>实名认证</b>
            <p>
              <i>身份证</i>
              <em>护照</em>
            </p>
            <input type="text" placeholder="请填写身份证号码"/>
          </div>
        </div>
        <div className="photo-identify clearfix">
          <h2>照片认证</h2>
          <div className="fl">
            <dl>
              <dt>证件要求</dt>
              <dd>1. 身份证照片：请按示例上传身份证正面与反面，脸部及字体必须清晰可见</dd>
              <dd>2. 护照：请按示例上传带ID的护照页正面即可，脸部及字体必须清晰可见</dd>
              <dd>3. 手持证件照：照片中请勿遮挡任何有效信息，照片中必须体现“日期及仅币荣认证使用”的纸条</dd>
              <dd>4. 图片格式：小于10M, 图片格式可为jpg、jpeg、png</dd>
            </dl>
            <dl>
              <dt>证件类型</dt>
              <dd>身份证</dd>
              <dd>护照</dd>
            </dl>
            <dl>
              <dt>上传证件照</dt>
              <dd>
                <img src="" alt=""/>
                <span>身份证正面照片</span>
              </dd>
              <dd>
                <img src="" alt=""/>
                <span>身份证反面照片</span>
              </dd>
              <dd>
                <img src="" alt=""/>
                <span>手持身份证照片</span>
              </dd>
            </dl>
            <p><input type="checkbox" />我承认提交的证件信息属于本人所有，不存在冒用、盗用他人证件的行为，因冒用、盗用他人证件造成的一切后果由本人承担</p>
            <Button title="确认提交" className="identify-btn"/>
          </div>
        </div>
      </div>
    );
  }

}