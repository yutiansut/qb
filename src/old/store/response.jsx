import {observable, reaction, action, computed} from "mobx";


class ResponseStore {
  @observable request = {};
  @observable data = {};
  @observable textStatus = 0;
  @observable jqXHR = {};
  @observable errorThrown = {};

}

export {ResponseStore}
