import ExchangeControllerBase from '../ExchangeControllerBase'
import NoticeStore from './NoticeStore'

export default class NoticeController extends ExchangeControllerBase {
  constructor(props) {
    super(props)
    this.store = new NoticeStore()
    this.store.setController(this)
  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }

  setHeaderView(view) { // 头部导航view
    this.noticeHeaderView = view
  }

  get configData() {
    return this.configController.initState
  }

  get userId() {
    return this.userController.userId;
  }

  get token() {
    return this.userController.userToken;
  }

  async getNoticeCon(page, pageSize) { // 获取公告
    let noticeList = await this.store.noticeCon(page, pageSize);
    this.view.setState({noticeList})
  }

  async getInfoCon(page, pageSize) { // 获取资讯
    let infoList = await this.store.infoCon(page, pageSize);
    this.view.setState({infoList})
  }

  async getUserNotice( unRead, page, pageSize) { // 获取用户通知列表
    let userNotice = await this.store.userNotice( unRead, page, pageSize);
    // console.log('通知列表', userNotice)
    this.view && this.view.setState({userNotice})
  }

  async getUserNoticeHeader( unRead, page, pageSize) { // 获取用户头部通知列表
    let userNoticeHeader = await this.store.userNotice( unRead, page, pageSize);
    // console.log('通知列表头部', userNoticeHeader)
    this.noticeHeaderView.setState({userNoticeHeader})
  }

  async upDateUserNoctice(notiId) { // 改变未读状态
    let result = await this.store.Proxy.upDateUserNocticeList({
      token: this.token,
      nid: notiId
    })
    // console.log('未读', result)
  }

  async readAllUserNotifications() {
    let result = await this.store.Proxy.readAllUserNotifications({
      token: this.token
    })
    // console.log('删除全部', result)
  }

  changeHeaderNotice(v) { // 点击列表页改变头部信息
    let userNoticeHeader = this.noticeHeaderView && this.noticeHeaderView.state.userNoticeHeader,
        idArr = [],
        selectIndex = 0;
    if (v.isRead === 0){
      userNoticeHeader && userNoticeHeader.list && userNoticeHeader.list.forEach(v => {
        idArr.push(v.id)
      })
      selectIndex = idArr.indexOf(v.id)
      selectIndex >= 0 && (userNoticeHeader.list.splice(selectIndex, 1))
      this.noticeHeaderView && this.noticeHeaderView.setState({userNoticeHeader})
    }
  }

  changeNotice(v) { // 点击头部更改列表页信息
    let userNotice = this.view && this.view.state.userNotice,
        idArr = [],
        selectIndex = 0
    if (v.isRead === 0){
      userNotice && userNotice.list && userNotice.list.forEach(v => {
        idArr.push(v.id)
      })
      selectIndex = idArr.indexOf(v.id)
      selectIndex >= 0 && (userNotice.list[selectIndex].isRead = 1)
      this.view && this.view.setState({userNotice})
    }
  }

  changeAllNotice() { // 点击头部全部已读更改列表页信息
    let userNotice = this.view && this.view.state.userNotice || [];
    userNotice && userNotice.list && userNotice.list.forEach(v => {
      v.isRead = 1
    })
    this.view && this.view.setState({userNotice})
  }

  async activityCon(activityId, activityType) { // 获取详情
    let activityList = await this.store.activityCon(activityId, activityType);
    this.view.setState({activityList})
  }

  clearUserNotice() { // 进入消息通知列表清除store里的userNotice
    this.store.state.userNotice = {}
  }

  getOrderHeight(height) { // 获取订单高度
    this.view && this.view.setState({
      orderHeight: height
    })
    return height
  }

  // websocke更新
  userNoticeUpdata(obj) {
    // console.log('试图', obj)
    let userNoticeHeader = this.noticeHeaderView && this.noticeHeaderView.state.userNoticeHeader,
        userNotice = this.view && this.view.state.userNotice,
        noticeObj = {};
    noticeObj = {
      id: obj.id,
      isRead: 0,
      content: obj.content,
      createAt: new Date().getTime() / 1000
    }
    userNoticeHeader && userNoticeHeader.list && userNoticeHeader.list.unshift(noticeObj)
    userNotice && userNotice.list && userNotice.list.unshift(noticeObj)
    this.noticeHeaderView && this.noticeHeaderView.setState({userNoticeHeader})
    this.view && this.view.setState({userNotice})
  }
}