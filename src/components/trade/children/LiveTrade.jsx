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
    this.liveTradeListHandle()
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
            <tr className={`no-content-${this.state.titleSelect !== 'all' ? 'none' : ''}`} style={{height: `${(12 - this.state.liveSellArray.length)? (12 - this.state.liveSellArray.length) * .21 : 0}rem`}}>
            
            </tr>
            {((this.state.titleSelect === 'all' && this.state.liveSellArray.length < 12) || (this.state.titleSelect === 'sell' && this.state.liveSellArray.length < 24)) && this.state.liveSellArray.map((v,index) => {
              return(
                  <tr key={index} className={index === this.state.liveSellArray.length - 1 ? 'distance' : ''} onClick={this.orderListSelect.bind(this,v)} style={{cursor:'pointer'}}>
                    <td>{`卖${this.state.liveSellArray.length - index}`}</td>
                    <td>{this.state.unitsType === 'CNY' && v.priceCN || (this.state.unitsType === 'USD' && v.priceEN || v.price) }</td>
                    <td>{v.currDepth}</td>
                    <td>{this.state.unitsType === 'CNY' && v.turnoverCN || (this.state.unitsType === 'USD' && v.turnoverEN || v.turnover) }</td>
                  </tr>
              )
            })}
            </tbody>

          <tbody className='live-deal'>
            <tr><td colSpan='4'>最新成交价</td></tr>
          </tbody>
            <tbody>
            {((this.state.titleSelect === 'all' && this.state.liveBuyArray.length < 12) || (this.state.titleSelect === 'buy' && this.state.liveBuyArray.length < 24)) && this.state.liveBuyArray.map((v,index) => {
              return(
                  <tr key={index} className={index === 0 ? 'distance-b' : ''} onClick={this.orderListSelect.bind(this,v)} style={{cursor:'pointer'}}>
                    <td>{`买${index + 1}`}</td>
                    <td>{v.price}</td>
                    <td>{v.currDepth}</td>
                    <td>{v.turnover}</td>
                  </tr>
              )
            })}
            </tbody>
            
          </table>
        </div>
    )
  }
}