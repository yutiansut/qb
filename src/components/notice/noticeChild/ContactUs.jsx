import React, {Component} from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase'


export default class contactUs extends exchangeViewBase {
  constructor(props) {
    super(props);
    // const {controller} = props
    // console.log('jsxconfig',controller.configData)

  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    const {controller} = this.props
    return (
      <div className="contact-wrap">
        <h1>{this.intl.get("notice-contact")}</h1>
        <ul>
          <li>{`${this.intl.get("notice-addr")}：${controller.configData.addr}`}</li>
          <li>{`${this.intl.get("user-email")}：${controller.configData.contactEmailUrl}`}</li>
          <li>{`${this.intl.get("notice-web")}：${controller.configData.netUrl}`}</li>
        </ul>
      </div>
    );
  }

}