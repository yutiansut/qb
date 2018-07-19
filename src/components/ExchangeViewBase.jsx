import ViewBase from "../core/ViewBase";
import intl from "react-intl-universal";

export default class ExchangeViewBase extends ViewBase {
  constructor(props) {
    super(props)
    // this.history = props.history;
    // this.match = props.match;
    this.intl = intl
    this.location = '';
    // img标签引用图片路径统一管理
    this.$imagesMap = {
      $guanbi_hei: '/static/img/guanbi_hei.svg',
      $warning: "/static/images/warning.svg",
      $succeed: "/static/images/succeed.svg",
      $wrong: "/static/images/wrong.svg",
      $message: "/static/images/message.svg",
      $yiwen: "/static/images/yiwen.svg",
      $yiwen_active: "/static/images/yiwen_active.svg",
      $rank_down: "/static/img/home/rank_down.svg",
      $rank_up: "/static/img/home/rank_up.svg",
      $rank_normal: "/static/img/home/rank_normal.svg",
      $xianghu: "/static/images/xianghu.svg",
      $award_success: "/static/images/genrealize/success.png",
      $nomal_down: "/static/img/home/down_normal.svg",
      $checked: "/static/img/checked.svg",
      $nomal_check: "/static/img/normal_check.svg",
      $checkbox_check: "/static/img/checkbox_checked.svg",
      $home_star_sel: "/static/img/star_select.svg",
      $home_star_nor: "/static/img/star_normal.svg",
      $user_id01: "/static/img/user/ID_01.svg",
      $user_id02: "/static/img/user/ID_02.svg",
      $user_id03: "/static/img/user/ID_03.svg",
      $user_passport01: "/static/img/user/passport_01.svg",
      $user_passport02: "/static/img/user/passport_02.svg",
      $user_passport03: "/static/img/user/passport_03.svg",
      $user_err: "/static/img/user/user_err.svg",
      $user_no: "/static/img/user/user_no.svg",
      $user_progress: "/static/img/user/user_progress.svg",
      $user_succ: "/static/img/user/user_succ.svg",
      $user_add: "/static/img/user/user_add.svg",
      $home_banner_text_cn: "/static/img/banner/text_cn.svg",
      $home_banner_text_en: "/static/img/banner/text_en.svg",
      $home_user_notice: "/static/img/home/new_bai.svg"
      // $home_banner_btn_cn: "/static/img/banner/sign_up_cn.svg",
      // $home_banner_btn_en: "/static/img/banner/sign_up_en.svg",
      // $home_banner_btn_cn_hover: "/static/img/banner/sign_up_cn_hover.svg",
      // $home_banner_btn_en_hover: "/static/img/banner/sign_up_en_hover.svg",
    }
  }

  componentWillMount() {
    super.componentWillMount();
    // console.log('exchangeViewBase componentWillMount')
  }

  componentDidMount() {
    super.componentDidMount();
    this.location = window.location.href;
    document.getElementById('app').scrollIntoView(true)
    // console.log('exchangeViewBase componenDidMount')
  }

  componentWillUpdate() {
    super.componentWillUpdate();
    if (this.location !== window.location.href){
      document.getElementById("app").scrollIntoView(true);
      this.location = window.location.href;
    }
    // console.log('exchangeViewBase componenDidMount')
  }

}