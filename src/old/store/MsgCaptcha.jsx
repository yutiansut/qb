import {observable, computed} from "mobx";
import {RequestStore} from "./request.jsx";

class MsgCaptcha extends RequestStore {
  @observable to = '';

  @computed get submitData() {
    return {
      to: this.to
    }
  }

}

export default MsgCaptcha
