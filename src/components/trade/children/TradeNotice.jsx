import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import ExchangeViewBase from '../../ExchangeViewBase'
import "../stylus/tradeNotice.styl"

export default class tradeNotice extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      orderHeight: 0,
      noticeTitleHeight: 0
    }
    const {controller} = props
    // 绑定view
    controller.setView(this)
    // 初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getInfoCon = controller.getInfoCon.bind(controller) // 获取资讯
    this.getOrderHeight = controller.getOrderHeight.bind(controller) // 获取高度
  }

  setView(view) {
    super.setView(view);
    return this.store.data
  }

  componentWillMount() {

  }

  async componentDidMount() {
     // tradeOrderHeight = document.getElementById('trade_order').offsetHeight
    let noticeTitleHeight = document.getElementById('notice_title').offsetHeight
    this.setState({
      noticeTitleHeight: noticeTitleHeight
    })
    // console.log(123, noticeTitleHeight)
    // console.log(1234334, tradeOrderHeight)
    // let noticeCon = document.getElementById('notice_con')
    // noticeCon.style.height = (tradeOrderHeight - noticeTitleHeight)
    // let noticeHeight =  35
    // let noticeNum = Math.floor((tradeOrderHeight - noticeTitleHeight) / noticeHeight)
    await this.getInfoCon(0, -1)

  }
  componentWillUpdate() {

  }

  componentDidUpdate() {

  }


  render() {
    // console.log(456, this.state.orderHeight)
    // console.log('资讯', this.state)
    return <div className="trade-notice-wrap">
      <h3 id="notice_title">{this.intl.get("information")}</h3>
      {Object.keys(this.state.infoList).length && this.state.infoList.data.length ?
        <ul id="notice_con" style={{minHeight: `${(this.state.orderHeight - this.state.noticeTitleHeight - 5)}px`, height: `${(this.state.orderHeight - this.state.noticeTitleHeight - 5)}px`}}>
          {Object.keys(this.state.infoList).length && this.state.infoList.data.length && this.state.infoList.data.map((v, index) =>
            <li key={index} id='notice_con'>
              <p>
                <Link to={`wnotice/content/detail?infoId=${v.activityId}`}>
                  {v.subject}
                </Link>
              </p>
              <span>{v.createdAt.toDate('yyyy-MM-dd HH:mm:ss')}</span>
            </li>)}
        </ul> : <div>{this.intl.get("user-none")}</div>}
    </div>;
  }
}
