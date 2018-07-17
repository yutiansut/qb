import ViewBase from "../core/ViewBase";
import intl from "react-intl-universal";

export default class ExchangeViewBase extends ViewBase {
  constructor(props) {
    super(props)
    // this.history = props.history;
    // this.match = props.match;
    this.intl = intl;
    this.$imagesMap = {
      $back_white: '/static/mobile/order/Back@3x.png',
      $order_history: '/static/mobile/order/nav_lishidingdan@3x.png',
      $order_filter: '/static/mobile/order/nav_shaixuan@3x.png',
    }
  }

  componentWillMount() {
    super.componentWillMount();
    // console.log('exchangeViewBase componentWillMount')
  }

  componentDidMount() {
    super.componentDidMount();

    // console.log('exchangeViewBase componenDidMount')
  }
  componentWillUpdate() {
    super.componentWillUpdate();
    // console.log('exchangeViewBase componenDidMount')
  }

}