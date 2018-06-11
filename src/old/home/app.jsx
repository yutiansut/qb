import React from 'react';
import {reaction} from 'mobx';
import {observer} from "mobx-react";
import "./css/home.css"
import io from 'socket.io-client';

import NoticeComponent from './components/noticeListComponent.jsx'

import Banner from './class/banner.jsx'

import BannerNotice from './class/bannerNotice.jsx'

import NoticeStore from './store/noticeStore.jsx'


import Recommend from './class/recommend.jsx'
import HomeMarket from './class/homeMarket.jsx'

import i18n from "../common/i18n.jsx";
import "./css/app.css"


const noticeStore = new NoticeStore(conf.noticeUrl);

/**
 * websocket
 */
const socket = io(conf.socket_io_url, {transports: ['websocket']});
socket.on('connect', function () {
  // console.log('connecting===========')
});
const banner = new Banner();
const bannerNotice = new BannerNotice();
const recommend = new Recommend();
const homeMarket = new HomeMarket();

socket.emit('ticker');

/**
 * 市场最新交易对信息{交易对， [价格， 数量， 24h]}
 */

socket.on("ticker-data", function (data) {
  console.log('ticker-data',data)
  recommend.store.updateItem(data)
  homeMarket.store.updateItem(data)
});

@observer
class APP extends React.Component {
  constructor(props) {
    super(props);
  }

  get notice() {
    return <NoticeComponent store={noticeStore}/>
  }

  componentDidMount() {
  }

  render() {
    i18n.options.fallbackLng = Array(LANGUAGE_CODE);
    return (
      <div>
        <div className='home-banner'>
          {banner.display()}
        </div>
        {bannerNotice.display()}
        {recommend.display()}
        {homeMarket.display()}
        <div className="home-notice">
          {this.notice}
        </div>
      </div>
    )
  }
}

export default APP
