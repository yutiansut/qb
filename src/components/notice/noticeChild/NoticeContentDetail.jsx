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
          <Link to="/whome">{this.intl.get("header-home")}</Link>&gt;
          <Link to="/wnotice">{this.intl.get("infoView")}</Link>&gt;
          <Link to="/wnotice/content/detail">{this.intl.get("notice-detail")}</Link>
        </h1>
        <h2 className="clearfix">
          <span>{this.props.controller.configData.language === 'zh-CN' ? activityInfo.subjectCn : activityInfo.subjectEn}</span>
          <b>{activityInfo.createdAt && activityInfo.createdAt.toDate('yyyy-MM-dd HH:mm:SS')}</b>
        </h2>
        <h3>
          {this.props.controller.configData.language === 'zh-CN' ? activityInfo.abstractCn : activityInfo.abstractEn}
        </h3>
        {/*<h4>*/}
          {/*作者*/}
        {/*</h4>*/}
        <div className="content">
          <p dangerouslySetInnerHTML={{ __html: this.props.controller.configData.language === 'zh-CN' ? activityInfo.contentCn : activityInfo.contentEn }}></p>
          {/* {this.props.controller.configData.language === 'zh-CN' ? activityInfo.contentCn : activityInfo.contentEn} */}
          <img src={activityInfo.titleImage} alt=""/>
        </div>
        <h5>
          <span>{this.intl.get("notice-link")}：</span>
          <a href={`http://${activityInfo.source}`} target="_blank">{`http://${activityInfo.source}`}</a>
        </h5>
        <h6>
          <span>{this.intl.get("notice-recommend")}：</span>
          <a href={activityInfo.recommendLink} target="_blank">{this.props.controller.configData.language === 'zh-CN' ? activityInfo.recommendCn : activityInfo.recommendEn}</a>
        </h6>
      </div>
    );
  }
}
