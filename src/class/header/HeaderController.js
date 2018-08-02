import ExchangeControllerBase from '../ExchangeControllerBase'

export default class HeaderController extends ExchangeControllerBase {
  constructor(props) {
    super(props)
  }

  setView(view){
    super.setView(view);
    // return this.store.data
  }

  addContent(con) {
    return (`<div><img src="/static/logo/logo_h5.png" alt=""> <span class="nav-back">返回</span> <b>${con}</b></div>`)
  }

}