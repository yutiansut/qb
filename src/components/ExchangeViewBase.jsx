import ViewBase from "../core/ViewBase";

export default class ExchangeViewBase extends ViewBase {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    super.componentWillMount();
    console.log('exchangeViewBase componentWillMount')
  }

  componentDidMount() {
    // super.componentDidMount();
    console.log('exchangeViewBase componenDidMount')
  }

}