import {observer} from "mobx-react";
import React from "react";
import HomeMarketComponent from '../components/homeMarketComponent.jsx'
import HomeMarketStore from '../store/homeMarketStore.jsx'

const marketPair = new HomeMarketStore('/trade/detail/');
// console.log('marketPair', marketPair)

class Recommend {
  constructor() {
    this.store = marketPair
  }

  display() {
    return <HomeMarketComponent store={marketPair}/>
  }
}

export default Recommend
