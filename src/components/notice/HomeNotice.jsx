import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import exchangeViewBase from '../../components/ExchangeViewBase'
import "./stylus/homeNotice.styl"

export default class homeNotice extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      top1: 0,
      top2: 100,
      criticalArr: [0, 100]
    }
    const {controller} = props
    // 绑定view
    controller.setView(this)
    // 初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getNoticeCon = controller.getNoticeCon.bind(controller) // 获取公告
  }

  // setView(view){
  //   super.setView(view);
  //   return this.store.data
  // }

  componentWillMount() {

  }

  async componentDidMount() {
    await this.getNoticeCon(0, 5);
    let result = this.state.noticeList
    if (this.state.noticeList && this.state.noticeList.length) {
      this.setState(
        {
          top2: Math.ceil(result.length / 2) * 100,
          criticalArr: Array.from(
            {length: Math.ceil(result.length / 2 + 1)},
            (item, index) => index * 100
          )
        },
        () => {
          this.props.controller.swiper(
            "carousel",
            this,
            "top1",
            "top2",
            this.state.criticalArr,
            10,
            3000
          );
        }
      );
    }
  }

  componentWillUpdate(...parmas) {

  }

  componentWillunmount() {
    this.props.controller.swiperStop("carousel");
  }

  render() {
    // console.log('首页公告', this.state)
    return <div className={`${this.state.noticeList && this.state.noticeList.length ? "" : "hide"} home-notice-wrap`}>
      {this.state.noticeList && this.state.noticeList.length && <div className="home-notice-content clearfix">
        <p>{this.intl.get("notice")}</p>
        <ul style={{top: this.state.top1 + "%"}}>
          {this.state.noticeList.map((v, index) => <li key={index}>
            <Link to={`notice/content/detail?noticeId=${v.activityId}`}>
              {this.props.controller.configData.language === "zh-CN" ? v.subjectCn : v.subjectEn}
            </Link>
          </li>)}
        </ul>
        <ul style={{top: this.state.top2 + "%"}}>
          {this.state.noticeList.map((v, index) => (
            <li key={index}>
              {this.props.controller.configData.language === "zh-CN" ? v.subjectCn : v.subjectEn}
            </li>
          ))}
        </ul>
      </div>}
    </div>;
  }
}
