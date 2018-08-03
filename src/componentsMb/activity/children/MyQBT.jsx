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
    let relist = [
      {
        invited: '6666666',
        prize: '666'
      },
      {
        invited: '7777777',
        prize: '777'
      }
    ];
    return (
      <div className="my-qbt">
        <div className="user-info">
          <div className="user-name">
            <img src="/static/mobile/asset/icon_coin_qb@2x.png"/>
            <label>{controller.userController.userName}</label>
          </div>
          <div className="user-other">
            <div className="left">
              <img src="/static/mobile/asset/icon_qb_zhye@2x.png"/>
            </div>
            <div className="content content-left">
              <label>{Qbt.availableCount} QBT</label>
              <p>{this.intl.get("asset-balance")}</p>
            </div>
            <div className="right">
              <img src="/static/mobile/asset/icon_qb_yqhy@2x.png"/>
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
              // relist.length ?
              this.state.recordList.length ?
                <ul className="list-ul">
                  {
                    this.state.recordList.map((v, index) => (
                    // relist.map((v, index) => (
                      <li key={index} className="list-li">
                        <span className="invited-name">{v.invited}</span>
                        <span className="invited-prize">+{v.prize} QBT</span>
                      </li>
                    ))
                  }
                </ul> : <label>暂无邀请记录</label>

            }
          </div>
          <div className="invited">
            <label>{`已邀请: ${ this.state.recordList.length}人 累计奖励:
              ${ this.state.recordList.length * this.state.recordList.length?this.state.recordList[0].prize : 0 } QBT `}
            </label>
          </div>
        </div>
        <div className="scan">
          <div className="sacn-title">
            <img src="/static/mobile/asset/icon_scan_small@2x.png"/>
            <label>扫码进群</label>
          </div>
          <div className="info">
            <p>
              之前的随笔从阮一峰老师那里学到了flex的基本用法及作用，现在来把flex具体运用到实例中，看看flex的弹性布局效果。
            </p>
            <input type="text" id="wechat" readOnly ref="wechat" value="微信号 : 1234561"/>
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
        {/*<div className="our-info">*/}
          {/*<div className="our-title">*/}
            {/*<img src="/static/mobile/asset/icon_scan_small@2x.png"/>*/}
            {/*<label>扫码进群</label>*/}
          {/*</div>*/}
        {/*</div>*/}
        <div className="scan">
          <div className="sacn-title">
            <img src="/static/mobile/asset/icon_scan_small@2x.png"/>
            <label>扫码进群</label>
          </div>
          <div className="info">
            <p>
              之前的随笔从阮一峰老师那里学到了flex的基本用法及作用，现在来把flex具体运用到实例中，看看flex的弹性布局效果。
            </p>
            <input type="text" id="wechat" readOnly ref="wechat" value="微信号 : 1234561"/>
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


      </div>
    );
  }
}
