import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import '../stylus/tradePairDeal.styl'

export default class TradePairDeal extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      tradePairMsg: {}
    }
    const { controller } = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
  }
  componentWillMount() {
``
  }
  componentDidMount() {

  }
  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <div className='trade-pair-deal-title'>
          <div className='trade-pair-deal-info'>
            <img src={this.state.tradePairMsg.coinIcon} alt="" />
            <b>{`${this.state.tradePairMsg.coinName && this.state.tradePairMsg.coinName}/`}</b>
            <em>{this.state.tradePairMsg.marketName && this.state.tradePairMsg.marketName}</em>
            <span>
            <NavLink to={{ pathname: "/help/currency/", query: {currency: this.state.tradePairMsg.coinName }}}>
              {this.intl.get('market-currencyInfo')}
            </NavLink>
          </span>
          </div>
         <div className='trade-pair-deal-items'>
           <p>{this.intl.get('deal-trade-price')}</p>
           <div>
           <span className={`${this.state.tradePairMsg.updown && (this.state.tradePairMsg.updown > 0 && "market-up" || "market-down")} trade-pair-deal-price`}>{this.state.tradePairMsg.prices && Number(this.state.tradePairMsg.prices.price).format({number: 'digital', style: {decimalLength :this.state.tradePairMsg.priceAccuracy}})}</span>
             ≈
             <span>{this.state.tradePairMsg.prices && (this.props.controller.configController.language === 'zh-CN' ? (Number(this.state.tradePairMsg.prices.priceCN * this.state.tradePairMsg.prices.price).format({number: 'legal', style:{name:'cny'}})) :(Number(this.state.tradePairMsg.prices.priceEN * this.state.tradePairMsg.prices.price).format({number: 'legal', style:{name:'usd'}}))) }</span>
           </div>
         </div>
          <div className='trade-pair-deal-items'>
            <p>{this.intl.get('deal-trade-rise')}</p>
            <div className={`${this.state.tradePairMsg.updown && (this.state.tradePairMsg.updown > 0 && "market-up" || "market-down")} trade-pair-deal-price`}>
              <span style={{marginRight: '.06rem'}}>{this.state.tradePairMsg.prices && Number((this.state.tradePairMsg.prices.price).minus(this.state.tradePairMsg.priceY)) || 0}</span>
              <span>{this.state.tradePairMsg.rise && this.state.tradePairMsg.rise.toPercent() || 0}</span>
            </div>
          </div>
          <div className='trade-pair-deal-items'>
            <p>{this.intl.get('deal-trade-high')}</p>
            <div>
              {this.state.tradePairMsg.highestPrice && this.state.tradePairMsg.highestPrice.format({number: 'digital', style: {decimalLength :this.state.tradePairMsg.priceAccuracy}}) || 0}
            </div>
          </div>
          <div className='trade-pair-deal-items'>
            <p>{this.intl.get('deal-trade-low')}</p>
            <div>
              {this.state.tradePairMsg.lowestPrice && this.state.tradePairMsg.lowestPrice.format({number: 'digital', style: {decimalLength :this.state.tradePairMsg.priceAccuracy}}) || 0}
            </div>
          </div>
          <div className='trade-pair-deal-items'>
            <p>{this.intl.get('deal-trade-turnover')}</p>
            <div>
              <span>{this.state.tradePairMsg.turnover && this.state.tradePairMsg.turnover.formatTurnover()}</span>
              <span>{this.state.tradePairMsg.marketName}</span>
            </div>
          </div>
        </div>
        {/*<div className={`${this.state.tradePairMsg.updown && (this.state.tradePairMsg.updown > 0 && "market-up" || "market-down")} trade-pair-deal-price`}>*/}
          {/*<span>{this.state.tradePairMsg.prices && Number(this.state.tradePairMsg.prices.price).format({number: 'digital', style: {decimalLength :this.state.tradePairMsg.priceAccuracy}})}</span>≈<span>{this.state.tradePairMsg.prices && (this.props.controller.configController.language === 'zh-CN' ? (Number(this.state.tradePairMsg.prices.priceCN * this.state.tradePairMsg.prices.price).format({number: 'legal', style:{name:'cny'}})) :(Number(this.state.tradePairMsg.prices.priceEN * this.state.tradePairMsg.prices.price).format({number: 'legal', style:{name:'usd'}}))) }</span>*/}
        {/*</div>*/}
      </div>
    )
  }
}