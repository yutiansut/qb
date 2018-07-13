import React from 'react';
import exchangeViewBase from '../../ExchangeViewBase.jsx';

import '../stylus/userSafeCenter.styl'

export default class UserCenterIndex extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      setFundPass : false
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="user-safe-center">
        <div className="safe-center-header">
          <div className="back" onClick={() => {this.props.setListDisplay()}}>
            <img src="../../../../static/mobile/user/icon_qianjb@3x.png"/>
            <span>返回</span>
          </div>
          <div className="name">安全中心</div>
        </div>
        <ul className="safe-center-container">
          <li className="item clearfix">
            <span className="fl">设置登录密码</span>
            <div className="fr">
              <img src="../../../static/mobile/user/icon_qianjb@3x.png"/>
            </div>
          </li>
          <li className="item clearfix">
            <span className="fl">设置登录密码</span>
            <div className="fr">
              <img src="../../../static/mobile/user/icon_qianjb@3x.png"/>
            </div>
          </li>
          <li className="item clearfix">
            <span className="fl">设置登录密码</span>
            <div className="fr">
              <span>每次</span>
              <img src="../../../static/mobile/user/icon_qianjb@3x.png"/>
            </div>
          </li>
        </ul>
        {this.state.setFundPass && <div className="need-fund-pass">
          <div className="select-section">
            <button>每次</button>
            <button>2小时</button>
            <button>不输入</button>
            <button>取消</button>
          </div>
        </div>}
      </div>
    );
  }
}