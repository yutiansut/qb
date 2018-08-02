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
    };
    let {loginController, userController, configController, controller} = this.props;
    this.clearLoginInfo = loginController.clearLoginInfo.bind(loginController); // 退出登录
    this.changeLanguage = configController.changeLanguage.bind(configController); // 改变语言
  }

  componentDidMount() {
    ChangeFontSize(375, 375 * 2, 375);
  }

  componentWillUpdate(props, state, next) {
    ChangeFontSize(375, 375 * 2, 375);
  }

  logout() {
    this.clearLoginInfo();
    this.props.history.push("/home");
  }

  render() {
    const {userController, configController, history} = this.props;
    let lang = configController.language;
    let isLogin = !!userController.userToken;
    return (
      <div className={`header-nav-mb ${history.location.pathname === '/help/terms' && configController.getQuery('os') === '0' ? 'hide' : ''}`}>
        <div className="nav-jsx">{"jsx here"}</div>
        <div className="nav-menu">
          <img src={this.state.navHidden ? "/static/mobile/header/icon_cd@2x.png" : "/static/mobile/header/icon_qx@2x.png"}
               onClick={() => this.setState({navHidden: !this.state.navHidden})}/>
        </div>
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
              <NavLink to="/home" onClick={e => this.setState({navHidden: true})}>
                  <img src="/static/mobile/header/icon_sy@2x.png"/>
                  <span>{this.intl.get("header-home")}</span>
              </NavLink>
              {/*资产管理*/}
              <a onClick={e=>this.setState({assetFold:!this.state.assetFold})}>
                  <img src="/static/mobile/header/icon_zc@2x.png"/>
                  <span>{this.intl.get("header-assets")}</span>
                  <img src={this.state.assetFold ? "/static/mobile/header/icon_zk@2x.png" : "/static/mobile/header/icon_ss@2x.png"} className="right"/>
              </a>
              {this.state.assetFold && <div className="fold">
                  <NavLink to="/wallet/balance" onClick={e => this.setState({navHidden: true})}>{this.intl.get("asset-balance")}</NavLink>
                  <NavLink to="/wallet/charge" onClick={e => this.setState({navHidden: true})}>{this.intl.get("asset-charge")}</NavLink>
                  <NavLink to="/wallet/widthdraw" onClick={e => this.setState({navHidden: true})}>{this.intl.get("asset-withdraw")}</NavLink>
                  <NavLink to="/wallet/dashboard" onClick={e => this.setState({navHidden: true})}>{this.intl.get("asset-records")}</NavLink>
              </div>}
              {/*订单管理*/}
              <a onClick={e=>this.setState({orderFold:!this.state.orderFold})}>
                  <img src="/static/mobile/header/icon_dd@2x.png"/>
                  <span>{this.intl.get("header-order")}</span>
                  <img src={this.state.orderFold ? "/static/mobile/header/icon_zk@2x.png" : "/static/mobile/header/icon_ss@2x.png"} className="right"/>
              </a>
              {this.state.orderFold && <div className="fold">
                  <NavLink to="/order/current" onClick={e => this.setState({navHidden: true})}>{this.intl.get("order-current")}</NavLink>
                  <NavLink to="/order/history" onClick={e => this.setState({navHidden: true})}>{this.intl.get("order-history")}</NavLink>
              </div>}
              {/*个人中心*/}
              <NavLink to="/user" onClick={e => this.setState({navHidden: true})}>
                  <img src="/static/mobile/header/icon_gr@2x.png"/>
                  <span>{this.intl.get("header-user")}</span>
              </NavLink>
              {/*语言*/}
              <a onClick={e=>this.setState({langFold:!this.state.langFold})}>
                  <img src="/static/mobile/header/icon_yy@2x.png"/>
                  <span>{this.intl.get("header-lang")}</span>
                  <img src={this.state.langFold ? "/static/mobile/header/icon_zk@2x.png" : "/static/mobile/header/icon_ss@2x.png"} className="right"/>
              </a>
              {this.state.langFold && <div className="fold">
                  <a className={lang==="zh-CN" && "selected"} onClick={e => this.changeLanguage("zh-CN")}>简体中文</a>
                  <a className={lang==="en-US" && "selected"} onClick={e => this.changeLanguage("en-US")}>English</a>
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
                <NavLink to="/login" className="login" onClick={e => this.setState({navHidden: true})}>
                    {this.intl.get("deal-login")}
                </NavLink>
                {/*首页*/}
                <NavLink to="/home" onClick={e => this.setState({navHidden: true})}>
                    <img src="/static/mobile/header/icon_sy@2x.png"/>
                    <span>{this.intl.get("header-home")}</span>
                </NavLink>
                {/*语言*/}
                <a onClick={e=>this.setState({langFold:!this.state.langFold})}>
                    <img src="/static/mobile/header/icon_yy@2x.png"/>
                    <span>{this.intl.get("header-lang")}</span>
                    <img src={this.state.langFold ? "/static/mobile/header/icon_zk@2x.png" : "/static/mobile/header/icon_ss@2x.png"} className="right"/>
                </a>
                {this.state.langFold && <div className="fold">
                    <a className={lang==="zh-CN" && "selected"} onClick={e => this.changeLanguage("zh-CN")}>简体中文</a>
                    <a className={lang==="en-US" && "selected"} onClick={e => this.changeLanguage("en-US")}>English</a>
                </div>}
            </div>}
        </div>}
    </div>
    )
  }
}
