import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'

import UserSafeCenter from './children/UserSafeCenter.jsx' // 安全中心
import UserIdentity from './children/UserIdentity.jsx' // 身份认证
import UserIntegration from './children/UserIntegration.jsx' // 我的积分

import "./stylus/user.styl"
import exchangeViewBase from "../ExchangeViewBase";

export default class User extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    const {controller} = this.props
    let match = this.props.match
    return (
      <div className="clearfix user-wrap">
        <ul className="user-nav fl">
          <li><NavLink activeClassName="active" to={`${match.url}/safe`} >{this.intl.get("header-security")}</NavLink></li>
          <li><NavLink activeClassName="active" to={`${match.url}/identity`}>{this.intl.get("header-idVerify")}</NavLink></li>
          <li><NavLink activeClassName="active" to={`${match.url}/integration`}>{this.intl.get("user-score")}</NavLink></li>
        </ul>
        <div className="user-content fl">
          <Switch>
            <Route path={`${match.url}/safe`} component={({match}) => (
              <UserSafeCenter controller={controller} />
              )}/>
            <Route path={`${match.url}/identity`} component={({match}) => (
              <UserIdentity controller={controller} />
            )}/>
            <Route path={`${match.url}/integration`} component={({match}) => (
              <UserIntegration controller={controller} />
            )}/>
            <Redirect to={`${match.url}/safe`} />
          </Switch>
        </div>
      </div>
    );
  }
}
