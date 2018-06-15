import React, {Component} from 'react';

import exchangeViewBase from "../../ExchangeViewBase";
import Button from '../../../common/component/Button/index.jsx'
import "../stylus/passPopup.styl"


export default class GooglePopup extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pass-wrap">
        <div className="pass-info">
          <img src="/static/img/guanbi_hei.svg" alt="" className="close-popup" onClick={() => {this.props.changeGooglePopup('none')}}/>
          <h1>绑定邮箱</h1>
          <div className="clearfix">
            <ul>
              <li>
                <p>邮箱／手机号码</p>
                <input type="text" placeholder="请输入邮箱／手机号"/>
              </li>
              <li>
                <p>图形验证码</p>
                <div>
                  <input type="text" placeholder="请输入邮箱／手机号"/>
                  <Button title="dddd" className="picture-btn btn"/>
                </div>
              </li>
              <li>
                <p>邮箱／手机验证码</p>
                <div>
                  <input type="text" placeholder="请输入邮箱／手机验证码"/>
                  <Button title="获取验证码" className="verify-btn btn"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
