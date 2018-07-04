import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'

import NoticeContent from './noticeChild/NoticeContent.jsx' // 资讯公告
import ContactUs from './noticeChild/ContactUs.jsx' // 联系我们
import CoinApply from './noticeChild/CoinApply' // 上币申请

import "./stylus/noticeBulletin.styl"

import exchangeViewBase from "../ExchangeViewBase";

export default class User extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    const {controller} = this.props
    let match = this.props.match
    return (
      <div className="clearfix notice-wrap">
        <ul className="notice-nav fl">
          <li><NavLink activeClassName="active" to={`${match.url}/content`} >资讯公告</NavLink></li>
          <li><NavLink activeClassName="active" to={`${match.url}/contact`}>联系我们</NavLink></li>
          <li><NavLink activeClassName="active" to={`${match.url}/apply`}>上币申请</NavLink></li>
        </ul>
        <div className="notice-content fl">
          <Switch>
            <Route path={`${match.url}/content`} component={({match}) => (
              <NoticeContent controller={controller} match={match}/>
            )}/>
            <Route path={`${match.url}/contact`} component={({match}) => (
              <ContactUs controller={controller} />
            )}/>
            <Route path={`${match.url}/apply`} component={({match}) => (
              <CoinApply controller={controller} />
            )}/>
            <Redirect to={`${match.url}/content`} />
          </Switch>
        </div>
      </div>
    );
  }
}
