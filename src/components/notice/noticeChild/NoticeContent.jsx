import React, {Component} from 'react';
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
    this.getNoticeCon = controller.getNoticeCon.bind(controller) // 获取资讯
    this.getInfoCon = controller.getInfoCon.bind(controller) // 获取新闻
    console.log('12244', this.state)
  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }


  componentWillMount() {

  }

  async componentDidMount() {
    await Promise.all([this.getNoticeCon(), this.getInfoCon()])

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    return (
      <div className="bulletin-wrap">
        <div className="information-wrap">
          <h1>公告</h1>
          <h2 className={this.state.noticeList.data ? 'hide' : ''}>暂无公告</h2>
          <dl className={this.state.noticeList.data ? '' : 'hide'}>
            <dt>
              <i>标题</i>
              <em>类型</em>
              <span>时间</span>
            </dt>
            {this.state.noticeList.data && this.state.noticeList.data.map((v, index) => (<dd key={index}>
              <a href={`http://${v.source}`} target="_blank">
                <i>{this.props.controller.configData.language === 'zh-CN' ? v.subjectCn : v.subjectEn}</i>
                <em>公告</em>
                <span>{v.createdAt}</span>
              </a>
            </dd>))}
          </dl>
          <div className={this.state.noticeList.data ? '' : 'hide'}>
            {this.state.noticeList.totalCount &&<Pagination total={this.state.noticeList.totalCount}
                        pageSize={10}
                        showTotal={true}
                        showQuickJumper={true}/>}
          </div>
        </div>
        <div className="news-wrap" >
          <h1>资讯</h1>
          <h2 className={this.state.infoList.data ? 'hide' : ''}>暂无资讯</h2>
          <dl className={this.state.infoList.data ? '' : 'hide'}>
            <dt>
              <i>标题</i>
              <em>类型</em>
              <span>时间</span>
            </dt>
            {this.state.infoList.data && this.state.infoList.data.map((v, index) => (<dd key={index}>
              <a href={`http://${v.source}`} target="_blank">
                <i>{this.props.controller.configData.language === 'zh-CN' ? v.subjectCn : v.subjectEn}</i>
                <em>资讯</em>
                <span>{v.createdAt}</span>
              </a>
            </dd>))}
          </dl>
          <div className={this.state.infoList.data ? '' : 'hide'}>
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