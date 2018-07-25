import ExchangeStoreBase from '../ExchangeStoreBase'

export default class NoticeStore extends ExchangeStoreBase {
  constructor() {
    super("notice", "general");
    this.state = {
      noticeList: {},
      infoList: {},
      activityList: {},
      userNotice: {}, // 用户通知列表
      userNoticeHeader:{}
    }
    // websocket监听用户资产更新推送
    this.WebSocket.general.on("userNoticeUpdata", data => {
      // console.log("userNoticeUpdata-websocket", data);
      this.controller.userNoticeUpdata(data);
    });
  }

  async noticeCon(page, pageSize) { // 获取公告
    let res = await this.Proxy.getActivity({
      id: 0,
      ty: 0,  //类型 0公告 1新闻 2资讯
      con: 0, //内容类型 0则不返回content 1则返回全部数据
      p: page,
      ps: pageSize,
      //la: "zh-CN,
    });
    let noticeList={
        catalog: res.cat,
        activityId: res.id,
        subject: res.su,
        subjectCN: res.su,
        subjectEN: res.su,
        content: res.cnt,
        contentCN: res.cnt,
        contentEN: res.cnt,
        source: res.s,
        createdAt: res.t,
        titleImage: res.tim,
        recommend: res.re,
        recommendCN: res.re,
        recommendEN: res.re,
        recommendLink: res.url,
        abstract: res.ab,
        abstractCN: res.ab,
        abstractEN: res.ab,
    };
    this.state.noticeList = noticeList;
    return noticeList
  }

  async infoCon(page, pageSize) { // 获取资讯
    let res = await this.Proxy.getActivity({
      id: 0,
      ty: 2,
      con: 0,
      p: page,
      ps: pageSize,
      //la: "zh-CN",
    });
    let infoList={
        catalog: res.cat,
        activityId: res.id,
        subject: res.su,
        subjectCN: res.su,
        subjectEN: res.su,
        content: res.cnt,
        contentCN: res.cnt,
        contentEN: res.cnt,
        source: res.s,
        createdAt: res.t,
        titleImage: res.tim,
        recommend: res.re,
        recommendCN: res.re,
        recommendEN: res.re,
        recommendLink: res.url,
        abstract: res.ab,
        abstractCN: res.ab,
        abstractEN: res.ab,
    };
    this.state.infoList = infoList;
    return infoList;
  }

  async userNotice(unRead, page, pageSize) { // 获取用户通知列表
    // unRead 0 全部 1未读, page, pageSize 0 全部
    let userNotice = await this.Proxy.getUserNocticeList({
      "userId": this.controller.userId,
      "token": this.controller.token,
      unRead,
      page,
      pageSize
    })
    // console.log(1111, userNotice)
    userNotice = userNotice ? userNotice : {}
    if (unRead) {
      this.state.userNoticeHeader = userNotice
    }
    this.state.userNotice = userNotice;

    // console.log('通知列表', this.state.userNocticeList)
    return userNotice
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
    // console.log('获取详细信息', activityList)
    return activityList
  }
}