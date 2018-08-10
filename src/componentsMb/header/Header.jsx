import React, {Component} from 'react';
import ExchangeViewBase from "../../components/ExchangeViewBase";
import {ChangeFontSize} from '../../core'
import {
  NavLink,
} from 'react-router-dom'

import "./stylus/header.styl"

export default class Header extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      navHidden: true,
      langFold: false,
      assetFold: false,
      orderFold: false,
      navShow: true,
      title: '',
      navBtnShow: true,
      selectLink: true,
      linkUrl: '',
      searchShow: false,
      filterShow: false,
      eyeShow: false,
      eyeChangeShow: true,
      selectFn: () => {
      }
    };
    let {loginController, userController, configController, headerController} = this.props;
    headerController.setView(this)
    this.clearLoginInfo = loginController.clearLoginInfo.bind(loginController); // 退出登录
    this.changeLanguage = configController.changeLanguage.bind(configController); // 改变语言
    this.goBack = this.goBack.bind(this)
  }

  componentDidMount() {
    // console.log(1234, this.props.match, this.props.history.location.pathname)
    ChangeFontSize(320, 375 * 2, 375);
  }

  componentWillUpdate(props, state, next) {
    ChangeFontSize(320, 375 * 2, 375);
  }

  componentWillUnmount() {
    // console.log(12345, this.props.match, this.props.history.location.pathname)
  }

  goBack() {
    this.props.history.goBack();
  }


  logout() {
    this.clearLoginInfo();
    this.props.history.push("/home");
  }

  render() {
    const {userController, configController, history, match} = this.props;
    let lang = configController.language;
    let isLogin = !!userController.userToken;
    let path = history.location.pathname
    // console.log(123456, match, history.location.pathname)
    return (
      <div>
      {this.state.navShow && <div
        className={`header-nav-mb ${history.location.pathname === '/help/terms' && configController.getQuery('os') === '0' ? 'hide' : ''}`}>
        <div className="nav-jsx clearfix">
          {['/user', '/home', '/wallet/balance', '/wallet/charge', '/wallet/withdraw', '/wallet/dashboard', '/order/current', '/order/history'].includes(path) ? (
              <NavLink to="/home"><img src={this.$imagesMap.$h5_logo} className="fl home-logo" alt=""/></NavLink>) :
            (this.state.selectLink &&
              <img src={this.$imagesMap.$h5_back} className="nav-back fl" onClick={this.goBack} alt=""/> ||
              <NavLink to={this.state.linkUrl} className="fl"><img src={this.$imagesMap.$h5_back} className="nav-back"
                                                                   alt=""/></NavLink>)}
          <b className="fl">{this.state.title}</b>
          {this.state.navBtnShow && <img
            src={this.state.navHidden ? "/static/mobile/header/icon_cd@2x.png" : "/static/mobile/header/icon_qx@2x.png"}
            className="nav-menu fr"
            onClick={() => this.setState({navHidden: !this.state.navHidden})}/>}
          {this.state.searchShow &&
          <img src={this.$imagesMap.$h5_search} className="fr search-img" alt="" onClick={this.state.selectFn}/>}
          {this.state.filterShow &&
          <img src={this.$imagesMap.$h5_order_select} className="fr search-img" alt="" onClick={this.state.selectFn}/>}
          {this.state.eyeShow && (this.state.eyeChangeShow && (<img src={this.$imagesMap.$h5_hidden} className="fr search-img" alt="" onClick={this.state.selectFn}/>) || (<img src={this.$imagesMap.$h5_show} className="fr search-img" alt="" onClick={this.state.selectFn}/>))}
        </div>
        {/*<div className="nav-menu fr">*/}
        {/*<img src={this.state.navHidden ? "/static/mobile/header/icon_cd@2x.png" : "/static/mobile/header/icon_qx@2x.png"}*/}
        {/*onClick={() => this.setState({navHidden: !this.state.navHidden})}/>*/}
        {/*</div>*/}
        {!this.state.navHidden && <div>
          <div className="nav-shadow" onClick={e => this.setState({navHidden: true})}/>
          {isLogin ?
            <div className="nav-hidden">
              {/*头像昵称*/}
              <NavLink to="/user" className="user" onClick={e => this.setState({navHidden: true})}>
                <img src="/static/mobile/header/icon_wode_head@2x.png" alt=""/>
                <span>{userController.userName}</span>
              </NavLink>
              {/*首页*/}
              <NavLink to="/home" activeClassName="home-active" onClick={e => this.setState({navHidden: true})}>
                <img src={path === '/home' ? this.$imagesMap.$h5_header_home_active : this.$imagesMap.$h5_header_home}/>
                <span>{this.intl.get("header-home")}</span>
              </NavLink>
              {/*资产管理*/}
              <a onClick={e => this.setState({assetFold: !this.state.assetFold})}>
                <img src="/static/mobile/header/icon_zc@2x.png"/>
                <span>{this.intl.get("header-assets")}</span>
                <img
                  src={this.state.assetFold ? "/static/mobile/header/icon_zk@2x.png" : "/static/mobile/header/icon_ss@2x.png"}
                  className="right"/>
              </a>
              {this.state.assetFold && <div className="fold">
                <NavLink to="/wallet/balance" activeClassName="link-active"
                         onClick={e => this.setState({navHidden: true})}>{this.intl.get("asset-balance")}</NavLink>
                <NavLink to="/wallet/charge"  activeClassName="link-active"
                         onClick={e => this.setState({navHidden: true})}>{this.intl.get("asset-charge")}</NavLink>
                <NavLink to="/wallet/withdraw"  activeClassName="link-active"
                         onClick={e => this.setState({navHidden: true})}>{this.intl.get("asset-withdraw")}</NavLink>
                <NavLink to="/wallet/dashboard"  activeClassName="link-active"
                         onClick={e => this.setState({navHidden: true})}>{this.intl.get("asset-records")}</NavLink>
              </div>}
              {/*订单管理*/}
              <a onClick={e => this.setState({orderFold: !this.state.orderFold})}>
                <img src="/static/mobile/header/icon_dd@2x.png"/>
                <span>{this.intl.get("header-order")}</span>
                <img
                  src={this.state.orderFold ? "/static/mobile/header/icon_zk@2x.png" : "/static/mobile/header/icon_ss@2x.png"}
                  className="right"/>
              </a>
              {this.state.orderFold && <div className="fold">
                <NavLink to="/order/current" activeClassName="link-active"
                         onClick={e => this.setState({navHidden: true})}>{this.intl.get("order-current")}</NavLink>
                <NavLink to="/order/history" activeClassName="link-active"
                         onClick={e => this.setState({navHidden: true})}>{this.intl.get("order-history")}</NavLink>
              </div>}
              {/*个人中心*/}
              <NavLink to="/user" activeClassName="user-active" onClick={e => this.setState({navHidden: true})}>
                <img src={path === '/user' ? this.$imagesMap.$h5_header_user_active : this.$imagesMap.$h5_header_user}/>
                <span>{this.intl.get("header-user")}</span>
              </NavLink>
              {/*语言*/}
              <a onClick={e => this.setState({langFold: !this.state.langFold})}>
                <img src="/static/mobile/header/icon_yy@2x.png"/>
                <span>{this.intl.get("header-lang")}</span>
                <img
                  src={this.state.langFold ? "/static/mobile/header/icon_zk@2x.png" : "/static/mobile/header/icon_ss@2x.png"}
                  className="right"/>
              </a>
              {this.state.langFold && <div className="fold">
                <a className={lang === "zh-CN" ? "selected" : ""} onClick={e => this.changeLanguage("zh-CN")}>简体中文</a>
                <a className={lang === "en-US" ? "selected" : ""} onClick={e => this.changeLanguage("en-US")}>English</a>
              </div>}
              {/*退出*/}
              <a className="br"/>
              <a className="logout" onClick={e => this.logout()}>
                <img src="/static/mobile/header/icon_tc@2x.png"/>
                <span>{this.intl.get("header-logOut")}</span>
              </a>
            </div>
            :
            <div className="nav-hidden">
              {/*登录/注册*/}
              <NavLink to="/login" className="login" activeClassName="link-active" onClick={e => this.setState({navHidden: true})}>
                {this.intl.get("deal-login")}
              </NavLink>
              {/*首页*/}
              <NavLink to="/home" activeClassName="home-active" onClick={e => this.setState({navHidden: true})}>
                <img src={path === '/home' ? this.$imagesMap.$h5_header_home_active : this.$imagesMap.$h5_header_home}/>
                <span>{this.intl.get("header-home")}</span>
              </NavLink>
              {/*语言*/}
              <a onClick={e => this.setState({langFold: !this.state.langFold})}>
                <img src="/static/mobile/header/icon_yy@2x.png"/>
                <span>{this.intl.get("header-lang")}</span>
                <img
                  src={this.state.langFold ? "/static/mobile/header/icon_zk@2x.png" : "/static/mobile/header/icon_ss@2x.png"}
                  className="right"/>
              </a>
              {this.state.langFold && <div className="fold">
                <a className={lang === "zh-CN" ? "selected" : ""} onClick={e => this.changeLanguage("zh-CN")}>简体中文</a>
                <a className={lang === "en-US" ? "selected" : ""} onClick={e => this.changeLanguage("en-US")}>English</a>
              </div>}
            </div>}
        </div>}
      </div>}
      </div>
    )
  }
}
