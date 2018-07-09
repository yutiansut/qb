import React, { Component } from 'react';
import ExchangeViewBase from "../ExchangeViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import './stylus/footer.styl'

export default class Footer extends ExchangeViewBase {
  constructor() {
    super()
    this.footerArray = [
      { label: this.intl.get('footer-info'), to: '/notice' },
      { label: this.intl.get('help-fees'), to: '/help/pricing' },
      { label: this.intl.get('footer-request'), to: '/notice/apply' },
      { label: this.intl.get('footer-protocol'), to: '/help/terms' },
      { label: this.intl.get('help-api-title'), to: '/help/api' }
    ];
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    return (
      <div className="footer-wrap clearfix">
        <div className="fl">
          <Link to='/home' className="home-img"><img src="/static/img/logo-black.svg" alt="" /></Link>
          <ul className="clearfix">
            {this.footerArray.map((item, index) => (<li key={index}>
              <Link to={item.to}>{item.label}</Link>
            </li>))}
          </ul>
          <ol className="clearfix">
            <li><img src="/static/img/twitter.svg" alt="" /></li>
            <li><img src="/static/img/facebook.svg" alt="" /></li>
            <li><img src="/static/img/fill.svg" alt="" /></li>
          </ol>
        </div>
        <div className="fr right-content">
          <p>{this.intl.get('footer-risk')}</p>
          <p>© 2018 QB.com . All rights reserved</p>
        </div>
      </div>
    )
  }
}

