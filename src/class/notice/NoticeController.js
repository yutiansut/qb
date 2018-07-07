import ExchangeControllerBase from '../ExchangeControllerBase'
import NoticeStore from './NoticeStore'

export default class NoticeController extends ExchangeControllerBase {
  constructor(props) {
    super(props)
    this.store = new NoticeStore()
  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }

  get configData() {
    return this.configController.initState
  }

  async getNoticeCon(page, pageSize) { // 获取公告
    let noticeList = await this.store.noticeCon(page, pageSize);
    this.view.setState({noticeList})
  }

  async getInfoCon(page, pageSize) { // 获取资讯
    let infoList = await this.store.infoCon(page, pageSize);
    this.view.setState({infoList})
  }

  async activityCon(activityId, activityType) { // 获取详情
    let activityList = await this.store.activityCon(activityId, activityType);
    this.view.setState({activityList})
  }
}