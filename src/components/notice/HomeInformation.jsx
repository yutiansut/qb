import React, {Component} from 'react';
import "./stylus/homeNotice.styl"
import exchangeViewBase from "../ExchangeViewBase";

export default class HomeInformation extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="inner information-wrap">
        <h1>
          <span>资讯概览</span>
          <b>查看更多</b>
        </h1>
        <ul>
          <li></li>

        </ul>
      </div>
    );
  }
}
