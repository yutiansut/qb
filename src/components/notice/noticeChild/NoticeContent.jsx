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
    this.state = {}
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

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    console.log('内容', this.state)
    return (
      <div className="bulletin-wrap">
        <div className="information-wrap">
          <h1>公告</h1>
          <h2 className={this.state.noticeList.length ? 'hide' : ''}>暂无公告</h2>
          <dl className={this.state.noticeList.length ? '' : 'hide'}>
            <dt>
              <i>标题</i>
              <em>类型</em>
              <span>时间</span>
            </dt>
            {/*<Link to={{pathname: `${this.props.match.url}/detail`, query: { noticeId: v.activityId }}} key={index}>*/}
            {this.state.noticeList.length && this.state.noticeList.map((v, index) => (
            <Link to={`${this.props.match.url}/detail?noticeId=${v.activityId}`} key={index}>
              <dd >
                <i>{this.props.controller.configData.language === 'zh-CN' ? v.subjectCn : v.subjectEn}</i>
                <em>公告</em>
                <span>{v.createdAt}</span>
              </dd>
            </Link>))}
          </dl>
          <div className={this.state.noticeList.length ? '' : 'hide'}>
            {this.state.noticeList.totalCount &&<Pagination total={this.state.noticeList.totalCount}
                        pageSize={10}
                        showTotal={true}
                        showQuickJumper={true}/>}
          </div>
        </div>

        <div className="news-wrap" >
          <h1>资讯</h1>
          <h2 className={this.state.infoList.length ? 'hide' : ''}>暂无资讯</h2>
          <dl className={this.state.infoList.length ? '' : 'hide'}>
            <dt>
              <i>标题</i>
              <em>类型</em>
              <span>时间</span>
            </dt>
            {this.state.infoList.length && this.state.infoList.map((v, index) => (<Link to={{pathname: `${this.props.match.url}/detail`, query: { infoId: v.activityId }}} key={index}>
              <dd>
              {/*<a href={`http://${v.source}`} target="_blank">*/}
                <i>{this.props.controller.configData.language === 'zh-CN' ? v.subjectCn : v.subjectEn}</i>
                <em>资讯</em>
                <span>{v.createdAt}</span>
              {/*</a>*/}
              </dd>
            </Link>))}
          </dl>
          <div className={this.state.infoList.length ? '' : 'hide'}>
            {this.state.infoList.totalCount && <Pagination total={this.state.infoList.totalCount}
                        pageSize={10}
                        showTotal={true}
                        showQuickJumper={true}/>}
          </div>
        </div>

      </div>
    );
  }
}