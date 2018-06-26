import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";
import '../stylus/tradeMarket.styl'
let marketTableHead = [
  {name: '交易盘', sortValue: ''},
  {name: '价格', sortValue:['price'],type:0,sortDefault:'rise' },
  {name: '涨跌幅', sortValue:['rise'],type:1,sortDefault:'rise' },
];

export default class TradeMarket extends ExchangeViewBase{
  constructor(props){
    super(props);
    this.state = {
    
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.marketDataHandle = controller.marketDataHandle.bind(controller);
    this.changeMarket = controller.changeMarket.bind(controller);
    this.pairSort = controller.pairSort.bind(controller);
    this.setDealMsg = controller.setDealMsg.bind(controller);
    this.tradePairChange = controller.tradePairChange.bind(controller)
  }
  componentDidMount(){
    this.marketDataHandle();
  }
  componentWillMount(){
  
  }
  pairChange(v) {
    this.tradePairChange(v.trade_pair)
  }
  render(){
    return(
        <div className='trade-market'>
          <div className='trade-market-list'>
            {this.state.marketDataHandle.map((v, index) => {return(
                <div className={`trade-market-item${this.state.market.toUpperCase() === v.toUpperCase() ? '-active': ''}`} key={index} onClick={this.changeMarket.bind(this,v)}>
                  {v.toUpperCase()}
                </div>
            )})}
          </div>
          <table className='trade-market-table'>
            <thead>
            <tr>
              {marketTableHead.map((v, index) => {
                return(<td onClick={this.pairSort.bind(this,v)} key={index}>{v.name}</td>)
              })}
            </tr>
            </thead>
            <tbody>
            {this.state.homeMarketPairData.map((v, index) => {
              return(
                  <tr key={index}  className={`pair-items${this.state.tradePair === v.trade_pair ? '-active' : ''}`} onClick={this.pairChange.bind(this, v)} >
                    <td>{v.trade_pair}</td>
                    <td>{v.price}</td>
                    <td>{v.rise}</td>
                  </tr>
              )
            })}
            </tbody>
  
          </table>
        </div>
    )
  }
}