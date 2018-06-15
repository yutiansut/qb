import ExchangeControllerBase from './class/ExchangeControllerBase'

import TestAppStore from './TestAppStore'

export default class TestAppController extends ExchangeControllerBase {
  constructor() {
    super()
    this.store = new TestAppStore(5)

  }

  // setView(view){
  //   super.setView(view);

  //   // view.setState({count: this.store.count})
  //   // return this.store.data
  // }
  // setView(view){
  //   super.setView(view);
    // view.setState({count: this.store.count})
    // return this.store.data
  // }

  async getData() {
    // console.log(this)
    // console.log(this.store.Proxy)
    // console.log(this.view)
    // console.log(this.view.state.count)
    // let data = await this.store.Proxy.topCurrency()
    // console.log(this.countDown)
    // this.countDown('countDown', 'count', this.view)
    // console.log(data)
    // this.orderController && this.orederController.setPair()
    //
    // this.view.setState({count: data.data[0].changePercent})
    // userReques
    //t
  }


}