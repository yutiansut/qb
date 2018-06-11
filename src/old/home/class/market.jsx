import {observer} from "mobx-react";
import {observable, reaction, computed} from 'mobx';
import React from "react";

import Component from '../components/marketComponent.jsx'

import Pair from './pair.jsx'
@observer
class Market {
  constructor(type) {
    this.type = type;
    this.display = this.display.bind(this)
    // this.pairs = this.pairs.bind(this)
    // this.markets = this.markets.bind(this)
  }


  @computed get pairs() {
    // console.log('1233333333333',store)
    return !this.store.homePairList.length && []
      || this.store.homePairList.map(v => v instanceof Pair && v.setData(v) && v || new Pair(v, this.type))
  }
  @computed get markets() {
    // console.log('computed get pairs', store.marketList.length, store.marketList)
    return !this.store.marketList.length && []
      || this.store.marketList
  }

  display(){
    return <Component type={this.type} pairs={this.pairs} markets={this.markets} store={this.store} />

  }
}

export default Market
