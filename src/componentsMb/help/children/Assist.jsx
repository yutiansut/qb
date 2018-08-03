import React, {Component} from "react";
import ExchangeViewBase from "../../../components/ExchangeViewBase";

export default class Pricing extends ExchangeViewBase {
  constructor(props) {
    super(props);
    const {controller} = props
    controller.setView(this);
    console.log('帮助中心', controller, controller.configData)
    this.addContent = controller.headerController.addContent.bind(controller.headerController) // 获取头部内容
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.addContent({con: this.intl.get("help-center")})
  }

  render() {
    const {controller} = this.props;
    return <div className={`assist-wrap ${controller.getQuery("os") === "0" ? "nohead" : ''}`}>
      <div>
        <h1>{this.intl.get("notice-contact")}</h1>
        <ul>
          <li>{`${this.intl.get("notice-addr")}：${controller.configData.addr}`}</li>
          <li>{`${this.intl.get("user-email")}：${controller.configData.contactEmailUrl}`}</li>
          <li>{`${this.intl.get("notice-web")}：${controller.configData.netUrl}`}</li>
        </ul>
      </div>
      <div>
        <h1>{this.intl.get("footer-request")}</h1>
        <ol>
          <li>{`${this.intl.get("notice-addr")}：${controller.configData.addr}`}</li>
          <li>{`${this.intl.get("user-email")}：${controller.configData.contactEmailUrl}`}</li>
          <li>{`${this.intl.get("notice-web")}：${controller.configData.netUrl}`}</li>
        </ol>
      </div>
    </div>
  }
}
