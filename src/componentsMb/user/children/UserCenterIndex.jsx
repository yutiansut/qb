import React from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase.jsx';
import {NavLink} from 'react-router-dom'

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
    };
    let controller=this.props.controller;
    controller.setView(this);
    this.getUserAuthData = controller.getUserAuthData.bind(controller) // 获取用户认证信息
  }

  async componentWillMount() {
      await this.getUserAuthData();
  }

  render() {
    const {url,controller} = this.props;
    const userAuth=this.state.userAuth;
    return (
      <div className="user-center-index">
        <div className="user-center-header">
          <div>
            <img src="/static/mobile/user/icon_wd_head@3x.png"/>
            <span>{controller.userName}</span>
          </div>
        </div>
        <div className="user-center-main">
          <ul className="list-section">
            <li className="list-item clearfix">
              <div className="fl">
                <img src="../../../static/mobile/user/icon_wd_sfrz@3x.png"/>
                <span>{this.intl.get("header-idVerify")}</span>
              </div>
              <div className="fr">
                <span>{this.verifyState[userAuth.state]}</span>
              </div>
            </li>
            <NavLink to={`${url}/safe`}>
              <li className="list-item clearfix">
                <div className="fl">
                  <img src="../../../static/mobile/user/icon_wd_aqzx@3x.png"/>
                  <span>{this.intl.get("header-security")}</span>
                </div>
                <div className="fr">
                  <img src="../../../static/mobile/user/icon_qianjb@3x.png"/>
                </div>
              </li>
            </NavLink>
          </ul>
          <ul className="list-section">
            <NavLink to={`${url}/aboutUs`}>
              <li className="list-item clearfix">
                <div className="fl">
                  <img src="../../../static/mobile/user/icon_wd_gywm@3x.png"/>
                  <span>{this.intl.get("notice-about")}</span>
                </div>
                <div className="fr">
                  <img src="../../../static/mobile/user/icon_qianjb@3x.png"/>
                </div>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    );
  }
}