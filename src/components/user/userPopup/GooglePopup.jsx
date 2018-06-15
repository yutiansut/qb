import React, {Component} from 'react';

import exchangeViewBase from "../../ExchangeViewBase";
import Button from '../../../common/component/Button/index.jsx'
import "../stylus/googlePopup.styl"


export default class GooglePopup extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="google-wrap" style={{display: this.props.isGoogle}}>
        <div className="google-info">
          <img src="/static/img/guanbi_hei.svg" alt="" className="close-popup" onClick={() => {this.props.changeGooglePopup('none')}}/>
          <h1>开启谷歌验证</h1>
          <div className="clearfix">
            <ul>
              <li>1</li>
              <li>安装双重验证程序： Google Authenticator</li>
              <li><Button title="App Store" className="google-btn"/></li>
              <li><Button title="Google.play" className="google-btn"/></li>
              <li>Google Authenticator on other devices</li>
            </ul>
            <ul>
              <li>2</li>
              <li>在“Google Authenticator (身份验证器)”应用程序中，点击“添加新账户”扫描下方二维码</li>
              <li><img src="" alt=""/></li>
              <li>如果您无法扫描成功上图的条形码，您可以手动添加账户，输入如下密钥: 3LGZ6QBSEWBHH5BF</li>
            </ul>
            <ul>
              <li>3</li>
              <li>警告：</li>
              <li>
                <i>请您务必将密钥记录下来：</i>
                <em>3LGZ6QBSEWBHH5BF</em>
              </li>
              <li>如果误删或是更换手机，手动输入密钥是您唯一恢复的方式。</li>
              <li>请输入显示的验证码，开启验证功能</li>
              <li>
                <input type="text" placeholder="IP地址"/>
                <Button title="添加" className="name-btn" onClick={this.test}/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
