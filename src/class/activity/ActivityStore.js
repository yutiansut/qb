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
    // let result =
    return await this.Proxy.getQbtMargin();
  }

  async getAward(obj){
    // let result =
    return await this.Proxy.getAward(obj);
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