import {observable, reaction,computed} from 'mobx';
import {RequestStore} from "../../store/request.jsx";
const isEmpty = require('lodash.isempty');
class BannerStore extends RequestStore {

  @computed get bannerData() {
    if (isEmpty(this.response.data)) {
      return []
    }
    return this.response.data;
  }


}

export default BannerStore
