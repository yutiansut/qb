import React, { Component } from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";
import QRCode from "qrcode.react";
import "../stylus/activity.styl";

export default class Terms extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.controller = this.props.controller;
    this.controller.setView(this);
    this.state={}
    let { pr, aw, tv } = this.controller.initState;
    this.state = Object.assign(this.state, { pr, aw, tv });
    this.getPrice = this.controller.getPrice.bind(this.controller);
  }
  async componentDidMount(){
    await this.getPrice();
  }
  render() {
    return <div className="minvite">
        <dl>
          <dt>{this.intl.get("activity-invite-37")}</dt>
          <dd>
            <h4>1、{this.intl.get("activity-invite-39")}</h4>
            <p>{this.intl.get("activity-rule-1")}</p>
          </dd>
          <dd>
            <h4>2、{this.intl.get("activity-invite-38")}</h4>
            <p>
              {this.intl.get("activity-invite-2", {
                number: this.state.pr
              })}
            </p>
          </dd>
        </dl>
        <p className="welfare">
          {this.intl.getHTML("activity-invite-5", {
            number: this.state.aw
          })}
        </p>
        <p className="welfare">
          {this.intl.getHTML("activity-rule-40", {
            number: this.state.tv.format({
              number: "property",
              style: { decimalLength: 0 }
            })
          })}
        </p>
        <p className="welfare">{this.intl.get("activity-invite-6")}</p>
        <div className="poster">
          <div className="up">
            <img src={this.$imagesMap.$invite} alt="" />
            <div className="qrcode">
              <div className="qrcode-wrap">
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}
