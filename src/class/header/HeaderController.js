import ExchangeControllerBase from '../ExchangeControllerBase'
// import React from 'react';

export default class HeaderController extends ExchangeControllerBase {
  constructor(props) {
    super(props)
  }

  setView(view){
    super.setView(view);
    // return this.store.data
  }

  addContent(con) {
    this.view.addContent(con)
  }

}