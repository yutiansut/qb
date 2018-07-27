import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";
import '../stylus/tradeLive.styl'

const tradeLiveItem = [{name:'买卖', type:'all'}, {name:'买入', type:'buy'}, {name:'卖出', type:'sell'}];
export default class LiveTrade extends ExchangeViewBase{
  constructor(props){
    super(props);
    this.state = {
      changeFlag:true,
      titleSelect: 'all',
      newPrice: 0,
      prices:{},
      tradeLiveItem: [{name: this.intl.get('order-bs'), type:'all'}, {name:this.intl.get('buy'), type:'buy'}, {name:this.intl.get('sell'), type:'sell'}]
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.liveTradeListHandle = controller.liveTradeListHandle.bind(controller);
    this.orderListSelect = controller.orderListSelect.bind(controller);
    // this.getNewPrice = controller.getNewPrice.bind(controller)
    this.clearRoom = controller.clearRoom.bind(controller)
  }
  componentWillMount(){
  
  }
  componentDidMount(){
  }
  changeLiveTitleSelect(v){
    this.setState({
      titleSelect: v.type
    });
  }
  componentWillUnmount() {
    this.clearRoom()
  }

  render() {
    return(
        <div className='live-trade'>
          <div className='trade-live-title'>
            {this.state.tradeLiveItem.map((v, index) => {
              return(
                  <div className={`trade-live-item live-item-${this.state.titleSelect === v.type ? 'active' : ''}`} key={index} onClick={this.changeLiveTitleSelect.bind(this, v)}>
                    {v.name}
                  </div>
              )
            })}
          </div>
          <table className='trade-live-table'>
            <thead>
              <tr style={{height: this.state.liveSellArray && this.state.liveSellArray.length ? "0.49rem" : '0.63rem', lineHeight: '0.49rem'}}>
                <td> </td>
                <td>{`${this.intl.get('price')}(${(this.state.unitsType && this.state.unitsType.toUpperCase()) || (this.state.market && this.state.market.toUpperCase())})`}</td>
                <td>{`${this.intl.get('amount')}(${(this.state.coin && this.state.coin.toUpperCase())})`}</td>
                <td>{`${this.intl.get('total')}(${(this.state.unitsType && this.state.unitsType.toUpperCase()) || (this.state.market && this.state.market.toUpperCase())})`}</td>
              </tr>
            </thead>
            <tbody>
            <tr className={`no-content-${this.state.titleSelect !== 'all' ? 'none' : ''}`} style={{height: `${(13 - (this.state.liveSellArray && this.state.liveSellArray.length || 0)) >= 0 ? (13 - (this.state.liveSellArray && this.state.liveSellArray.length ) || 0) * .21 : 0}rem`}}>
            </tr>
            {this.state.liveSellArray && this.state.liveSellArray.map((v,index) =>
                ((this.state.titleSelect === 'all' && this.state.liveSellArray.length - 13 <= index) || (this.state.titleSelect === 'sell' && this.state.liveSellArray.length - 26 <= index)) && (
                  <tr key={index} className={index === this.state.liveSellArray.length - 1 ? 'distance' : ''} onClick={this.orderListSelect.bind(this,v)} style={{cursor:'pointer'}}>
                    <td>{`${this.intl.get('order-s')}${this.state.liveSellArray.length - index}`}</td>
                    <td style={{color : '#F25656 '}}>{this.state.unitsType === 'CNY' && Number(v.priceCN).format({number: 'legal', style:{name:'cny'}}) || (this.state.unitsType === 'USD' && Number(v.priceEN).format({number: 'legal',style:{name:'usd'}}) || Number(v.price).format({number: 'digital',style:{decimalLength :this.props.controller.accuracy.priceAccuracy}})) }</td>
                    <td>{Number(v.amount).formatFixNumberForAmount(this.props.controller.accuracy.volumeAccuracy, false)}</td>
                    <td>{this.state.unitsType === 'CNY' && Number(Number(v.priceCN).multi(v.amount)).format({number:'legal',style:{name:'cny'}}) || (this.state.unitsType === 'USD' && Number(Number(v.priceEN).multi(v.amount)).format({number:'legal',style:{name:'usd'}}) || Number(Number(v.price).multi(v.amount)).format({number:'property',style:{decimalLength :this.props.controller.accuracy.priceAccuracy + this.props.controller.accuracy.volumeAccuracy}})) }</td>
                  </tr>
              )
            )}
            </tbody>

          <tbody className='live-deal'>
            <tr><td colSpan='4' className={`${this.state.updown && (this.state.updown > 0 && "market-up" || "market-down")}`}>{this.state.unitsType === 'CNY' && Number(this.state.prices.priceCN).format({number:'legal',style:{name:'cny'}}) || (this.state.unitsType === 'USD' && Number(this.state.prices.priceEN).format({number:'legal',style:{name:'usd'}}) || Number(this.state.prices.price).format({number:'digital',style:{decimalLength :this.props.controller.accuracy.priceAccuracy}}))}</td></tr>
          </tbody>
            <tbody>
            {this.state.liveBuyArray && this.state.liveBuyArray.map((v,index) =>
                ((this.state.titleSelect === 'all' && index < 13) || (this.state.titleSelect === 'buy' && index < 26)) && (
                  <tr key={index} className={index === 0 ? 'distance-b' : ''} onClick={this.orderListSelect.bind(this,v)} style={{cursor:'pointer'}}>
                    <td>{`${this.intl.get('order-b')}${index + 1}`}</td>
                    <td style={{color : '#2BB789 '}}>{this.state.unitsType === 'CNY' && Number(v.priceCN).format({number: 'legal',style:{name:'cny'}}) || (this.state.unitsType === 'USD' && Number(v.priceEN).format({number: 'legal',style:{name:'usd'}}) || Number(v.price).format({number: 'digital',style:{decimalLength :this.props.controller.accuracy.priceAccuracy}})) }</td>
                    <td>{Number(v.amount).formatFixNumberForAmount(this.props.controller.accuracy.volumeAccuracy, false)}</td>
                    <td>{this.state.unitsType === 'CNY' && (Number(Number(v.priceCN).multi(v.amount)).format({number:'legal',style:{name:'cny'}})) || (this.state.unitsType === 'USD' && (Number(Number(v.priceEN).multi(v.amount)).format({number:'legal',style:{name:'usd'}})) || (Number(Number(v.price).multi(v.amount)).format({number:'property',style:{decimalLength :this.props.controller.accuracy.priceAccuracy + this.props.controller.accuracy.volumeAccuracy}}))) }</td>
                  </tr>
              )
            )}
            </tbody>
            
          </table>
        </div>
    )
  }
}