import ExchangeControllerBase from '../ExchangeControllerBase'
// import React from 'react';

export default class HeaderController extends ExchangeControllerBase {
  constructor(props) {
    super(props)
  }

  setView(view){
    super.setView(view);
    // return this.store.data
  }

  /**
   *
   * con 标题名 默认为''
   * logo 是否显示logo 默认为true
   * back 是否显示返回 默认为true
   * link 是采用goback 默认为true
   * url 不采用goback时的地址 默认为''
   */

  addContent(con, logo, back, link, url) {
    this.view.setState({
      title: con,
      logoShow: logo,
      backShow: back,
      selectLink: link,
      linkUrl: url
    })
  }
}