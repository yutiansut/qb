import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import exchangeViewBase from "../../../components/ExchangeViewBase";
import QRCode from "qrcode.react";
import Popup from '../../../common/component/Popup/index'
import Button from "../../../common/component/Button/index"
import Download from '../../../class/lib/DownloadCanvasImage'

export default class MyQBT extends exchangeViewBase {
  constructor(props) {
    super(props);
    let {controller} = props;
    this.state = {
      showSection: 'qbt',
      QbtInfo: {},
      Qbt: {},
      recordList: []
    };
    //绑定view
    controller.setView(this);
    this.copy = el => {
      if (controller.copy(el)) {
        // this.setState({showPopup: true, popMsg: this.intl.get("asset-copySuccess"), popType: "tip1"})
      } else {
        // this.setState({showPopup: true, popMsg: this.intl.get(""), popType: "tip3"})
      }
    };
    this.getMyQbt = controller.getMyQbt.bind(controller);
    this.getInvited = controller.getInvited.bind(controller);
    this.getQbtInfo = controller.getQbtInfo.bind(controller);
  }

  saveIMG() {
    Download(document.querySelector(".qrcode canvas"), "png", "img");

  }

  async componentWillMount() {
    // await this.getWalletList();
    // let currency = this.props.location.query && this.props.location.query.currency;
    // currency && (currency = currency.toUpperCase()) && this.setState({currency: currency.toUpperCase()});
    // this.getCoinAddress(currency || this.state.currency);
    this.getMyQbt();
    this.getQbtInfo();
    this.getInvited();

  }

  componentDidMount() {
  }

  render() {
    // let {coinAddress, verifyNumber} = this.state.coinAddress;
    const {controller} = this.props;
    let Qbt = this.state.Qbt;
    // let walletList = this.deal(this.state.walletList, 'c');
    // let currency = this.state.currency.toUpperCase();
    return (
      <div className="qbt-and-myqbt">

        {this.state.showSection === 'qbt' &&
        <div className="qbt">
          <div className="qbt-banner">
            <h1>QB</h1>
            <h2>QB token</h2>
          </div>
          <div className="qbt-num">
            <div className="left">
              <h1>持有量（枚）</h1>
              <h2>{this.state.Qbt.availableCount}</h2>
            </div>

            <div className="right">
              <h1>当前估值（元）</h1>
              <h3>{this.state.Qbt.valuationCN}</h3>
            </div>
          </div>
          <div className="coin-data">
            <div className="coin-data-title">
              <img src={this.$imagesMap.$h5_activity_qb_jianjie}/>
              <label>币种资料</label>
            </div>
            <div className="coin-data-content">
              <div className="content-item">
                <label className="key">发行时间</label>
                <label className="val">{this.state.QbtInfo.publishTime?this.state.QbtInfo.publishTime.toDate('yyyy-MM-dd'):''}</label>
              </div>
              <div className="content-item">
                <label className="key">发行总量</label>
                <label className="val">{this.state.QbtInfo.publishNum}</label>
              </div>
              <div className="content-item">
                <label className="key">流通总量</label>
                <label className="val">{this.state.QbtInfo.circulationNum}</label>
              </div>
              <div className="content-item">
                <label className="key">众筹价格</label>
                <label className="val">{this.state.QbtInfo.crowdfundingPrice}</label>
              </div>
              <div className="content-item">
                <label className="key">官网</label>
                <label className="val">{this.state.QbtInfo.website}</label>
              </div>
              <div className="content-item">
                <label className="key">区域查询</label>
                <label className="val">{this.state.QbtInfo.locationSearch}</label>
              </div>

            </div>
          </div>

          <div className="coin-introduction">
            <h1 className="coin-introduction-title">简介</h1>
            {/*<h2>QB（QB Token）是交易平台发行的生态币，是交易平台自身所有权益的代表，可以在Q币生态众多场景下使用并流通。</h2>*/}
            <h2>{this.state.QbtInfo.description}</h2>
            <h3>QB的发行上限为10亿，永不增加。</h3>
          </div>

          <div className="coin-value">
            <h1 className="coin-value-title">QB的价值与用途</h1>
            <div className="coin-value-box">
              <div className="coin-box-item">
                <img src={this.$imagesMap.$h5_activity_qb_jj_one} />
                <h2>保证价值提升</h2>
                <h3>QB定期回购销毁</h3>
              </div>
              <div className="coin-box-item">
                <img src={this.$imagesMap.$h5_activity_qb_jj_two} />
                <h2>降低交易成本</h2>
                <h3>QB可支付手续费</h3>

              </div>
              <div className="coin-box-item">
                <img src={this.$imagesMap.$h5_activity_qb_jj_three} />
                <h2>更多灵活用法</h2>
                <h3>QB兑换数字货币</h3>

              </div>
              <div className="coin-box-item">
                <img src={this.$imagesMap.$h5_activity_qb_jj_four} />
                <h2>福利大权在握</h2>
                <h3>QB用于权益投票</h3>

              </div>
              <div className="coin-box-item">
                <img src={this.$imagesMap.$h5_activity_qb_jj_five} />
                <h2>让交易更有趣</h2>
                <h3>QB参与趣味活动</h3>

              </div>
              <div className="coin-box-item">
                <img src={this.$imagesMap.$h5_activity_qb_jj_six} />
                <h2>更多智囊服务</h2>
                <h3>QB提升身份等级</h3>

              </div>
            </div>
          </div>


          <div className="coin-get">
            <h1 className="coin-get-title">如何获得Q币</h1>
            <h2>1. 注册成为QB用户</h2>
            <h2>2. 邀请好友来QB网交易</h2>
            <h3>成为QB网的全球合作伙伴与代表，我们支持多种合作模式，欢迎咨询与探讨，我们希望与您成为朋友。</h3>
            <div className="coin-invite" >
              <Button title="立即邀请"/>
            </div>

            <div className="contact">
              <h1>联系方式</h1>
              <h2>微信: <span>aavvcc</span></h2>
              <h2>QQ: <span>awdawdawd</span></h2>
              <h2>电话:<span>435345345324</span></h2>
            </div>
          </div>
          <div className="coin-join">
            <h1 className="coin-join-title">参与合作</h1>
            <h2>1. 参与QB网丰富有趣的活动</h2>
            <h2>2. 参与QB网平台建设与运营，提出各种建设性建议与合作资源引荐</h2>
            <h2>合作方式：xxxx</h2>
            <h2>建议邮箱：xxxx</h2>
            <h2>其他价值与用途持续挖掘中，敬请期待！</h2>
            <h3>* 通过QB网币币交易与场外交易购买Q币，交易功能暂缓开放。</h3>
          </div>
        </div>
        }

        {this.state.showSection === 'my-qbt' &&
        <div className="my-qbt">
          <div className="user-info">
            <div className="user-name">
              <img src={this.$imagesMap.$h5_activity_qb}/>
              <label>{controller.userController.userName}</label>
            </div>
            <div className="user-other">
              <div className="left">
                <img src={this.$imagesMap.$h5_activity_qb_num}/>
              </div>
              <div className="content content-left">
                <label>{Qbt.availableCount} QBT</label>
                <p>{this.intl.get("asset-balance")}</p>
              </div>
              <div className="right">
                <img src={this.$imagesMap.$h5_activity_qb_heart}/>
              </div>
              <div className="content">
                <label>邀请好友</label>
                <p>获取更多币啦~</p>
              </div>
            </div>
          </div>
          <div className="my-invite">
            <div className="invite-top">
              <label>我的邀请</label>

            </div>
            <div className="invite-list">
              {
                this.state.recordList.length ?
                  <ul className="list-ul">
                    {
                      this.state.recordList.map((v, index) => (
                        <li key={index} className="list-li">
                          <span className="invited-name">{v.invited}</span>
                          <span className="invited-prize">+{v.prize} QB</span>
                        </li>
                      ))
                    }
                  </ul> : <label>暂无邀请记录</label>

              }
            </div>
            <div className="invited">
              <label>{`已邀请: ${ this.state.recordList.length}人 累计奖励:
              ${ this.state.recordList.length * this.state.recordList.length ? this.state.recordList[0].prize : 0 } QBT `}
              </label>
            </div>
          </div>
          <div className="scan">
            <div className="scan-title">
              <img src={this.$imagesMap.$h5_activity_qb_scan}/>
              <label>扫码进群</label>
            </div>
            <div className="info">
              <h2>加入CRT官方群，福利多多</h2>
              <h2>1. 福利：第一时间获取QBT利好消息，不定期发放BTC、RSK、EOS等主流币糖果哦~</h2>
              <h2>2. 入群方式：添加官方客服拉入群</h2>
              <h2>
                官方客服微信号：
                <input type="text" id="wechat" readOnly ref="wechat" value="1234561"/>

              </h2>
            </div>
            <div className="qrcode-container">
              <div className="qrcode">
                <QRCode value="http://news.sina.com.cn/s/2018-08-02/doc-ihhehtqf4950150.shtml"
                        level="M" bgColor="#000"
                        fgColor="#fff"/>
              </div>

              <div className="qr-btns">
                <Button title="保存二维码" type="default" theme="main" className="save-btn" onClick={this.saveIMG}/>
                <Button title="复制微信号" type="default" theme="main" className="copy-btn" onClick={() => {
                  this.copy(this.refs.wechat);
                }}/>
              </div>

            </div>
          </div>
          <div className="our-info">
            <div className="our-title">
              <img src={this.$imagesMap.$h5_activity_qb_tishi}/>
              <label>我的帮助</label>
            </div>
            <div className="our-content">
              <h2>联系我们</h2>
              <h2>微信: <span>aavvcc</span></h2>
              <h2>QQ: <span>awdawdawd</span></h2>
              <h2>电话:<span>435345345324</span></h2>
            </div>
          </div>
        </div>
        }

        <div className="qbt-switch">
          <ul className="clearfix">
            <li className={this.state.showSection === 'qbt' ? 'active qbt-btn' : 'qbt-btn'}
                onClick={() => {this.setState({showSection: 'qbt'})}}>
              <div>
                <img src={this.state.showSection === 'qbt'? this.$imagesMap.$h5_activity_qb_home_click : this.$imagesMap.$h5_activity_qb_home_normal }/>
                <p>QBT</p>
              </div>
            </li>
            <li className={this.state.showSection === 'my-qbt' ? 'active my-qbt-btn' : 'my-qbt-btn'}
                onClick={() => {this.setState({showSection: 'my-qbt'})}}>
              <div>
                <img src={this.state.showSection === 'my-qbt'? this.$imagesMap.$h5_activity_qb_my_click : this.$imagesMap.$h5_activity_qb_my_normal}/>
                <p>我的</p>
              </div>
            </li>
          </ul>
        </div>

      </div>
    );
  }
}
