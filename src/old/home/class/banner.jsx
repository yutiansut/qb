import {observer} from "mobx-react";
import React from "react";

import BannerComponent from '../components/bannerComponent.jsx'
import BannerStore from '../store/bannerStore.jsx'

const bannerData = new BannerStore('/trade/pic/');

class Banner {
  constructor() {
  }
  
  display() {
    return <BannerComponent store={bannerData}/>
  }
}

export default Banner
