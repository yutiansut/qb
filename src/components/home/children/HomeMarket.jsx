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
      newMarketPair: [],
      mainMarketPair: [],
      // collectImg: "/static/img/star_select.svg",
      // collectType: 0
      // marketTableHead: [
      //   {name: `${this.intl.get('market-markets')}`, sortValue: ''},
      //   {name: `${this.intl.get('market-lastPrice')}`, sortValue: ['price'], type: 1, sortDefault: 'turnover'},
      //   {name: `${this.intl.get('total')}`, sortValue: ['turnover'], type: 1, sortDefault: 'turnover'},
      //   {name: `${this.intl.get('volume')}`, sortValue: ['volume'], type: 1, sortDefault: 'turnover'},
      //   {name: `${this.intl.get('market-change')}`, sortValue: ['rise'], type: 1, sortDefault: 'turnover'},
      // ],
      marketTableHead: [
        {name: `${this.intl.get('market-markets')}`, sortValue: '', class: 'left-th'},
        {name: `${this.intl.get('market-lastPrice')}`, sortValue: ['price'], type: 1, sortDefault: 'turnover', class: 'left-th'},
        {name: `24H${this.intl.get('market-change')}`, sortValue: ['rise'], type: 1, sortDefault: 'turnover', class: 'right-th'},
        {name: `24H${this.intl.get('market-priceHighest')}`, sortValue: ['highestPrice'], type: 1, sortDefault: 'turnover', class: 'right-th'},
        {name: `24H${this.intl.get('market-priceLowest')}`, sortValue: ['lowestPrice'], type: 1, sortDefault: 'turnover', class: 'right-th'},
        {name: `24H${this.intl.get('total')}`, sortValue: ['turnover'], type: 1, sortDefault: 'turnover', class: 'right-th'},

        // {name: `${this.intl.get('total')}`, sortValue: ['turnover'], type: 1, sortDefault: 'turnover'},
        // {name: `${this.intl.get('volume')}`, sortValue: ['volume'], type: 1, sortDefault: 'turnover'},
        // {name: `${this.intl.get('market-change')}`, sortValue: ['rise'], type: 1, sortDefault: 'turnover'},
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
    this.marketContent = this.marketContent.bind(this)
  }

  marketContent(v, index) { // 市场内容
    return (
      <tr key={index} className="table-data">
        {/*<td onClick={value => this.addCollect(v, index)}><img src={this.state.collectIndex === index ? this.state.collectImg :  "/static/img/star_select.svg"} alt=""/></td>*/}
        {this.props.controller.token && <td className="left-td">
          <img src={`${v.isFavorite ? this.$imagesMap.$home_star_sel : this.$imagesMap.$home_star_nor}`} onClick={e => this.addCollect(v, index, e)}/>
        </td> || null}
        <td className="left-td"><NavLink to={{pathname: `/trade`, query: {pairName: v.tradePairName}}}>{v.tradePairName.toUpperCase()}</NavLink></td>
        <td className="left-td">
          <NavLink to={{pathname: `/trade`, query: {pairName: v.tradePairName}}}>
            <span className={`${v.updown && (v.updown > 0 && "market-up" || "market-down")}`}>{Number(v.price).format({number: 'digital'}) || 0}</span>/
            <span className="second-span">{this.props.controller.language === 'zh-CN' && Number(Number(v.priceCN).multi(v.price) || 0).format({number: 'legal', style: {name: 'cny'}}) || Number(Number(v.priceEN).multi(v.price) || 0).format({number: 'legal', style: {name: 'usd'}})}</span>
          </NavLink>
        </td>
        <td>
          <NavLink to={{pathname: `/trade`, query: {pairName: v.tradePairName}}}>
            <span className={`market-updown ${v.rise < 0 ? 'down-after' : 'up-after'}`}>{Number(v.rise).toPercent()}</span>
          </NavLink>
        </td>
        <td><NavLink to={{pathname: `/trade`, query: {pairName: v.tradePairName}}}>{Number(v.highestPrice) && Number(v.highestPrice).format() || '--'}</NavLink></td>
        <td><NavLink to={{pathname: `/trade`, query: {pairName: v.tradePairName}}}>{Number(v.lowestPrice) && Number(v.lowestPrice).format() || '--'}</NavLink></td>
        <td><NavLink to={{thname: `/trade`, query: {pairName: v.tradePairName}}}>{Number(v.turnover).formatTurnover() || '--'}</NavLink></td>
        {/*<td>*/}
          {/*<NavLink to={{pathname: `/trade`, query: {pairName: v.tradePairName}}}>*/}
            {/*/!* 宽高等样式在homeMakt.styl里设置 *!/*/}
            {/*<ReactTrend ratio={5} trends={v.points || []}/></NavLink>*/}
        {/*</td>*/}
      </tr>
    )
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
    let newMarketPairLength = this.filte(this.state.newMarketPair, this.state.searchValue).length,
        mainMarketPairLength = this.filte(this.state.mainMarketPair, this.state.searchValue).length
    return (
      <div className='home-market'>
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
              )})}
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
              <img src={this.$imagesMap.$home_marketBtn} alt=""/>
            </div>
          </div>
          <table>
            <thead>
            <tr>
              {controller.token && <th className="left-th">{this.intl.get('market-favorite')}</th> || null}
              {this.state.marketTableHead.map((v, index) => {
                return (<th onClick={this.pairSort.bind(this, v, index)} key={index}
                            className={`${v.sortValue ? 'sort-img-li' : ''} ${v.class}`}>
                  {v.name}
                  <img src={this.state.sortIndex === index ? this.state.sortImg : this.$imagesMap.$rank_normal} alt=""
                       className={`${v.sortValue ? '' : 'hide'}`}/>
                </th>)
              })}
              {/*<th>{this.intl.get('market-change7D')}</th>*/}
            </tr>
            </thead>
            {((newMarketPairLength && mainMarketPairLength) || (!newMarketPairLength && !mainMarketPairLength) || mainMarketPairLength) && <tbody className="main-tbody">
              <tr className="zone-name">
                <td colSpan={controller.token ? 7 : 6}><p>{this.intl.get('market-main')}</p></td>
              </tr>
              {mainMarketPairLength ? this.filte(this.state.mainMarketPair, this.state.searchValue).map((v, index) =>
                 this.marketContent(v, index)
              ) : <tr className="nothing-market-pair" ><td colSpan={controller.token ? 7 : 6}>{this.intl.get('noDate')}</td></tr>}
            </tbody> || null}

            {((newMarketPairLength && mainMarketPairLength) || (!newMarketPairLength && !mainMarketPairLength) || newMarketPairLength) && <tbody>
              <tr className={`zone-name ${mainMarketPairLength ? 'new-zone-name' : ''}`}>
                <td colSpan={controller.token ? 7 : 6}><p>{this.intl.get('market-new')}</p></td>
              </tr>
              {newMarketPairLength ? this.filte(this.state.newMarketPair, this.state.searchValue).map((v, index) =>
                this.marketContent(v, index)
              ) : <tr className="nothing-market-pair" ><td colSpan={controller.token ? 7 : 6}>{this.intl.get('noDate')}</td></tr>}
            </tbody> || null}
          </table>
        </div>
      </div>
    )
  }
}