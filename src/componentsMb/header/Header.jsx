import React, {Component} from 'react';
import ExchangeViewBase from "../ExchangeViewBase";
import {ChangeFontSize} from '../../core'
import {
  Link,
  NavLink,
} from 'react-router-dom'

import "./stylus/header.styl"

export default class Header extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      navHidden: false
    };
  }

  componentDidMount() {
    ChangeFontSize(375, 375 * 2, 375);
  }

  componentWillUpdate(props, state, next) {
    ChangeFontSize(375, 375 * 2, 375);
  }

  render() {
    const {userController} = this.props
    return (
      <div className="header-nav-mb">
        <Link to='/home' className="logo">
          <img src="/static/img/home/logo.svg"/>
        </Link>
        <p className="nav-right" onClick={() => this.setState({navHidden: !this.state.navHidden})}>按钮</p>
        {!this.state.navHidden && (
          <div>
            <div className="nav-shadow" onClick={e => this.setState({navHidden: true})}></div>
            <div className="nav-hidden">
              <NavLink to="/mlogin" className="login">登录</NavLink>
              {userController.userToken && (<div><NavLink to="/mwallet" className="wallet">资产</NavLink>
                <NavLink to="/morder" className="order">订单</NavLink></div>)}
            </div>
          </div>) || null}
      </div>
    )
  }
}
