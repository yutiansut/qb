import ExchangeStoreBase from '../ExchangeStoreBase'

export default class NoticeStore extends ExchangeStoreBase {
  constructor() {
    super("notice");
    this.state = {
      noticeList: {},
      infoList: {}
    }
  }

  async noticeCon(token, userId) { // 获取公告
    let noticeList = await this.Proxy.getActivityCon({
        "userId": userId,
        "activityType": 0,  //类型 0公告 1新闻 2资讯
        "page": 0,
        "pageSize": 10,
        "token": token
    });
    this.state.noticeList = noticeList;
    console.log('获取公告', noticeList)
    return noticeList
  }

  async infoCon(token, userId) { // 获取资讯
    let infoList = await this.Proxy.getActivityCon({
        "userId": userId,
        "activityType": 2,
        "page": 0,
        "pageSize": 10,
        "token": token
    });
    this.state.infoList = infoList;
    console.log('获取资讯', infoList)
    return infoList
  }
}