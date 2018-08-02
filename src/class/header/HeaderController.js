import ExchangeControllerBase from '../ExchangeControllerBase'

export default class HeaderController extends ExchangeControllerBase {
  constructor(props) {
    super(props)
  }

  setView(view){
    super.setView(view);
    // return this.store.data
  }
}