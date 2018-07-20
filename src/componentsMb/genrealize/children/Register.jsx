import React, { Component } from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";
import Button from "../../../common/component/Button"
import Input from "../../../common/component/Input"
import "../style/register.styl";

export default class Register extends exchangeViewBase {
  constructor(props) {
    super(props);
    const { controller } = this.props;
    controller.setView(this);
    let uid = controller.getQuery("uid");
    this.state = {
      account: "",
      uid: JSON.parse(uid),
      margin: 0,
      showVagueBgView: false,
      showSuccess: false,
      showFail: false,
      activityOver: false,
      tip:''
    };
    // 轮询qbt余量
    this.getQbtMargin = controller.getQbtMargin.bind(controller);
    // 清除轮询qbt余量任务
    this.clearGetQbtMargin = controller.clearGetQbtMargin.bind(controller);
    // 领取qbt奖励
    this.getAward = controller.getAward.bind(controller);

    this.clickOut = () => {
      this.setState({
        showVagueBgView: false,
        showSuccess: false,
        showFail: false,
        activityOver: false
      });
    };
  }
  componentWillMount() {
    this.getQbtMargin();
  }
  componentWillUnmount() {
    //清除轮询qbt余量任务
    this.clearGetQbtMargin();
  }
  render() {
    let { margin, showVagueBgView, showSuccess, showFail } = this.state;
    const controller = this.props.controller;
    // console.log(`${serverConfig.host}/genrealize/register/${this.props.location.search}`);
    let { nameUsd, coin } = controller.configData;
    return <div className="mregister">
        <div className="vagueBgView" style={{ display: showVagueBgView ? "block" : "none" }} onClick={this.clickOut} />
        <div className="banner">
          <div className="balance">
            <b>{this.intl.get("activity-invite-27")}</b>
            <span>{margin.format({ number: "general" })}</span>
          </div>
        </div>
        <div className="content">
          <div className="title">{this.intl.get("activity-invite-29")}</div>
          <p>{this.intl.getHTML("activity-title")}</p>
          <div className="form">
            <Input type="text" placeholder={this.intl.get("activity-rule-41")} value={this.state.account} onInput={value => {
                this.setState({ account: value });
              }} />
            <Button type="base" title={this.intl.get("activity-click")} onClick={() => {
                this.getAward({
                  inviter: this.state.uid,
                  invited: this.state.account
                });
              }}>
            </Button>
          </div>
        </div>

        <div className="successAlert" style={{ display: showSuccess ? "block" : "none" }}>
          <img src={this.$imagesMap.$award_success} alt="" />
          <p>{this.intl.get("activity-invite-31")}</p>
          <div className="mregister-asset">
              {this.intl.get("activity-invite-32")}
            <span>20{coin}</span>
          </div>
          <div className="download">
              <Button type="base" title={this.intl.get("activity-invite-33")} href="http://www.cointalks.com/res/com.mix.coinrising_v1.1_debug.apk" target="_blank">
              </Button>
          </div>
        </div>

        <div className="failureAlert" style={{ display: showFail ? "block" : "none" }}>
          <p>{this.intl.get("activity-invite-34")}</p>
          <div className="tip">
            {this.state.activityOver
              ? this.state.tip
              : this.intl.get("activity-invite-35")}
          </div>
          <Button type="base" title={this.intl.get("activity-invite-36")} onClick={this.clickOut}>{this.intl.get("activity-invite-36")}</Button>
        </div>
      </div>;
  }
}
