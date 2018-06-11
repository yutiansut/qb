import {observable, reaction, computed} from 'mobx';
import {RequestStore} from "../../store/request.jsx";

class MarketStore {
  @observable marketTableTitle = [{}];
  @observable marketSelected = 0;
  @observable marketPairSort = '';
  constructor(url, settings) {
    // this.marketReq = new MarketReq(url, settings)
    this.pairReq = new PairReq('/trade/detail/');
    this.get = this.get.bind(this)
  }
  
  @computed get homePairList(){
    return this.pairReq.homePairList
  }
  //
  // @computed get marketList() {
  //   return this.marketReq.marketList
  // }

  get(){
    // this.marketReq.get()
    this.pairReq.get({market_index: 0})
  }
}

class MarketReq extends RequestStore {

  constructor(url, settings) {
    super(url, settings);
  }

  @computed get marketList() {
    let data = [
        {name:'btc',id:0},{name:'eth',id:2},{name:'bch',id:3}
    ]
    return !this.recvData.length && data || this.recvData.markets
  }
}

class PairReq extends RequestStore {

  constructor(url, settings) {
    super(url, settings);
  }
  @observable homePairList = []
  // @computed get pairList  () {
  //   let data = [
  //     {"last": 10.193,"name": "eth_btc","vol": 1,"money": 2,"is_collect": false,"updown": 3.0,"line": [1,7,2,1,3,5,7],},
  //     {"last": 11.193,"name": "bnb_btc","vol": 1,"money": 2,"is_collect": false,"updown": 3.0,"line": [3,7,2,2,7,6,7],},
  //     {"last": 12.193,"name": "bth_btc","vol": 1,"money": 2,"is_collect": false,"updown": 3.0,"line": [2,1,3,1,1,5,2],},
  //     {"last": 13.193,"name": "cno_btc","vol": 1,"money": 2,"is_collect": false,"updown": 3.0,"line": [2,7,4,3,2,2,4],},
  //     {"last": 14.193,"name": "eos_btc","vol": 1,"money": 2,"is_collect": false,"updown": 3.0,"line": [1,2,2,1,3,4,4],},
  //   ]
  //   return !this.recvData.length && data || this.recvData.markets
  // }
}

export default MarketStore
