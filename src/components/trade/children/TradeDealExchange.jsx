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
            <NavLink to={{ pathname: '/wallet/charge', query: {currency: this.props.ControllerProps.dealType ? this.props.steadUnitN.toLowerCase() : this.props.steadUnitP.toLowerCase()}}}>{`${this.intl.get('deposit')}`}</NavLink>
            </div>
          </div>
          <div className='trader-deal-input'>
            <div className='deal-input-label'>{`${this.intl.get('price')}`}</div>
            {/*<Input/>*/}
            <input type="text" value={this.props.DealEntrustType ? (this.props.ControllerProps.dealType ? this.intl.get('deal-market-sell') : this.intl.get('deal-market-buy')):(this.props.ControllerProps.dealType ? this.props.avalue : this.props.bvalue)} name='price' onChange={this.props.priceInput.bind(this, this.props.ControllerProps.dealType)} readOnly={this.props.DealEntrustType ? true : false}/>
            <div className='deal-input-unit'>
              {this.props.PriceUnit.toUpperCase() || this.props.Market.toUpperCase()}
            </div>
          </div>
          <div className='trader-deal-input'>
            <div className='deal-input-label'>{`${this.intl.get('amount')}`}</div>
            {/*<Input/>*/}
            <input type="text" value={this.props.ControllerProps.dealType ? this.props.sellNum : this.props.buyNum} onChange={this.props.numInput.bind(this, this.props.ControllerProps.dealType)}/>
            <div className='deal-input-unit'>
              {this.props.NumUnit.toUpperCase()}
            </div>
          </div>
          <div className='deal-number-range'>
            <input type="range"  min='0' max={maxValue} step={maxValue/100} className={`r-${this.props.ControllerProps.tradeType}`} value={this.props.ControllerProps.dealType ? this.props.sellNum : this.props.buyNum} onChange={this.props.numInput.bind(this, this.props.ControllerProps.dealType)}/>
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
              {!this.props.fundPassVerify && <input type="password" value={this.props.fundPwdInterval ? 'wfywfywfy' : (this.props.ControllerProps.dealType ? this.props.funpassSell : this.props.funpassBuy)} onChange={this.props.passInput.bind(this,this.props.ControllerProps.dealType)} readOnly={this.props.fundPwdInterval ? true : false}/> || <em><a href="/wuser/safe">{this.intl.get('deal-setpwd')}</a></em>}
            </div>
            {!this.props.fundPassVerify && <p className='password-msg'>
              <span>{`${this.intl.get('deal-forgetpwd')}`}</span>
              <span onClick={this.props.freePwd.bind(this)} style={{cursor: 'pointer'}}>{`${this.intl.get('deal-freepwd')}`}</span>
            </p> || null }
          </div>
          <div className='trade-deal-turnover'>
            <span>{`${this.intl.get('deal-trunover')}`}:</span>
            <em>{this.props.DealEntrustType ? (this.intl.get('deal-market-msg')) : (this.props.ControllerProps.dealType ? Number(Number(this.props.sellNum).multi(this.props.avalue)) : Number(Number(this.props.buyNum).multi(this.props.bvalue)))}</em>
            <i>{this.props.DealEntrustType === 0 && (this.props.PriceUnit.toUpperCase() || this.props.Market.toUpperCase())}</i>
          </div>
          <div className={`trade-deal-button-${this.props.ControllerProps.tradeType}`} onClick={this.props.dealTrade.bind(this, this.props.ControllerProps.tradeType)}>
            {this.props.ControllerProps.dealType ? `${this.intl.get('sell')}` : `${this.intl.get('buy')}`}
          </div>

        </div>
    )
  }
}