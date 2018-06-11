import {observable, reaction} from 'mobx';


class UnitStore {
  UNIT_TYPE = {
    USD: 'USD',
    RMB: 'RMB',
  }
  @observable unit = this.UNIT_TYPE.USD
}

export default UnitStore
