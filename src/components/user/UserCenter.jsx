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

import UserController from "../../class/user/UserController";
const userController = new UserController();


export default class User extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    let match = this.props.match
    return (
      <div className="clearfix inner">
        <ul className="user-nav fl">
          <li><NavLink activeClassName="active" to={`${match.url}/safe`} >安全中心</NavLink></li>
          <li><NavLink activeClassName="active" to={`${match.url}/identity`}>身份认证</NavLink></li>
          <li><NavLink activeClassName="active" to={`${match.url}/integration`}>我的积分</NavLink></li>
        </ul>
        <div className="user-content fl">
          <Switch>
            <Route path={`${match.url}/safe`} component={({match}) => (
              <UserSafeCenter controller={userController} />
              )}/>
            <Route path={`${match.url}/identity`} component={({match}) => (
              <UserIdentity controller={userController} />
            )}/>
            <Route path={`${match.url}/integration`} component={({match}) => (
              <UserIntegration controller={userController} />
            )}/>
            <Redirect to={`${match.url}/safe`} />
          </Switch>
        </div>
      </div>
    );
  }
}
