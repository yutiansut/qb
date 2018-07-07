import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import exchangeViewBase from '../../../components/ExchangeViewBase'
import "../stylus/noticeDetail.styl"


export default class homeNotice extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      queryType: 0,
      queryId: ""
    }
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.activityCon = controller.activityCon.bind(controller) // 获取详情
  }

  // setView(view){
  //   super.setView(view);
  //   return this.store.data
  // }
  componentWillMount() {
    // let ActionId = this.props.location.query.noticeId;
    let url = window.location.search, str1, str2;
    str1 = url.split('?')
    str2 = str1[1].split('=')
    this.setState({
      queryType: str2[0] === 'noticeId' ? 0 : 2,
      queryId: str2[1] * 1
    })
  }

  async componentDidMount() {
    await this.activityCon(this.state.queryId, this.state.queryType)

  }
  componentWillUpdate(...parmas) {

  }

  render() {
    let activityInfo = this.state.activityList
    return (
      <div className="notice-detail-wrap ">
        <h1>
          <Link to="/home">首页</Link>&gt;
          <Link to="/notice">资讯概览</Link>&gt;
          <Link to="/notice/content/detail">资讯详情</Link>
        </h1>
        <h2 className="clearfix">
          <span>{this.props.controller.configData.language === 'zh-CN' ? activityInfo.subjectCn : activityInfo.subjectEn}</span>
          <b>{activityInfo.createdAt}</b>
        </h2>
        <h3>
          {this.props.controller.configData.language === 'zh-CN' ? activityInfo.abstractCn : activityInfo.abstractEn}
        </h3>
        <h4>
          作者
        </h4>
        <div className="content">
          {this.props.controller.configData.language === 'zh-CN' ? activityInfo.contentCn : activityInfo.contentEn}
          <img src={activityInfo.titleImage} alt=""/>
        </div>
        <h5>
          <span>链接：</span>
          <a href={`http://${activityInfo.source}`} target="_blank">{`http://${activityInfo.source}`}</a>
        </h5>
        <h6>
          <span>推荐：</span>
          <a href={activityInfo.recommendLink} target="_blank">{this.props.controller.configData.language === 'zh-CN' ? activityInfo.recommendCn : activityInfo.recommendEn}</a>
        </h6>
      </div>
    );
  }
}
