import React, {Component} from 'react';
import ExchangeViewBase from "../../components/ExchangeViewBase";
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
      showLangDrop: false,
      navHidden: true,
    };
    let {loginController,userController,configController} = this.props;
    this.clearLoginInfo = loginController.clearLoginInfo.bind(loginController); // 退出登录
    this.changeLanguage = configController.changeLanguage.bind(configController); // 改变语言
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

  changeLang(lang){
    this.setState({lang:lang},()=>{
      this.changeLanguage(lang);
    })
  }

  render() {
    const {userController, configController, history} = this.props;
    let lang = configController.language;
    let isLogin = !!userController.userToken;
    return (
      <div className={`header-nav-mb ${history.location.pathname === '/mhelp/terms' && configController.getQuery('os') === '0' ? 'hide' : ''}`}>
        <Link to='/home' className="logo">
          <img src="/static/img/home/logo_header.svg"/>
        </Link>
        <div className="nav-menu">
          <a href="javascript:void(0)" className="drop-menu"
             onBlur={()=>{this.setState({showLangDrop:false})}}>
            <img src={lang==="zh-CN" ? "/static/img/home/cn.svg":"/static/img/home/en.svg"}
                 onClick={()=>{this.setState({showLangDrop:!this.state.showLangDrop})}}/>
            {this.state.showLangDrop && <ul>
                <li onClick={this.changeLang.bind(this,"zh-CN")}><img src="/static/img/home/cn.svg"/>简体中文</li>
                <li onClick={this.changeLang.bind(this,"en-US")}><img src="/static/img/home/en.svg"/>English</li>
            </ul>}
          </a>
         {!isLogin ?
             <NavLink to="/mlogin">{this.intl.get("header-login")}/{this.intl.get("header-regist")}</NavLink> :
             <img src="/static/mobile/header/icon_cd@3x.png" onClick={() => this.setState({navHidden: !this.state.navHidden})}/>}
        </div>
        {(isLogin && !this.state.navHidden) && <div>
            <div className="nav-shadow" onClick={e => this.setState({navHidden: true})}></div>
            <div className="nav-hidden">
              <a className="user">
                  <img src="/static/mobile/header/icon_wode_head@2x.png" alt=""/>
                  <span>{userController.userName}</span></a>
              <NavLink to="/mhome"
                       onClick={e => this.setState({navHidden: true})}><img src="/static/mobile/header/icon_sy@2x.png"/>{this.intl.get("header-home")}</NavLink>
              <NavLink to="/mwallet"
                       onClick={e => this.setState({navHidden: true})}><img src="/static/mobile/header/icon_zc@2x.png"/>{this.intl.get("header-assets")}</NavLink>
              <NavLink to="/morder"
                       onClick={e => this.setState({navHidden: true})}><img src="/static/mobile/header/icon_dd@2x.png"/>{this.intl.get("header-order")}</NavLink>
              <NavLink to="/muser"
                       onClick={e => this.setState({navHidden: true})}><img src="/static/mobile/header/icon_gr@2x.png"/>{this.intl.get("header-user")}</NavLink>
              <a className="logout" onClick={e=>{
                  this.setState({navHidden: true},()=>{
                    this.logout();
                  });
              }}><img src="/static/mobile/header/icon_tc@2x.png"/>{this.intl.get("header-logOut")}</a>
            </div>
          </div>}
      </div>
    )
  }
}
