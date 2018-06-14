import ExchangeControllerBase from './class/ExchangeControllerBase'

import UserStore from './UserStore'

export default class UserController extends ExchangeControllerBase {
  constructor() {
    super()
    this.store = new UserStore(100)
  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }

  async getData() {
    // console.log(this)
    // console.log(this.store.Proxy)
    // console.log(this.view)
    // console.log(this.view.state.count)
    // let data = await this.store.Proxy.topCurrency()
    console.log(data)
    // this.orderController && this.orederController.setPair()
    //
    // this.view.setState({count: data.data[0].changePercent})
    // userReques
    //t
  }


}