import ExchangeControllerBase from './class/ExchangeControllerBase'

import TestAppStore from './TestAppStore'

export default class TestAppController extends ExchangeControllerBase {
  constructor() {
    super()
    this.store = new TestAppStore()

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


  get configData() {
    // console.log( this.configController)
    return this.configController.initState
  }


  async getData() {
    // console.log(this)
    // console.log(this.store.Proxy)
    // console.log(this.view)
    // console.log(this.view.state.count)
    // let data = await this.store.Proxy.topCurrency()
    let websocket = await this.store.WebSocket.getData()
    if(websocket){
      console.log(this.store.WebSocket.getData.get())
      this.store.WebSocket.getData.get().onMessage = data=>{
        console.log(data)
      }
      this.store.WebSocket.getData.get().send('40/websocket,')
      this.store.WebSocket.getData.get().send('42/websocket, [\"ticker\"]')
      setInterval(()=>{
        this.store.WebSocket.getData.get().send('2')
      }, 2500)

    }
    // console.log(this.countDown)
    // this.countDown('countDown', 'count', this.view)
    // console.log(data)
    // this.orderController && this.orederController.setPair()
    //
    // this.view.setState({testObj: {b: data.data[0].changePercent}})
    // userReques
    //t
  }


}