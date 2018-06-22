import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";
import '../stylus/tradeOrder.styl'


const historyOrderHead = [
  {name: '时间'},{name: '类型'},{name: '价格'},{name: '数量'},{name: '已成交'},{name: '成交额'},{name: '成交均价'},{name: '状态'}
];
const orderStatus = {
  0: '已成交',
  1: '部分成交',
  2: '未成交',
  3: '已撤销'
};
export default class HistoryOrder extends ExchangeViewBase{
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
            <h3>历史订单</h3>
          </div>
          <table className='trade-current-table'>
            <thead>
            <tr>
              {historyOrderHead.map((v, index) => {
                return(
                    <td key={index}>
                      {v.name}
                    </td>
                )
              })}
            </tr>
            </thead>
            <tbody>
            {this.state.historyOrder.map((v, index) => {
              return(
                  <tr key={index}>
                    <td>{v.orderTime}</td>
                    <td style={{color: `${v.orderType ? '#D84747' : '#129FCC'}`}}>{v.orderType ? '卖出' : '买入'}</td>
                    {/*todo 颜色改类名统一处理*/}
                    <td>{v.priceType ? '市价' : v.price}</td>
                    <td>{v.count}</td>
                    <td>{v.dealDoneCount}</td>
                    <td>{v.turnover}</td>
                    <td>{v.avgPrice}</td>
                    <td>{orderStatus[v.orderStatus]}</td>
                  </tr>
              )
            })}
            </tbody>
          </table>
        
        </div>
    )
  }
}