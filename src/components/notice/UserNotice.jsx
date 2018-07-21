import React, {Component} from 'react';
import exchangeViewBase from '../../components/ExchangeViewBase'
import Pagination from '../../common/component/Pagination/index.jsx'
import UserNoticeContent from './noticeChild/UserNoticePop.jsx'
import "./stylus/userNotice.styl"

export default class userNotice extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      userNoticePop: false,
      userContent: "",
      userNotice: {},
      page: 1,
      totalPage: 0
    }
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getUserNotice = controller.getUserNotice.bind(controller) // 获取通知列表
    this.upDateUserNoctice = controller.upDateUserNoctice.bind(controller)
    this.showContent = this.showContent.bind(this)
    this.changeHeaderNotice = controller.changeHeaderNotice.bind(controller) // 改变头部信息
    this.changePage = this.changePage.bind(this)
  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }

  showContent(v, i) {
    let userNotice = this.state.userNotice
    if (userNotice.list[i].isRead === 0){
      this.changeHeaderNotice(v)
      userNotice.list[i].isRead = 1
      this.upDateUserNoctice(v.id)
    }
    this.setState({
      userNoticePop: true,
      userContent: this.props.controller.configData.language === 'zh-CN' ? v.content.contentCN : v.content.contentEN,
      userNotice
    })
  }

  changePage() { // 切换分页

  }

  componentWillMount() {

  }

  async componentDidMount() {
    console.log('this.props.location', this.props.location.query)
    // let fromCon = this.props.location.query && this.props.location.query.newsCon.content,
    //     fromId = this.props.location.query && this.props.location.query.newsCon.id,
    //     userNotice = this.state.userNotice,
    //     idArr = [],
    //     selectId = 0;
    //
    // console.log(111, userNotice.list)
    // if (fromCon) {
    //   console.log(222, userNotice.list)
    //   userNotice.list.forEach(v => {
    //     idArr.push(v.id)
    //   })
    //   selectId = idArr.indexOf(fromId)
    //   userNotice.list[selectId].isRead = 1
    //   this.setState({
    //     userNoticePop: true,
    //     userContent: fromCon,
    //     userNotice
    //   })
    //   this.upDateUserNoctice(fromId)
    // }
    await this.getUserNotice(0, 0, 10)
    this.setState({
      totalPage: this.state.userNotice.totalCount
    })
  }

  componentWillUpdate(...parmas) {

  }

  render() {
    console.log('内容', this.state.userNotice)
    return (
      <div className="user-notice-wrap">
        <h1>{this.intl.get("userNotice")}</h1>
        <div className="table-div">
          <div className="table-title">
            <span>{this.intl.get("notice-title")}</span>
            <i>{this.intl.get("time")}</i>
          </div>
          <ul className={`${Object.keys(this.state.userNotice).length && this.state.userNotice.list ? '' : 'hide'}`}>
          {Object.keys(this.state.userNotice).length && this.state.userNotice.list && this.state.userNotice.list.map((v, index) => (
            <li key={index} onClick={value => this.showContent(v, index)} className="clearfix">
              <p>
                <b className={`${v.isRead === 0 ? '' : 'no-read'} read-flag`}></b>
                <span>{this.props.controller.configData.language === 'zh-CN' ? v.content.contentCN : v.content.contentEN}</span>
              </p>
              <i>{v.createAt.toDate('yyyy-MM-dd HH:mm:SS')}</i>
            </li>))
          }
          </ul>
        </div>
        <p className={`${Object.keys(this.state.userNotice).length && this.state.userNotice.list ? 'hide' : ''} nothing-text`}>{this.intl.get("user-none")}</p>
        {Object.keys(this.state.userNotice).length && <Pagination total={this.state.totalPage || this.state.userNotice.totalCount}
          pageSize={10}
          showTotal={true}
          onChange={page => {
            this.setState({ page });
            this.getUserNotice(0, page-1, 10)
          }}
          currentPage={this.state.page}
          showQuickJumper={true}/>}
        {this.state.userNoticePop && <UserNoticeContent
          onClose={() => {this.setState({ userNoticePop: false });}}
          content={this.state.userContent}/>}
      </div>
    );
  }
}
