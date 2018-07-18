import React, {Component} from 'react';

import exchangeViewBase from "../../components/ExchangeViewBase";
import HomeActivity from '../activity/HomeActivity.jsx'
import HomeMarket from './children/HomeMarket.jsx'

import "./stylus/home.styl"

export default class Home extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="home-wrap-mb">
            <HomeActivity controller={this.props.activityController}/>
            <HomeMarket controller={this.props.marketController}/>
        </div>
    );
  }
}
