import {RequestStore} from "../../store/request.jsx";
import {observable, computed} from "mobx";
const isEmpty = require('lodash.isempty');

class StockStore extends RequestStore{
  @observable coinList = {};
  @computed get CoinInfo() {
    if (isEmpty(this.recvData)){
      return this.coinInfo
    }
    return this.recvData.data;
  };

  // @computed get coinList() {
  //   return this.response.data;
  // }
  constructor(url, settings) {
    super(url, settings);
    this.coinInfo = settings.CoinInfo
    // this.updateStore = settings.updateStore
  }
}
export default StockStore
