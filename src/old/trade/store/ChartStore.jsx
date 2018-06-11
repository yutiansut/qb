import {observable} from 'mobx';


/**
 * 用户Store
 */
class ChartStore {
  @observable selected = "K";

  constructor() {
    this.widget = {};
    this.chartReady = false;
  }
}

export default ChartStore
