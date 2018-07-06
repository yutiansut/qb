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

  async getNoticeCon(activityId, contentType, page) { // 获取公告
    let noticeList = await this.store.noticeCon(activityId, contentType, page);
    this.view.setState({noticeList})
  }

  async getInfoCon(activityId, contentType, page) { // 获取资讯
    let infoList = await this.store.infoCon(activityId, contentType, page);
    this.view.setState({infoList})
  }
}