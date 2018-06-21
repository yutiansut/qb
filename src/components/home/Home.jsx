import React, {Component} from 'react';

import HomeBanner from '../notice/HomeBanner.jsx' // banner图
import HomeNotice from '../notice/HomeNotice.jsx' // 公告
import HomeInformation from '../notice/HomeInformation.jsx' // 资讯
import HomeRecommend from './children/HomeRecommend.jsx' //推荐交易对
import HomeMarket from './children/HomeMarket.jsx' //交易盘市场


import exchangeViewBase from "../ExchangeViewBase";

// import NoticeController from "../../class/notice/NoticeController";
import MarketController from '../../class/market/MarketController'
// const noticeController = new NoticeController();
const recommendController = new MarketController();
const marketController = new MarketController();


export default class Home extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="inner">
        <HomeRecommend controller={recommendController}/>
        <HomeMarket controller={marketController}/>
        {/*<HomeBanner controller={noticeController}/>*/}
        {/*<HomeNotice controller={noticeController}/>*/}
        {/*<HomeInformation controller={noticeController}/>*/}
      </div>
    );
  }
}
