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
      la: {"en-US":0,"zh-CN":1}[this.controller.configController.language] || 0,
    });
    if(!res) return;
    let noticeList={
        page: res.p,
        totalCount: res.c,
        data: [],
    };
    res.d && res.d.map(item=>{
      noticeList.data.push({
          catalog: item.cat,
          activityId: item.id,
          subject: item.su,
          content: item.cnt,
          source: item.s,
          createdAt: item.t,
          titleImage: item.tim,
          recommend: item.re,
          recommendLink: item.url,
          abstract: item.ab,
      });
    });
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
      la: {"en-US":0,"zh-CN":1}[this.controller.configController.language] || 0,
    });
    if(!res) return;
    let infoList={
        page: res.p,
        totalCount: res.c,
        data: [],
    };
    res.d && res.d.map(item=>{
        infoList.data.push({
            catalog: item.cat,
            activityId: item.id,
            subject: item.su,
            content: item.cnt,
            source: item.s,
            createdAt: item.t,
            titleImage: item.tim,
            recommend: item.re,
            recommendLink: item.url,
            abstract: item.ab,
        });
    });
    this.state.infoList = infoList;
    return infoList;
  }

  async userNotice(unRead, page, pageSize) { // 获取用户通知列表
    // unRead 0 全部 1未读, page, pageSize 0 全部
    let res = await this.Proxy.getUserNocticeList({
      token: this.controller.token,
      ur: unRead,
      p: page,
      s: pageSize
    });
    if(!res) return;
    let userNotice={
      totalCount: res.tc,
      list: [],
    };
    res.l && res.l.map(item=>{
      userNotice.list.push({
         id: item.id,
         isRead: item.ir,
         content: item.c,
         createAt: item.t,
      });
    });
    userNotice = userNotice ? userNotice : {}
    if (unRead) {
      this.state.userNoticeHeader = userNotice
    }
    this.state.userNotice = userNotice;

    // console.log('通知列表', this.state.userNocticeList)
    return userNotice
  }

  async activityCon(activityId, activityType) { // 活动详情
    let res = await this.Proxy.getActivity({
        id: activityId,
        ty: activityType,
        con: 1,
        p: 0,
        ps: 10,
        la: {"en-US":0,"zh-CN":1}[this.controller.configController.language] || 0,
    });
    if(!res) return;
    let activityList={
        page: res.p,
        totalCount: res.c,
        data: [],
    };
    res.d && res.d.map(item=>{
        activityList.data.push({
            catalog: item.cat,
            activityId: item.id,
            subject: item.su,
            content: item.cnt,
            source: item.s,
            createdAt: item.t,
            titleImage: item.tim,
            recommend: item.re,
            recommendLink: item.url,
            abstract: item.ab,
        });
    });
    activityList = activityList.msg ? [] : activityList.data[0]
    this.state.activityList = activityList
    // console.log('获取详细信息', activityList)
    return activityList
  }
}