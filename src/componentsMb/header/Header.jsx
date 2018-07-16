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
    let {loginController,userController} = this.props;
    this.clearLoginInfo = loginController.clearLoginInfo.bind(loginController) // 退出登录
  }

  componentDidMount() {
    ChangeFontSize(375, 375 * 2, 375);
  }

  componentWillUpdate(props, state, next) {
    ChangeFontSize(375, 375 * 2, 375);
  }

  logout(){
    this.clearLoginInfo();
    this.props.history.push("/mhome");
  }

  render() {
    const {userController} = this.props;
    let isLogin = !!userController.userToken;
    return (
      <div className="header-nav-mb">
        <Link to='/home' className="logo">
          <img src="/static/img/home/logo.svg"/>
        </Link>
        {!isLogin ?
            <NavLink to="/mlogin" className="nav-right">{this.intl.get("header-login")}/{this.intl.get("header-regist")}</NavLink> :
            <img className="nav-img" src="/static/mobile/user/icon_wd_head@3x.png" alt=""
                 onClick={() => this.setState({navHidden: !this.state.navHidden})}/>}
        {(isLogin && !this.state.navHidden) && <div>
            <div className="nav-shadow" onClick={e => this.setState({navHidden: true})}></div>
            <div className="nav-hidden">
              <NavLink to="/muser"
                        className="nav-login"
                        onClick={e => this.setState({navHidden: true})}>
                  <img src="/static/mobile/user/icon_wd_head@3x.png" alt=""/>
                  <span>{userController.userName}</span>
              </NavLink>
              <NavLink to="/mhome" className="nav-home"
                       onClick={e => this.setState({navHidden: true})}>{this.intl.get("header-home")}</NavLink>
              <div>
                <NavLink to="/mwallet"
                        className="nav-wallet"
                        onClick={e => this.setState({navHidden: true})}>{this.intl.get("header-assets")}</NavLink>
                <NavLink to="/morder"
                         className="nav-order"
                         onClick={e => this.setState({navHidden: true})}>{this.intl.get("header-order")}</NavLink>
                <NavLink to="/muser"
                         className="nav-order"
                         onClick={e => this.setState({navHidden: true})}>{this.intl.get("header-user")}</NavLink>
                  <a onClick={e=>{
                      this.setState({navHidden: true},()=>{
                        this.logout();
                      });
                  }}>{this.intl.get("header-logOut")}</a>
              </div>
            </div>
          </div>}
      </div>
    )
  }
}
