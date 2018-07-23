import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import exchangeViewBase from '../../../components/ExchangeViewBase'
import Pagination from '../../../common/component/Pagination/index.jsx'

export default class noticeContent extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      // noticeTotalPage: 0,
      // infoTotalPage: 0,
      noticePage: 0,
      infoPage: 0,
    }
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getNoticeCon = controller.getNoticeCon.bind(controller) // 获取公告
    this.getInfoCon = controller.getInfoCon.bind(controller) // 获取资讯
  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }


  componentWillMount() {

  }

  async componentDidMount() {
    await Promise.all([this.getNoticeCon(0, 10), this.getInfoCon(0, 10)])
    this.setState({
      noticeTotalPage: this.state.noticeList.totalCount,
      infoTotalPage: this.state.infoList.totalCount
    })

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    console.log('内容', this.state)
    return (
      <div className="bulletin-wrap">
        <div className="information-wrap">
          <h1>{this.intl.get("notice")}</h1>
          {
            Object.keys(this.state.noticeList).length ? (<dl>
              <dt>
                <i>{this.intl.get("notice-title")}</i>
                <em>{this.intl.get("notice-type")}</em>
                <span>{this.intl.get("time")}</span>
              </dt>
              {/*<Link to={{pathname: `${this.props.match.url}/detail`, query: { noticeId: v.activityId }}} key={index}>*/}
              {Object.keys(this.state.noticeList).length && this.state.noticeList.data && this.state.noticeList.data.map((v, index) => (
                <Link to={`${this.props.match.url}/detail?noticeId=${v.activityId}`} key={index}>
                  <dd >
                    <i>{this.props.controller.configData.language === 'zh-CN' ? v.subjectCn : v.subjectEn}</i>
                    <em>{this.intl.get("notice")}</em>
                    <span>{v.createdAt.toDate('yyyy-MM-dd')}</span>
                  </dd>
                </Link>))}
            </dl>) : ( <h2>{this.intl.get("user-none")}</h2>)
          }

          {Object.keys(this.state.noticeList).length && <Pagination total={this.state.noticeTotalPage || this.state.noticeList.totalCount}
                      pageSize={10}
                      showTotal={true}
                      onChange={page => {
                        this.setState({ noticePage: page });
                        this.getNoticeCon(page - 1, 10)
                      }}
                      currentPage={this.state.noticePage}
                      showQuickJumper={true}/>}
        </div>

        <div className="news-wrap" >
          <h1>{this.intl.get("information")}</h1>
          {
            Object.keys(this.state.infoList).length ? (<dl>
              <dt>
                <i>{this.intl.get("notice-title")}</i>
                <em>{this.intl.get("notice-type")}</em>
                <span>{this.intl.get("time")}</span>
              </dt>
              {Object.keys(this.state.infoList).length && this.state.infoList.data && this.state.infoList.data.map((v, index) => (
                <Link to={`${this.props.match.url}/detail?infoId=${v.activityId}`} key={index}>
                  <dd>
                    {/*<a href={`http://${v.source}`} target="_blank">*/}
                    <i>{this.props.controller.configData.language === 'zh-CN' ? v.subjectCn : v.subjectEn}</i>
                    <em>{this.intl.get("information")}</em>
                    <span>{v.createdAt.toDate('yyyy-MM-dd')}</span>
                    {/*</a>*/}
                  </dd>
                </Link>))}
            </dl>) : ( <h2>{this.intl.get("user-none")}</h2>)
          }

          {Object.keys(this.state.infoList).length && <Pagination total={this.state.infoTotalPage || this.state.infoList.totalCount}
                      pageSize={10}
                      showTotal={true}
                      onChange={page => {
                        this.setState({ infoPage: page });
                        this.getInfoCon(page - 1, 10)
                      }}
                      currentPage={this.state.infoPage}
                      showQuickJumper={true}/>}

        </div>
      </div>
    );
  }
}