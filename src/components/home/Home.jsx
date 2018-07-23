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
    recommendController.configController = props.marketController.configController
    // marketController = new MarketController();
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
