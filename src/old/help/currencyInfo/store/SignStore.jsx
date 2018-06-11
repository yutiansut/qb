import {observable} from "mobx";

class SignStore {
  @observable selected = '';
  @observable lng = '';
}

export default SignStore
