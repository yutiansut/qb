import React, {Component} from 'react';

import exchangeViewBase from "../ExchangeViewBase";
import HomeRecommend from './children/HomeRecommend.jsx' //交易盘市场
import HomeMarket from './children/HomeMarket.jsx' //交易盘市场
import HomeNotice from '../notice/HomeNotice.jsx' // 首页公告

import MarketController from '../../class/market/MarketController'

const recommendController = new MarketController();
const marketController = new MarketController();

import "./stylus/home.styl"


export default class Home extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-wrap">
        <div className="banner-wrap">
          <div>
            <img src="/static/img/banner_title.svg" alt=""/>
            <a href="javascript:void(0)">立即注册</a>
          </div>
          <div alt="" className="banner-img"/>
        </div>
        <HomeNotice />
        <HomeRecommend controller={recommendController}/>
        <HomeMarket controller={marketController}/>
      </div>
    );
  }
}
