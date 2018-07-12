import ViewBase from "../core/ViewBase";
import intl from "react-intl-universal";

export default class ExchangeViewBase extends ViewBase {
  constructor(props) {
    super(props)
    // this.history = props.history;
    // this.match = props.match;
    this.intl = intl
    this.images = {}
    this.location = '';
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