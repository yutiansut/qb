import React, {Component} from 'react';

import exchangeViewBase from "../../components/ExchangeViewBase";
import HomeActivity from './children/HomeActivity.jsx'
import HomeMarket from './children/HomeMarket.jsx'
import HomeNotice from './children/HomeNotice.jsx'

import "./stylus/home.styl"

export default class Home extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="home-wrap-mb">
            <HomeActivity activityController={this.props.activityController} history={this.props.history}/>
            <HomeNotice controller={this.props.noticeController}/>
            <HomeMarket controller={this.props.marketController}/>
        </div>
    );
  }
}
