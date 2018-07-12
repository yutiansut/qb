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
      { label: this.intl.get('footer-info'), to: '/wnotice' },
      { label: this.intl.get('help-fees'), to: '/help/pricing' },
      { label: this.intl.get('footer-request'), to: '/wnotice/apply' },
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
          <Link to='/whome' className="home-img"><img src="/static/img/logo-black.svg" alt="" /></Link>
          <ul className="clearfix">
            {this.footerArray.map((item, index) => (<li key={index}>
              <Link to={item.to}>{item.label}</Link>
            </li>))}
          </ul>
          <ol className="clearfix">
            <li><a href="https://twitter.com/QB_Exchange" target="_blank"><img src="/static/img/footer/twitter.svg" alt="" /></a></li>
            <li><a href="https://www.facebook.com/qbexchange/" target="_blank"><img src="/static/img/footer/FaceBook.svg" alt="" /></a></li>
            {/*<li><img src="/static/img/footer/fill.svg" alt="" /></li>*/}
            <li><img src="/static/img/footer/wx.svg" alt="" className="wx-img" /><i className="wx-qrCode"></i></li>
            <li><a href="https://t.me/QB_ExchangeEN" target="_blank"><img src="/static/img/footer/Telegram.svg" alt="" /></a></li>
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

