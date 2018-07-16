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
      $yiwen: "/static/images/yiwen.png",
      $rank_down: "/static/images/rank_down.svg",
      $rank_up: "/static/images/rank_up.svg",
      $rank_normal: "/static/images/rank_normal.svg",
      $xianghu: "/static/images/xianghu.svg"
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