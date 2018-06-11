import React from 'react';
import ReactDOM from 'react-dom';
import {RequestStore} from "../../store/request.jsx";
import {observer} from "mobx-react";
import {computed} from 'mobx';
import {I18nextProvider} from "react-i18next";
import i18n from "../../common/i18n.jsx";
import {translate} from 'react-i18next';

const isEmpty = require('lodash.isempty');
i18n.options.fallbackLng = Array(LANGUAGE_CODE);

@translate(['translations'], {wait: true})
@observer
class SecurityComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardType: '1',
      cardTypeDict: {'1': '身份证', '3': '护照'},
    };
    this.setSubmitDisable = this.setSubmitDisable.bind(this);
    this.submitAll = this.submitAll.bind(this);
    this.getText = this.getText.bind(this);
  }

  componentWillMount(props) {
    this.getUserDict();
  }

  getText(cardVerifyResult) {
    const {t, i18n} = this.props;
    if (cardVerifyResult == '0') {
      return <p className="result-fix"><img style={{'marginRight': 10 + 'px'}}
                                            src="/static/img/verify/weiyanzheng_icon.svg" alt=""/>{t('未进行证件认证')}</p>;
    } else if (cardVerifyResult == '1') {
      return <p className="result-fix"><img style={{'marginRight': 10 + 'px'}} src="/static/img/verify/tongguo_icon.svg"
                                            alt=""/>{t('已通过证件认证')}</p>;
    } else if (cardVerifyResult == '2') {
      return <p className="result-fix"><img style={{'marginRight': 10 + 'px'}} src="/static/img/verify/shibai_icon.svg"
                                            alt=""/>{t('身份认证失败，请重新认证')}</p>;
    } else if (cardVerifyResult == '3') {
      return <p className="result-fix"><img style={{'marginRight': 10 + 'px'}} src="/static/img/verify/ing_icon.svg"
                                            alt=""/>{t('证件认证中')}</p>;
    }
  }

  chooseCardType(cardType, e) {
    this.setState({
      cardType: cardType
    });
    if (cardType == '1') {
      $("#radio1").addClass('radio-checked').removeClass('radio-unchecked');
      $("#radio3").addClass('radio-unchecked').removeClass('radio-checked');
    } else {
      $("#radio3").addClass('radio-checked').removeClass('radio-unchecked');
      $("#radio1").addClass('radio-unchecked').removeClass('radio-checked');
    }
  }

  opts(type) {
    return {
      action: "/account/account-post-img?type=" + type,
      name: 'file',
      onSubmit: function (file, ext) {
        if (file.size > 10485760) {
          App.errorTip('文件太大，请不要超过10M');
          return false;
        }
        if (!(ext && /^(jpg|jpeg|JPG|JPEG|png|PNG)$/.test(ext))) {
          App.errorTip('图片格式不正确,请选择正确格式的文件!');
          return false;
        }
        this.disable();
      },
      onComplete: function (file, response) {
        res = JSON.parse(response);
        this.enable();
        if (res.error !== 0) {
          App.errorTip(res.message);
        }
        else {
          $('#verify-' + type).attr('src', res.url);
        }
      }
    }
  };

  getUserDict() {
    const store = this.props.store;
    store.get()
  }

  splitCredential(param) {
    if (param.length == 18) {
      return param.slice(0, 3) + '****' + param.slice(-3)
    } else {
      return param.slice(0, 2) + '****' + param.slice(-2)
    }
  }

  setSubmitDisable(e) {
    let btnStatus = !$("#protocol").is(':checked');
    if (btnStatus) {
      $('#submitBtn').hide();
      $('.verify-btn').show()
    } else {
      $('#submitBtn').show();
      $('.verify-btn').hide()

    }
  }

  submitAll(e) {
    if ($("#id-credential").val() == '' || $("#first-name").val() == '' || $("#last-name").val() == '') {
      App.errorTip('信息输入不完整');
    } else {
      App.submit('/yo/account/misc/',
        {
          op: 'verify', first_name: $("#first-name").val(),
          last_name: $("#last-name").val(), credential_type: this.state.cardType,
          credential: $("#id-credential").val()
        },
        function () {
          setTimeout(function () {
            location.reload();
          }, 2000);
        }
      );

    }
  }

  get renderVerified() {
    const {t, store} = this.props;
    const status2text = {
      0: t('未进行证件认证'),
      1: t('认证结果:已通过'),
      2: t('证件认证失败'),
      3: t('认证结果:认证中'),
    };
    const cardVerifyResult = isEmpty(store.recvData) ? '' : store.recvData.card_verify_result;
    return <span className="card_result_tip ml5m">{status2text[cardVerifyResult]}</span>
  }

  render() {
    const {t, i18n} = this.props;
    const store = this.props.store;
    // console.log("credits recvData", store.recvData);
    // console.log("credits recvData isEmpty", isEmpty(store.recvData));
    const lastName = isEmpty(store.recvData) ? '' : store.recvData.last_name;
    const firstName = isEmpty(store.recvData) ? '' : store.recvData.first_name;
    const credential = isEmpty(store.recvData) ? '' : store.recvData.credential;
    const credentialType = isEmpty(store.recvData) ? '' : store.recvData.credential_type;
    const cardVerifyResult = isEmpty(store.recvData) ? '' : store.recvData.card_verify_result;
    const idCardFront = isEmpty(store.recvData) ? '' : store.recvData.id_card_front;
    const idCardBack = isEmpty(store.recvData) ? '' : store.recvData.id_card_back;
    const idCardInHand = isEmpty(store.recvData) ? '' : store.recvData.id_card_in_hand;
    const passport = isEmpty(store.recvData) ? '' : store.recvData.passport;
    const passportInHand = isEmpty(store.recvData) ? '' : store.recvData.passport_in_hand;
    const addrProve = isEmpty(store.recvData) ? '' : store.recvData.addr_prove;
    const staticUrl = '/media/';


    return <div className="account-profile">
      <div className="mt40 up-fix">
        <h3>
          {t('身份认证')}
        </h3>
        {this.getText(cardVerifyResult)}
      </div>
      {cardVerifyResult == '0' ? <div className='row account-auth '>
        <div className='col-md-2'>
          <h4 className='head-title '>{t('实名认证')}</h4>
        </div>
        <div className='col-md-10 ml25m'>
          <p className="font-tip-name"> {t('*实名信息必须真实可靠，并与充值提现银行账户登记信息保持一致。实名信息一旦确认，不可修改')}</p>
          <form className="form-horizontal" id="id-form-credential">
            <div className="row mt40">
              <div className="col-md-4 ">{t('姓氏')}</div>
              <div className="col-md-3 ml44">{t('名字')}</div>
            </div>
            <div className="row mt10">
              <div className="col-md-4">
                <input type="text" className="form-control input-blue" name="first-name" required id='first-name'
                       placeholder={t('输入姓氏')}/>
              </div>
              <div className="col-md-3">
                <input type="text" className="form-control input-blue ml44" name="last-name" required id='last-name'
                       placeholder={t('输入名字')}/>
              </div>
            </div>
            <p className="mt40">{t('实名认证')}</p>
            <div>
              <div className="row mt20 bb-radio-group">
                <div className="col-md-2">
                  <label for="id-card">
                    <input type="radio" name='credential-type' id='id-card' checked value='1'
                           onClick={this.chooseCardType.bind(this, '1')}/>
                    <span className='radio-img radio-checked' id="radio1"></span>
                    <span className="ml10m">{t('身份证')}</span>
                  </label>
                </div>
                <div className="col-md-3">
                  <label for="passport">
                    <input type="radio" name='credential-type' id='passport' value='3'
                           onClick={this.chooseCardType.bind(this, '3')}/>
                    <span className='radio-img radio-unchecked' id='radio3'></span>
                    <span className="ml10m">{t('护照')}</span>
                  </label>
                </div>
              </div>
              <div className="row mt20">
                <div className="col-md-4">
                  <input type="text" className="form-control input-credits" id="id-credential" name="credential"
                         placeholder={t('请填写身份证号码/护照号')}/>
                </div>
              </div>
            </div>


          </form>
        </div>
      </div> : <div className='row account-auth '>
        <div className='col-md-2'>
          <h4 className='head-title'>{t('实名认证')}</h4>
        </div>
        <div className='col-md-10 ml25m'>
          <p className="font-tip-name"> {t('*实名信息必须真实可靠，并与充值提现银行账户登记信息保持一致。实名信息一旦确认，不可修改')}</p>
          <form className="form-horizontal" id="id-form-credential">
            <div className="row mt40">
              <div className="col-md-4 ">{t('姓氏')}</div>
              <div className="col-md-3 ml20">{t('名字')}</div>
            </div>
            <div className="row mt10">
              <div className="col-md-4">
                <input type="text" className="form-control input-gray" name="first-name" required disabled
                       value={firstName}/>
              </div>
              <div className="col-md-3">
                <input type="text" className="form-control input-gray ml20" name="last-name" required disabled
                       value={lastName}/>
              </div>
            </div>
            <p className="mt40 mb20">{t('实名认证')}</p>
            {credentialType == "1" ? <span className="">{t('身份证')}</span> :
              <span>{t('护照')}</span>}
            <div>
              <div className="row mt10">
                <div className="col-md-4">
                  <input type="text" className="form-control input-credits" id="id-credential" name="credential"
                         disabled value={this.splitCredential(credential)}/>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>}
      <div className="row photo-verify-row">
        <div className="col-sm-2">
          <h4>{t('照片认证')}</h4>
        </div>
        <div className="col-sm-10 ml22m">
          <div className="form-horizontal card-verify verify-form">
            {(cardVerifyResult == '0' || cardVerifyResult == '2') ?
              <div>
                <div className="form-group">
                  <div className="col-md-12">
                    <p className="fs16 cor282c37">{t('证件要求')}</p>
                  </div>
                  <div className="col-md-12 mt10">
                    <p className=""> {`1. ${t('身份证照片：请按示例上传身份证正面与反面，脸部及字体必须清晰可见')}`} </p>
                    <p className=""> {`2. ${t('护照：请按示例上传带ID的护照页正面即可，脸部及字体必须清晰可见')}`}</p>
                    <p className=""> {`3. ${t('手持证件照：照片中请勿遮挡任何有效信息，照片中必须体现')}`}<span
                      className="corde4"> {t('"日期及仅CoinRising认证使用"')} </span>{t('的纸条')}</p>
                    <p className=""> {`4. ${t('图片格式：小于10M, 图片格式可为jpg、jpeg、png')}`} </p>
                  </div>
                </div>
                <div className="form-group verify-hide id-type">
                  <label for="" className="col-md-2 control-label"></label>
                  <div className="col-md-12 ">
                    <span>{t('上传')}</span>
                    {this.state.cardType == "1" ? <span>{t('身份证')}</span> :
                      <span>{t('护照')}</span>}
                    <span>{t('证件照')}</span>
                  </div>
                  <div className="row mt20 bb-radio-group radio-group-photo mt10">

                  </div>
                </div>
                <div className="form-group verify-hide id-upload">
                  <div className="col-md-12 fs15"></div>
                  <div className="col-md-12 mt20">
                    {this.state.cardType == "1" ?
                      <CardIDComponent idCardFront={idCardFront}
                                       idCardBack={idCardBack}
                                       idCardInHand={idCardInHand}
                                       staticUrl={staticUrl}/> :
                      <PassportComponent staticUrl={staticUrl} passport={passport}
                                         passportInHand={passportInHand} addrProve={addrProve}/>}


                  </div>
                </div>
                <div className="form-group verify-submit verify-hide din">
                  <div className="col-md-offset-2 col-md-10">
                    <p className="text-muted small"><i
                      className='fa fa-lightbulb-o'></i> {t('请确保证件照片格式为jpg、jpeg、JPG、JPEG,图片大小在150K以下')} </p>
                  </div>
                </div>
                <div className="form-group verify-submit verify-hide ml8">
                  <div className="col-md-10">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" id='protocol' onChange={this.setSubmitDisable.bind(this)}/> <p
                        className="small t-small"> {t('我承认提交的证件信息属于本人所有，不存在冒用、盗用他人证件的行为，因冒用、盗用他人证件造成的一切后果由本人承担')} </p>
                      </label>
                    </div>
                    <button type="button" className="btn-u verify-btn btn-size" disabled style={{width:250 ,height:40}}> {t('确认提交')}
                    </button>
                    <button id="submitBtn" type="button" className="btn-u btn-submit displaynone"
                            onClick={this.submitAll.bind(this)}> {t('确认提交')}
                    </button>
                  </div>
                </div>
              </div> :
              <div className="form-group verify-result">
                <div className="col-md-12 mt2">{this.renderVerified}</div>
                <div className="col-md-12 mt10">
                  <p className="form-control-static">
                  </p>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>
  }
}

@translate(['translations'], {wait: true})
class CardIDComponent extends React.Component {
  constructor(props) {
    super(props);
    this.opts = this.opts.bind(this);
  }

  componentDidMount(prop) {
    new AjaxUpload($('#add-pic-id-front'), this.opts('id_card_front'));
    new AjaxUpload($('#add-pic-id-back'), this.opts('id_card_back'));
    new AjaxUpload($('#add-pic-id-card-hand'), this.opts('id_card_in_hand'));

  }

  opts(type) {
    return {
      action: "/account/account-post-img?type=" + type,
      name: 'file',
      onSubmit: function (file, ext) {
        if (file.size > 10485760) {
          App.errorTip('文件太大，请不要超过10M');
          return false;
        }
        if (!(ext && /^(jpg|jpeg|JPG|JPEG|png|PNG)$/.test(ext))) {
          App.errorTip('图片格式不正确,请选择正确格式的文件!');
          return false;
        }
        this.disable();
      },
      onComplete: function (file, response) {
        let res = JSON.parse(response);
        this.enable();
        if (res.error !== 0) {
          App.errorTip(res.message);
        }
        else {
          $('#verify-' + type).attr('src', res.url);
        }
      }
    }
  };

  render() {
    const {t, i18n} = this.props;
    const idCardFront = this.props.idCardFront;
    const idCardBack = this.props.idCardBack;
    const idCardInHand = this.props.idCardInHand;
    const staticUrl = this.props.staticUrl;
    return <div className="row">
      <div className="col-md-4">
        {idCardFront ?
          <img src={staticUrl + idCardFront} alt="" id='verify-id_card_front' className='verify-papers'/> :
          <img
            src={'/static/img/verify/id_front.svg'} alt="" id='verify-id_card_front' className='verify-papers'/>}

        <div id='add-pic-id-front' className='check-btn'></div>
        <div className='text-center'> {t('身份证正面照片')}</div>
      </div>
      <div className="col-md-4">
        {idCardBack ?
          <img src={staticUrl + idCardBack} alt="" id='verify-id_card_back' className='verify-papers'/> :
          <img src={'/static/img/verify/id_back.svg'} alt="" id='verify-id_card_back' className='verify-papers'/>}

        <div id='add-pic-id-back' className='check-btn'></div>
        <div className='text-center'> {t('身份证反面照片')}</div>
      </div>
      <div className="col-md-4">
        {idCardInHand ?
          <img src={staticUrl + idCardInHand} alt="" id='verify-id_card_in_hand' className='verify-papers'/> :

          <img src={'/static/img/verify/id_in_hand_cn.svg'} alt="" id='verify-id_card_in_hand'
               className='verify-papers'/>}

        <div id='add-pic-id-card-hand' className='check-btn'></div>
        <div className='text-center'> {t('手持身份证照片')}</div>
      </div>

    </div>
  }
}

@translate(['translations'], {wait: true})
class PassportComponent extends React.Component {
  constructor(props) {
    super(props);
    this.opts = this.opts.bind(this);
  }

  componentDidMount(prop) {
    new AjaxUpload($('#add-pic-passport'), this.opts('passport'));
    new AjaxUpload($('#add-passport-in-hand'), this.opts('passport_in_hand'));
    new AjaxUpload($('#add-pic-addr-prove'), this.opts('addr_prove'));
  }

  opts(type) {
    return {
      action: "/account/account-post-img?type=" + type,
      name: 'file',
      onSubmit: function (file, ext) {
        if (file.size > 10485760) {
          App.errorTip('文件太大，请不要超过10M');
          return false;
        }
        if (!(ext && /^(jpg|jpeg|JPG|JPEG|png|PNG)$/.test(ext))) {
          App.errorTip('图片格式不正确,请选择正确格式的文件!');
          return false;
        }
        this.disable();
      },
      onComplete: function (file, response) {

        let res = JSON.parse(response);
        this.enable();
        if (res.error !== 0) {
          App.errorTip(res.message);
        }
        else {
          $('#verify-' + type).attr('src', res.url);
        }
      }
    }
  };

  render() {
    const {t, i18n} = this.props;
    const passport = this.props.passport;
    const passportInHand = this.props.passportInHand;
    const addrProve = this.props.addrProve;
    const staticUrl = this.props.staticUrl;
    return <div className="row passport-verify">
      <div className="col-md-4">
        {passport ?
          <img src={staticUrl + passport} alt="" id='verify-passport' className='verify-papers'/> :

          <img src={'/static/img/verify/passport.svg'} alt="" id='verify-passport'
               className='verify-papers'/>}

        <div id='add-pic-passport' className='check-btn'></div>
        <div className='text-center'> {t('护照正面照片')}</div>
      </div>
      <div className="col-md-4">
        {passportInHand ?
          <img src={staticUrl + passportInHand} alt="" id='verify-passport_in_hand'
               className='verify-papers'/> :

          <img src={'/static/img/verify/id_in_hand_en.svg'} alt="" id='verify-passport_in_hand'
               className='verify-papers'/>}

        <div id='add-passport-in-hand' className='check-btn'></div>
        <div className='text-center'> {t('手持护照照片')}</div>
      </div>
      <div className="col-md-4">
        {addrProve ?
            <img src={staticUrl + addrProve} alt="" id='verify-addr_prove' className='verify-papers'/>:
            <img src={'/static/img/verify/addr_prove.svg'} alt="" id='verify-addr_prove' className='verify-papers'/>}

            <div id='add-pic-addr-prove' class='check-btn'></div>
            <div className='text-center'>{t('住址证明')}</div>
      </div>
    </div>
  }
}

class WalletStore extends RequestStore {
  @computed get page() {
    if (isEmpty(this.recvData)) {
      return []
    }
    return this.recvData.page
  }

}

const walletStore = new WalletStore(conf.user_dict_url);

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <SecurityComponent store={walletStore}/>
  </I18nextProvider>,
  document.getElementById('wrapper')
);
