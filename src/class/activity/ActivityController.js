import ExchangeControllerBase from '../ExchangeControllerBase'
import ActivityStore from './ActivityStore'

export default class ActivityController extends ExchangeControllerBase {
  constructor() {
    super('activity')
    this.store = new ActivityStore()
  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    // return this.store.data
  }

  get configData() {
    return this.configController.initState
  }


  // 轮询qbt余量
  getQbtMargin(){
    this.Loop['activityH5'].clear()
    this.Loop["activityH5"].set(async () => {
      let result = await this.store.getQbtMargin();
      if(result.margin!==undefined){
        this.view.setState({ margin: result.margin})
      }
    }, 7000);
    this.Loop["activityH5"].start();
  }
  // 清除轮询qbt任务
  clearGetQbtMargin(){
    this.Loop["activityH5"].clear();
  }

  async getHomeBanner(activityStatus, activityPosition){
    let bannerImgUrl = await this.store.getHomeBanner(activityStatus, activityPosition)
    // console.log('getHomeBanner 1',bannerImgUrl,this.view)
    // return result
    this.view.setState({
      bannerImgUrl
    })
  }


  async getAward({ inviter, inviterAccount, invited}){
    //验证手机号是否合法
    let p1 = /^[1][3,4,5,7,8][0-9]{9}$/,
    //验证邮箱号是否合法
    p2 = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (!p1.test(invited) && !p2.test(invited)){
      alert("请输入正确的手机号或邮箱");
      return;
    }

    let result = await this.store.getAward({ inviter, inviterAccount, invited});
    //领取成功，
    if (result.award === 100) {
      this.view.setState({
        showVagueBgView: true,
        showSuccess: true
      })
      return;
    }
    // 已领取过
    if(result && result.errCode === 'AWARD_DRAWED') {
      this.view.setState({ showVagueBgView: true, showFail: true });
      return;
    }
    // 活动结束
    if(result && result.errCode === 'ERROR_ACTIVIY_OVER') {
      this.view.setState({ showVagueBgView: true, showFail: true, activityOver: true, tip: result.msg });
      return;
    }
  }
}