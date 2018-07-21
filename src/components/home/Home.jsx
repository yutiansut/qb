import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import exchangeViewBase from "../ExchangeViewBase";
import HomeRecommend from './children/HomeRecommend.jsx' //交易盘市场
import HomeMarket from './children/HomeMarket.jsx' //交易盘市场
import HomeNotice from './children/HomeNotice.jsx' // 首页公告
import HomeActivity from './children/HomeActivity.jsx' // 首页活动
import HomeAdvantage from './children/HomeAdvantage.jsx'

import MarketController from '../../class/market/MarketController'

let recommendController,
  marketController;

import "./stylus/home.styl"
import "./stylus/homeMarkt.styl"


export default class Home extends exchangeViewBase {
  constructor(props) {
    super(props);
    recommendController = new MarketController('recommend');
    // marketController = new MarketController();
  }

  componentDidMount() { // 滚动事件 改变头部
    super.componentDidMount();
    let headerName = document.getElementById('header'), activeHeight = document.getElementById('active')
    let buttonTop = document.querySelector('.aside-nav-top');
    let buttonKf = document.querySelector('.aside-nav-desk')
    let buttonK = document.getElementById('udesk_container')
    window.addEventListener('scroll', () => {
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      if(scrollTop >= activeHeight.offsetHeight) {
        headerName.className = 'headerNav clearfix'
      } else {
        headerName.className = 'homeNav clearfix'
      }
      if (scrollTop >= document.documentElement.clientHeight) {
        // console.log('true')
        buttonTop.style.display = "block";
        buttonKf.style.display = "block";
        (function(a,h,c,b,f,g){a["UdeskApiObject"]=f;a[f]=a[f]||function(){(a[f].d=a[f].d||[]).push(arguments)};g=h.createElement(c);g.async=1;g.charset="utf-8";g.src=b;c=h.getElementsByTagName(c)[0];c.parentNode.insertBefore(g,c)})(window,document,"script","http://assets-cli.udesk.cn/im_client/js/udeskApi.js","ud");
        ud({
          "code": "278eh9c7",
          "link": "http://qbservice.udesk.cn/im_client/?web_plugin_id=50065"
        });
      } else {
        // console.log('false')
        buttonTop.style.display = "none";
        buttonKf.style.display = "none";

      }
    })
  }

  render() {
    return (
        <div className="home-wrap">
          <div className="home-top">
            <HomeActivity controller={this.props.activityController} ref="dfa"/>
            <HomeNotice controller={this.props.noticeController}/>
            <HomeRecommend controller={recommendController}/>
          </div>
          <HomeMarket controller={this.props.marketController}/>
          <HomeAdvantage/>
        </div>
    );
  }
}
