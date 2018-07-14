import React, {Component} from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase'
import "../stylus/userNotice.styl"

export default class userNotice extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {

  }

  async componentDidMount() {

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    console.log(7483785737, this.props.content)
    return (
      <div className="user-notice-pop-wrap">
        <h1 className="user-notice-pop-title clearfix">
          <span>详情</span>
          <img src="/static/img/guanbi_hei.svg" alt="" onClick={() => {this.props.onClose && this.props.onClose()}}/>
        </h1>
        <p>{this.props.content}</p>
      </div>
    );
  }
}