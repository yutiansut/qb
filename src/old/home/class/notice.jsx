import {observer} from "mobx-react";
import React from "react";

import NoticeComponent from '../components/noticeListComponent.jsx'
import NoticeStore from '../store/noticeStore.jsx'

// import Pair from './pair'
const noticeData = new NoticeStore()

class Notice {
  constructor() {
    this.display = this.display.bind(this)
  }
  
  // get(params) {
  //     let res = this.store.get(params);
  //     this.state = res;
  //     this.state.pairArr = res.arr.map(v => {
  //         return new Pair(...v)
  //     })
  // }
  
  display() {
    return <NoticeComponent store={noticeData}/>
  }
}

export default Notice
