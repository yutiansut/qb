import React, { Component } from 'react';
import {
  Route,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'
// import MarketController from "../../class/market/MarketController"

// let marketController

import Terms from './children/Terms' // 服务协议
import Pricing from './children/Pricing' // 费率标准
import Api from './children/Api' // API文档
import Assist from './children/Assist' // 帮助中心
import CoinData from "./children/CoinData"; // 币种资料
import DownLoad from "./children/DownLoad"; // 下载页

import "./style/index.styl"

import exchangeViewBase from "../../components/ExchangeViewBase";

export default class Help extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.assetController = props.assetController;
    this.activityController = props.activityController;
  }

  render() {
    let match = this.props.match;
    const terms = () => {
      return <Terms controller={this.assetController}/>;
    };
    const pricing = () => {
      return <Pricing controller={this.assetController} />;
    };
    const api = () => {
      return <Api controller={this.assetController} />;
    };
    const assist = () => {
      return <Assist controller={this.assetController} />;
    }

    return <div className="help-wrap-mb">
      <div className="route">
          <Switch>
            <Route path={`${match.url}/terms`} component={terms} />
            <Route path={`${match.url}/pricing`} component={pricing} />
            <Route path={`${match.url}/api`} component={api} />
            <Route path={`${match.url}/currency`} component={coin} />
            <Route path={`${match.url}/download`} component={DownLoad} />
            <Route path={`${match.url}/assist`} component={assist} />
            <Redirect to={`${match.url}/terms`} />
          </Switch>
        </div>
    </div>
  }
}
