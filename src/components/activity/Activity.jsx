import React, { Component } from 'react';
import {
  Route,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'


import exchangeViewBase from "../ExchangeViewBase";

import ActivityFresh from './children/ActivityFresh.jsx' // 注册活动

export default class Help extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.controller = props.controller;
  }

  render() {
    let match = this.props.match;
    const fresh = () => {
      return <ActivityFresh controller={this.controller} />;
    };

    return (
      <div className="route">
        <Switch>
          <Route path={`${match.url}/fresh`} component={fresh} />
          <Redirect to={`${match.url}/fresh`} />
        </Switch>
      </div>
    )
  }
}
