import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";
import QRCode from "qrcode.react";
import serverConfig from '../../../config/ServerConfig';
import "../style/invite.styl";

export default class Terms extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    const controller = this.props.controller;
    console.log(`${serverConfig.host}/mgenrealize/register/${this.props.location.search}`);
    let { nameUsd, netUrl, coin } = controller.configData;
    return <div className="minvite">
        <h3>邀请有礼：</h3>
        <dl>
          <dt>每邀请一位好友注册{netUrl}完成：</dt>
          <dd>
            <h4>1、邀请送币：</h4>
            <p>好友注册，您获得10{coin}作为奖励，上不封顶~</p>
          </dd>
          <dd>
            <h4>2、交易返佣：</h4>
            <p>好友交易，您进一步获得好友交易手续费的30%作为奖励~</p>
          </dd>
        </dl>
        <p className="welfare">
          同时，您的好友也将获得<span>100{coin}</span>福利
        </p>
        <p className="welfare">有福同享真哥们，赶紧转发海报邀请吧~</p>
        <div className="poster">
          <div className="up">
            <h4 className="header">10亿{coin}欢迎你来拿！</h4>
            <div className="wait" />
            <p className="code-text">
              长按二维码，注册即领取<span>100</span>
              {coin}！<br />邀请好友更有多多{coin}等你拿~
            </p>
            <div className="qrcode">
              <div className="qrcode-wrap">
              <QRCode value={`${serverConfig.host}/mgenrealize/register/${this.props.location.search}`} level="M" bgColor="rgba(0,0,0,0)" fgColor="#FFF"/>
              </div>
            </div>
          </div>
          <div className="down">
            <div className="crt-intro-header">{coin}介绍</div>
            <p className="crt-intro-text1">
              {coin}是{netUrl}币荣网发行的代币，币荣网通过{coin}与全体支持者共享平台成长利益
            </p>
            <p className="crt-intro-text2">
              {coin}总量10亿枚，定期回购销毁，永不增发。
            </p>
            <div className="crt-func-header">{coin}的价值与用途</div>
            <p className="crt-func-intro">
              {nameUsd}币荣将通过{coin}与全球支持者实现利益共享，方式包括但不限于：
            </p>
            <ul className="crt-func clearfix">
              <li className="value">
                <h5>保证价值提升</h5>
                <p>{coin}定期回购销毁</p>
              </li>
              <li className="cost">
                <h5>降低交易成本</h5>
                <p>{coin}可支付手续费</p>
              </li>
              <li className="usage">
                <h5>更多灵活用法</h5>
                <p>{coin}兑换数字货币</p>
              </li>
              <li className="welfa">
                <h5>福利大权在握</h5>
                <p>{coin}用于股票投资</p>
              </li>
              <li className="interesting">
                <h5>让交易更有趣</h5>
                <p>{coin}参与趣味活动</p>
              </li>
              <li className="more">
                <h5>更多智囊服务</h5>
                <p>{coin}提升等级身份</p>
              </li>
            </ul>
            <div className="coming-soon">
              更多价值将进一步挖掘，敬请期待！
            </div>
          </div>
        </div>
      </div>;
  }
}
