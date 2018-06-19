import ExchangeControllerBase from '../ExchangeControllerBase'
import NoticeStore from './NoticeStore'

export default class NoticeController extends ExchangeControllerBase {
  constructor(props) {
    super(props)
    this.store = new NoticeStore()

  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }

}