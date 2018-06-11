import {observer} from "mobx-react";
import React from "react";

import Component from '../components/pairComponent.jsx'
import Store from '../store/pairStore.jsx'
class Pair {
  constructor(data, type){
    this.store = new Store(data)
    this.type = type
    this.display = this.display.bind(this)
  }

  display(){
    return <Component store={this.store} type={this.type} />
  }
}

export default Pair
