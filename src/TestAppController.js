import ExchangeControllerBase from './ExchangeControllerBase'

import TestAppStore from './TestAppStore'

export default class TestAppController extends ExchangeControllerBase {
  constructor() {
    super()
    this.store = new TestAppStore(100)

  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }

  async getData() {
    console.log(this)
    console.log(this.store.Proxy)
    console.log(this.view)
    console.log(this.view.state.count)
    let data = await this.store.Proxy.topCurrency()
    console.log(data)
    this.view.setState({count: data.data[0].changePercent})
  }


}