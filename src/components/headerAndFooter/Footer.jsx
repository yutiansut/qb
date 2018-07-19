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
    (function(a,h,c,b,f,g){a["UdeskApiObject"]=f;a[f]=a[f]||function(){(a[f].d=a[f].d||[]).push(arguments)};g=h.createElement(c);g.async=1;g.charset="utf-8";g.src=b;c=h.getElementsByTagName(c)[0];c.parentNode.insertBefore(g,c)})(window,document,"script","http://assets-cli.udesk.cn/im_client/js/udeskApi.js","ud");
    ud({
      "code": "278eh9c7",
      "link": "http://qbservice.udesk.cn/im_client/?web_plugin_id=50065"
    });
    // let a =document.getElementById('udesk_btn') && document.getElementById('udesk_btn').getElementsByTagName('a')[0];
    // a.style.top='4.5rem'
    
    // console.log(123,document.getElementById('udesk_btn').getElementsByTagName('a'))
  }

  componentWillUpdate(...parmas) {

  }

  render() {
    return (
      <div className="footer-wrap">
        <div>
          <Link to='/whome' className="home-img"><img src="/static/img/logo_footer.svg" alt="" /></Link>
          <ul>
            {this.footerArray.map((item, index) => (<li key={index}>
              <Link to={item.to}>{item.label}</Link>
            </li>))}
          </ul>
        </div>
        <div className="right-content">
          <hr/>
          <p>© 2018 QB.com . All rights reserved</p>
        </div>
        <div>
          <ol className="clearfix">
            <li><a href="https://twitter.com/QB_Exchange" target="_blank"><img src="/static/img/footer/twitter_new.svg" alt="" /></a></li>
            <li><a href="https://www.facebook.com/qbexchange/" target="_blank"><img src="/static/img/footer/FaceBook_new.svg" alt="" /></a></li>
            {/*<li><img src="/static/img/footer/fill.svg" alt="" /></li>*/}
            <li><img src="/static/img/footer/wechat.svg" alt="" className="wx-img" /><i className="wx-qrCode"></i></li>
            <li><a href="https://t.me/QB_ExchangeEN" target="_blank"><img src="/static/img/footer/Telegram_new.svg" alt="" /></a></li>
          </ol>
        </div>
        <div className='aside-nav'>
          <div className='aside-nav-desk'></div>
          <div className='aside-nav-top'></div>
        </div>
      </div>
    )
  }
}

