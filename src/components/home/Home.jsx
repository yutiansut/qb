import React, {Component} from 'react';

import HomeRecommend from './children/HomeRecommend.jsx' //交易盘市场
import HomeMarket from './children/HomeMarket.jsx' //交易盘市场

import exchangeViewBase from "../ExchangeViewBase";


import MarketController from '../../class/market/MarketController'
const recommendController = new MarketController();
const marketController = new MarketController();


export default class Home extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="inner">
        <HomeRecommend controller={recommendController}/>
        <HomeMarket controller={marketController}/>
      </div>
    );
  }
}
