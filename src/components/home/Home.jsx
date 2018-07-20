import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import exchangeViewBase from "../ExchangeViewBase";
import HomeRecommend from './children/HomeRecommend.jsx' //交易盘市场
import HomeMarket from './children/HomeMarket.jsx' //交易盘市场
import HomeNotice from './children/HomeNotice.jsx' // 首页公告
import HomeActivity from './children/HomeActivity.jsx' // 首页活动
import HomeAdvantage from './children/HomeAdvantage.jsx'

import MarketController from '../../class/market/MarketController'

let recommendController,
  marketController;

import "./stylus/home.styl"
import "./stylus/homeMarkt.styl"


export default class Home extends exchangeViewBase {
  constructor(props) {
    super(props);
    recommendController = new MarketController('recommend');
    // marketController = new MarketController();
  }

  componentDidMount() { // 滚动事件 改变头部
    super.componentDidMount();
    let headerName = document.getElementById('header'), activeHeight = document.getElementById('active')
    let buttonTop = document.querySelector('.aside-nav-top');
    window.addEventListener('scroll', () => {
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      if(scrollTop >= activeHeight.offsetHeight) {
        headerName.className = 'headerNav clearfix'
      } else {
        headerName.className = 'homeNav clearfix'
      }
      if (scrollTop >= document.documentElement.clientHeight) {
        console.log('true')
        buttonTop.style.display = "block";
      } else {
        console.log('false')
        buttonTop.style.display = "none";
      }
    })
  }

  render() {
    return (
        <div className="home-wrap">
          <div className="home-top">
            <HomeActivity controller={this.props.activityController} ref="dfa"/>
            <HomeNotice controller={this.props.noticeController}/>
            <HomeRecommend controller={recommendController}/>
          </div>
          <HomeMarket controller={this.props.marketController}/>
          <HomeAdvantage/>
        </div>
    );
  }
}
