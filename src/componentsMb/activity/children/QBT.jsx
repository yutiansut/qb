import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import exchangeViewBase from "../../../components/ExchangeViewBase";
import QRCode from "qrcode.react";
import Popup from '../../../common/component/Popup/index'
import Button from "../../../common/component/Button/index"

export default class QBT extends exchangeViewBase {
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
            <img src="/static/mobile/activity/icon_coin_qb@2x.png"/>
            <label>{controller.userController.userName}</label>
          </div>
          <div className="user-other">
            <div className="left">
              <img src="/static/mobile/activity/icon_qb_zhye@2x.png"/>
            </div>
            <div className="content content-left">
              <label>{Qbt.availableCount} QBT</label>
              <p>{this.intl.get("asset-balance")}</p>
            </div>
            <div className="right">
              <img src="/static/mobile/activity/icon_qb_yqhy@2x.png"/>
            </div>
            <div className="content">
              <label>邀请好友</label>
              <p>获取更多币啦~</p>
            </div>
          </div>
        </div>


      </div>
    );
  }
}
