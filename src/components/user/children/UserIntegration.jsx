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

  checkNum(num) { // 进度条长度获取
    let scoreArr = [0, 10000, 50000, 100000, 200000, 500000, 500000000000000000], sum = 0, index = 0, start = 0, end = 0;
    if(!(scoreArr.length > 0)){
      return;
    }
    // if (num > 500000) { // 超过500000会出问题
    //   index = 6
    //   start = scoreArr[5]
    //   end = num
    //   return {checkStart: start, checkEnd: end, checkIndex: index}
    // }
    for (let i = 0; i < scoreArr.length; i++) {
      sum += scoreArr[i];
      if(sum >= num){
        index = i
        start = scoreArr[i-1]
        end = scoreArr[i]
        return {checkStart: start, checkEnd: end, checkIndex: index}
      }
    }
  }

  componentWillMount() {

  }

  async componentDidMount() {
    await Promise.all([this.initData(), this.getUserCredits(), this.getUserCreditsNum()])
    let obj = this.checkNum(this.state.userCreditsNum)
    this.setState({
      scoreEnd: obj.checkEnd,
      scoreStart: obj.checkStart,
      scoreIndex: obj.checkIndex
    })
  }

  componentWillUpdate(...parmas) {

  }

  render() {
    console.log('用户信息3', this.state)
    return (
      <div className="integration-wrap">
        <h1>{this.intl.get("user-score")}</h1>
        <div className="info clearfix">
          <h2 className="integration-title">{this.intl.get("user-scoreInfo")}</h2>
          <div className="fl progress-con">
            <h3>
              <b>{this.intl.get("user-scoreLevel")}：VIP{this.state.userInfo.level}（{this.intl.get("points")}：{this.state.userCreditsNum}）</b>
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
              <span style={{left: `calc(1.2rem * (${this.state.scoreIndex} - 1) + ((${this.state.userCreditsNum} - ${this.state.scoreStart}) / (${this.state.scoreEnd} - ${this.state.scoreStart}) * 1.2rem))`}}>{this.state.userCreditsNum}</span>
              <p style={{width: `calc(1.2rem * (${this.state.scoreIndex} - 1) + ((${this.state.userCreditsNum} - ${this.state.scoreStart}) / (${this.state.scoreEnd} - ${this.state.scoreStart}) * 1.2rem))`}}></p>
            </div>
          </div>
        </div>
        <div className="item clearfix">
          <h2>{this.intl.get("user-scoreHistory")}</h2>
          <div className="fl">
            <a href="/help/pricing#earn_points">{this.intl.get("user-scoreGet")}？</a>
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