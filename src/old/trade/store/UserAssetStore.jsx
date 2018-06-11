import {observable, reaction} from 'mobx';
import {RequestStore} from "../../store/request.jsx";
const isEmpty = require('lodash.isempty');

class UserAssetStore extends RequestStore {
  @observable feeData = {};
  constructor(url, setting){
    super(url, setting);
    reaction(() => this.response.data, data => {
      if (isEmpty(data)) {
        this.feeData = {}
      }
      this.feeData = data
    })
  }
}

export default UserAssetStore
