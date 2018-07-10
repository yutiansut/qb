import React, {Component} from 'react';
import ExchangeViewBase from "../ExchangeViewBase";
import {ChangeFontSize} from '../../core'


export default class Header extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    ChangeFontSize(375, 375*2, 375);
  }

  componentWillUpdate(props, state, next) {
      ChangeFontSize(375, 375*2, 375);
  }

  render() {
    return (
      <div></div>
    )
  }
}
