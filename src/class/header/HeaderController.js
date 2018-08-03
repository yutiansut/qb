import ExchangeControllerBase from '../ExchangeControllerBase'
import React from 'react';

export default class HeaderController extends ExchangeControllerBase {
  constructor(props) {
    super(props)
  }

  /**
   *
   * navShow 是否显示导航栏 默认为true
   * con 标题名 默认为''
   * navBtn 按钮是否显示 默认为true
   * link 是采用goback 默认为true
   * url 不采用goback时的地址 默认为''
   * search 筛选按钮是否显示 默认为false
   * filter 过滤按钮是否显示 默认为false
   */

  addContent({nav, con, navBtn, link, url, search, filter, selectFn}) {
    this.view.setState({
      navShow: nav === undefined ? true : nav,
      title: con === undefined ? '' : con,
      navBtnShow: navBtn === undefined ? true : navBtn,
      selectLink: link === undefined ? true : link,
      linkUrl: url  === undefined ? '' : url,
      searchShow: search === undefined ? false : search,
      filterShow: filter === undefined ? false : filter,
      selectFn
    }, ()=>{
      console.log(11111, this.view.state)
    })
  }
}