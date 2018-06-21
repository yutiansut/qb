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
    this.liveTradeListHandle = controller.liveTradeListHandle.bind(controller)
  }
  componentWillMount(){
  
  }
  componentDidMount(){
    this.liveTradeListHandle()
  }
  changeLiveTitleSelect(v){
    this.setState({
      titleSelect: v.type
    })
  }
  render() {
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
                <td>价格(BTC)</td>
                <td>数量(ETH)</td>
                <td>成交额(BTC)</td>
              </tr>
            </thead>
            <tbody>
            <tr className='no-content' style={{height: `${(12 - this.state.liveSellArray.length)? (12 - this.state.liveSellArray.length) * .21 : 0}rem`}}>
            
            </tr>
            {this.state.titleSelect !== 'buy' && this.state.liveSellArray.length < 12 && this.state.liveSellArray.map((v,index) => {
              return(
                  <tr key={index} className={index === this.state.liveSellArray.length - 1 ? 'distance' : ''}>
                    <td>{`卖${this.state.liveSellArray.length - index}`}</td>
                    <td>{v.price}</td>
                    <td>{v.currDepth}</td>
                    <td>{v.turnover}</td>
                  </tr>
              )
            })}
            </tbody>

          <tbody className='live-deal'>
            <tr><td colSpan='4'>最新成交价</td></tr>
          </tbody>
            <tbody>
            {this.state.titleSelect !== 'sell' && this.state.liveBuyArray.map((v,index) => {
              return(
                  <tr key={index} className={index === 0 ? 'distance-b' : ''}>
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