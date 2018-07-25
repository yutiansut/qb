import ExchangeStoreBase from '../ExchangeStoreBase'

export default class NoticeStore extends ExchangeStoreBase {
  constructor() {
    super('activity');
    this.state = {
      recordList: [],
      bannerImgUrl:''
    }
  }

  async getQbtMargin(){
    let res = await this.Proxy.getQbtMargin();
    return {
      totalVolume: res && res.t,
      margin: res && res.m,
    }
  }

  async getAward(obj){
    let result = await this.Proxy.getAward({
      "iv": obj.inviter,   // 邀请人ID
      "in": obj.invited    // 被邀请人账号
    });
    if (result && result.aw !== undefined) {
      result = {
        "award": result.aw
      }
    }
    return result;
  }

  async getHomeBanner(activityStatus, activityPosition) {
    let result = await this.Proxy.getHomeBanner({
      os: 3,
      st : activityStatus,
      ps : activityPosition
    });
    // console.log('getHomeBanner 0',result)
    this.state.bannerImgUrl = result.al && result.al[0].hBc;
    // console.log('getHomeBanner 0',this.state.bannerImgUrl)
    return this.state.bannerImgUrl
  }

  async getInvited(userToken, page = 1, pageSize = 10){
    let result = await this.Proxy.getInvited({
      token: userToken,
      p: page,
      s: pageSize
    })
   return result.l
  }
}