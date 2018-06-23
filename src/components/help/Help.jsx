import React, { Component } from 'react';
import {
  Route,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'

import Terms from './children/Terms' // 资讯公告
import Pricing from './children/Pricing' // 联系我们
import Api from './children/Api' // 上币申请

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
    const pricing = () => {
      return <Pricing controller={this.controller} />;
    };
    const api = () => {
      return <Api controller={this.controller} />;
    };

    return <div className="help-wrap inner">
      <div className="route">
          <Switch>
            <Route path={`${match.url}/terms`} component={terms} />
            <Route path={`${match.url}/pricing`} component={pricing} />
            <Route path={`${match.url}/api`} component={api} />
            <Redirect to={`${match.url}/terms`} />
          </Switch>
        </div>
    </div>
  }
}
