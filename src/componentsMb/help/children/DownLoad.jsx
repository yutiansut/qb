import React, { Component } from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";
import QRCode from "qrcode.react";



export default class DownLoad extends exchangeViewBase {

  constructor(props) {
    super(props);
  }

  render() {
    return <div className='help-download'>
        <h2>{this.intl.get('help-download-title')}</h2>
        <p>{this.intl.get('help-download-intro')}</p>
        <div className="content">
          <img src={this.$imagesMap.$help_download_bg} alt=""/>
          {/* <a href="#" className="iphone">{this.intl.get('help-download-ios')}</a> */}
          <a href="http://www.qb.com/package/com.mix.coinrising_internet_release_v1.1.apk" className="android">{this.intl.get('help-download-android')}</a>
        </div>
        <div className="qrcode">
          <QRCode value='http://www.qb.com/package/com.mix.coinrising_internet_release_v1.1.apk' level="M"/>
        </div>
        <span>{this.intl.get('help-download-tip')}</span>
      </div>;
  }

}
