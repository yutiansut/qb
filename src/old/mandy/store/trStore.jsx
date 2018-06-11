import {RequestStore} from "../../store/request.jsx";
import {observable, mobx,computed} from "mobx";
const isEmpty = require('lodash.isempty');

class trStore extends RequestStore{
  @computed get trInfo() {
    if (isEmpty(this.recvData)){
      return this.firstTrInfo;
    }
    return this.recvData;
  };

  constructor(url, settings) {
    super(url, settings);
    this.firstTrInfo = settings.trInfo;
    this.tradepairInfo = settings.tradepairInfo;
  }
}
export default trStore
