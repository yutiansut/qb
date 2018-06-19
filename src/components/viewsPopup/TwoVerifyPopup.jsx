import React, {Component} from 'react';

import exchangeViewBase from "../ExchangeViewBase";
import Button from '../../common/component/Button/index.jsx'
import "./viewsPopup.styl"



export default class SetPassPopup extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="view-popup-wrap" style={{display: this.props.isVerify}}>
        <div className="view-info">
          <img src="/static/img/guanbi_hei.svg" alt="" className="close-popup" onClick={() => {this.props.changeVerifyPopup('none')}}/>
          <h1>两步验证设置</h1>
          <div>
            <input type="text" placeholder="请输入邮箱／手机验证码"/>
            <Button className="verify-btn" title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && '重新获取' || `${this.props.verifyNum}s`) || this.props.verifyNum} className="verify-btn btn" onClick={this.props.getVerify}/>
          </div>
          <Button title="确认" className="set-btn"/>
        </div>
      </div>
    );
  }
}
