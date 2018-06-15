import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import exchangeViewBase from '../../../components/ExchangeViewBase'
import "../stylus/integration.styl"

export default class userIntegration extends exchangeViewBase {

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
      <div className="integration-wrap">
        <h1>我的积分</h1>
        <div className="info clearfix">
          <h2>积分信息</h2>
          <div className="fl">
            <h3>
              <b>目前等级：VIP1（积分：3000）</b>
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
              <span>3000</span>
              <p></p>
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
              <tr>
                <td>+2</td>
                <td>每日登录</td>
                <td>2018-01-18 10:23:22</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

}