import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";
import '../stylus/tradeLive.styl'

const tradeLiveItem = [{name:'买卖', type:'all'}, {name:'买入', type:'buy'}, {name:'卖出', type:'sell'}];
export default class LiveTrade extends ExchangeViewBase{
  constructor(props){
    super(props);
    this.state = {
      titleSelect: 'all',
      newPrice: 0,
      prices:{}
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
    // this.props.controller.joinRoom();
    // this.props.controller.getDepth();
    // this.liveTradeListHandle()
  }
  changeLiveTitleSelect(v){
    this.setState({
      titleSelect: v.type
    });
  }
  // getNewPrice(v){
  //
  // }
  componentWillUnmount() {
    this.clearRoom()
  }

  render() {
    // console.log('nummmmmmmmmmmmm',(12 - (this.state.liveSellArray && this.state.liveSellArray.length || 0)),)
    return(
        <div className='live-trade'>
          <div className='trade-live-title'>
            {tradeLiveItem.map((v, index) => {
              return(
                  <div className={`trade-live-item live-item-${this.state.titleSelect === v.type ? 'active' : ''}`} key={index} onClick={this.changeLiveTitleSelect.bind(this, v)}>
                    {v.name}
                  </div>
              )
            })}
          </div>
          <table className='trade-live-table'>
            <thead>
              <tr style={{height: this.state.liveSellArray && this.state.liveSellArray.length ? "0.49rem" : '0.63rem'}}>
                <td> </td>
                <td>{`价格(${(this.state.unitsType && this.state.unitsType.toUpperCase()) || (this.state.market && this.state.market.toUpperCase())})`}</td>
                <td>{`数量(${(this.state.coin && this.state.coin.toUpperCase())})`}</td>
                <td>{`成交额(${(this.state.unitsType && this.state.unitsType.toUpperCase()) || (this.state.market && this.state.market.toUpperCase())})`}</td>
              </tr>
            </thead>
            <tbody>
            <tr className={`no-content-${this.state.titleSelect !== 'all' ? 'none' : ''}`} style={{height: `${(13 - (this.state.liveSellArray && this.state.liveSellArray.length || 0)) > 0 ? (13 - (this.state.liveSellArray && this.state.liveSellArray.length ) || 0) * .21 : 0}rem`}}>
            </tr>
            {this.state.liveSellArray && this.state.liveSellArray.map((v,index) =>
                ((this.state.titleSelect === 'all' && this.state.liveSellArray.length - 13 <= index) || (this.state.titleSelect === 'sell' && this.state.liveSellArray.length - 26 <= index)) && (
                  <tr key={index} className={index === this.state.liveSellArray.length - 1 ? 'distance' : ''} onClick={this.orderListSelect.bind(this,v)} style={{cursor:'pointer'}}>
                    <td>{`卖${this.state.liveSellArray.length - index}`}</td>
                    <td style={{color : '#F25656 '}}>{this.state.unitsType === 'CNY' && v.priceCN || (this.state.unitsType === 'USD' && v.priceEN || v.price) }</td>
                    <td>{v.amount}</td>
                    <td>{this.state.unitsType === 'CNY' && Number(v.priceCN.multi(v.amount)).format({number:'property'}) || (this.state.unitsType === 'USD' && Number(v.priceEN.multi(v.amount)).format({number:'property'}) || Number(v.price.multi(v.amount)).format({number:'property'})) }</td>
                  </tr>
              )
            )}
            </tbody>

          <tbody className='live-deal'>
            <tr><td colSpan='4'>{this.state.unitsType === 'CNY' && this.state.prices.priceCN || (this.state.unitsType === 'USD' && this.state.prices.priceEN || this.state.prices.price)}</td></tr>
          </tbody>
            <tbody>
            {this.state.liveBuyArray && this.state.liveBuyArray.map((v,index) =>
                ((this.state.titleSelect === 'all' && index < 13) || (this.state.titleSelect === 'buy' && index < 24)) && (
                  <tr key={index} className={index === 0 ? 'distance-b' : ''} onClick={this.orderListSelect.bind(this,v)} style={{cursor:'pointer'}}>
                    <td>{`买${index + 1}`}</td>
                    <td style={{color : '#2BB789 '}}>{this.state.unitsType === 'CNY' && v.priceCN || (this.state.unitsType === 'USD' && v.priceEN || v.price) }</td>
                    <td>{v.amount}</td>
                    <td>{this.state.unitsType === 'CNY' && (Number(v.priceCN.multi(v.amount)).format({number:'property'})) || (this.state.unitsType === 'USD' && (Number(v.priceEN.multi(v.amount)).format({number:'property'})) || (Number(v.price.multi(v.amount)).format({number:'property'}))) }</td>
                  </tr>
              )
            )}
            </tbody>
            
          </table>
        </div>
    )
  }
}