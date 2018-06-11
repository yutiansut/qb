import {observable, reaction, computed} from 'mobx';
import {RequestStore} from "../../store/request.jsx";

class PairStore {
  //name名称，vol 24小时成交量，last最新成交价，money 24小时成交额   updown 涨跌幅  line是7个数字的数组  is_collect是否被收藏
  // @observable is_collect = null;
  // @observable line = [];
  // @observable last = '';
  // @observable updown = 0;
  // @observable vol = 0;
  // @observable name = '';
  // @observable money = 0;
  @observable data = {}

  constructor(data) {
    this.data = data
    this.collectionPair = this.collectionPair.bind(this)
  }
  
  setData(data){
    this.data = data
  }

  collectionPair(){
    //收藏接口
    // this.is_collect = !this.is_collect
    this.data.is_collect = !this.data.is_collect
  }


}

export default PairStore
