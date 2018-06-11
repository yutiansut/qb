import {observer} from "mobx-react";
import React from "react";
import RecommendComponent from '../components/recommendComponent.jsx'
import RecommendStore from '../store/recommendStore.jsx'

const recommendPair = new RecommendStore('/trade/recommend/')


class Recommend {
  constructor() {
    this.store = recommendPair
  }

  display() {
    return <RecommendComponent store={recommendPair}/>
  }
}

export default Recommend
