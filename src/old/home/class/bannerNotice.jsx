import {observer} from "mobx-react";
import React from "react";

import BannerNoticeComponent from '../components/bannerNoticeComponent.jsx'
import BannerNoticeStore from '../store/bannerNoticeStore.jsx'

const bannerNoticeStore = new BannerNoticeStore(conf.announcementUrl)

class BannerNotice {
  constructor() {
  }

  display() {
    return <BannerNoticeComponent store={bannerNoticeStore}/>
  }
}

export default BannerNotice
