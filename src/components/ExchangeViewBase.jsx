import ViewBase from "../core/ViewBase";
import intl from "react-intl-universal";

export default class ExchangeViewBase extends ViewBase {
  constructor(props) {
    super(props);
    // this.history = props.history;
    // this.match = props.match;
    this.intl = intl;
    this.location = "";
    // img标签引用图片路径统一管理
    this.$imagesMap = {
      $header_cn: "/static/web/header/cn.svg", // 头部
      $header_en: "/static/web/header/en.svg",
      $logo_footer: "/static/logo/logo_footer.svg", // 底部
      $footer_twitter: "/static/web/footer/twitter_new.svg",
      $footer_faceBook: "/static/web/footer/FaceBook_new.svg",
      $footer_wechat: "/static/web/footer/wechat.svg",
      $footer_telegram: "/static/web/footer/Telegram_new.svg",
      $home_marketBtn: "/static/web/home/home_search_btn.svg", // 首页
      $home_financial: "/static/web/home/financial@2x.png",
      $home_safe: "/static/web/home/4_2.svg",
      $home_stable: "/static/web/home/4_3.svg",
      $home_muti: "/static/web/home/muti@2x.png",
      $trade_search: "/static/web/search_bai.svg", // 市场
      $trade_close: "/static/web/guanbi_bai.svg",
      $trade_rank: "/static/web/trade/trade_rank.svg",
      $trade_star: "/static/web/trade/trade_star.svg",
      $trade_star_select: "/static/web/trade/trade_star_select.svg",
      $guanbi_hei: "/static/web/guanbi_hei.svg",
      $warning: "/static/web/warning.svg",
      $succeed: "/static/web/succeed.svg",
      $wrong: "/static/web/wrong.svg",
      $message: "/static/web/message.svg",
      $yiwen: "/static/web/yiwen.svg",
      $yiwen_active: "/static/web/yiwen_active.svg",
      $rank_down: "/static/web/home/rank_down.svg",
      $rank_up: "/static/web/home/rank_up.svg",
      $rank_normal: "/static/web/home/rank_normal.svg",
      $xianghu: "/static/web/xianghu.svg",
      $award_success: "/static/web/genrealize/success.png",
      $nomal_down: "/static/web/home/down_normal.svg",
      $checked: "/static/web/checked.svg",
      $nomal_check: "/static/web/normal_check.svg",
      $checkbox_check: "/static/web/checkbox_checked.svg",
      $home_star_sel: "/static/web/home/star_select.svg",
      $home_star_nor: "/static/web/home/star_normal.svg",
      $user_recommendCn: "/static/web/user/recommend_cn.svg", // 个人中心图片
      $user_recommendEn: "/static/web/user/recommendEn.svg",
      $user_id01: "/static/web/user/ID_01.svg",
      $user_id02: "/static/web/user/ID_02.svg",
      $user_id03: "/static/web/user/ID_03.svg",
      $user_passport01: "/static/web/user/passport_01.svg",
      $user_passport02: "/static/web/user/passport_02.svg",
      $user_passport03: "/static/web/user/passport_03.svg",
      $user_err: "/static/web/user/user_err.svg",
      $user_no: "/static/web/user/user_no.svg",
      $user_progress: "/static/web/user/user_progress.svg",
      $user_succ: "/static/web/user/user_succ.svg",
      $user_add: "/static/web/user/user_add.svg",
      $user_loading: "/static/web/user/loading.png",
      $home_user_notice: "/static/web/home/new_bai.svg",
      $invite: "/static/web/genrealize/invite.png",
      $aside_erweima: "/static/web/footer/erweima.png",
      $calendar_preYear: "/static/web/calendar/calendar_pre_year.svg", // 日历
      $calendar_nextYear: "/static/web/calendar/calendar_next_year.svg",
      $calendar_preMonth: "/static/web/calendar/calendar_pre_month.svg",
      $calendar_nextMonth: "/static/web/calendar/calendar_next_month.svg",
      $h5_logo: "/static/logo/logo_h5.png", // h5图片
      $h5_user_identity: '/static/mobile/user/icon_wd_sfrz@3x.png',
      $h5_user_safe: '/static/mobile/user/icon_wd_aqzx@3x.png',
      $h5_user_order: '/static/mobile/user/icon_wd_ddgl@3x.png',
      $h5_user_help: '/static/mobile/user/icon_wd_bzzx@3x.png',
      $h5_user_terms: '/static/mobile/user/icon_wd_yhxy@3x.png',
      $h5_user_about: '/static/mobile/user/icon_wd_gywm@3x.png',
      $h5_user_qianjb: '/static/mobile/user/icon_qianjb@3x.png',
      $h5_header_header: "/static/mobile/header/icon_wode_head@2x.png",
      $h5_header_home: "/static/mobile/header/icon_sy@2x.png",
      $h5_header_asset: "/static/mobile/header/icon_zc@2x.png",
      $h5_header_order: "/static/mobile/header/icon_dd@2x.png",
      $h5_header_user: "/static/mobile/header/icon_gr@2x.png",
      $h5_header_language: "/static/mobile/header/icon_yy@2x.png",
      $h5_search: '/static/mobile/icon_search_big.png',
      $h5_order_select: '/static/mobile/order/icon_shaixuan@3x.png',
      $h5_back: "/static/mobile/back_white@3x.png",
      $h5_user_about_anquan: "/static/mobile/user/icon_wd_gywm_anquan@2x.png",
      $h5_user_about_pinzhi: "/static/mobile/user/icon_wd_gywm_pinzhi@2x.png",
      $h5_activity_qb: "/static/mobile/activity/icon_coin_qb@2x.png",
      $h5_activity_qb_num: "/static/mobile/activity/icon_qb_zhye@2x.png",
      $h5_activity_qb_heart: "/static/mobile/activity/icon_qb_yqhy@2x.png",
      $h5_activity_qb_scan: "/static/mobile/activity/icon_scan_small@2x.png",
      $h5_activity_qb_tishi: "/static/mobile/activity/icon_qb_tishi@2x.png",
      $h5_activity_qb_home_normal: "/static/mobile/activity/icon_qb_home_normal@2x.png",
      $h5_activity_qb_my_normal: "/static/mobile/activity/icon_qb_wode_normal@2x.png",
      $h5_activity_qb_home_click: "/static/mobile/activity/icon_qb_home_click@2x.png",
      $h5_activity_qb_my_click: "/static/mobile/activity/icon_qb_wode_click@2x.png",
      $h5_activity_qb_jianjie: "/static/mobile/activity/icon_qb_jianjie@2x.png",

      $h5_activity_qb_jj_one: "/static/mobile/activity/icon_zc_qb_jj_one@3x.png",
      $h5_activity_qb_jj_two: "/static/mobile/activity/icon_zc_qb_jj_two@3x.png",
      $h5_activity_qb_jj_three: "/static/mobile/activity/icon_zc_qb_jj_three@3x.png",
      $h5_activity_qb_jj_four: "/static/mobile/activity/icon_zc_qb_jj_four@3x.png",
      $h5_activity_qb_jj_five: "/static/mobile/activity/icon_zc_qb_jj_five@3x.png",
      $h5_activity_qb_jj_six: "/static/mobile/activity/icon_zc_qb_jj_six@3x.png",

    }
  }

  componentWillMount() {
    super.componentWillMount();
    // console.log('exchangeViewBase componentWillMount')
  }

  componentDidMount() {
    super.componentDidMount();
    // this.location = window.location.href;
    // document.getElementById('app').scrollIntoView(true)
  }

  componentWillUpdate() {
    super.componentWillUpdate();
    // console.log("WillUpdate", this, this.location);
    // if (this.location !== window.location.href){
    //   document.getElementById("app").scrollIntoView(true);
    //   this.location = window.location.href;
    // }
    // console.log('exchangeViewBase componenDidMount')
  }
}
