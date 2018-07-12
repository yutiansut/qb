import ViewBase from "../core/ViewBase";
import intl from "react-intl-universal";

export default class ExchangeViewBase extends ViewBase {
  constructor(props) {
    super(props)
    // this.history = props.history;
    // this.match = props.match;
    // this.location = props.location;
    this.intl = intl
    this.images = {}
  }

  componentWillMount() {
    super.componentWillMount();
    // console.log('exchangeViewBase componentWillMount')
  }

  componentDidMount() {
    super.componentDidMount();
    this.location = window.location.href;
    // console.log("exchangeViewBase componentDidMount");
    document.getElementById("app").scrollIntoView(true);
    // console.log('exchangeViewBase componenDidMount')
  }
  componentWillUpdate(state, next) {
    super.componentWillUpdate();
    if(this.location !== window.location.href){
      document.getElementById("app").scrollIntoView(true);
      this.location = window.location.href;
    }
    // console.log(this.location);
    // document.getElementById("app").scrollIntoView(true);
    // console.log("exchangeViewBase componentWillUpdate");
  }


}