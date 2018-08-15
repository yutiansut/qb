import React, { Component } from 'react';
import {
  Route,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'
import MarketController from "../../class/market/MarketController"

let marketController

import Terms from './children/Terms' // 服务协议
import Pricing from './children/Pricing' // 费率标准
import Api from './children/Api' // API文档
import CoinData from "./children/CoinData"; // 币种资料
import Other from "./children/Other"; // 费率标准第二版

import "./style/index.styl"

import exchangeViewBase from "../ExchangeViewBase";

export default class Help extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.controller = props.controller;
  }

  render() {
    let match = this.props.match;
    const terms = () => {
      return <Terms controller={this.controller} />;
    };
    const pricing = ({location}) => {
      return <Pricing controller={this.controller} location={location}/>;
    };
    const api = () => {
      return <Api controller={this.controller} />;
    };
    const coin = ({location}) => {
      return <CoinData controller={this.controller} location={location} />;
    };
    const other = ({location}) => {
      return <Other controller={this.controller} location={location}/>;
    };

    return <div className="help-wrap inner">
      <div className="route">
          <Switch>
            <Route path={`${match.url}/terms`} component={terms} />
            <Route path={`${match.url}/pricing`} component={pricing} />
            <Route path={`${match.url}/api`} component={api} />
            <Route path={`${match.url}/currency`} component={coin} />
            <Route path={`${match.url}/other`} component={other} />
            <Redirect to={`${match.url}/terms`} />
          </Switch>
        </div>
    </div>
  }
}
