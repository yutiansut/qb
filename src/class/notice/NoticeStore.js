import ExchangeStoreBase from '../ExchangeStoreBase'

export default class NoticeStore extends ExchangeStoreBase {
  constructor() {
    super("notice");
    this.state = {
      noticeList: {},
      infoList: {}
    }
  }

  async noticeCon(activityId, contentType, page) { // 获取公告
    let noticeList = await this.Proxy.getActivity({
      activityId,
      "activityType": 0,  //类型 0公告 1新闻 2资讯
      contentType, //内容类型 0则不返回content 1则返回全部数据
      page,
      "pageSize": 10
    });
    this.state.noticeList = noticeList;
    return noticeList
  }

  async infoCon(activityId, contentType, page) { // 获取资讯
    let infoList = await this.Proxy.getActivity({
      activityId,
      "activityType": 2,
      contentType,
      page,
      "pageSize": 10
    });
    this.state.infoList = infoList;
    return infoList
  }
}