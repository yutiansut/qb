import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import UserSafeCenter from './children/UserSafeCenter.jsx' // 安全中心
import UserIdentity from './children/UserIdentity.jsx' // 身份认证
import UserIntegration from './children/UserIntegration.jsx' // 我的积分
// import "./stylus/user.styl"


export default class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let match = this.props.match
    return (
      <div className="clearfix inner">
        <ul className="user-nav fl">
          <li><Link to={`${match.url}/safe`}>安全中心</Link></li>
          <li><Link to={`${match.url}/identity`}>身份认证</Link></li>
          <li><Link to={`${match.url}/integration`}>我的积分</Link></li>
        </ul>
        <div className="user-content fl">
          <Switch>
            <Route path={`${match.url}/safe`} component={UserSafeCenter}/>
            <Route path={`${match.url}/identity`} component={UserIdentity}/>
            <Route path={`${match.url}/integration`} component={UserIntegration}/>
            <Redirect to={`${match.url}/safe`} />
          </Switch>
        </div>
      </div>
    );
  }
}
