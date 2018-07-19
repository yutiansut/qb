import React from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase.jsx';
import {NavLink} from 'react-router-dom'
import RemindPopup from '../../../common/component/Popup/index.jsx'

import '../stylus/userCenterIndex.styl'

export default class UserCenterIndex extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.verifyState={
        0: this.intl.get("user-verify-state0"),
        1: this.intl.get("user-verify-state1"),
        2: this.intl.get("user-verify-state2"),
        3: this.intl.get("user-verify-state3"),
        4: this.intl.get("user-verify-state4"),
        5: this.intl.get("user-verify-state5"),
    };
    this.state={
      userAuth:{},
      remindPopup: false,
      popType: "tip1",
      popMsg: "",
    };
    let controller=this.props.controller;
    controller.setView(this);
    this.getUserAuthData = controller.getUserAuthData.bind(controller) // 获取用户认证信息
  }

  async componentWillMount() {
      await this.getUserAuthData();
  }

  isAuthentication() {
    if (this.state.userAuth.state !== 1 || this.state.userAuth.state !== 2) {
      this.setState({remindPopup:true,popType:"tip4",popMsg:this.intl.get("user-not-surport")})
    }
  }

  render() {
    const {url,controller} = this.props;
    const userAuth=this.state.userAuth;
    return (
      <div className="user-center-index">
        <div className="user-center-header">
          <div>
            <img src="/static/mobile/header/icon_wode_head@2x.png"/>
            <span>{controller.userName}</span>
          </div>
        </div>
        <div className="user-center-main">
          <ul className="list-section">
            <li className="list-item clearfix" onClick={this.isAuthentication.bind(this)}>
              <div className="fl">
                <img src="/static/mobile/user/icon_wd_sfrz@3x.png"/>
                <span>{this.intl.get("header-idVerify")}</span>
              </div>
              <div className="fr">
                <span>{this.verifyState[userAuth.state]}</span>
              </div>
            </li>
            <NavLink className="list-item clearfix" to={`${url}/safe`}>
              <div className="fl">
                <img src="/static/mobile/user/icon_wd_aqzx@3x.png"/>
                <span>{this.intl.get("header-security")}</span>
              </div>
              <div className="fr">
                <img src="/static/mobile/user/icon_qianjb@3x.png"/>
              </div>
            </NavLink>
          </ul>
          <ul className="list-section">
            <NavLink to={`${url}/aboutUs`} className="list-item clearfix">
              <div className="fl">
                <img src="/static/mobile/user/icon_wd_gywm@3x.png"/>
                <span>{this.intl.get("notice-about")}</span>
              </div>
              <div className="fr">
                <img src="/static/mobile/user/icon_qianjb@3x.png"/>
              </div>
            </NavLink>
            <NavLink to={"/mhelp/terms"} className="list-item clearfix">
              <div className="fl">
                  <img src="/static/mobile/user/icon_wd_yhxy@2x.png"/>
                  <span>{this.intl.get("login-readUser")}</span>
              </div>
              <div className="fr">
                  <img src="/static/mobile/user/icon_qianjb@3x.png"/>
              </div>
            </NavLink>
          </ul>
        </div>
        {this.state.remindPopup && <RemindPopup
          type={this.state.popType}
          msg={this.state.popMsg}
          autoClose = {true}
          onClose={() => {this.setState({ remindPopup: false });}}/>}
      </div>
    );
  }
}