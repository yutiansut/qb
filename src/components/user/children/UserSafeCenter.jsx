import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import exchangeViewBase from '../../../components/ExchangeViewBase'

export default class userSafeCenter extends exchangeViewBase {

  constructor(props) {
    super(props);
    // this.state = {count: 1}
    // console.log(props)
    // const {controller} = props
    // //绑定view
    // this.state = controller.setView(this)
    // // console.log(this.state)
    // //绑定方法
    // this.getData = controller.getData.bind(controller)
    // this.data =
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
        <h1>安全中心</h1>
        <div className="basic-data">
          <h2>基本资料</h2>
          <ul>
            <li>用户ID</li>
            <li>111111</li>
            <li>电子邮件</li>
            <li>绑定邮箱</li>
            <li>手机号</li>
            <li>22222</li>
            <li>用户等级</li>
            <li>333333</li>
          </ul>
        </div>
        <div className="change-pass">
          <h2>修改密码</h2>
          <ol>
            <li>登录密码</li>
            <li>设置</li>
          </ol>
          <ul>
            <li>资金密码</li>
            <li>设置</li>
            <li>设置了资金密码后，提币和提现时均需要输入，账户更安全。</li>
          </ul>
        </div>
        <div className="verify">
          <h2>两步验证</h2>
          <p>当您开启两步验证后，在进行登录、修改密码、提币、提现交易等重要操作时，必须输入某个一次性密码才能继续。</p>
          <dl>
            <dt>登录验证</dt>
            <dd>谷歌验证</dd>
            <dd>邮件</dd>
            <dd>短信</dd>
            <dd>无</dd>
          </dl>
          <dl>
            <dt>提现验证</dt>
            <dd>谷歌验证</dd>
            <dd>邮件</dd>
            <dd>短信</dd>
          </dl>
          <dl>
            <dt>修改资金密码验证</dt>
            <dd>谷歌验证</dd>
            <dd>邮件</dd>
            <dd>短信</dd>
          </dl>
        </div>
        <div className="other">其他安全设置+</div>
        <div className="other-item">
          <div className="time">
            <h2>其他设置</h2>
             <ul>
               <li>时区</li>
               <li>
                 <input type="text"/>
                 <button>保存</button>
               </li>
             </ul>
          </div>
          <div className="notify">
            <h2>通知设置</h2>
            <ul>
              <li>时登录/充值/提现到账区</li>
              <li>
                <span>邮件通知</span>
                <span>短信通知</span>
              </li>
            </ul>
          </div>
          <div className="name-list">
            <h2>IP白名单</h2>
          </div>
        </div>
      </div>
    );
  }

}