import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";
import queryString from "querystring";
import "../style/register.styl";

export default class Register extends exchangeViewBase {
  constructor(props) {
    super(props);
    const { controller } = this.props;
    controller.setView(this);
    let query = queryString.parse(this.props.location.search.substring(1));

    this.state = {
      account: "",
      uid: JSON.parse(query.uid),
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
    return (
      <div className="mregister">
        <div
          className="vagueBgView"
          style={{ display: showVagueBgView ? "block" : "none" }}
          onClick={this.clickOut}
        />
        <div className="banner">
          <div className="balance">
            {coin}余额
            <span>{margin.format({ number: "general" })}</span>
          </div>
          <p className="wait">还在等什么？</p>
        </div>
        <div className="content">
          <div className="title">新人奖励</div>
          <p>
            注册即领取
            <span>100</span>
            {coin}
          </p>
          <input
            type="text"
            placeholder="请输入您的手机号/邮箱地址"
            value={this.state.account}
            onInput={e => {
              this.setState({ account: e.target.value });
            }}
          />
          <button
            onClick={() => {
              this.getAward({
                inviter: this.state.uid,
                invited: this.state.account,
              });
            }}
          >
            领取
          </button>
        </div>
        <div
          className="successAlert"
          style={{ display: showSuccess ? "block" : "none" }}
        >
          <img src="/static/images/genrealize/success.png" alt="" />
          <p>领取成功</p>
          <div className="register-asset">
            您当前的资产
            <span>100</span>/{coin}
          </div>
          <a href="http://192.168.113.3/Share/" target="_blank">
            下载{nameUsd}app,登录即查看资产~
          </a>
        </div>

        <div
          className="failureAlert"
          style={{ display: showFail ? "block" : "none" }}
        >
          <p>温馨提示</p>
          <div className="tip">
            {this.state.activityOver ? this.state.tip : `亲，你已经是${nameUsd}的用户了，马上下载${nameUsd}app, 每天还能领${coin}哦~`}
          </div>
          <button onClick={this.clickOut}>知道了</button>
        </div>
      </div>
    );
  }
}
