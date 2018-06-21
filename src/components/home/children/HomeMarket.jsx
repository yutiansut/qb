import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";
import '../stylus/homeMarkt.styl'
let marketTableHead = [
  {name: '交易盘', sortValue: ''},
  {name: '价格', sortValue:['price'],type:0,sortDefault:'turnover' },
  {name: '成交额', sortValue:['turnover'],type:0,sortDefault:'turnover' },
  {name: '成交量', sortValue:['volume'],type:1,sortDefault:'turnover' },
  {name: '涨跌幅', sortValue:['rise'],type:1,sortDefault:'turnover' },
];
export default class HomeMarket extends ExchangeViewBase{
  constructor(props){
    super(props);
    this.state = {
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    console.log(this.state)
    //绑定方法
    this.marketDataHandle = controller.marketDataHandle.bind(controller);
    this.changeMarket = controller.changeMarket.bind(controller)
    // this.getData = controller.getData.bind(controller)
    this.pairSort = controller.pairSort.bind(controller)
  }
  componentDidMount(){
    this.marketDataHandle();
  }
  render(){
    console.log(1234,this.state,this.state.recommendDataHandle)
    return(
        <div className='home-market'>
          {this.state.marketDataHandle.map((v, index) => {return(
              <div className={`home-market-item${this.state.market === v.toUpperCase() ? '-active': ''}`} key={index} onClick={this.changeMarket.bind(this,v)}>
                {v.toUpperCase()}
              </div>
          )})}
          <table style={{width:'10rem'}} >
            <thead align="left">
            {marketTableHead.map((v, index) => {
              return(<tr onClick={this.pairSort.bind(this,v)} key={index}><td>{v.name}</td></tr>)
            })}
            </thead>
            <tbody>
            {this.state.homeMarketPairData.map((v, index) => {
              return(
                  <tr key={index}>
                    <td>{v.trade_pair}</td>
                    <td>{v.price}</td>
                    <td>{v.turnover}</td>
                    <td>{v.volume}</td>
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