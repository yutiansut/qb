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
import UserIntegration from './children/UserScore.jsx' // 我的积分

// import "./stylus/user.styl"
import "./stylus/index.styl"
import exchangeViewBase from "../ExchangeViewBase";

export default class User extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    const {controller} = this.props
    let match = this.props.match
    return (
      <div className="user-big-wrap" style={{minHeight: `${window.innerHeight - 2.1 * 100}px`}}>
        <div className="clearfix user-wrap" style={{minHeight: `${window.innerHeight - 2.1 * 100}px`}}>
          <ul className="user-nav fl" style={{minHeight: `${window.innerHeight - 2.1 * 100}px`}}>
            <li><NavLink activeClassName="active" to={`${match.url}/safe`} >{this.intl.get("header-security")}</NavLink></li>
            <li><NavLink activeClassName="active" to={`${match.url}/identity`}>{this.intl.get("header-idVerify")}</NavLink></li>
            <li><NavLink activeClassName="active" to={`${match.url}/integration`}>{this.intl.get("user-score")}</NavLink></li>
          </ul>
          <div className="user-content fl" style={{minHeight: `${window.innerHeight - 2.1 * 100}px`}}>
            <Switch>
              <Route path={`${match.url}/safe`} component={({match}) => (
                <UserSafeCenter controller={controller} history={this.props.history}/>
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
      </div>
    );
  }
}
