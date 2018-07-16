import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import exchangeViewBase from "../ExchangeViewBase";
import HomeActivity from '../activity/HomeActivity.jsx'
import HomeRecommend from './children/HomeRecommend.jsx'
import HomeMarket from './children/HomeMarket.jsx'

import MarketController from '../../class/market/MarketController'

let recommendController,
    marketController;

import "./stylus/home.styl"

export default class Home extends exchangeViewBase {
  constructor(props) {
    super(props);
    recommendController = new MarketController('recommend');
  }

  render() {
    return (
        <div className="home-wrap-mb">
            <HomeActivity controller={this.props.activityController}/>
            <HomeRecommend controller={recommendController}/>
            <HomeMarket controller={this.props.marketController}/>
        </div>
    );
  }
}
