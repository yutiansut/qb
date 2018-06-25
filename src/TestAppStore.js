import ExchangeStoreBase from './class/ExchangeStoreBase'

export default class TestAppStore extends ExchangeStoreBase {
  constructor() {
    super('test');
    this.state = {count: 20, price:1000 , testObj:{b:1}}
    // this.preHandler.push(this.testPreHandler)
    // console.log(this.preHandler)
  }

  // async testPreHandler(app, req){
  //   await app.Sleep(3000)
  //   console.log(app, req)
  // }
}