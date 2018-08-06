import ExchangeViewBase from '../../ExchangeViewBase'
import React, {Component} from "react";
import { NavLink } from 'react-router-dom'
import Input from "../../../common/component/Input";
import '../stylus/tradeDealExchange.styl'

const rangeItems = [{value:'0%'},{value:'25%'},{value:'50%'},{value:'75%'},{value:'100%'}];
export default class TradeDealExchange extends  ExchangeViewBase{
  constructor(props) {
    super(props);
    this.state = {

    }

  }
  componentWillMount() {

  }

  componentDidMount() {

  }
  get priceValue(){
    return this.props.prices[this.props.PriceUnit === 'CNY' && 'priceCN' || (this.props.PriceUnit === 'USD' && 'priceEN' || 'price')] || 0
  }

  // priceInput(e){
  //   console.log(e.target.value,this.props.prices[this.props.PriceUnit === 'CNY' && 'priceCN' || (this.props.PriceUnit === 'USD' && 'priceEN' || 'price')])
  // }
  render(){
    // console.log('交易盘1', this.props.PriceUnit)
    // console.log('交易盘2', this.props.Market)
    // console.log('交易盘3', this.props.NumUnit)
    let maxValue = this.props.ControllerProps.dealType ? this.props.sellMax : this.props.buyMax;
    return(
        <div className='trade-deal-exchange'>
          <div className='trade-deal-asset'>
            <div className='deal-asset-wallet'>
              {`${this.intl.get('deal-use')}`}:<span>{Number(this.props.wallet).format({number:'property'})}</span>
              <i>
              {this.props.ControllerProps.dealType ? this.props.steadUnitN.toUpperCase() : this.props.steadUnitP.toUpperCase()}
            </i>
            </div>
            <div className={`deal-asset-charge deal-asset-charge-${this.props.ControllerProps.tradeType}`}>
            <NavLink to={{ pathname: '/wallet/charge', query: {currency: this.props.ControllerProps.dealType ? this.props.steadUnitN.toLowerCase() : this.props.steadUnitP.toLowerCase()}}} style={{display: (this.props.ControllerProps.dealType ? this.props.marketChargeFlag : this.props.coinChargeFlag) ? 'block': 'none'}}>{`${this.intl.get('deposit')}`}</NavLink>
            </div>
          </div>
          <div className='trader-deal-input'>
            <div className='deal-input-label'>{`${this.intl.get('price')}`}</div>
            {/*<Input/>*/}
            <input type="text" value={this.props.DealEntrustType ? (this.intl.get('marketPrice')) : (this.props.ControllerProps.dealType ? this.props.avalue : this.props.bvalue)} name='price' onChange={this.props.priceInput.bind(this, this.props.ControllerProps.dealType)} readOnly={this.props.DealEntrustType ? true : false}/>
            <div className='deal-input-unit'>
              {this.props.PriceUnit.toUpperCase() || this.props.Market.toUpperCase()}
            </div>
          </div>
          <div className='trader-deal-input'>
            <div className='deal-input-label'>{`${this.intl.get('amount')}`}</div>
            {/*<Input/>*/}
            <input type="text" value={this.props.ControllerProps.dealType ? this.props.sellNum : this.props.buyNum} onChange={this.props.numInput.bind(this, this.props.ControllerProps.dealType,true)}/>
            <div className='deal-input-unit'>
              {this.props.NumUnit.toUpperCase()}
            </div>
          </div>
          <div className='deal-number-range'>
            <input type="range"  min='0' max={maxValue || 0} step={(maxValue/100) || 0} className={`r-${this.props.ControllerProps.tradeType}`} value={this.props.ControllerProps.dealType ? Number(this.props.sellNum) : Number(this.props.buyNum)} onChange={this.props.numInput.bind(this, this.props.ControllerProps.dealType,false)}/>
            <ul>
              {rangeItems.map((v, index) => {
                return(
                    <li key={index}>
                      {/*{v.value}*/}
                    </li>
                )
              })}
            </ul>
          </div>
          <div className='deal-number-percent'>
            <ul>
              {rangeItems.map((v, index) => {
                return(
                    <li key={index}>
                      {v.value}
                    </li>
                )
              })}
            </ul>
          </div>
          <div className='trade-password clearfix' style={{marginBottom: this.props.fundPassVerif && '.2rem'}}>
            <div className='trade-password-input'>
              <span>{`${this.intl.get('fundPass')}`}:</span>
              {!this.props.fundPassVerify && <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingRight:'.1rem'}}><input type="password" value={this.props.fundPwdInterval ? 'wfywfywfy' : (this.props.ControllerProps.dealType ? this.props.funpassSell : this.props.funpassBuy)} onChange={this.props.passInput.bind(this,this.props.ControllerProps.dealType)} readOnly={this.props.fundPwdInterval ? true : false}/>{<span onClick={this.props.freePwd.bind(this)} style={{cursor: 'pointer', color:'#2BB789'}}>{`${this.intl.get('deal-freepwd')}`}</span>}</div> || <em><a href="/user/safe/">{this.intl.get('deal-setpwd')}</a></em>}
            </div>
          </div>
          <div className='trade-deal-turnover'>
            {this.props.DealEntrustType ? '' : <span>  <span>{`${this.intl.get('deal-trunover')}`}:</span>
            <em>{this.props.ControllerProps.dealType ? Number(Number(this.props.sellNum).multi(this.props.avalue || 0)).format((this.props.PriceUnit === 'USD' || this.props.PriceUnit === 'CNY') ? {number: 'legal'} :{number:'property'} ) : Number(Number(this.props.buyNum).multi(this.props.bvalue || 0)).format((this.props.PriceUnit === 'USD' || this.props.PriceUnit === 'CNY') ? {number: 'legal'} :{number:'property'} )}</em>
            <i>{this.props.DealEntrustType === 0 && (this.props.PriceUnit.toUpperCase() || this.props.Market.toUpperCase())}</i>
              </span>}
            {!this.props.fundPassVerify && <p className='password-msg fr'>
              <span><a href="/user/safe/">{`${this.intl.get('deal-forgetpwd')}`}</a></span>
            </p> || null }
          </div>
          <div className={`trade-deal-button-${this.props.ControllerProps.tradeType}`} onClick={this.props.dealTrade.bind(this, this.props.ControllerProps.tradeType)}>
            {this.props.ControllerProps.dealType ? `${this.intl.get('sell')}` : `${this.intl.get('buy')}`}
           <em>{this.props.NumUnit.toUpperCase()}</em>
          </div>

        </div>
    )
  }
}