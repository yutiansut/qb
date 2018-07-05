import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import exchangeViewBase from '../../../components/ExchangeViewBase'
import "../stylus/integration.styl"

export default class userIntegration extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      scoreEnd: 0,
      scoreStart: 0,
      scoreIndex: 0
    }
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.initData = controller.initData.bind(controller) // 获取用户信息
    this.getUserCredits = controller.getUserCredits.bind(controller) // 获取用户积分列表
    this.getUserCreditsNum = controller.getUserCreditsNum.bind(controller) // 获取用户积分数据
  }

  componentWillMount() {

  }

  async componentDidMount() {
    await Promise.all([this.initData(), this.getUserCredits()])
  }

  componentWillUpdate(...parmas) {

  }

  render() {
    console.log('用户信息3', this.state)
    return (
      <div className="integration-wrap">
        <h1>{this.intl.get("user-score")}</h1>
        <div className="info clearfix">
          <h2>{this.intl.get("user-scoreInfo")}</h2>
          <div className="fl">
            <h3>
              <b>{this.intl.get("user-scoreLevel")}：VIP{this.state.userInfo.level}（{this.intl.get("points")}：{this.state.userInfo.credits}）</b>
              <Link to="/help/pricing">{this.intl.get("user-scoreDetail")}</Link>
            </h3>
            <ul className="clearfix">
              <li>VIP0</li>
              <li>
                <em>VIP1</em>
                <i>(10000)</i>
              </li>
              <li>
                <em>VIP2</em>
                <i>(50000)</i>
              </li>
              <li>
                <em>VIP3</em>
                <i>(100000)</i>
              </li>
              <li>
                <em>VIP4</em>
                <i>(200000)</i>
              </li>
              <li>
                <em>VIP5</em>
                <i>(500000)</i>
              </li>
              <li>MVP</li>
            </ul>
            <div className="progress-line">
              <span style={{left: `calc(1.2rem * (${this.state.scoreIndex} - 1) + ((${this.state.userInfo.credits} - ${this.state.scoreStart}) / (${this.state.scoreEnd} - ${this.state.scoreStart}) * 1.2rem))`}}>{this.state.userInfo.credits}</span>
              <p style={{width: `this.state.userInfo.credits ? 0 : calc(1.2rem * (${this.state.scoreIndex} - 1) + ((${this.state.userInfo.credits} - ${this.state.scoreStart}) / (${this.state.scoreEnd} - ${this.state.scoreStart}) * 1.2rem))`}}></p>
            </div>
          </div>
        </div>
        <div className="item clearfix">
          <h2>{this.intl.get("user-scoreHistory")}</h2>
          <div className="fl">
            <Link to="/help/pricing">{this.intl.get("user-scoreGet")}？</Link>
            <table>
              <thead>
              <tr>
                <th>{this.intl.get("user-scoreHave")}</th>
                <th>{this.intl.get("user-action")}</th>
                <th>{this.intl.get("time")}</th>
              </tr>
              </thead>
              <tbody className={this.state.userCredits.length ? '' : 'hide'}>
                {this.state.userCredits.map((v, index) => (<tr key={index}>
                  <td>+{v.gain}</td>
                  <td>{v.operation}</td>
                  <td>{v.createdTime}</td>
                </tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

}