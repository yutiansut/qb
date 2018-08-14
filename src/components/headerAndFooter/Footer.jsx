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
    this.onScroll= () => {
          let headerName = document.getElementById('header'), activeHeight = document.getElementById('active');
          let buttonTop = document.querySelector('.aside-nav-top');
          let buttonKf = document.querySelector('.aside-nav-desk');
          let buttonApp = document.querySelector('.aside-nav-app');
          let buttonK = document.getElementById('udesk_container');
          let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

          if (activeHeight) {
              if(scrollTop >= activeHeight.offsetHeight - 120) {
                  headerName.className = 'headerNav clearfix'
              } else {
                  headerName.className = 'homeNav clearfix'
              }
          }

          if (scrollTop >= document.documentElement.clientHeight) {
              buttonTop.style.display = "block";
              buttonKf.style.display = "block";
              buttonApp.style.display = "block";
              buttonK && (buttonK.style.display = "block");
          } else {
              buttonTop.style.display = "none";
              buttonKf.style.display = "none";
              buttonApp.style.display = "none";
              buttonK && (buttonK.style.display = "none");
          }
      };
  }

  componentDidMount() {
      let lang = this.props.configController.language;
      // 加载客服
      (function(a,h,c,b,f,g){a["UdeskApiObject"]=f;a[f]=a[f]||function(){(a[f].d=a[f].d||[]).push(arguments)};g=h.createElement(c);g.async=1;g.charset="utf-8";g.src=b;c=h.getElementsByTagName(c)[0];c.parentNode.insertBefore(g,c)})(window,document,"script","https://assets-cli.udesk.cn/im_client/js/udeskApi.js","ud");
      ud({
          "code": "278eh9c7",
          "link":   "https://qbservice.udesk.cn/im_client/?web_plugin_id=" + (lang === "zh-CN" ?  "49139" :  "50065")
      });
      window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
      let buttonK = document.getElementById('udesk_container');
      buttonK && (buttonK.style.display = "none");
      window.removeEventListener("scroll", this.onScroll);
  }

  render() {
    return (
      <div className="footer-wrap">
        <div>
          <Link to='/home' className="home-img"><img src={this.$imagesMap.$logo_footer} alt="" /></Link>
          <ul>
            {this.footerArray.map((item, index) => (<li key={index}>
              <Link to={item.to}>{item.label}</Link>
            </li>))}
            <li><a href="http://qbservice.udesk.cn/hc" target='_blank'>{this.intl.get('normalProblem')}</a></li>
          </ul>
        </div>
        <div className="right-content">
          <hr/>
          <p>© 2018 QB.com  All rights reserved</p>
        </div>
        <div>
          <ol className="clearfix">
            <li><a href="https://twitter.com/QB_Exchange" target="_blank"><img src="/static/img/footer/twitter_new.svg" alt="" /></a></li>
            <li><a href="https://www.facebook.com/qbexchange/" target="_blank"><img src="/static/img/footer/FaceBook_new.svg" alt="" /></a></li>
            <li><a href="https://weibo.com/u/6596593083/home?wvr=5" target="_blank"><img src="/static/img/footer/wb.svg" alt="" /></a></li>
            {/*<li><img src="/static/img/footer/fill.svg" alt="" /></li>*/}
            <li><img src={this.$imagesMap.$footer_wechat} alt="" className="wx-img" /><i className="wx-qrCode"></i></li>
            <li><a href="https://t.me/QB_ExchangeEN" target="_blank"><img src={this.$imagesMap.$footer_telegram} alt="" /></a></li>
          </ol>
        </div>
        <div className='aside-nav'>
          <div className='aside-nav-app'>
          {this.props.configController.versionAndroidInfo && this.props.configController.versionAndroidInfo.url && this.props.configController.versionAndroidInfo.qr && (
            <div className='erweima'>
              <a href={this.props.configController.versionAndroidInfo.url}>
                <img src={this.props.configController.versionAndroidInfo.qr} alt=""/>
                <span>Android</span>
              </a>
            </div>
          ) || null}</div>
          <div className='aside-nav-desk'></div>
          <div className='aside-nav-top' onClick={() => {window.scroll(0, 0)}}></div>
        </div>
      </div>
    )
  }
}

