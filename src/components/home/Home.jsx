import React, {Component} from 'react';

import HomeBanner from '../notice/HomeBanner.jsx' // banner图
import HomeNotice from '../notice/HomeNotice.jsx' // 公告
import HomeInformation from '../notice/HomeInformation.jsx' // 资讯


import exchangeViewBase from "../ExchangeViewBase";

import NoticeController from "../../class/notice/NoticeController";
const noticeController = new NoticeController();


export default class User extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="inner">
        <HomeBanner controller={noticeController}/>
        <HomeNotice controller={noticeController}/>
        <HomeInformation controller={noticeController}/>
      </div>
    );
  }
}
