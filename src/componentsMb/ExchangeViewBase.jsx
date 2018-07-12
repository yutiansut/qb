import ViewBase from "../core/ViewBase";
import intl from "react-intl-universal";

export default class ExchangeViewBase extends ViewBase {
  constructor(props) {
    super(props)
    // this.history = props.history;
    // this.match = props.match;
    this.intl = intl;
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