import React, {Component} from 'react';

import exchangeViewBase from "../../ExchangeViewBase";
import Button from '../../../common/component/Button/index.jsx'
import "../stylus/passPopup.styl"



export default class SetPassPopup extends exchangeViewBase {
  constructor(props) {
    super(props);
    console.log(2221, props)
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = controller.getInitState()
    console.log(3333,this.state)
    //绑定方法
    this.getVerify = controller.getVerify.bind(controller)
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
                  <Button title={typeof this.state.verifyNum === 'number' && (this.state.verifyNum === 0 && '重新获取' || `${this.state.verifyNum}s`) || this.state.verifyNum} className="verify-btn btn" onClick={this.getVerify}/>
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
