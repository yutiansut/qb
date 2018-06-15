import React, {Component} from 'react';

import exchangeViewBase from "../../ExchangeViewBase";
import Button from '../../../common/component/Button/index.jsx'
import "../stylus/passPopup.styl"



export default class SetPassPopup extends exchangeViewBase {
  constructor(props) {
    super(props);
    // const {controller} = props
    // //绑定view
    // controller.setView(this)
    // //初始化数据，数据来源即store里面的state
    // this.state = controller.initState
    // this.state = Object.assign(this.state, controller.initState);
    //绑定方法

  }
  componentWillMount() {
    // super.componentWillMount();
    console.log('testApp componentWillMount')
  }

  componentDidMount() {
    // super.componentDidMount();
    console.log('testApp componenDidMount')
  }



  render() {
    return (
      <div className="pass-wrap" style={{display: this.props.isSet}}>
        <div className="pass-info">
          <img src="/static/img/guanbi_hei.svg" alt="" className="close-popup" onClick={() => {this.props.changeSetPopup('none')}}/>
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
