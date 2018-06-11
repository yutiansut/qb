import {observable} from "mobx";


class APPStore {
  SELECTED = {
    PE: 1,  // phone/email
    PS: 2,   // password
  };
  @observable selected = this.SELECTED.PE;

  constructor() {
    this.setSelected = this.setSelected.bind(this)
  }

  setSelected(value) {
    if (Object.values(this.SELECTED).includes(value)) {
      this.selected = value
    }
  }
}

export default APPStore
