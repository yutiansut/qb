import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import exchangeViewBase from '../../components/ExchangeViewBase'
import "./stylus/tradeNotice.styl"

export default class tradeNotice extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {}
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
    await this.getInfoCon(0, 10)
  }

  componentWillUpdate(...parmas) {

  }

  render() {
    // console.log('资讯', this.state)
    return <div className="trade-notice-wrap">
        <h3>{this.intl.get("information")}</h3>
        {this.state.infoList && this.state.infoList.length ? <ul>
            {this.state.infoList.map((v, index) => <li key={index}>
                <p>
                  <Link to={`notice/content/detail?infoId=${v.activityId}`}>
                    {this.props.controller.configData.language === "zh-CN"
                      ? v.subjectCn
                      : v.subjectEn}
                  </Link>
                </p>
                <span>{v.createdAt}</span>
              </li>)}
          </ul> : <div>{this.intl.get("user-none")}</div>}
      </div>;
  }
}
