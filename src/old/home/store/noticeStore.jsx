import {computed} from 'mobx';
import {RequestStore} from "../../store/request.jsx";

const isEmpty = require('lodash.isempty');

class NoticeStore extends RequestStore {
  @computed get notice_table() {
    if (isEmpty(this.response.data)) {
      return [{url:'',img:'',title:'',time:0},
      {url:'',img:'',title:'',time:0},
      {url:'',img:'',title:'',time:0},
      {url:'',img:'',title:'',time:0}]
    }
    return this.response.data;
  }
}

export default NoticeStore
