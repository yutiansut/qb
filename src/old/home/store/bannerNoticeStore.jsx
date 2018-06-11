import {observable, reaction,computed} from 'mobx';
import {RequestStore} from "../../store/request.jsx";
const isEmpty = require('lodash.isempty');
class BannerNoticeStore extends RequestStore {

  @computed get bannerNoticeData() {
    if (isEmpty(this.response.data)) {
      return []
    }
    return this.response.data;
  }


}

export default BannerNoticeStore
