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
      navHidden: true
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
              {userController.userToken &&
              (<NavLink to="/muser"
                        className="nav-login"
                        onClick={e => this.setState({navHidden: true})}><img src="/static/mobile/user/icon_wd_head@3x.png" alt=""/><span>{userController.userName}</span></NavLink>)
              || (<NavLink to="/mlogin"
                           className="nav-login"
                           onClick={e => this.setState({navHidden: true})}>
                登录/注册</NavLink>)}
              <NavLink to="/mhome" className="nav-home"
                       onClick={e => this.setState({navHidden: true})}>首页</NavLink>
              {userController.userToken &&
              (<div><NavLink to="/mwallet"
                             className="nav-wallet"
                             onClick={e => this.setState({navHidden: true})}>资产管理</NavLink>
                <NavLink to="/morder"
                         className="nav-order"
                         onClick={e => this.setState({navHidden: true})}>订单管理</NavLink>
                <NavLink to="/muser"
                         className="nav-order"
                         onClick={e => this.setState({navHidden: true})}>个人中心</NavLink>
              </div>) || null}
            </div>
          </div>) || null}
      </div>
    )
  }
}
