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
        <h1>联系我们</h1>
        <ul>
          <li>{`地址：${controller.configData.addr}`}</li>
          <li>{`邮件：${controller.configData.contactEmailUrl}`}</li>
          <li>{`网址：${controller.configData.netUrl}`}</li>
        </ul>
      </div>
    );
  }

}