import {RequestStore} from "../../store/request.jsx";
import {computed} from "mobx";
const isEmpty = require('lodash.isempty');


class InfoStore extends RequestStore {
  constructor(url, settings) {
    super(url, settings);
    this.detailUrl = settings.detailUrl;
    this.detailUrlPlaceHolder = settings.detailUrlPlaceHolder;
    this.getDetailUrl = this.getDetailUrl.bind(this);
  }

  getDetailUrl(pk) {
    return this.detailUrl.replace(this.detailUrlPlaceHolder, pk)
  }


  @computed get data() {
    if (isEmpty(this.recvData)) {
      return []
    } else {
      return this.recvData.items
    }
  }

}

export default InfoStore
