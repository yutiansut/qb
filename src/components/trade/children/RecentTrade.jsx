import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";
import '../stylus/tradeRecent.styl'

const recentItem = [{name:'市场', user: false}, {name:'我的', user: true}];
const recentTableHead = [
  {name: '时间', sortValue: ''},
  {name: '价格', sortValue:['price'],type:0,sortDefault:'price' },
  {name: '数量', sortValue:['volume'],type:1,sortDefault:'price' },]
export default class extends ExchangeViewBase{
  constructor(props) {
    super(props);
    this.state = {
    
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
  }
  componentDidMount(){
  
  }
  componentWillMount(){
  
  }
  render(){
    return(
        <div>
          <div className='trade-recent-title'>
            <h3>近期交易</h3>
            {recentItem.map((v, index) => {
              return(
                  <div className='recent-item' key={index}>
                    {v.name}
                  </div>
              )
            })}
          </div>
          <table className='trade-recent-table'>
            <thead>
            <tr>
              {recentTableHead.map((v, index) => {
                return(
                    <td key={index}>{v.name}</td>
                )
              })}
            </tr>
            </thead>
            <tbody>
            {this.state.recentTradeList.map((v, index) => {
              return(
                  <tr key={index}>
                    <td>{v.dealTime}</td>
                    <td>{v.price}</td>
                    <td>{v.volume}</td>
                  </tr>
              )
            })}
            </tbody>
          </table>
        </div>
    )
  }
}