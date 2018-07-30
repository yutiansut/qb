import ExchangeStoreBase from '../ExchangeStoreBase'

export default class NoticeStore extends ExchangeStoreBase {
  constructor() {
    super('activity');
    this.state = {
      recordList: [],
      bannerImgUrl:'',
      pr: 5,
      aw: 20,
      tv: 5000000,
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

  async getHomeBanner(activityStatus, activityPosition,it) {
    let result = await this.Proxy.getHomeBanner({
      os: 3,
      st : activityStatus,
      ps : activityPosition,
      it: it,
    });
    // console.log('getHomeBanner 0',result)
    this.state.homeBanner = result && result.al && result.al[0];
    // console.log('getHomeBanner 0',this.state.bannerImgUrl)
    return this.state.homeBanner
  }

  async getInvited(userToken, page = 1, pageSize = 10){
    let result = await this.Proxy.getInvited({
      token: userToken,
      p: page,
      s: pageSize
    })
    return result && result.l && result.l.map(v=>{
      return {
        "inviter": v.in,
        "inviterAccount": v.ac,
        "prize": v.pr,
        "invited": v.iv,
        "award": v.aw,
        "timestamp": v.t
      }
    })
  }

  async getPrice(){
    let result = await this.Proxy.getPrice()
    if (result && result.tv) {
      this.state.pr = result.pr;
      this.state.aw = result.aw;
      this.state.tv = result.tv;
    }
    return false;
  }
}