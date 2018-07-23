import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import exchangeViewBase from '../../components/ExchangeViewBase'
import "./stylus/tradeNotice.styl"

export default class tradeNotice extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      tradeOrderHeight: 0,
      noticeTitleHeight: 0
    }
    const {controller} = props
    // 绑定view
    controller.setView(this)
    // 初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getInfoCon = controller.getInfoCon.bind(controller) // 获取资讯
  }

  setView(view){
    super.setView(view);
    return this.store.data
  }

  componentWillMount() {

  }

  async componentDidMount() {
    let tradeOrderHeight = document.getElementById('trade_order').offsetHeight
    let noticeTitleHeight = document.getElementById('notice_title').offsetHeight
    this.setState({
      tradeOrderHeight,
      noticeTitleHeight
    })
    // let noticeCon = document.getElementById('notice_con')
    // noticeCon.style.height = (tradeOrderHeight - noticeTitleHeight)
    // let noticeHeight =  35
    // let noticeNum = Math.floor((tradeOrderHeight - noticeTitleHeight) / noticeHeight)
    await this.getInfoCon(0, -1)
    // console.log(123, tradeOrderHeight, noticeHeight, noticeTitleHeight, noticeNum)
  }

  componentWillUpdate(...parmas) {

  }

  render() {
    // console.log('资讯', this.state)
    return <div className="trade-notice-wrap">
        <h3 id="notice_title">{this.intl.get("information")}</h3>
        {Object.keys(this.state.infoList).length ? <ul id="notice_con" style={{height: `${(this.state.tradeOrderHeight - this.state.noticeTitleHeight) / 100}rem`}}>
            {Object.keys(this.state.infoList).length && this.state.infoList.data && this.state.infoList.data.map((v, index) => <li key={index} id='notice_con'>
                <p>
                  <Link to={`wnotice/content/detail?infoId=${v.activityId}`}>
                    {this.props.controller.configData.language === "zh-CN"
                      ? v.subjectCn
                      : v.subjectEn}
                  </Link>
                </p>
                <span>{v.createdAt.toDate('yyyy-MM-dd HH:mm:SS')}</span>
              </li>)}
          </ul> : <div>{this.intl.get("user-none")}</div>}
      </div>;
  }
}
