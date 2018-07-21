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

    this.onScroll= () => {
        let headerName = document.getElementById('header'), activeHeight = document.getElementById('active');
        let buttonTop = document.querySelector('.aside-nav-top');
        let buttonKf = document.querySelector('.aside-nav-desk');
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
          buttonK && (buttonK.style.display = "block");
        } else {
          buttonTop.style.display = "none";
          buttonKf.style.display = "none";
          buttonK && (buttonK.style.display = "none");
        }
      };
  }


  componentDidMount() { // 滚动事件 改变头部
    super.componentDidMount();

    let lang = this.props.marketController.configController.language;

    // 加载客服
    (function(a,h,c,b,f,g){a["UdeskApiObject"]=f;a[f]=a[f]||function(){(a[f].d=a[f].d||[]).push(arguments)};g=h.createElement(c);g.async=1;g.charset="utf-8";g.src=b;c=h.getElementsByTagName(c)[0];c.parentNode.insertBefore(g,c)})(window,document,"script","http://assets-cli.udesk.cn/im_client/js/udeskApi.js","ud");
    ud({
      "code": "278eh9c7",
      "link":   "//qbservice.udesk.cn/im_client/?web_plugin_id=" + (lang === "zh-CN" ?  "49139" :  "50065")
    });

    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    //let buttonK = document.getElementById('udesk_container');
    //buttonK && (buttonK.parentNode.removeChild(buttonK));
    window.removeEventListener("scroll", this.onScroll);
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
