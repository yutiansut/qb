import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";

export default class HomeMarket extends ExchangeViewBase{
  constructor(props){
    super(props);
    this.state = {};
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    //绑定方法
    this.marketDataHandle = controller.marketDataHandle.bind(controller);
    this.changeMarket = controller.changeMarket.bind(controller) // 点击其他市场
    this.collectMarket = controller.collectMarket.bind(controller) // 点击收藏
    this.pairSort = controller.pairSort.bind(controller) // 排序
    this.filte = controller.filte.bind(controller) // 筛选
    this.addCollect = controller.addCollect.bind(controller) // 添加收藏
    this.joinHome = controller.joinHome.bind(controller) // 添加收藏
  }
  componentDidMount(){
    //注册http数据
    this.marketDataHandle();
    //进入home
    this.joinHome();
  }

  render(){
    const {controller} = this.props;
      console.log(this.state.homeMarketPairData);
    return(
      <div className='home-market'>
        <div className="market-nav clearfix">
          <ul className="clearfix">
            {controller.token && <li onClick={this.collectMarket}>
              <span className={`${this.state.collectActive ? 'home-market-item-active' : ''}`}>{this.intl.get('market-favorites')}</span>
            </li> || null}
            {this.state.marketDataHandle.map((v, index) => {return(
              <li key={index} onClick={this.changeMarket.bind(this,v)}>
                <span className={`home-market-item${this.state.market.toUpperCase() === v.toUpperCase() ? '-active': ''}`}>{v.toUpperCase()} {this.intl.get('market-market')}</span>
              </li>
            )})}
          </ul>
        </div>
        <table>
          <thead align="left">
            <tr>
              <th style={{width:"40%"}}>市场</th>
              <th>最新价</th>
              <th style={{width:"20%"}}>24h涨跌</th>
            </tr>
          </thead>
          <tbody>
          {this.state.homeMarketPairData.map((v, index) => {
            return(
              <tr key={index}>
                <td>
                  <h3>{v.coinName.toUpperCase()}<small>/{v.marketName.toUpperCase()}</small></h3>
                  <span>24h量 {Number(v.volume) && Number(v.volume).formatFixNumberForAmount(v.price_to_cny) || 0}</span>
                </td>
                <td>
                  <b className={v.rise<0 ? 'down':'up'}>{Number(v.price).format({number:'digital'}) || 0}</b>
                  <span>{controller.language === 'zh-CN' ?
                      Number(v.priceCN || 0).format({number:'legal',style:{name:'cny'}}) :
                      Number(v.priceEN || 0).format({number:'legal',style:{name:'usd'}})}</span>
                </td>
                <td>
                  <a>{Number(v.rise).toPercent()}</a>
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