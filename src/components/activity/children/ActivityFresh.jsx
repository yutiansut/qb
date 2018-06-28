import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import exchangeViewBase from '../../../components/ExchangeViewBase'
import "../stylus/activityFresh.styl"


const ruleList = [
  '3. 同一认证用户，只可参与一次免手续费活动',
  '4. 如果已完成实名认证，并在活动期内的新用户，但是仍然扣除交易手续费，请您联系客服',
  '5. 活动到期结束后，交易手续费请参照网站公布费率标准，若有调整，以网站公告为准。',
  '6. 一经发现作弊行为，QB有权收回给您的奖励，并对账号进行相应处理',
  '7. 该活动最终解释权规QB所有'
]


export default class activityFresh extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {}
    const {controller} = props
    // 绑定view
    controller.setView(this)
    // 初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    console.log('活动', this.state)
  }

  setView(view){
    super.setView(view);
    return this.store.data
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    const questionList = [
      '您对本次活动有任何疑问，请与我们取得联系咨询：',
      `客服电话：${this.props.controller.configData.servicePhone}`,
      `客服QQ：${this.props.controller.configData.serviceQQ}`
    ]
    return (
      <div className="active-fresh-wrap">
        <div className="banner-img">
          <img src="/static/img/banner_title.svg" alt=""/>
        </div>
        <h1>即日起，新用户完成实名认证后，即可尊享0手续费交易<Link to="/trade">点我体验</Link></h1>
        <dl>
          <dt>活动规则</dt>
          <dd>1. 新用户即开通注册之日起30天内，可享受0手续费交易。<Link to="/trade">快来交易吧！</Link></dd>
          <dd>2. <span>用户需要完成实名认证后方可参与此活动</span></dd>
          {ruleList.map((v, index) => (<dd key={index}>{v}</dd>))}
        </dl>
        <ul>
          {questionList.map((v, index) => (<li key={index}>{v}</li>))}
        </ul>
        <div className="record-list">
          <p>免除手续费记录</p>
          <table>
            <thead>
              <tr>
                <td>币种</td>
                <td>数额（合计）</td>
              </tr>
            </thead>
            <tbody>
              {this.state.recordList.map((v, index) => (<tr key={index}>
                <td>{v.coin}</td>
                <td>{v.amount}</td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
