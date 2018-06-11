import React from 'react';
import {observer} from "mobx-react";
import {reaction} from 'mobx';
import {translate} from "react-i18next";
// import $ from "jquery";

@translate(['translations'], {wait: true})
@observer
class PE extends React.Component {
  constructor(props) {
    super(props);
    const {store} = this.props;
    this.setField = this.setField.bind(this);
    this.submit = this.submit.bind(this);
    this.getSMSCaptcha = this.getSMSCaptcha.bind(this);
    this.setProtocolState = this.setProtocolState.bind(this);
    this.clickSendCaptcha = this.clickSendCaptcha.bind(this);
    store.captchaBtnChecked = 'CAPTCHA';
    reaction(() => store.timer, data => {
      if (data === 0) {
        store.captchaBtnChecked = 'CAPTCHA';
        clearInterval(store.interval);
      }
    })
  }

  clickSendCaptcha() {
    const {get, store} = this.props;
    get();
    store.captchaBtnChecked = 'COUNT_DOWN';
    store.timer = 60;
    store.interval = setInterval(() => {
      store.timer -= 1;
    }, 1000)
  }

  get CaptchaOrCountDown() {
    const {t, store} = this.props;
    return {
      CAPTCHA: <input className="btn btn-outline-info form-control border"
                      type="button"
                      style={{height:'50px'}}
                      disabled={!store.isValidPE}
                      onClick={this.clickSendCaptcha}
                      value={t("发送验证码")}
      />,
      COUNT_DOWN: <input className="btn btn-outline-info form-control border"
                         type="button"
                         style={{height:'50px'}}
                         disabled={true}
                         value={store.timer}
      />
    }
  }

  /**
   * 得到发送验证码或者倒计时
   */
  get sendCaptchaOrCountDown() {
    const {store} = this.props;
    return this.CaptchaOrCountDown[store.captchaBtnChecked]
  }

  get disabled() {
    const {store} = this.props;
    return store.disabled;
  }

  getSMSCaptcha(e) {
    e.preventDefault();
    const {get, store} = this.props;
    get();
    store.disabled = true;

  }

  setField(field, e) {
    const {store} = this.props;
    store[field] = e.target.value;
  }

  setProtocolState(e) {
    const {store} = this.props;
    store.protocol = e.target.checked;
  }

  submit(e) {
    e.preventDefault();
    const {store} = this.props;
    store.post()
  }

  get protocol() {
    const {store} = this.props;
    return store.protocol;
  }

  get canSubmit() {
    const {store} = this.props;
    return store.canSubmit;
  }

  componentDidMount() {
    $.ajax({
      url: conf.getVaptchaUrl,
      method: "GET"
    }).done(function (data, textStatus, jqXHR) {
      const {store} = this.props;
      const vConfig = {
        lang: conf.languageCode,
        vid: data.vid, //验证单元id, string, 必填
        challenge: data.challenge, //验证流水号, string, 必填
        container: "#vcPE",//验证码容器, HTMLElement或者selector, 必填
        type: "click", //必填，表示点击式验证模式
        effect: 'float', //验证图显示方式, string, 可选择float, popup, 默认float
        https: false, //协议类型, boolean, 可选true, false,不填则自适应。
        color: "#428bca ", //按钮颜色, string
        outage: conf.downTimeUrl, //服务器端配置的宕机模式接口地址
        success: function (token, challenge) {//验证成功回调函数, 参数token, challenge 为string, 必填
          //todo:执行人机验证成功后的操作
          store.token = token;
          store.challenge = challenge;
        }.bind(this),
        fail: function () {//验证失败回调函数
          store.token = '';
          store.challenge = '';
        }.bind(this)
      };
      store.vaptchaConfig = vConfig;
      store.initVaptcha(window);
    }.bind(this))
      .fail(function (jqXHR, textStatus, errorThrown) {
      });
  }

  render() {
    const {t} = this.props;
    return (
      <div>
        <div className="row mb-3">
          <div className="col-xs-12" style={{padding:'20px 0 10px'}}>
            <input type="text"
                   className="form-control"
                   style={{height:'50px'}}
                   onChange={this.setField.bind(this, 'pe')}
                   placeholder={t("手机号/邮箱")}/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xs-12" id="vcPE" style={{padding:'10px 0'}}>
            <div className="vaptcha-init-main" style={{height:'50px'}}>
              <div className="vaptcha-init-loading form-control">
                <a href="/" target="_blank"><img src="https://cdn.vaptcha.com/vaptcha-loading.gif"/></a>
                <span className="vaptcha-text ">{t("Vaptcha启动中")}...</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xs-6 col-lg-7 pr-0" style={{padding:'10px 0'}}>
            <input type="text"
                   className="form-control"
                   style={{height:'50px'}}
                   onChange={this.setField.bind(this, 'captcha')}
                   placeholder={t("验证码")}/>
          </div>
          <div className="col-xs-6 col-lg-5 pl-0" style={{padding:'10px 0'}}>
            {this.sendCaptchaOrCountDown}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xs-12" style={{padding:'10px 0'}}>
            <button type="submit"
                    onClick={this.submit}
                    style={{height:'50px'}}
                    disabled={!this.canSubmit}
                    className="btn btn-primary form-control">{t("登录")}</button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12" style={{padding:'10px 0'}}>
            <input type="checkbox"
                   onChange={this.setProtocolState}
                   checked={this.protocol}
            />{t("我已阅读并同意")}
            <a href={conf.helpTerms}>{t("用户协议")}</a>
          </div>
        </div>
      </div>
    )
  }
}

export default PE
