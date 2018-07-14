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
    // this.noticeHeaderView.setState({userNotice})
    this.view && this.view.setState({userNotice})
  }

  async activityCon(activityId, activityType) { // 获取详情
    let activityList = await this.store.activityCon(activityId, activityType);
    this.view.setState({activityList})
  }
}