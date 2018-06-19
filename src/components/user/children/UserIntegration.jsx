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
    console.log(445555, this.state)
    let obj = this.checkNum(this.state.user_info.score)
    console.log(3333, this.state, obj)
    this.state = Object.assign(this.state, {
      scoreEnd: obj && obj.checkEnd,
      scoreStart: obj && obj.checkStart,
      scoreIndex: obj && obj.checkIndex
    })
    console.log(6667788787, this.state)
  }

  checkNum(num) {
    let scoreArr = [0, 10000, 50000, 100000, 200000, 500000], sum = 0, index = 0, start = 0, end = 0;
    if(!(scoreArr.length > 0)){
      return;
    }
    if (num > 500000) {
      index = 6
      start = scoreArr[5]
      end = num
      return {checkStart: start, checkEnd: end, checkIndex: index}
    }
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
    // console.log(2222, 1.2 * ${this.state.scoreIndex - 1}rem + ((${this.state.user_info.score} - ${this.state.scoreStart}) / (${this.state.scoreEnd} - ${this.state.scoreStart}) * 1.2)
    // super.componentWillMount();
    // console.log('testApp componentWillMount')
  }

  componentDidMount() {
    // console.log(2222222, this.checkNum(this.state.user_info.score))
    // super.componentDidMount();
    // console.log('testApp componenDidMount')
  }

  componentWillUpdate(...parmas) {
    // console.log('testApp componentWillUpdate', ...parmas)
  }

  render() {
    return (
      <div className="integration-wrap">
        <h1>我的积分</h1>
        <div className="info clearfix">
          <h2>积分信息</h2>
          <div className="fl">
            <h3>
              <b>目前等级：VIP{this.state.user_info.grade}（积分：{this.state.user_info.score}）</b>
              <a href="javascript:void(0)">等级说明</a>
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
              <span style={{left: `calc(1.2rem * (${this.state.scoreIndex} - 1) + ((${this.state.user_info.score} - ${this.state.scoreStart}) / (${this.state.scoreEnd} - ${this.state.scoreStart}) * 1.2rem))`}}>{this.state.user_info.score}</span>
              <p style={{width: `calc(1.2rem * (${this.state.scoreIndex} - 1) + ((${this.state.user_info.score} - ${this.state.scoreStart}) / (${this.state.scoreEnd} - ${this.state.scoreStart}) * 1.2rem))`}}></p>
            </div>
          </div>
        </div>
        <div className="item clearfix">
          <h2>积分详情</h2>
          <div className="fl">
            <a href="javascript:void(0)">如何获得积分？</a>
            <table>
              <thead>
              <tr>
                <th>获得积分</th>
                <th>事件</th>
                <th>时间</th>
              </tr>
              </thead>
              <tbody>
                {this.state.score_info.items.map((v, index) => (<tr key={index}>
                  <td>+{v.gain}</td>
                  <td>{v.event}</td>
                  <td>{v.time}</td>
                </tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

}