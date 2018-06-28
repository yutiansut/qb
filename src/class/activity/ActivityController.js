import ExchangeControllerBase from '../ExchangeControllerBase'
import ActivityStore from './ActivityStore'

export default class ActivityController extends ExchangeControllerBase {
  constructor(props) {
    super(props)
    this.store = new ActivityStore()
  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }

  get configData() {
    console.log('活动ccconfig', this.configController)
    return this.configController.initState
  }
}