import React from 'react';
import ReactDOM from 'react-dom';
import {RequestStore} from "../../store/request.jsx";
import {observer} from "mobx-react";
import {computed} from 'mobx';
import {I18nextProvider} from "react-i18next";
import i18n from "../../common/i18n.jsx";
import {translate} from 'react-i18next';
import {observable} from "mobx";

const isEmpty = require('lodash.isempty');
i18n.options.fallbackLng = Array(LANGUAGE_CODE);

@translate(['translations'], {wait: true})
@observer
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.add_ip_white_list = this.add_ip_white_list.bind(this);
    this.del_ip_white_list = this.del_ip_white_list.bind(this);
    this.set_time_zone = this.set_time_zone.bind(this);
    this.setNotification = this.setNotification.bind(this);
    this.setBtnForbid = this.setBtnForbid.bind(this);
  }

  componentWillMount(props) {
    this.get_user_dict();
  }

  componentDidMount() {
    let testEl = {
      email: $('#id-modal-test-email'),
      google: $('#id-modal-test-google'),
      sms: $('#id-modal-test-sms')
    };

    _.each(['email', 'google', 'sms'], function (obj) {
      const el = testEl[obj];
      el.find('.modal-footer button').click(function () {
        const val = $(this).parent().prev().find('input:last').val();
        if (/^\d{6}$/.test(val)) {
          const data = el.data();
          App.submit(
            '/account/switch-tfa/',
            {
              which: data.which,
              to: data.to,
              code: val
            },
            function () {
              el.modal('hide');
                setTimeout(function () {
                  location.reload();
                }, 1000);
            }
            );
          }else {
            if(val) {App.errorTip('验证码格式有误')}
            else {App.errorTip('请输入验证码')}
        }
      });
      el.on('shown.bs.modal', function () {
        App.refreshCaptcha();
        el.find('.btn-get-email-code').attr('disabled', false).button('reset');
        el.find('button.btn-get-sms-code').attr('disabled', false).button('reset');
        el.find('.modal-body input:not(.cp-key)').val('');
        el.find('.dropdown-toggle').removeClass('disabled');
      });
    });
  }

  //改变两步验证的方式
  changeTfa(e){
    const store = this.props.store;
    const emailVerified = !!store.recvData.email_verified;
    const phone = !!store.recvData.phone;
    const totpSecret = !!store.recvData.totp_secret;
    const tfaSignin = store.recvData.tfa_signin;
    const tfaWithdraw = store.recvData.tfa_withdraw;
    const tfaFundpass = store.recvData.tfa_fundpass;
    const me = $(e.target);
    //先更新页面样式
    const labelDom = me.parent();
    const $radioGroup = me.closest('.bb-radio-group');
    const radioStatus = me.is('checked');
    if (!radioStatus) {
      $radioGroup.find('.radio-checked')
        .addClass('radio-unchecked')
        .removeClass('radio-checked');
      labelDom.find('.radio-img')
        .addClass('radio-checked')
        .removeClass('radio-unchecked');
    }
    //处理转换
    let val = ~~me.val();
    let which = ~~me.closest('.bb-radio-group').data('pk');
    const configReq = [true,emailVerified,totpSecret,phone];
    const tfaSettings = [tfaSignin,tfaWithdraw,tfaFundpass];
    if(configReq[val]){
    //  already config
      let cur = tfaSettings[which];
      if (cur !== val) {
        // console.log(which,cur,val);
        if(cur===0){
          this.tfaSwitchFromNone(which, val);
        }
        if(cur===1){
          this.tfaSwitchFromEmail(which, val);
        }
        if(cur===2){
          this.tfaSwitchFromGoogle(which, val);
        }
        if(cur===3){
          this.tfaSwitchFromSms(which, val);
        }
      }
    }else {
    //  config first 只有google未验证能走到这一步
      // console.log('need config first');
      let that = this;
      this.totpConfig().done(function () {
        // alert('google otp over');
        let cur = tfaSettings[which];
        if (cur !== val) {
          if(cur===0){
          that.tfaSwitchFromNone(which, val);
        }
        if(cur===1){
          that.tfaSwitchFromEmail(which, val);
        }
        if(cur===2){
          that.tfaSwitchFromGoogle(which, val);
        }
        if(cur===3){
          that.tfaSwitchFromSms(which, val);
        }
        }
      })
    }
  }

  //谷歌验证的模态框
  totpConfig(){
    let d = $.Deferred();
    $('#id-modal-config-otp').data('d', d).modal('show');
    return d;
  }

  //两步验证的切换，开始是无
  tfaSwitchFromNone(which, to){
    App.submit(
        '/account/switch-tfa/',
        {which: which, to: to},
        function () {
            setTimeout(function () { location.reload(); }, 1000);
        }
      );
  }

  //两步验证的切换，开始是email
  tfaSwitchFromEmail(which, to){
    $('#id-modal-test-email').data({'which': which, 'to': to}).modal('show');
  }

  //两步验证的切换，开始是google
  tfaSwitchFromGoogle(which, to){
    $('#id-modal-test-google').data({'which': which, 'to': to}).modal('show');
  }

  //两步验证的切换，开始是短信
  tfaSwitchFromSms(which, to){
    $('#id-modal-test-sms').data({'which': which, 'to': to}).modal('show');
  }

  //其他设置的显示&隐藏
  show_other_setting() {
    let me = $("#other-setting");
    if (me.hasClass('other-setting')) {
      me.removeClass('other-setting');
      $('.bb-setting').hide()
    } else {
      me.addClass('other-setting')
    }
  }

  //增加白名单中的ip
  add_ip_white_list(e) {
    const {t, i18n} = this.props;
    e.preventDefault();
    const that = this;
    // const elTbody = $('#id-form-ip-whitelist + table tbody');
    // let tpl = _.template('<tr data-pk="<%= pk %>"><td><%= ip %></td><td><%= date %></td><td><a href="#" className="tip" title="删除"><i className="fa fa-close"></i></a></td></tr>');
    App.submit(
      '/account/security/',
      {ip: $('#add-ip-addr').val(), act: 'add-ip'},
      function (resp) {
        App.okTip(t('操作成功'));
        // elTbody.find('>.empty').remove();
        // elTbody.append(tpl(resp));
        that.get_user_dict()
      },
      null
    );
  }

  //删除白名单中的ip
  del_ip_white_list(s_id,e) {
    e.preventDefault();
    const that = this;
    App.submit(
      '/account/security/',
      {which: s_id, act: 'del-ip'},
      function () {
        that.get_user_dict()
      }
    );
    return false;
  }

  //设置通知的形式（短信or邮件）
  setNotification(e){
    e.preventDefault();
    let nsType = $(e.target).val();
    if (nsType === 'sms'){
      $("#sms-span").addClass('radio-checked').removeClass('radio-unchecked');
      $("#email-span").addClass('radio-unchecked').removeClass('radio-checked');
    }else {
      $("#email-span").addClass('radio-checked').removeClass('radio-unchecked');
      $("#sms-span").addClass('radio-unchecked').removeClass('radio-checked');
    }
    App.submit('/account/toggle-ns/', {val: nsType});
  }

  get_user_dict() {
    const store = this.props.store;
    store.get()
  }

  //退出其他所有的登录状态
  quit_all_other_login() {
    App.submit('/account/security/',
      {which: 'ALL', act: 'signout-session'},
      function () {
        location.reload();
      }
    );
  }

  show_email_status(email, email_verified) {
    const {t, i18n} = this.props;
    if (email && email_verified) {
      return <i className="fa fa-check tip verify" title={t('已验证')}></i>
    } else if (email && !email_verified) {
      return <div><i className="fa fa-exclamation tip verify" title={t('未验证')}></i>
        <a href="#" className="small" id="id-send-verify-email">{t('发送验证邮件')}</a></div>
    } else {
      return <a href="#" data-toggle="modal" data-target="#id-modal-config-email">{t('绑定邮箱')}</a>
    }
  }

  //时区是否加入选中
  tz_handle(tz, i, tz_id) {
    if (i == tz_id) {
      return <option value={i} selected key={i}>{tz.text}</option>
    } else {
      return <option value={i} key={i}>{tz.text}</option>
    }
  }

  set_time_zone(e) {
    const {t, i18n} = this.props;
    e.preventDefault();
    let that = this;
    let tz_id = $("#time-zone").find("option:selected").val();
    $.post('/account/profile/?act=set-tz', {'tz_id': tz_id}, function () {
      App.okTip(t('操作成功'));
      // that.get_user_dict()
    })

  }

  setBtnForbid (e){
    const $me = $(e.target);
    const store = this.props.store;
    if($me.val() !== ''){
      store.btnForbid = ''
    }else {
      store.btnForbid = 'disabled'
    }
  }


  render() {
    const {t, i18n} = this.props;
    const store = this.props.store;
    // console.log("credits recvData", store.recvData);
    // console.log("credits recvData isEmpty", isEmpty(store.recvData));
    const tfas = isEmpty(store.recvData) ? [] : store.recvData.tfas;
    const tzs = isEmpty(store.recvData) ? [] : store.recvData.tzs;
    const ip_whitelist = isEmpty(store.recvData) ? [] : store.recvData.ip_whitelist;
    const active_sessions = isEmpty(store.recvData) ? [] : store.recvData.active_sessions;
    const user_id = isEmpty(store.recvData) ? '' : store.recvData.user_id;
    const email = isEmpty(store.recvData) ? '' : store.recvData.email;
    const email_verified = isEmpty(store.recvData) ? '' : store.recvData.email_verified;
    const phone = isEmpty(store.recvData) ? '' : store.recvData.phone;
    const group_name = isEmpty(store.recvData) ? '' : store.recvData.group_name;
    const credits = isEmpty(store.recvData) ? '' : store.recvData.credits;
    const fund_passwd = isEmpty(store.recvData) ? '' : store.recvData.fund_passwd;
    const passwd = isEmpty(store.recvData) ? '' : store.recvData.password;
    const session_key = isEmpty(store.recvData) ? '' : store.recvData.session_key;
    const tz_id = isEmpty(store.recvData) ? '' : store.recvData.tz_id;
    const tfa_signin = isEmpty(store.recvData) ? '' : store.recvData.tfa_signin;
    const tfa_withdraw = isEmpty(store.recvData) ? '' : store.recvData.tfa_withdraw;
    const tfa_fundpass = isEmpty(store.recvData) ? '' : store.recvData.tfa_fundpass;
    const nf = isEmpty(store.recvData) ? '' : store.recvData.nf;
    // console.log('tfas:', tfas);


    let content1 = <div className="bb-radio-group" data-pk='0'>
      <div className="tfa-content">
        <label htmlFor="tfa-signin-2">
          <div>
            <input type="radio" name="tfa_signin" id="tfa-signin-2" value="2" onClick={this.changeTfa.bind(this)}/>
            {tfa_signin==2?<span className='radio-img radio-checked'></span>:
                <span className='radio-img radio-unchecked'></span>}
            {t('谷歌验证')}
            <img src="/static/img/hot.svg" alt="" className="hot-img"/>
          </div>
        </label>
      </div>
      <div className="tfa-content">
        <label htmlFor="tfa-signin-1">
          {!email_verified ?<div><span className='radio-img radio-disabled'></span>
                <a href="#" data-toggle="modal" data-target="#id-modal-config-email">{t('绑定/验证邮箱后开启')}</a></div> :
                <div>
            <input type="radio" name="tfa_signin" id="tfa-signin-1" value="1" onClick={this.changeTfa.bind(this)}/>
            {tfa_signin==1?<span className='radio-img radio-checked'></span>:
                <span className='radio-img radio-unchecked'></span>}
                  {t('邮件')}
          </div>}

        </label>
      </div>
      <div className="tfa-content">
        <label htmlFor="tfa-signin-3">
         {!phone ?<div><span className='radio-img radio-disabled'></span>
                <a href="#" data-toggle="modal" data-target="#id-modal-config-phone">{t('绑定手机号后开启')}</a></div> :
                <div>
            <input type="radio" name="tfa_signin" id="tfa-signin-3" value="3" onClick={this.changeTfa.bind(this)}/>
            {tfa_signin==3?<span className='radio-img radio-checked'></span>:
                <span className='radio-img radio-unchecked'></span>}
                  {t('短信')}
          </div>}
        </label>
      </div>
      <div className="tfa-content">
        <label htmlFor="tfa-signin-0">
          <div>
            <input type="radio" name="tfa_signin" id="tfa-signin-0" value="0" onClick={this.changeTfa.bind(this)}/>
            {tfa_signin==0?<span className='radio-img radio-checked'></span>:
                <span className='radio-img radio-unchecked'></span>}
            {t('无')}
          </div>
        </label>
      </div>
    </div>
  ;
    let content2 = <div className="bb-radio-group" data-pk='1'>
      <div className="tfa-content">
        <label htmlFor="tfa-withdraw-2">
          <div>
            <input type="radio" name="tfa_withdraw" id="tfa-withdraw-2" value="2"
                   onClick={this.changeTfa.bind(this)}/>
            {tfa_withdraw == 2 ? <span className='radio-img radio-checked'></span> :
              <span className='radio-img radio-unchecked'></span>}
            {t('谷歌验证')}
            <img src="/static/img/hot.svg" alt="" className="hot-img"/>
          </div>
        </label>
      </div>
      <div className="tfa-content">
        <label htmlFor="tfa-withdraw-1">
          {!email_verified ? <div><span className='radio-img radio-disabled'></span>
              <a href="#" data-toggle="modal" data-target="#id-modal-config-email">{t('绑定/验证邮箱后开启')}</a></div> :
            <div>
              <input type="radio" name="tfa_withdraw" id="tfa-withdraw-1" value="1"
              onClick={this.changeTfa.bind(this)}/>
              {tfa_withdraw == 1 ? <span className='radio-img radio-checked'></span> :
                <span className='radio-img radio-unchecked'></span>}
              {t('邮件')}
            </div>}

        </label>
      </div>
      <div className="tfa-content">
        <label htmlFor="tfa-withdraw-3">
          {!phone ? <div><span className='radio-img radio-disabled'></span>
              <a href="#" data-toggle="modal" data-target="#id-modal-config-phone">{t('绑定手机号后开启')}</a></div> :
            <div>
              <input type="radio" name="tfa_withdraw" id="tfa-withdraw-3" value="3"
              onClick={this.changeTfa.bind(this)}/>
              {tfa_withdraw == 3 ? <span className='radio-img radio-checked'></span> :
                <span className='radio-img radio-unchecked'></span>}
              {t('短信')}
            </div>}
        </label>
      </div>
    </div>;
    let content3 = <div className="bb-radio-group" data-pk='2'>
      <div className="tfa-content">
        <label htmlFor="tfa-fundpass-2">
          <div>
            <input type="radio" name="tfa_fundpass" id="tfa-fundpass-2" value="2"
            onClick={this.changeTfa.bind(this)}/>
            {tfa_fundpass == 2 ? <span className='radio-img radio-checked'></span> :
              <span className='radio-img radio-unchecked'></span>}
            {t('谷歌验证')}
            <img src="/static/img/hot.svg" alt="" className="hot-img"/>
          </div>
        </label>
      </div>
      <div className="tfa-content">
        <label htmlFor="tfa-fundpass-1">
          {!email_verified ? <div><span className='radio-img radio-disabled'></span>
              <a href="#" data-toggle="modal" data-target="#id-modal-config-email">{t('绑定/验证邮箱后开启')}</a></div> :
            <div>
              <input type="radio" name="tfa_fundpass" id="tfa-fundpass-1" value="1"
              onClick={this.changeTfa.bind(this)}/>
              {tfa_fundpass == 1 ? <span className='radio-img radio-checked'></span> :
                <span className='radio-img radio-unchecked'></span>}
              {t('邮件')}
            </div>}

        </label>
      </div>
      <div className="tfa-content">
        <label htmlFor="tfa-fundpass-3">
          {!phone ? <div><span className='radio-img radio-disabled'></span>
              <a href="#" data-toggle="modal" data-target="#id-modal-config-phone">{t('绑定手机号后开启')}</a></div> :
            <div>
              <input type="radio" name="tfa_fundpass" id="tfa-fundpass-3" value="3"
              onClick={this.changeTfa.bind(this)}/>
              {tfa_fundpass == 3 ? <span className='radio-img radio-checked'></span> :
                <span className='radio-img radio-unchecked'></span>}
              {t('短信')}
            </div>}
        </label>
      </div>
    </div>;

    let content_tzs = tzs.map((tz, i) => {
        return this.tz_handle(tz, i, tz_id)
      }
    );
    let white_list_content = !isEmpty(ip_whitelist) ? ip_whitelist.map((s) => {
      return (<tr data-pk={s.id} key={s.id}>
        <td>{s.ip}</td>
        <td>{s.created_at}</td>
        <td className="rel-left">
          <a href="#" className="" title="删除" onClick={this.del_ip_white_list.bind(this,s.id)}>{t('删除')}</a>
        </td>
      </tr>)
    }) : <tr className="empty">
      <td colSpan="3" className="text-center">{t('暂无')}</td>
    </tr>;
    let active_session_content = !isEmpty(active_sessions) ? active_sessions.map((s) => {
      return (
        <tr data-pk={s.key} key={s.key}>
          <td>{s.dt}</td>
          <td>{s.dev}</td>
          <td>{s.ip}</td>
          <td>{s.ip_addr}</td>
          <td>
            {s.key === session_key ? <p>{t('是')}</p> : <p>{t('否')}</p>}
          </td>
        </tr>
      )
    }) : <tr></tr>;


    return <div className="account-profile">
      <div className="title">
        <h3 className="mix-title-font ft20">{t('安全中心')}</h3>
      </div>
      <div className="row basic-info">
        <div className="col-md-2">
          <h4>{t('基本资料')}</h4>
        </div>
        <div className="col-md-10">
          <form className="form-horizontal">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="col-md-3 control-label">{t('用户 ID')}</label>
                  <div className="col-md-9 fix-left">
                    <p className="form-control-static">{user_id}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="col-md-3 control-label">{t('电子邮件')}</label>
                  <div className="col-md-9">
                    <p className="form-control-static email-bind-static ml35 w-230">
                      {email}
                      {this.show_email_status(email, email_verified)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt20">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="col-md-3 control-label">{t('手机号')}</label>
                  <div className="col-md-9 fix-left">
                    <p className="form-control-static">
                      {phone ? <span>{phone}</span> :
                        <a href="#" data-toggle="modal" data-target="#id-modal-config-phone">{t('绑定手机')}</a>}

                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="col-md-3 control-label">{t('用户等级')}</label>
                  <div className="col-md-9">
                    <p className="form-control-static ml35">
                      <a className="text-gold tip2" href="/pricing/"
                         title={t('点击查看积分及费率标准')}><strong>{group_name}</strong></a>
                      <span className="ml8">({t('积分')}: <a className="tip2 ml5" href="/account/VIP/" title={t('点击查看积分详情')}>{credits}</a>)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="split-line-e0e6ea"></div>

      <div className="row change-pwd-row">
        <div className="col-md-2">
          <h4 id="change-password" className="">{t('修改密码')}</h4>
        </div>
        <div className="col-md-10">
          <form className="form-horizontal">
            <div className="form-group">
              <label className="col-md-2 control-label">{t('登录密码')}</label>
              <div className="col-md-6">
                <p className="form-control-static">
                  {passwd?<a href="#" data-toggle="modal" data-target="#id-modal-change-passwd" >{t('修改')}</a>:
                    <a href="#" data-toggle="modal" data-target="#id-modal-change-passwd" >{t('设置')}</a>}
                </p>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">{t('资金密码')}</label>
              {fund_passwd ? <div className="col-md-2">
                  <p className="form-control-static">
                    <a href="#" data-toggle="modal" data-target="#id-modal-change-fund-passwd">{t('修改')}</a>
                  </p>
                </div> :
                <div className="col-md-2">
                  <p className="form-control-static">
                    <a href="#" data-toggle="modal" data-target="#id-modal-change-fund-passwd">{t('设置')}</a>
                  </p>
                </div>}


              <div className="col-md-7 tip-fund">
                <p className="form-control-static"><span className="text-muted small-text">{t('设置了资金密码后，提币和提现时均需要输入，账户更安全。')}</span>
                </p>
              </div>

            </div>
          </form>
        </div>
      </div>

      <div className="split-line-e0e6ea"></div>

      <div className="row tfas-row">
        <div className="col-md-2">
          <h4 id="two-step-authentication" className="">{t('两步验证')}</h4>
        </div>
        <div className="col-md-10 mt8">
          <p className="small-text ml16m">{t('当您开启两步验证后，在进行登录、修改密码、提币、提现、交易等重要操作时，必须输入某个一次性密码才能继续')}</p>
          <form className="form-horizontal mt20">
            <div className="form-group">
              <label className="col-md-2 control-label">{t('登录验证')}</label>
              <div className="col-md-10">
                  {content1}
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">{t('提现验证')}</label>
              <div className="col-md-9">
                  {content2}
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label pr0">{t('修改资金密码验证')}</label>
              <div className="col-md-9">
                  {content3}
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="split-line-e0e6ea">

      </div>
      <div className="bb-setting"><p className="other-p to-pointer" onClick={this.show_other_setting}>{t('其他安全设置+')}</p></div>

      <div className="other-setting" id='other-setting'>
        <div className="row profile-timezone pd40">
          <div className="col-md-2">
            <h4 className='head-title'>{t('其它设置')}</h4>
          </div>
          <div className="col-md-10 mt30">
            <label className="pt5 control-label ml5">{t('时区')}</label>
            <form className="form-inline form-fix" id="id-form-update-tz">
              <div className="form-group">
                <div className="col-md-6">
                  <select className="form-control time-zone-select" name="tz_id" id="time-zone">
                    {content_tzs}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  <button type="submit" className="btn-u btn-save" onClick={this.set_time_zone.bind(this)}>{t('保存')}</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="split-line-e0e6ea"></div>

        <div className="row notify-row">
          <div className="col-md-2">
            <h4 id="notifications" className="mt7">{t('通知设置')}</h4>
          </div>
          <div className="col-md-10">
            <div className="col-md-12 mt8 ml10m">{t('登录/充值/提现到账')}</div>
            <div className="col-md-12">
              <div className="row bb-radio-group row-fix">
                <div className="col-md-4">
                  <label htmlFor="email">
                    {!email_verified ? <div>
                        <span className='radio-img radio-disabled'></span>
                        <a href="#" data-toggle="modal" data-target="#id-modal-config-email">{t('绑定/验证邮箱后开启')}</a>
                      </div> :
                      <div>
                      {nf ==1?
                        <div><input type="radio" name='notify_type' id='email' value='email' defaultChecked
                        onClick={this.setNotification.bind(this)}/>
                        <span className='radio-img radio-checked' id='email-span'></span>  {t('邮件通知')}
                      </div>:
                        <div><input type="radio" name='notify_type' id='email' value='email'
                        onClick={this.setNotification.bind(this)}/>
                        <span className='radio-img radio-unchecked' id='email-span'></span>{t('邮件通知')}</div>}

                      </div>}
                  </label>
                </div>
                <div className="col-md-8">
                  <label htmlFor="sms">
                    {phone ? <div>
                        {nf ==2?
                        <div><input type="radio" name='notify_type' id='sms' value='sms' defaultChecked
                        onClick={this.setNotification.bind(this)}/>
                        <span className='radio-img radio-checked' id='sms-span'></span>  {t('短信通知')}
                      </div>:
                        <div><input type="radio" name='notify_type' id='sms' value='sms'
                        onClick={this.setNotification.bind(this)}/>
                        <span className='radio-img radio-unchecked' id='sms-span'></span>{t('短信通知')}</div>}
                      </div> :
                      <div>
                        <span className='radio-img radio-disabled'></span>
                        <a className="bind-phone-a corred" href="#" data-toggle="modal" data-target="#id-modal-config-phone">{t('绑定手机号后开启短信通知')}</a>
                      </div>}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="split-line-e0e6ea"></div>

        <div className="row ip-whitelist-row">
          <div className="col-md-2">
            <h4 id="ip-whitelist" className=''>{t('IP 白名单')}</h4>
          </div>
          <div className="col-md-10">

            <p className="tip-ip">{t('注：请勿添加IP会变动的网络至IP白名单（如：拨号上网）以免影响您的正常使用。')}</p>
            <form className="form-horizontal mt20" id="id-form-ip-whitelist">
              <div className="form-group">
                <div className="col-md-12 ml15m">
                  <div className="input-group">
                    <input id='add-ip-addr' type="text" name="ip" className="form-control time-zone-select" placeholder={t("IP 地址")} pattern="[:\d\./]+"
                           required onChange={this.setBtnForbid}/>
                    <input type="hidden" name="act" value="add-ip"/>
                    <span className="input-group-btn left10">
                      <button className="btn-u btn-save margin-fix" type="submit" disabled={store.btnForbid} onClick={this.add_ip_white_list.bind(this)}>{t('添加')}</button>
                    </span>
                  </div>
                </div>
                <div className="col-md-12 ml15m">
                  <p className="form-control-static ip-text">{t('例如')}：216.58.197.238 {t('或')} 104.244.42.0/24</p>
                </div>
              </div>
            </form>
            <table className="table table-condensed">
              <thead>
              <tr>
                <th width="25" className="th-g ">{t('IP 地址')}</th>
                <th width="50" className="th-g ">{t('添加时间')}</th>
                <th width="25" className="th-g rel-left">{t('操作')}</th>
              </tr>
              </thead>
              <tbody>
              {white_list_content}

              </tbody>
            </table>
            <p className="text-muted  tip-ip-range">{t('添加 IP 地址或范围后，你将无法从这个白名单之外的 IP 地址登录你的账户。出于安全方面的考虑，添加或删除 IP 地址后，你的账户将在24 小时内无法提现。你可以访问')}<a className="a-gray" href="https://coinrising.com/ip/" target="_blank">coinrising.com/ip/</a>{t('获得当前 IP 地址')}</p>
          </div>
        </div>

        <div className="split-line-e0e6ea"></div>

        <div className="row login-status-row">
          <div className="col-md-2">
            <h4 id="active-sessions" className=''>{t('已登录状态')}</h4>
          </div>
          <div className="col-md-10 mt5">
            <p>
              <span className="text-now-account">{t('当前已登录你账户的浏览器或设备。')}</span>
            </p>
            <table className="table table-condensed mt20">
              <thead>
              <tr>
                <th className="th-g">{t('登录时间')}</th>
                <th className="th-g">{t('设备')}</th>
                <th className="th-g">{t('IP')}</th>
                <th className="th-g">{t('地点')}</th>
                <th className="th-g">{t('是否当前')}</th>
              </tr>
              </thead>
              <tbody>
              {active_session_content}

              </tbody>
            </table>
            <p>
              <a href="" className="signout-session all  ml5 quit-btn" onClick={this.quit_all_other_login}>{t('退出所有其他状态')}</a>
            </p>
          </div>
        </div>

        <div className="split-line-e0e6ea"></div>

      </div>

    </div>

  }
}


class WalletStore extends RequestStore {

  @observable btnForbid = 'disabled';
  @computed get page() {
    if (isEmpty(this.recvData)) {
      return []
    }
    return this.recvData.page
  }

}

class LastTenStore extends RequestStore {
  @computed get last_ten_items() {
    if (isEmpty(this.recvData)) {
      return []
    }
    return this.recvData.audits
  }
}


const walletStore = new WalletStore(conf.user_dict_url);

const lasttenStore = new LastTenStore('/account/audit2/');

@translate(['translations'], {wait: true})
@observer
class LastTen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  componentWillMount(props) {
    this.get_last_ten();
  }

  get_last_ten() {
    const store2 = this.props.store;
    store2.get()
  }

  render() {
    const {t, i18n} = this.props;
    const store2 = this.props.store;
    // console.log("audits recvData", store2.recvData);
    const audits = isEmpty(store2.recvData) ? [] : store2.recvData.audits;
    // console.log('audits', audits);
    const tr_content = audits.map((audit) => {
      return (
        <tr key={audit.id}>
          <td>{audit.catalog_name}</td>

          <td>{audit.detail}</td>
          <td>{audit.ip}</td>
          <td>{audit.ip_addr}</td>
          <td>{audit.created_at}</td>
        </tr>
      )
    });
    return <div className="row row-audit">
      <div className="col-md-2 ">
        <h4 id="security-logs">{t('最近10条记录')}</h4>
      </div>
      <div className="col-md-10">
        <div id='audit-list'>
          <table className="table table-condensed table-left">
            <thead>
            <tr>
              <th className="th-g">{t('日志类型')}</th>
              <th className="th-g">{t('日志详情')}</th>
              <th className="th-g">{t('IP')}</th>
              <th className="th-g">{t('地点')}</th>
              <th className="th-g">{t('时间')}</th>
            </tr>
            </thead>
            <tbody>
            {tr_content}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  }
}

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Profile store={walletStore}/>
  </I18nextProvider>,
  document.getElementById('wrapper')
);
ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <LastTen store={lasttenStore}/>
  </I18nextProvider>,
  document.getElementById('last-ten')
);
