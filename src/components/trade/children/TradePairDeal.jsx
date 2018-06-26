import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";
import '../stylus/tradePairDeal.styl'

export default class TradePairDeal extends ExchangeViewBase{
  constructor(props) {
    super(props);
    this.state = {
      tradePairMsg:{}
    }
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
  }
  componentWillMount(){
  
  }
  componentDidMount(){

  }
  render() {
    return(
        <div style={{overflow: 'hidden'}}>
          <div className='trade-pair-deal-title'>
            <img src={this.state.tradePairMsg.coinIcon} alt=""/>
            <h2>{this.state.tradePairMsg.tradePair}</h2>
            <span><a href="#">币种资料</a></span>
          </div>
          <div className='trade-pair-deal-price'>
            <span>{this.state.tradePairMsg.prices && this.state.tradePairMsg.prices.price}</span>≈<span>{this.state.tradePairMsg.prices && this.state.tradePairMsg.prices.priceCN}</span>
          </div>
        </div>
    )
  }
}