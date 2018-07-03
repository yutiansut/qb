import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import exchangeViewBase from "../ExchangeViewBase";
import HomeRecommend from './children/HomeRecommend.jsx' //交易盘市场
import HomeMarket from './children/HomeMarket.jsx' //交易盘市场
import HomeNotice from '../notice/HomeNotice.jsx' // 首页公告
import HomeActivity from '../activity/HomeActivity.jsx' // 首页活动

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

  render() {
    return (
      <div className="home-wrap">
        <HomeActivity controller={this.props.activityController}/>
        <HomeNotice controller={this.props.noticeController}/>
        <HomeRecommend controller={recommendController}/>
        <HomeMarket controller={this.props.marketController}/>
      </div>
    );
  }
}
