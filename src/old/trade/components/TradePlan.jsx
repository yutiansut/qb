import React from "react";
import {observer} from "mobx-react";
import * as utils from '../utils.jsx';

import {translate} from 'react-i18next';
const isEmpty = require('lodash.isempty');

// const $ = require('jquery');

/**
 * 交易委托
 */
@translate(['translations'], {wait: true})
@observer
class TradePlan extends React.Component {
  constructor(props) {
    super(props);
    this.getHeaderNav = this.getHeaderNav.bind(this);
  }

  getHeaderNav(field) {
    const {store} = this.props;
    return (store.order_type === field) ? "mix-active" : null
  }

  componentDidUpdate(){
    const recentStore = this.props.recentStore;
    recentStore.tradePlanHeight = document.getElementById('trade-plan').offsetHeight
  }

  get renderTrade() {
    const {userStore, bankStore, store, confStore} = this.props;
    const buyType = utils.market(store.tradePair);
    const sellType = utils.trade(store.tradePair);
    return (
      <div className="d-flex flex-row" style={{width:"83%",height:'89.43%',justifyContent:'space-between',margin:'0 auto'}}>
        <TradePlanItem store={store.buyStore}
                       tradePair={store.tradePair}
                       userStore={userStore}
                       confStore={confStore}
                       bankStore={bankStore}
                       sliderId={`${store.order_type}-buy`}
                       coinType={buyType} />
        <TradePlanItem store={store.sellStore}
                       tradePair={store.tradePair}
                       userStore={userStore}
                       confStore={confStore}
                       bankStore={bankStore}
                       sliderId={`${store.order_type}-sell`}
                       coinType={sellType}/>
      </div>
    )
  }

  render() {
    const {t, store, modalDialogStore, userStore, confStore} = this.props;
    return <div className="content d-flex flex-column" style={{width: '100%', height: '100%', position:'relative'}}>
      {!conf.user ? (
        <div className="mix-modal"
             style={{width: '100%', height: '100%', position:'absolute'}}>
          <div
            style={{
              letterSpacing: 0,
              color: 'rgba(255,255,255,0.8)',position: 'absolute', top: '50%', left: '50%', transform:'translate(-50%, -50%)'
            }}><a className="mix-blue"
                  style={{
                    fontSize: '28px',
                    letterSpacing: 0
                  }} href={`${this.props.signUpIn}?next=${window.location.pathname}`}
          >{t('登录/注册')}</a>{t('后可进行交易')}
          </div>
        </div>) : null}
      <div className="market-header d-flex flex-row" style={{margin: '0 9.2%', height: '10.67%', borderBottom:'1px solid'}}>
        <div className="flex-grow-1">
          <div className="header-nav d-flex flex-row ">
            <span className={`d-flex align-items-center to-pointer ${this.getHeaderNav(store.ORDER_TYPE.LIMIT)}`}
                  onClick={store.setOrderType.bind(store, store.ORDER_TYPE.LIMIT)}
            >{t('限价委托')}</span>
            <span style={{minWidth: 70 + 'px'}}></span>
            <span className={`d-flex align-items-center to-pointer ${this.getHeaderNav(store.ORDER_TYPE.AUTO)}`}
                  onClick={store.setOrderType.bind(store, store.ORDER_TYPE.AUTO)}
            >{t('市价委托')}</span></div>
        </div>
        <select className="mix-trade-plan-select to-pointer"
                value={confStore.coinPriceType}
                style={{height: '63%'}}
                onChange={confStore.setCoinPriceType.bind(confStore)}>
          <option className="to-pointer" value={confStore.USD}>USD</option>
          <option className="to-pointer" value={confStore.CNY}>CNY</option>
          <option className="to-pointer" value={store.unit}>{t('数字币计价')}</option>
        </select>
      </div>
      {store.buyStore.marketUnit ? this.renderTrade : null}
      {<ModalDialog store={modalDialogStore}/>}
    </div>
  }
}

/**
 * modal对话框
 */
@observer
class ModalDialog extends React.Component {
  componentDidMount() {
    $('#ignore-password').on('hidden.bs.modal', e => {
      const store = this.props.store;
      store.setStep(0);
    })
    // console.log('jquery $', $, $('#ignore-password'))
  }

  render() {
    const store = this.props.store;
    // console.log('ModalDialog', store.step)
    return (
      <div className="modal fade trade-plan-alert" id="ignore-password" tabIndex="-1" role="dialog"
           aria-labelledby="exampleModalLabel"
           aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          {store.step === 0 && <IgnorePasswordModalDialog store={store}/>}
          {store.step === 1 && <IDVerifyModalDialog store={store}/>}
        </div>
      </div>
    )
  }
}

/**
 * 免密输入模块
 */
@translate(['translations'], {wait: true})
@observer
class IgnorePasswordModalDialog extends React.Component {
  constructor(props) {
    super(props);
    this.hdClick = this.hdClick.bind(this);
  }

  hdClick(_type, e) {
    const store = this.props.store;
    store.setStep(1);
    // console.log('hdClick', _type)
    store.setWay(_type);
  }

  render() {
    const {t, store} = this.props;
    // console.log('render', store.way)
    return (
      <div className="modal-content" style={{width: '386px', height: '98px'}}>
        <div className="modal-header p-0 mix-bg-blue mix-h-light trade-plan-alert-title">
          <h5 className="modal-title" id="exampleModalLabel">{t('时限设置')}</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{outline:'none'}}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body mix-blue row">
          <div className="col" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <input onChange={this.hdClick.bind(this, store.WAY.EVERY)}
                   name="contact"
                   checked={store.userWay === store.WAY.EVERY}
                   value={store.WAY.EVERY}
                   id={`IgnorePasswordModalDialog-input-${store.WAY.EVERY}`}
                   style={{marginRight: '5px'}}
                   type="radio"/>
            <label className="mix-blue"
                   htmlFor={`IgnorePasswordModalDialog-input-${store.WAY.EVERY}`}>{t('每次输入')}</label>
          </div>
          <div className="col" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <input onChange={this.hdClick.bind(this, store.WAY.TWO_HOUR)}
                   name="contact"
                   checked={store.userWay === store.WAY.TWO_HOUR}
                   value={store.WAY.TWO_HOUR}
                   id={`IgnorePasswordModalDialog-input-${store.WAY.TWO_HOUR}`}
                   style={{marginRight: '5px'}}
                   type="radio"/>
            <label className="mix-blue" htmlFor={`IgnorePasswordModalDialog-input-${store.WAY.TWO_HOUR}`}>
              {t('每两小时输入')}
            </label>
          </div>
          <div className="col" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <input onChange={this.hdClick.bind(this, store.WAY.NEVER)}
                   name="contact"
                   checked={store.userWay === store.WAY.NEVER}
                   value={store.WAY.NEVER}
                   id={`IgnorePasswordModalDialog-input-${store.WAY.TWO_HOUR}`}
                   style={{marginRight: '5px'}}
                   type="radio"/>
            <label className="mix-blue"
                   htmlFor={`IgnorePasswordModalDialog-input-${store.WAY.NEVER}`}>{t('不输入')}</label>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 资金密码身份验证
 */
@translate(['translations'], {wait: true})
@observer
class IDVerifyModalDialog extends React.Component {
  constructor(props) {
    super(props);
    this.changePassword = this.changePassword.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.closeIDVerifyModalDialog = this.closeIDVerifyModalDialog.bind(this);
  }

  verifyPassword(e) {
    const store = this.props.store;
    store.setStep(0);
    // if(store.password === ''){
    //   return
    // }
    store.get(
      {
        'params': btoa(JSON.stringify({
          password: store.password,
          input_type: store.way,
        }))
      }
    );
    store.setPassword('')
  }

  closeIDVerifyModalDialog() {
    const store = this.props.store;
    store.setStep(0);
  }

  changePassword(e) {
    const store = this.props.store;
    store.setPassword(e.target.value)
  }

  render() {
    const {t, store} = this.props;
    return (
      <div className="modal-content" style={{width: '386px', height: '150px'}}>
        <div className="modal-header p-0 mix-bg-blue mix-h-light trade-plan-alert-title">
          <h5 className="modal-title" id="exampleModalLabel">{t('身份验证')}</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                  onClick={this.closeIDVerifyModalDialog} style={{outline:'none'}}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body" style={{padding: '9px 0'}}>
          <div className="mix-text-black" style={{
            fontSize: '13px',
            letterSpacing: '0',
            lineHeight: '14px',
            margin: '0 auto',
            width: '360px'
          }}>{t('开启免输资金密码, 需要输入资金密码进行身份认证才能继续,请输入')}</div>
          {/*<div style={{fontSize: '12px',color: '#333333',letterSpacing: '0',lineHeight: '14px'}}>{t('')}</div>*/}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20px',
            padding: '27px 0'
          }}>
            <label className="mix-blue">{t('资金密码')}:</label>
            <input type="password" autoComplete="new-password"
                   value={store.password}
                   style={{
                     height: '20px',
                     lineHeight: '20px',
                     borderRadius: '2px',
                     textIndent:'5px',
                     width: '170px',
                     margin: '0 8px',
                     border: '1px solid rgba(187,187,189,0.20)',
                     boxShadow: 'inset 0 1px 1px 0 rgba(214,212,212,0.50)'
                   }}
                   onChange={this.changePassword}/>
            <button className="btn mix-bg-blue mix-text-white"
                    onClick={this.verifyPassword}
                    data-dismiss="modal"
                    style={{
                      height: '20px',
                      lineHeight: '20px',
                      borderRadius: '2px',
                      width: '68px',
                      fontSize: '12px',
                      letterSpacing: '0.03px',
                      textAlign: 'center',
                      border: 0,
                    }}
                    aria-label="Close">{t('确认提交')}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 交易委托item
 * store = {
       *   market: "BTC",
       *   marketUnit: "BTC"
       *   trade:  "ETH",
       *   tradeUnit: "ETH"
       *   price: "",
       *   amount: "",
       *   action: ""
       * }
 */
@translate(['translations'], {wait: true})
@observer
class TradePlanItem extends React.Component {
  constructor(props) {
    super(props);
    this.changeAmount = this.changeAmount.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.totalAmountRange = this.totalAmountRange.bind(this);
  }

  changePrice(e) {
    const {store, bankStore, confStore} = this.props;
    const value = e.target.value;
    const unit = confStore.coinPriceType
    store.ChangePrice(unit, value)
    // console.log(this.totalAmount, bankStore.min_trade[store.trade.toLowerCase()], this.totalAmount < bankStore.min_trade[store.trade.toLowerCase()], store.getPrice(unit), value)
    if(e.target.value !== '' && this.totalAmount < bankStore.min_trade[store.trade.toLowerCase()] && Number(store.getPrice(unit)) !== 0){
      let text = '可用余额不足以输入最小数量'
      if(conf.LANGUAGECODE !== 'zh-hans')
        text = 'Insufficient balance'
      swalMix({
        width:274,
        position:'top-end',
        timer: 3000,
        padding: '0px',
        backdrop: false,
        customClass:'trade-swalMix-one',
        showCloseButton:false,
        background:"rgba(235, 90, 90, 0.5) url('/static/trade/img/chucuo.svg') no-repeat 14px center/42px 32px",
        html: `<div style="color:#FFFFFF;font-size: 14px;letter-spacing: 0;text-indent:65px;text-align:left;">${text}</div>`
      })
    }
  }

  changeAmount(e) {
    e.preventDefault();
    const {store, bankStore, confStore} = this.props;
    const value = e.target.value;
    const unit = confStore.coinPriceType
    // console.log(this.totalAmount, bankStore.min_trade[store.trade.toLowerCase()], this.totalAmount < bankStore.min_trade[store.trade.toLowerCase()], store.getPrice(unit))
    if(this.totalAmount < bankStore.min_trade[store.trade.toLowerCase()] && Number(store.getPrice(unit)) !== 0){
      let text = '可用余额不足以输入最小数量'
      if(conf.LANGUAGECODE !== 'zh-hans')
        text = 'Insufficient balance'
      swalMix({
        width:274,
        position:'top-end',
        timer: 3000,
        padding: '0px',
        backdrop: false,
        customClass:'trade-swalMix-one',
        showCloseButton:false,
        background:"rgba(235, 90, 90, 0.5) url('/static/trade/img/chucuo.svg') no-repeat 14px center/42px 32px",
        html: `<div style="color:#FFFFFF;font-size: 14px;letter-spacing: 0;text-indent:65px;text-align:left;">${text}</div>`
      })
      return
    }
    if (value < 0 || Number.isNaN(value)) {
      store.setAmount(0);
    } else if (value >= this.totalAmount) {
      store.setAmount(this.totalAmount)
    } else {
      if(Math.abs(value) === 0 && e.target.type === 'range'){
        store.amount = ''
        return
      }
      store.setAmount(value);
    }
  }

  /**
   * 可以买到数量的总数
   */
  get totalAmount() {
    const {store, bankStore} = this.props;
    const marketPrice = store.getMarketPrice();
    const min_trade = bankStore.min_trade[store.trade.toLowerCase()]
    const availablePrice = this.availablePrice;
    // console.log(bankStore.recentDealData['CNY'])
    let length = 6;
    if(bankStore.recentDealData['CNY'] && bankStore.recentDealData['CNY'][store.trade.toLowerCase()] < 100){
      length = 4
    }
    if((availablePrice / marketPrice) < min_trade || availablePrice < min_trade){
      return 0
    }
    if(store.action === store.ACTION_TYPE.BUY){
      if (marketPrice <= 0) {
        return 0;
      } else {

        return (availablePrice / marketPrice).toFixedWithoutUp(length);
      }
    } else {
      return Number(availablePrice).toFixedWithoutUp(length)
    }

  }

  totalAmountRange(step = 4) {
    if (step < 0) {
      return []
    }
    const amount = this.totalAmount / step;
    const result = [];
    for (let i = 0; i <= step; i += 1) {
      result.push(i * amount)
    }
    return result;
  }

  /**
   * 得到用户的可用金额
   */
  get availablePrice() {
    const userStore = this.props.userStore;
    const coinType = this.props.coinType;
    return userStore.available(coinType)
  }

  get textBuyOrSell() {
    const {t, store} = this.props;
    if (store.action === store.ACTION_TYPE.BUY) {
      return t('买入')
    }
    return t('卖出')
  }

  get classStyle() {
    const {store} = this.props;
    if (store.action === store.ACTION_TYPE.BUY) {
      return 'mix-bg-buy'
    }
    return 'mix-bg-sell'
  }

  get chongbiStyle(){
    const {store} = this.props;
    if (store.action === store.ACTION_TYPE.BUY) {
      return 'mix-chongbi-buy'
    }
    return 'mix-chongbi-sell'
  }

  get rangeStyle(){
    const {store} = this.props;
    if (store.action === store.ACTION_TYPE.BUY) {
      return 'mix-trade-range-buy'
    }
    return 'mix-trade-range-sell'
  }

  get submitText() {
    const {store} = this.props;
    return (
      <button type="submit"
              className={`btn form-control ${this.classStyle} mix-font-white`}
              onClick={store.SubmitOrder.bind(store)}
              style={{fontSize: '1.1rem', letterSpacing: 0, height:'100%'}}
      >{this.textBuyOrSell}</button>
    )
  }

  get readOnlyPassword() {
    return (<input type="password"
              className="mix-dark flex-fill"
              readOnly={true}
              value="111111111111111"
              style={{height: "50%",textIndent:'5px'}}/>)
  }

  get inputPassword() {
    const {t, store, userStore} = this.props;
    return (<input type="password"
           className="mix-dark "
           style={{height: "50%",textIndent:'5px',fontSize:'12px'}}
           placeholder={t("输入资金密码")}
           value={store.password}
           onChange={store.ChangePW}/>)
  }

  get renderPassword() {
    const {t, store, userStore, modalDialogStore} = this.props;
    const isEmpty = require('lodash.isempty');
    // console.log('renderPassword',(isEmpty(userStore.data) || !userStore.data.safe), isEmpty(userStore.data), userStore.data)
    if (isEmpty(userStore.data) || !userStore.data.safe) {
      return <input type="password"
                    className="mix-dark flex-fill"
                    readOnly={true}
                    style={{height: "71%",textIndent:'5px',marginBottom:'1.5%'}}/>
    }

    // 如果用户设置密码
    if (userStore.data.safe.has_fund_passwd) {
      // console.log('userStore.data',userStore.data)
      return (
        <div className="flex-fill d-flex flex-column " style={{height: "100%"}}>
          {userStore.data.safe.need_input_pwd ? this.readOnlyPassword : this.inputPassword }
          <div className="d-flex flex-row justify-content-end">
            <a className="btn btn-sm mix-a-xx-small mix-red" href={conf.accountProfile} style={{marginRight:'3%'}}>{t('忘记资金密码')}</a>
            <a className="btn btn-sm mix-a-xx-small mix-blue"
               data-toggle="modal"
               data-target="#ignore-password">
              {t('免输资金密码')}
            </a>
          </div>
        </div>)
    } else {
      return <a href={conf.accountProfile} target="_blank" className="mix-blue" style={{display:'flex', alignItems:'center',height:'70%'}}>{t('设置资金密码')}</a>
    }
  }

  get renderPrice() {
    const {t, store, confStore} = this.props;
    // 如果是限价委托
    return {
      0: (
        <div className="d-flex flex-row item-group" style={{alignItems:'center'}}>
          <div className="item-group-pre" style={{height:'100%'}}>{t('价格')}</div>
          <input type="text"
                 className="mix-dark flex-fill change-white"
                 style={{height:'100%',textIndent:'5px'}}
                 onChange={this.changePrice}
                 value={store.getPrice(confStore.coinPriceType)}
          />
        <div className="mix-dark" id="change-white" style={{height:'100%',display:'flex',alignItems:'center',width:'10%',justifyContent:'center',paddingRight:'10px'}}>{confStore.coinPriceType}</div>
        </div>),
      1: (
        <div className="d-flex flex-row item-group" style={{alignItems:'center'}}>
          <div className="item-group-pre" style={{height:'100%'}}>{t('价格')}</div>
          <input type="text"
                 className="mix-dark flex-fill change-white"
                 readOnly={true}
                 style={{height:'100%',textIndent:'5px',color:'rgb(255, 255, 255)'}}
                 value={`${t('以市场最优价格')}${this.textBuyOrSell}`}/>
        </div>)
    }[store.orderType]
  }

  render() {
    const {t, store, tradePair, confStore} = this.props;
    const coinType = this.props.coinType;
    const trade = utils.trade(tradePair);

    return <form className="d-flex flex-column item-form mid-form-m" style={{width:'45.8%', height:'100%'}}>
      <div className="d-flex flex-row" style={{height:'12.23%', alignItems:'center'}}>
        <div className="flex-grow-1" style={{fontSize: '.79rem', color:'white'}}>{t('可用')}: {Number(this.availablePrice).format({number:'property',style:{decimalLength:8}})} {coinType.toUpperCase()}</div>
        <a style={{textDecoration: 'none',display: 'block',padding:'1px 2px',}} className={`mix-link ${this.chongbiStyle}`} href={`${conf.chargeUrl}?cat=${coinType.toLowerCase()}`}>{t('充币')}</a>
           </div>
      {this.renderPrice}
      <div className="d-flex flex-row item-group" style={{alignItems:'center'}}>
        <div className="item-group-pre" style={{height:'100%'}}>{t('数量')}</div>
        <input type="text"
               className="mix-dark flex-fill change-white"
               style={{height:'100%',textIndent:'5px'}}
               onChange={this.changeAmount}
               placeholder="0"
               value={store.amount < this.totalAmount ? store.amount : this.totalAmount}
        />
      <div className="mix-dark" id="change-white" style={{height:'100%',display:'flex',alignItems:'center',width:'10%',justifyContent:'center',paddingRight:'10px'}}>{trade.toUpperCase()}</div>
      </div>
      <div className="form-row" style={{height:'11.1%',alignItems:'flex-start'}}>
        <div className="col trade-plan-item-range-pointer">
          <input className={`mix-dark w-100 to-pointer ${this.rangeStyle}`}
                 type="range"
                 min="0"
                 value={Number(store.amount)}
                 onChange={this.changeAmount}
                 max={this.totalAmount || 1} step="any"
          />
        </div>
      </div>
      <div className="d-flex flex-row item-group-nb" style={{height:'17%'}}>
        <div className="item-group-pre" style={{alignItems: 'center', height:'70%'}}>{t('资金密码')}:</div>
        {this.renderPassword}
      </div>
      <div className="d-flex flex-row item-group-nb" style={{height:'10.4%'}}>
        <div className="item-group-pre">{t('交易额')}:</div>
        <div className="d-flex align-items-center" id="change-white" style={{color:'#FFF'}}>
          {`${Number(store.amount * store.getPrice(confStore.coinPriceType)).format({number:'property'})} ${confStore.coinPriceType}`}
        </div>
      </div>
      <div className="form-group" style={{height:'15%'}}>
        {this.submitText}
      </div>
    </form>
  }
}

export default TradePlan
