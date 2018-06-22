import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";
import Input from '../../../common/component/Input/index.jsx'

let marketTableHead = [
  {name: '交易盘', sortValue: ''},
  {name: '价格', sortValue:['price'],type:1,sortDefault:'turnover', clickFlag: false },
  {name: '成交额', sortValue:['turnover'],type:1,sortDefault:'turnover',clickFlag: false },
  {name: '成交量', sortValue:['volume'],type:1,sortDefault:'turnover',clickFlag: false },
  {name: '涨跌幅', sortValue:['rise'],type:1,sortDefault:'turnover',clickFlag: false },
];
let sortImg =  ["/static/images/rank_down.svg", "/static/images/rank_up.svg", "/static/images/rank_normal.svg"]

export default class HomeMarket extends ExchangeViewBase{
  constructor(props){
    super(props);
    this.state = {
      searchValue: '',
      sortImg: ["/static/images/rank_down.svg", "/static/images/rank_up.svg", "/static/images/rank_normal.svg"]
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
      <div className='home-market inner'>

        <div className="market-nav clearfix">
          <ul className="clearfix">
            <li>收藏区</li>
            {this.state.marketDataHandle.map((v, index) => {return(
              <li key={index} onClick={this.changeMarket.bind(this,v)}>
                <span className={`home-market-item${this.state.market === v.toUpperCase() ? '-active': ''}`}>{v.toUpperCase()}市场</span>
              </li>
            )})}
          </ul>
          <Input
            type="search1"
            value={this.state.searchValue}
            onInput={value => {this.setState({searchValue: value })}} />
        </div>

        <table>
          <thead align="left">
            <tr>
              <th>收藏</th>
              {marketTableHead.map((v, index) => {
                return(<th onClick={this.pairSort.bind(this,v)} key={index} className={`${v.sortValue ? 'sort-img-li' : ''}`}>
                  {v.name}
                  <img src={`${v.clickFlag ? (v.type === 0 ? this.state.sortImg[0] : this.state.sortImg[1]) : this.state.sortImg[2]}`} alt="" className={`${v.sortValue ? '' : 'hide'}`}/>
                </th>)
              })}
            </tr>
          </thead>
          <tbody>
          {this.state.homeMarketPairData.map((v, index) => {
            return(
              <tr key={index}>
                <td>1111</td>
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