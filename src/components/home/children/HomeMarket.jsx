import ExchangeViewBase from '../../ExchangeViewBase'
import React, {Component} from "react";
import {NavLink} from 'react-router-dom'
import Input from '../../../common/component/Input/index.jsx'
import ReactTrend from './ReactTread'


export default class HomeMarket extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.name = 'homeMarket'
    this.state = {
      searchValue: '',
      sortIndex: 0,
      sortImg: this.$imagesMap.$rank_normal,
      searchRealt: [],
      collectActive: false, // 控制收藏区的active
      // collectImg: "/static/img/star_select.svg",
      // collectType: 0
      marketTableHead: [
        {name: `${this.intl.get('market-markets')}`, sortValue: ''},
        {name: `${this.intl.get('market-lastPrice')}`, sortValue: ['price'], type: 1, sortDefault: 'turnover'},
        {name: `${this.intl.get('total')}`, sortValue: ['turnover'], type: 1, sortDefault: 'turnover'},
        {name: `${this.intl.get('volume')}`, sortValue: ['volume'], type: 1, sortDefault: 'turnover'},
        {name: `${this.intl.get('market-change')}`, sortValue: ['rise'], type: 1, sortDefault: 'turnover'},
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
    this.joinHome = controller.joinHome.bind(controller) // 加入房间
    this.clearRoom = controller.clearRoom.bind(controller) //推出房间
    this.clearHistory = controller.clearHistory.bind(controller) //推出房间
  }

  componentDidMount() {
    //注册http数据
    this.marketDataHandle();
    //清除websocket历史
    this.clearHistory()
    //进入home
    this.joinHome();
  }

  componentWillUnmount() {
    this.clearRoom()
  }

  render() {
    const {controller} = this.props;
    // console.log(1234,this.state,this.state.recommendDataHandle)
    return (
      <div className='home-market inner'>
        <div className='home-market-con'>
        <div className="market-nav clearfix">
          <ul className="clearfix">
            {controller.token && <li onClick={this.collectMarket}>
              <span
                className={`${this.state.collectActive ? 'home-market-item-active' : ''}`}>{this.intl.get('market-favorites')}</span>
            </li> || null}
            {this.state.marketDataHandle.map((v, index) => {
              return (
                <li key={index} onClick={this.changeMarket.bind(this, v)}>
                  <span
                    className={`home-market-item${this.state.market.toUpperCase() === v.toUpperCase() ? '-active' : ''}`}>{v.toUpperCase()}</span>
                </li>
              )
            })}
          </ul>
          <div className="search_wrap clearfix">
            <Input
              // type="search1"
              onEnter={() => {
                this.filte(this.state.homeMarketPairData, this.state.searchValue)
              }}
              value={this.state.searchValue}
              onInput={value => {
                (/^[a-zA-Z]*$/).test(value) && this.setState({searchValue: value})
              }}/>
            <img src="/static/img/home/home_search_btn.svg" alt=""/>
          </div>
          
        </div>

        <table>
          <thead align="left">
          <tr>
            {controller.token && <th>{this.intl.get('market-favorite')}</th> || null}
            {this.state.marketTableHead.map((v, index) => {
              return (<th onClick={this.pairSort.bind(this, v, index)} key={index}
                          className={`${v.sortValue ? 'sort-img-li' : ''}`}>
                {v.name}
                <img src={this.state.sortIndex === index ? this.state.sortImg : this.$imagesMap.$rank_normal} alt=""
                     className={`${v.sortValue ? '' : 'hide'}`}/>
              </th>)
            })}
            <th>{this.intl.get('market-change7D')}</th>
          </tr>
          </thead>
          <tbody>
          {this.filte(this.state.homeMarketPairData, this.state.searchValue).map((v, index) => {
            // console.log('this.filte(this.state.homeMarketPairData, this.state.searchValue)',v)
            return (
              <tr key={index}>
                {/*<td onClick={value => this.addCollect(v, index)}><img src={this.state.collectIndex === index ? this.state.collectImg :  "/static/img/star_select.svg"} alt=""/></td>*/}
                {controller.token && <td>
                  <img src={`${v.isFavorite ? this.$imagesMap.$home_star_sel : this.$imagesMap.$home_star_nor}`} onClick={e => this.addCollect(v, index, e)}/>
                </td> || null}
                <td><NavLink
                  to={{
                    pathname: `/trade`,
                    query: {pairName: v.tradePairName}
                  }}
                >{v.tradePairName.toUpperCase()}</NavLink></td>
                <td><span
                  className={`${v.updown && (v.updown > 0 && "market-up" || "market-down")}`}>{Number(v.price).format({number: 'digital'}) || 0}</span>/<span className="second-span">
                  {controller.language === 'zh-CN' && Number(v.priceCN || 0).format({
                    number: 'legal',
                    style: {name: 'cny'}
                  }) || Number(v.priceEN || 0).format({number: 'legal', style: {name: 'usd'}})}</span></td>
                <td>{Number(v.turnover).format({number: 'property'}) || 0}</td>
                <td>{Number(v.volume) && Number(v.volume).formatFixNumberForAmount(v.priceCN) || 0}</td>
                <td >
                  <span className={`market-updown ${v.rise < 0 ? 'down-after' : 'up-after'}`}>{Number(v.rise).toPercent()}</span>
                </td>
                <td>
                  {/* 宽高等样式在homeMakt.styl里设置 */}
                  <ReactTrend ratio={5} trends={v.points || []}/>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}