import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import exchangeViewBase from '../../components/ExchangeViewBase'
import "./stylus/homeActivity.styl"

export default class HomeActivity extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      bannerImgUrl:''
    }
    const {controller} = props
    // 绑定view
    controller.setView(this)
    // 初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    // console.log('活动', this.state)
    this.getHomeBanner = controller.getHomeBanner.bind(controller)
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.getHomeBanner(1,0)
  }

  componentWillUpdate(...parmas) {

  }

  render() {
    // console.log('this.state.bannerImgUrl',this.state.bannerImgUrl)
    return (
      <div className="banner-wrap">
        <div>
          <img src="/static/img/banner_title.svg" alt=""/>
          <Link to="/activity/fresh">立即注册</Link>
        </div>
        <div alt="" className="banner-img" style={{background: `url(${this.state.bannerImgUrl}) center center / cover no-repeat`}}/>
      </div>
    );
  }
}
