import ExchangeControllerBase from '../ExchangeControllerBase'
import DealStore from './DealStore'

export default class DealController extends ExchangeControllerBase {
  constructor(){
    super();
    this.store = new DealStore();
  }
  
  setView(view) {
    super.setView(view)
  }
  
  setPairMsg(value){
    this.view.setState({
      tradePairMsg: value
    });
  }
  
}