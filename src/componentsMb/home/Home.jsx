import React, {Component} from 'react';

import exchangeViewBase from "../../components/ExchangeViewBase";
import HomeActivity from './children/HomeActivity.jsx'
import HomeMarket from './children/HomeMarket.jsx'
import HomeNotice from './children/HomeNotice.jsx'
import Header from '../header/Header'

import "./stylus/home.styl"
import {ChangeFontSize} from "../../core";

export default class Home extends exchangeViewBase {
  constructor(props) {
    super(props);
    let {headerController} = this.props;
    this.addContent = headerController.addContent.bind(headerController); // 添加头部内容
  }

  componentDidMount() {
    this.addContent({})
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
