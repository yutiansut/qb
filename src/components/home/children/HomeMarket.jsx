import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";
import Input from '../../../common/component/Input/index.jsx'
import ReactTrend from './ReactTread'

let marketTableHead = [
  {name: '交易盘', sortValue: ''},
  {name: '价格', sortValue:['price'],type:1,sortDefault:'turnover'},
  {name: '成交额', sortValue:['turnover'],type:1,sortDefault:'turnover'},
  {name: '成交量', sortValue:['volume'],type:1,sortDefault:'turnover'},
  {name: '涨跌幅', sortValue:['rise'],type:1,sortDefault:'turnover'},
];
let sortImg =  ["/static/images/rank_down.svg", "/static/images/rank_up.svg", "/static/images/rank_normal.svg"]

export default class HomeMarket extends ExchangeViewBase{
  constructor(props){
    super(props);
    this.state = {
      searchValue: '',
      sortIndex: 0,
      sortImg: "/static/images/rank_normal.svg",
      searchRealt: [],
      collectActive: false, // 控制收藏区的active
      // collectImg: "/static/img/star.svg",
      // collectType: 0
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    console.log(this.state)
    //绑定方法
    this.marketDataHandle = controller.marketDataHandle.bind(controller);
    this.changeMarket = controller.changeMarket.bind(controller) // 点击其他市场
    this.collectMarket = controller.collectMarket.bind(controller) // 点击收藏
    // this.getData = controller.getData.bind(controller)
    this.pairSort = controller.pairSort.bind(controller) // 排序
    this.filte = controller.filte.bind(controller) // 筛选
    this.addCollect = controller.addCollect.bind(controller) // 添加收藏
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
            <li onClick={this.collectMarket}>
              <span className={`${this.state.collectActive ? 'home-market-item-active' : ''}`}>收藏区</span>
            </li>
            {this.state.marketDataHandle.map((v, index) => {return(
              <li key={index} onClick={this.changeMarket.bind(this,v)}>
                <span className={`home-market-item${this.state.market === v.toUpperCase() ? '-active': ''}`}>{v.toUpperCase()}市场</span>
              </li>
            )})}
          </ul>
          <Input
            type="search1"
            onEnter={() => {this.filte(this.state.homeMarketPairData, this.state.searchValue)}}
            value={this.state.searchValue}
            onInput={value => {this.setState({searchValue: value })}} />
        </div>

        <table>
          <thead align="left">
            <tr>
              <th>收藏</th>
              {marketTableHead.map((v, index) => {
                return(<th onClick={this.pairSort.bind(this,v,index)} key={index} className={`${v.sortValue ? 'sort-img-li' : ''}`}>
                  {v.name}
                  <img src={this.state.sortIndex === index ? this.state.sortImg : "/static/images/rank_normal.svg"} alt="" className={`${v.sortValue ? '' : 'hide'}`}/>
                </th>)
              })}
              <th>7日涨跌幅</th>
            </tr>
          </thead>
          <tbody>
          {this.filte(this.state.homeMarketPairData, this.state.searchValue).map((v, index) => {
            return(
              <tr key={index}>
                {/*<td onClick={value => this.addCollect(v, index)}><img src={this.state.collectIndex === index ? this.state.collectImg :  "/static/img/star.svg"} alt=""/></td>*/}
                <td onClick={value => this.addCollect(v, index)}><img src={v.isFavorite ? "/static/img/star_select.svg" :  "/static/img/star.svg"} alt=""/></td>
                <td>{v.trade_pair}</td>
                <td>{v.price}</td>
                <td>{v.turnover}</td>
                <td>{v.volume}</td>
                <td>{v.rise}</td>
                <td>
                    {/* 宽高等样式在homeMakt.styl里设置 */}
                    <ReactTrend ratio={5} trends={[43,24,18,32,22,45,37]}/>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>

      </div>
    )
  }
}