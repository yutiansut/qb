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
    console.log('通知列表', userNotice)
    this.view && this.view.setState({userNotice})
  }

  async getUserNoticeHeader( unRead, page, pageSize) { // 获取用户通知列表
    let userNoticeHeader = await this.store.userNotice( unRead, page, pageSize);
    console.log('通知列表头部', userNoticeHeader)
    this.noticeHeaderView.setState({userNoticeHeader})
  }

  async upDateUserNoctice(notiId) { // 改变未读状态
    let result = await this.store.Proxy.upDateUserNocticeList({
      "userId": this.userId,
      "token": this.token,
      notiId
    })
    console.log('未读', result)
  }

  changeHeaderNotice(value) { // 点击列表页改变头部信息
    let userNoticeHeader = this.noticeHeaderView.state.userNoticeHeader,
        idArr = [],
        selectId = 0;
    console.log('点击列表页改变头部信息', value, this.noticeHeaderView.state.userNoticeHeader)

    if (v.isRead === 0){
      userNoticeHeader.list.forEach(v => {
        idArr.push(v.id)
      })
      selectId = idArr.indexOf(v.id)
      userNoticeHeader.list.splice(selectId, 1)
      this.noticeHeaderView.setState({userNoticeHeader})
    }
  }

  async activityCon(activityId, activityType) { // 获取详情
    let activityList = await this.store.activityCon(activityId, activityType);
    this.view.setState({activityList})
  }

  // websocke更新
  userNoticeUpdata(obj) {
    console.log('试图', obj)
    let userNoticeHeader = this.noticeHeaderView.state.userNoticeHeader,
        userNotice = this.view.state.userNotice,
        noticeObj = {};
    noticeObj = {
      id: obj.id,
      isRead: 0,
      content: obj.content,
      createAt: new Date().getTime() / 1000
    }
    userNoticeHeader.list.push(noticeObj)
    userNotice.list.push(noticeObj)
    this.noticeHeaderView.setState({userNoticeHeader})
    this.view && this.view.setState({userNotice})
  }
}