import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import exchangeViewBase from "../ExchangeViewBase";
import HomeRecommend from './children/HomeRecommend.jsx' //交易盘市场
import HomeMarket from './children/HomeMarket.jsx' //交易盘市场
import HomeNotice from '../notice/HomeNotice.jsx' // 首页公告

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
        <div className="banner-wrap">
          <div>
            <img src="/static/img/banner_title.svg" alt=""/>
            <Link to="/activity/fresh">立即注册</Link>
          </div>
          <div alt="" className="banner-img"/>
        </div>
        <HomeNotice />
        <HomeRecommend controller={recommendController}/>
        <HomeMarket controller={this.props.marketController}/>
      </div>
    );
  }
}
