import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";

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
      marketTableHead: [
        {name: `${this.intl.get('market-markets')}`, sortValue: ''},
        {name: `${this.intl.get('market-lastPrice')}`, sortValue:['price'],type:1,sortDefault:'turnover'},
        {name: `${this.intl.get('total')}`, sortValue:['turnover'],type:1,sortDefault:'turnover'},
        {name: `${this.intl.get('volume')}`, sortValue:['volume'],type:1,sortDefault:'turnover'},
        {name: `${this.intl.get('market-change')}`, sortValue:['rise'],type:1,sortDefault:'turnover'},
      ]
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    // console.log(this.state)
    //绑定方法
    this.marketDataHandle = controller.marketDataHandle.bind(controller);
    this.changeMarket = controller.changeMarket.bind(controller) // 点击其他市场
    this.collectMarket = controller.collectMarket.bind(controller) // 点击收藏
    // this.getData = controller.getData.bind(controller)
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

  /*
<tr key={index}>

{controller.token && <td onClick={value => this.addCollect(v, index)}><img src={v.isFavorite ? "/static/img/star_select.svg" :  "/static/img/star.svg"} alt=""/></td> || null}
<td>{v.tradePairName.toUpperCase()}</td>
<td><span className={`${v.updown && (v.updown>0 && "market-up" || "market-down")}`}>{Number(v.price).format({number:'digital'}) || 0}</span>/<span>
{controller.language === 'zh-CN' && Number(v.priceCN || 0).format({number:'legal',style:{name:'cny'}}) || Number(v.priceEN || 0).format({number:'legal',style:{name:'usd'}})}</span></td>
<td>{Number(v.turnover).format({number:'property'}) || 0}</td>
<td>{Number(v.volume) && Number(v.volume).formatFixNumberForAmount(v.price_to_cny) || 0}</td>
<td className={`home-updown ${v.rise < 0 ? 'down-i' : 'up-i'}`}>{Number(v.rise).toPercent()}</td>
<td>

</td>
</tr>
*/

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
              <th>市场</th>
              <th>最新价</th>
              <th>24h涨跌</th>
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