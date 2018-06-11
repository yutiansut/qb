import React from 'react';
import {observer} from "mobx-react";
import {reaction} from "mobx";
import {translate} from "react-i18next";
// import Swal from 'sweetalert2';
import PE from './PE.jsx';
import PS from './PS.jsx';
import PEStore from "../store/PEStore.jsx";
import MsgCaptcha from "../../../store/MsgCaptcha.jsx";

const peStore = new PEStore(conf.signupInUrl, {
  headers: {"X-CSRFToken": conf.csrfToken},
  type: 1,
});
const psStore = new PEStore(conf.signupInUrl, {
  headers: {"X-CSRFToken": conf.csrfToken},
  type: 2,
});
const msgCaptcha = new MsgCaptcha(conf.msgCaptchaUrl);

reaction(() => peStore.pe, data => {
  msgCaptcha.to = data;
});

let errorText = '错误'
if(conf.languageCode !== 'zh-CN') {
  console.log(conf.languageCode)
  errorText = 'error'
}

reaction(() => msgCaptcha.response.jqXHR, data => {
  if (data.status !== 200) {
    swalMix({
      type:'error',
      title:errorText,
      text:data.responseText,
      timer:3000
    })
    peStore.timer = 0;
    // peStore.initVaptcha(window)
  }
});

reaction(() => peStore.response.jqXHR, data => {
  if (data.status === 200) {
    window.location.href = peStore.recvData.next;
  } else {
    swalMix({
      type:'error',
      title:errorText,
      text:data.responseText,
      timer:3000
    })
    peStore.initVaptcha(window)
  }
});

reaction(() => psStore.response.jqXHR, data => {
  if (data.status === 200) {
    window.location.href = psStore.recvData.next;
  } else {
    swalMix({
      type:'error',
      title:errorText,
      text:data.responseText,
      timer:3000
    })
    psStore.initVaptcha(window)
  }
});


@translate(['translations'], {wait: true})
@observer
class APP extends React.Component {
  constructor(props) {
    super(props);
    this.selectSignup = this.selectSignup.bind(this);
    this.activeStyle = this.activeStyle.bind(this);
  }

  activeStyle(selected) {
    const {store} = this.props;
    if (selected === store.selected) {
      return 'active'
    }
    return ''
  }

  selectSignup(type, e) {
    const {store} = this.props;
    store.setSelected(type)
  }

  get content() {
    const {store} = this.props;
    return {
      [store.SELECTED.PE]: <PE store={peStore} get={msgCaptcha.get.bind(msgCaptcha)}/>,
      [store.SELECTED.PS]: <PS store={psStore}/>
    }[store.selected];
  }

  get SELECTED() {
    const {store} = this.props;
    return {
      PE: store.SELECTED.PE,
      PS: store.SELECTED.PS,
    }
  }

  render() {
    const {t} = this.props;
    return (
      <div className="row signUpIn" style={{marginLeft:'0px', marginRight:'0px'}}>
        <div className="col signUpInCol" style={{marginTop:'150px', marginBottom: '72px'}}>
          <div className="card text-center">
            <div className="card-header" style={{margin: "0 -15px 0 -15px"}}>
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <a className={`nav-link ${this.activeStyle(this.SELECTED.PE)}`}
                     href="javascript:void(0)"
                     onClick={this.selectSignup.bind(this, this.SELECTED.PE)}
                  >{t('验证登录')}</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${this.activeStyle(this.SELECTED.PS)}`}
                     href="javascript:void(0)"
                     onClick={this.selectSignup.bind(this, this.SELECTED.PS)}
                  >{t('密码登录')}</a>
                </li>
              </ul>
            </div>
            <div className="card-body" style={{minHeight:'350px'}}>
              {this.content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default APP
