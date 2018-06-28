import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";
import '../stylus/tradeOrder.styl'

const resetHandleItems = [
    {name:'撤销买入', opType:1},{name:'撤销卖出', opType:2},{name:'撤销全部', opType:3},
];
const currentOrderHead = [
  {name: '时间'},{name: '类型'},{name: '价格',unit: 'price'},{name: '数量',unit: 'number'},{name: '交易额',unit: 'price'},{name: '已成交'},{name: '尚未成交'},{name: '状态'},{name: '操作'},
];
const orderStatus = {
  0: '已成交',
  1: '部分成交',
  2: '未成交',
  3: '已撤销'
};
export default class CurrentOrder extends ExchangeViewBase{
  constructor(props){
    super(props);
    this.state = {
    
    };
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
  render(){
    return(
        <div className='trade-current-order'>
          <div className='trade-current-title'>
            <h3>当前订单</h3>
            {resetHandleItems.map((v, index) => {
              return(
                  <div className='reset-handle' key={index}>{v.name}</div>
              )
            })}
          </div>
          <table className='trade-current-table'>
            <thead>
            <tr>
              {currentOrderHead.map((v, index) => {
                return(
                    <td key={index}>
                      {v.unit && (`${v.name}(${v.unit === 'price' && (this.state.unitsType || this.state.market) || this.state.coin})`) || v.name}
                    </td>
                )
              })}
            </tr>
            </thead>
            <tbody>
            {this.state.currentOrder.map((v, index) => {
              return(
                  <tr key={index}>
                    <td>{v.orderTime}</td>
                    <td style={{color: `${v.orderType ? '#D84747' : '#129FCC'}`}}>{v.orderType ? '卖出' : '买入'}</td>
                    {/*todo 颜色改类名统一处理*/}
                    <td>{this.state.unitsType === 'CNY' && v.priceCN || (this.state.unitsType === 'USD' && v.priceEN || v.price) }</td>
                    <td>{v.count}</td>
                    <td>{this.state.unitsType === 'CNY' && v.turnoverCN || (this.state.unitsType === 'USD' && v.turnoverEN || v.turnover) }</td>
                    <td>{v.dealDoneCount}</td>
                    <td>{v.undealCount}</td>
                    <td>{orderStatus[v.orderStatus]}</td>
                    <td>撤销</td>
                  </tr>
              )
            })}
            </tbody>
          </table>
         
        </div>
    )
  }
}