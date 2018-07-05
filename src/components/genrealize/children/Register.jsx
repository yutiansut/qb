import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";
import "../style/register.styl";

export default class Register extends exchangeViewBase {
  constructor(props) {
    super(props);
  }
  render() {
    const controller = this.props.controller;
    // console.log(`${serverConfig.host}/genrealize/register/${this.props.location.search}`);
    let { coin } = controller.configData;
    return (
      <div className="register">
        <div className="vagueBgView"/>
        <div className="banner">
          <div className="balance">
            {coin}余额
            <span>1,000,000</span>
          </div>
          <p className="wait">还在等什么？</p>
        </div>
        <div className="content">
          <div className="title">新人奖励</div>
          <p>
            注册即领取
            <span>100</span>{coin}
          </p>
          <input
            type="text"
            placeholder="请输入您的手机号/邮箱地址"
            id="username"
          />
          <button>领取</button>
        </div>
        <div className="successAlert">
          <img src="./images/success.png" alt="" />
          <p>领取成功</p>
          <div className="asset">
            您当前的资产
            <span>100</span>/{coin}
          </div>
          <a href="http://192.168.113.3/Share/" target="_blank">
            下载QBapp,登录即查看资产~
          </a>
        </div>

        <div className="failureAlert">
          <p>温馨提示</p>
          <div className="tip">
            亲，你已经是QB的用户了，马上下载QBapp, 每天还能领{coin}哦~
          </div>
          <button>知道了</button>
        </div>
      </div>
    );
  }
}
