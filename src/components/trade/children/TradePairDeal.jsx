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

  }
  componentDidMount() {

  }
  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <div className='trade-pair-deal-title'>
          <img src={this.state.tradePairMsg.coinIcon} alt="" />
          <h2>{this.state.tradePairMsg.tradePair && this.state.tradePairMsg.tradePair.toUpperCase()}</h2>
          <span>
            <NavLink to={{ pathname: "/help/currency/", query: { currency: this.state.tradePairMsg.tradePair && this.state.tradePairMsg.tradePair.split('/')[0] } }}>
              {this.intl.get('market-currencyInfo')}
            </NavLink>
          </span>
        </div>
        <div className='trade-pair-deal-price'>
          <span>{this.state.tradePairMsg.prices && Number(this.state.tradePairMsg.prices.price)}</span>≈<span>{this.state.tradePairMsg.prices && (this.props.controller.configController.language === 'zh-CN' ? (Number(this.state.tradePairMsg.prices.priceCN).format({number: 'legal', style:{name:'cny'}})) :(Number(this.state.tradePairMsg.prices.priceEN).format({number: 'legal', style:{name:'usd'}}))) }</span>
        </div>
      </div>
    )
  }
}