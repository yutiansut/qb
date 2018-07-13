import React from 'react';
import exchangeViewBase from '../../ExchangeViewBase.jsx';

import '../stylus/userCenterIndex.styl'

export default class UserCenterIndex extends exchangeViewBase {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="user-center-index">
        <div className="user-center-header">
          <h1>我的</h1>
          <div>
            <img src="../../../static/mobile/user/touxiang.jpg"/>
            <span>13611363456</span>
          </div>
        </div>
        <div className="user-center-main">
          <ul className="list-section">
            <li className="list-item clearfix">
              <div className="fl">
                <img src="../../../static/mobile/user/icon_wd_sfrz@3x.png"/>
                <span>身份认证</span>
              </div>
              <div className="fr">
                <span>未认证</span>
                <img src="../../../static/mobile/user/icon_qianjb@3x.png"/>
              </div>
            </li>
            <li className="list-item clearfix">
              <div className="fl">
                <img src="../../../static/mobile/user/icon_wd_aqzx@3x.png"/>
                <span>安全中心</span>
              </div>
              <div className="fr">
                <img src="../../../static/mobile/user/icon_qianjb@3x.png"/>
              </div>
            </li>
          </ul>
          <ul className="list-section">
            <li className="list-item clearfix">
              <div className="fl">
                <img src="../../../static/mobile/user/icon_wd_gywm@3x.png"/>
                <span>关于我们</span>
              </div>
              <div className="fr">
                <img src="../../../static/mobile/user/icon_qianjb@3x.png"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}