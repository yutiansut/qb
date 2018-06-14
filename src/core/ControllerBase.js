// import StoreBase from './StoreBase'

export default class ControllerBase {
  constructor() {

  }

  setView(view) {
    this.view = view
  }

  getInitState() {
    return this.store.state
  }
}