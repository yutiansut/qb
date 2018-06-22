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
    console.log('ccconfig', this.configController)
    return this.configController.initState
  }

  async getInformation() { // 获取资讯
    let informationInfo = await this.store.informationInfo();
    this.view.setState({informationList: informationInfo.data})
  }

  async getnews() { // 获取新闻
    let newsInfo = await this.store.newsInfo();
    this.view.setState({newsList: newsInfo.data})
  }
}