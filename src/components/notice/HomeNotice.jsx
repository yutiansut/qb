import React, {Component} from 'react';
import exchangeViewBase from '../../components/ExchangeViewBase'
import "./stylus/homeNotice.styl"

export default class homeNotice extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {}
    // const {controller} = props
    // // 绑定view
    // controller.setView(this)
    // // 初始化数据，数据来源即store里面的state
    // this.state = Object.assign(this.state, controller.initState);
    // console.log('资讯', this.state)
  }

  // setView(view){
  //   super.setView(view);
  //   return this.store.data
  // }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    return (
      <div className="home-notice-wrap clearfix">
        <div className="home-notice-content">
          <p>公告</p>
          <ul>
            <li>1111</li>
            <li>2222</li>
            <li>3333</li>
          </ul>
        </div>
      </div>
    );
  }
}
