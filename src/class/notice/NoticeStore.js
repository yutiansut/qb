import ExchangeStoreBase from '../ExchangeStoreBase'

export default class NoticeStore extends ExchangeStoreBase {
  constructor() {
    super("notice");
    this.state = {
      noticeList: {},
      infoList: {},
      activityList: {}
    }
  }

  async noticeCon(page, pageSize) { // 获取公告
    let noticeList = await this.Proxy.getActivity({
      "activityId": 0,
      "activityType": 0,  //类型 0公告 1新闻 2资讯
      "contentType": 0, //内容类型 0则不返回content 1则返回全部数据
      page,
      pageSize
    });
    noticeList = noticeList.msg ? [] : noticeList.data
    this.state.noticeList = noticeList;
    // console.log('获取公告', noticeList)
    return noticeList
  }

  async infoCon(page, pageSize) { // 获取资讯
    let infoList = await this.Proxy.getActivity({
      "activityId": 0,
      "activityType": 2,
      "contentType": 0,
      page,
      pageSize
    });
    infoList = infoList.msg ? [] : infoList.data
    this.state.infoList = infoList
    console.log('获取资讯', infoList)
    return infoList
  }

  async activityCon(activityId, activityType) { // 活动详情
    let activityList = await this.Proxy.getActivity({
      activityId,
      activityType,
      "contentType": 1,
      "page": 0,
      "pageSize": 10
    });
    activityList = activityList.msg ? [] : activityList.data[0]
    this.state.activityList = activityList
    console.log('获取详细信息', activityList)
    return activityList
  }
}