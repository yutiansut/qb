import ExchangeControllerBase from '../ExchangeControllerBase'
import ActivityStore from './ActivityStore'

import ServerConfig from "../../config/ServerConfig"
import Progressive from "../lib/lazy";

export default class ActivityController extends ExchangeControllerBase {
  constructor() {
    super('activity')
    this.store = new ActivityStore()
  }

  setView(view) {
    super.setView(view);
    // view.setState({count: this.store.count})
    // return this.store.data
  }

  // 获取我的QBT
  async getMyQbt() {
    let token = this.userToken;
    let result = await this.store.getMyQbt(token);
    if (result) this.view.setState({ Qbt: result });
    return result;
  }

  get configData() {
    return this.configController.initState
  }

  get userId() {
    return this.userController.userId
  }

  get userToken() {
    return this.userController.userToken
  }

  get account() {
    return this.userController.userInfo.phone || this.userController.userInfo.email
  }

  get address() {
    return `${ServerConfig.hSecure && "https" || 'http'}://${ServerConfig.host}/login/${this.userId || ''}`
  }


  // 轮询qbt余量
  getQbtMargin() {
    if (!this.configData.activityState) {
      return true;
    }
    this.Loop['activityH5'].clear()
    this.Loop["activityH5"].set(async () => {
      let result = await this.store.getQbtMargin();
      if (result.margin !== undefined) {
        this.view.setState({margin: result.margin})
      }
    }, 7000);
    this.Loop["activityH5"].start();
  }

  // 清除轮询qbt任务
  clearGetQbtMargin() {
    this.Loop["activityH5"].clear();
  }

  async getHomeBanner(activityStatus, activityPosition,it) {
    let homeBanner = await this.store.getHomeBanner(activityStatus, activityPosition,it)
    // console.log('活动页数据', homeBanner)
    this.view.setState({
        homeBanner
    });
    // 懒加载首页大图 js
    // new Progressive({
    //   el: '#lazy-container',
    //   lazyClass: 'lazy',
    //   removePreview: true,
    //   scale: true
    // }).fire()
  }

  async getInvited() {
    if (!this.configData.activityState) {
      return true
    }
    let result = await this.store.getInvited(this.userToken)
    this.view.setState({
      recordList: result || []
    })
  }

  async getRankingList() {
    if (!this.configData.activityState) {
      return true
    }
    let result = await this.store.getRankingList(this.userToken)
    this.view.setState({
      rankingList: result.list || []
    })
    this.view.setState({ranking: result.ranking})
    this.view.setState({award: result.award})
  }

  async getAward({inviter, invited}) {
    if (!this.configData.activityState) {
      return true;
    }
    //验证手机号是否合法
    let p1 = /^[1][3,4,5,7,8][0-9]{9}$/,
      //验证邮箱号是否合法
      p2 = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (!p1.test(invited) && !p2.test(invited)) {
      alert(this.view.intl.get("login-inputVerifyPhoneAndEmail"));
      return;
    }

    let result = await this.store.getAward({inviter, invited});
    //领取成功，
    if (result.award!==undefined) {
      this.clearGetQbtMargin();
      this.getQbtMargin();
      this.view.setState({
        showVagueBgView: true,
        showSuccess: true
      })
      return;
    }
    // 已领取过
    if (result && result.errCode === 'AWARD_DRAWED') {
      this.view.setState({showVagueBgView: true, showFail: true});
      return;
    }
    // 活动结束
    if (result && result.errCode === 'ERROR_ACTIVIY_OVER') {
      this.view.setState({showVagueBgView: true, showFail: true, activityOver: true, tip: result.msg});
      return;
    }
  }

  async getPrice(){
    await this.store.getPrice();
    this.view.setState({ pr: this.store.state.pr, aw: this.store.state.aw, tv: this.store.state.tv });
  }
}