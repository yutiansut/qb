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
      userNotice: {}
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
  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }

  showContent(v, i) {
    let userNotice = this.state.userNotice
    userNotice.list[i].isRead === 0 && (userNotice.list[i].isRead = 1)
    this.setState({
      userNoticePop: true,
      userContent: v.content,
      userNotice
    })
    console.log(111, v, i)
    this.upDateUserNoctice(v.id)
    this.changeHeaderNotice(v)
  }

  componentWillMount() {

  }

  async componentDidMount() {
    console.log('this.props.location', this.props.location.query)
    let fromCon = this.props.location.query && this.props.location.query.newsCon.content,
        fromId = this.props.location.query && this.props.location.query.newsCon.id,
        userNotice = this.state.userNotice,
        idArr = [],
        selectId = 0;

    console.log(111, userNotice.list)
    if (fromCon) {
      console.log(222, userNotice.list)
      userNotice.list.forEach(v => {
        idArr.push(v.id)
      })
      selectId = idArr.indexOf(fromId)
      userNotice.list[selectId].isRead = 1
      this.setState({
        userNoticePop: true,
        userContent: fromCon,
        userNotice
      })
      this.upDateUserNoctice(fromId)
    }
    await this.getUserNotice(0, 0, 10)

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    console.log('内容', this.state.userNotice)
    return (
      <div className="user-notice-wrap">
        <h1>通知</h1>
        <table>
          <thead>
            <tr>
              <th>{this.intl.get("notice-title")}</th>
              <th>{this.intl.get("time")}</th>
            </tr>
          </thead>
          <tbody className={`${Object.keys(this.state.userNotice).length && this.state.userNotice.list ? '' : 'hide'}`}>
          {Object.keys(this.state.userNotice).length && this.state.userNotice.list && this.state.userNotice.list.map((v, index) => (
            <tr key={index} onClick={value => this.showContent(v, index)}>
              <td >
                <b className={`${v.isRead === 0 ? '' : 'no-read'} read-flag`}></b>
                {v.content}
              </td>
              <td>{v.createAt.toDate('yyyy-MM-dd HH:mm:SS')}</td>
            </tr>))
            }
          </tbody>
        </table>
        <p className={Object.keys(this.state.userNotice).length && this.state.userNotice.list ? 'hide' : ''}>{this.intl.get("user-none")}</p>
        {/*<div className={Object.keys(this.state.userNotice).length ? '' : 'hide'}>*/}
          {/*{Object.keys(this.state.userNotice).length && <Pagination total={this.state.userNotice.totalCount}*/}
            {/*pageSize={10}*/}
            {/*showTotal={true}*/}
            {/*showQuickJumper={true}/>}*/}
        {/*</div>*/}
        {this.state.userNoticePop && <UserNoticeContent
          onClose={() => {this.setState({ userNoticePop: false });}}
          content={this.state.userContent}/>}
      </div>
    );
  }
}