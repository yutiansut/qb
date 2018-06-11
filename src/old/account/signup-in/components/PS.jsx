import React from 'react';
import {observer} from "mobx-react";
import {translate} from "react-i18next";
// import $ from "jquery";

@translate(['translations'], {wait: true})
@observer
class PS extends React.Component {
  constructor(props) {
    super(props);
    this.setField = this.setField.bind(this);
    this.submit = this.submit.bind(this);
    this.getSMSCaptcha = this.getSMSCaptcha.bind(this);
  }

  getSMSCaptcha(e) {
    e.preventDefault();
    const {get} = this.props;
    get()
  }

  setField(field, e) {
    const {store} = this.props;
    store[field] = e.target.value;
  }

  submit(e) {
    e.preventDefault();
    const {store} = this.props;
    store.post()
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
        container: "#vcPS",//验证码容器, HTMLElement或者selector, 必填
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

  get canSubmit() {
    const {store} = this.props;
    return store.pe && store.captcha
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
          <div className="col-xs-12 pr-0" style={{padding:'10px 0',position: 'relative'}}>
            <input type="password"
                   className="form-control"
                   style={{height:'50px',}}
                   onChange={this.setField.bind(this, 'captcha')}
                   placeholder={t("密码")}/>
                 <a className="mix-blue" href={conf.accountReset}
                   style={{display: 'block',position: 'absolute',top: '19px',right: '10px',lineHeight: '30px',height: '30px',textIndent: '5px',borderLeft: '1px solid #ccc',}}>
                   {t("忘记密码")}</a>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xs-12" id="vcPS" style={{padding:'10px 0'}}>
            <div className="vaptcha-init-main" style={{height:'50px'}}>
              <div className="vaptcha-init-loading form-control">
                <a href="/" target="_blank"><img src="https://cdn.vaptcha.com/vaptcha-loading.gif"/></a>
                <span className="vaptcha-text ">{`${t('Vaptcha启动中')}...`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xs-12" style={{padding:'10px 0'}}>
            <button type="submit"
                    disabled={!this.canSubmit}
                    onClick={this.submit}
                    style={{height:'50px'}}
                    className="btn btn-primary form-control">{t("登录")}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default PS
