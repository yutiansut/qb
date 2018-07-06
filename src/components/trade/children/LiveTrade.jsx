import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";
import '../stylus/tradeLive.styl'

const tradeLiveItem = [{name:'买卖', type:'all'}, {name:'买入', type:'buy'}, {name:'卖出', type:'sell'}];
export default class LiveTrade extends ExchangeViewBase{
  constructor(props){
    super(props);
    this.state = {
      titleSelect: 'all'
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.liveTradeListHandle = controller.liveTradeListHandle.bind(controller);
    this.orderListSelect = controller.orderListSelect.bind(controller);
  }
  componentWillMount(){
  
  }
  componentDidMount(){
    this.props.controller.joinRoom();
    this.props.controller.getDepth();
    // this.liveTradeListHandle()
  }
  changeLiveTitleSelect(v){
    this.setState({
      titleSelect: v.type
    });
  }
  render() {
    console.log(this.state.unitsType)
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
              <tr>
                <td> </td>
                <td>{`价格(${this.state.unitsType || this.state.market})`}</td>
                <td>{`数量(${this.state.coin})`}</td>
                <td>{`成交额(${this.state.unitsType || this.state.market})`}</td>
              </tr>
            </thead>
            <tbody>
            <tr className={`no-content-${this.state.titleSelect !== 'all' ? 'none' : ''}`} style={{height: `${(12 - (this.state.liveSellArray && this.state.liveSellArray.length || 0))? (12 - (this.state.liveSellArray && this.state.liveSellArray.length || 0)) * .21 : 0}rem`}}>
            </tr>
            {this.state.liveSellArray && this.state.liveSellArray.map((v,index) =>
                ((this.state.titleSelect === 'all' && index < 12) || (this.state.titleSelect === 'sell' && index < 24)) && (
                  <tr key={index} className={index === this.state.liveSellArray.length - 1 ? 'distance' : ''} onClick={this.orderListSelect.bind(this,v)} style={{cursor:'pointer'}}>
                    <td>{`卖${this.state.liveSellArray.length - index}`}</td>
                    <td>{this.state.unitsType === 'CNY' && v.priceCN || (this.state.unitsType === 'USD' && v.priceEN || v.price) }</td>
                    <td>{v.amount}</td>
                    <td>{this.state.unitsType === 'CNY' && (v.priceCN * v.amount) || (this.state.unitsType === 'USD' && (v.priceEN * v.amount) || (v.price * v.amount)) }</td>
                  </tr>
              )
            )}
            </tbody>

          <tbody className='live-deal'>
            <tr><td colSpan='4'>最新成交价</td></tr>
          </tbody>
            <tbody>
            {this.state.liveBuyArray && this.state.liveBuyArray.map((v,index) =>
                ((this.state.titleSelect === 'all' && index < 12) || (this.state.titleSelect === 'buy' && index < 24)) && (
                  <tr key={index} className={index === 0 ? 'distance-b' : ''} onClick={this.orderListSelect.bind(this,v)} style={{cursor:'pointer'}}>
                    <td>{`买${index + 1}`}</td>
                    <td>{this.state.unitsType === 'CNY' && v.priceCN || (this.state.unitsType === 'USD' && v.priceEN || v.price) }</td>
                    <td>{v.amount}</td>
                    <td>{this.state.unitsType === 'CNY' && (v.priceCN * v.amount) || (this.state.unitsType === 'USD' && (v.priceEN * v.amount) || (v.price * v.amount)) }</td>
                  </tr>
              )
            )}
            </tbody>
            
          </table>
        </div>
    )
  }
}