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
    return (
      <div className="user-notice-pop-wrap">
        <h1 className="user-notice-pop-title clearfix">
          <span>{this.intl.get("notice-userDetail")}</span>
          <img src={this.$imagesMap.$guanbi_hei} alt="" onClick={() => {this.props.onClose && this.props.onClose()}}/>
        </h1>
        <p>{this.props.content}</p>
      </div>
    );
  }
}