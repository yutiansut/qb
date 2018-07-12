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

    };
  }
  componentDidMount() {
    ChangeFontSize(375, 375*2, 375);
  }

  componentWillUpdate(props, state, next) {
      ChangeFontSize(375, 375*2, 375);
  }

  render() {
    return (
      <div className="header-nav-mb">
        <Link to='/home' className="logo">
            <img src="/static/img/home/logo.svg"/>
        </Link>
        <div className="nav-right">
            <NavLink to="/mlogin" className="login">登录</NavLink>
        </div>
      </div>
    )
  }
}
