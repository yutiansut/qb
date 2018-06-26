import ExchangeViewBase from '../../ExchangeViewBase'
import React, {Component} from "react";
import '../stylus/tradeMarket.styl'

let marketTableHead = [
  {name: '交易盘', sortValue: ''},
  {name: '价格', sortValue: ['price'], type: 1, sortDefault: 'rise'},
  {name: '涨跌幅', sortValue: ['rise'], type: 1, sortDefault: 'rise'},
];

export default class TradeMarket extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: false,
      searchValue: '',
      sortIndex: -1,
      tradeSortImg: '/static/img/trade_rank.svg'
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.marketDataHandle = controller.marketDataHandle.bind(controller);
    this.changeMarket = controller.changeMarket.bind(controller);
    this.pairSort = controller.pairSort.bind(controller);
    this.setDealMsg = controller.setDealMsg.bind(controller);
    this.tradePairChange = controller.tradePairChange.bind(controller)
    this.filte = controller.filte.bind(controller) // 筛选
  }

  componentDidMount() {
    this.marketDataHandle();
  }

  componentWillMount() {

  }

  pairChange(v) {
    this.tradePairChange(v.trade_pair)
  }
  onInputValue(e) { // 获取输入框的值
    this.setState({
      searchValue: e.target.value
    })
  }
  onEnter(e) {
    if (e.nativeEvent.keyCode !== 13) return;
    this.setState({
      searchInput: false
    })
  }

  render() {
    return (
      <div className='trade-market'>
        <div className='trade-market-list'>
          <ul>
            <li>收藏</li>
            {this.state.marketDataHandle.map((v, index) => {
              return (
                <li
                  className={`trade-market-item${this.state.market.toUpperCase() === v.toUpperCase() ? '-active' : ''}`}
                  key={index} onClick={this.changeMarket.bind(this, v)}>
                  {v.toUpperCase()}
                </li>
              )
            })}
          </ul>
          <div>
            <img src="/static/img/search_bai.svg" alt="" className={this.state.searchInput ? 'hide' : ''} onClick={() => {this.setState({searchInput: true, searchValue: ''})}}/>
            <p className={this.state.searchInput ? '' : 'hide'}>
              <input type="text"
                     onChange={this.onInputValue.bind(this)}
                     onKeyDown={this.onEnter.bind(this)}
              />
              <img src="/static/img/guanbi_bai.svg" alt="" onClick={() => {this.setState({searchInput: false, searchValue: ''})}}/>
            </p>
          </div>
        </div>

        <table className='trade-market-table'>
          <thead>
            <tr>
              {marketTableHead.map((v, index) => {
                return (<td onClick={this.pairSort.bind(this, v, index)} key={index} className={`${v.sortValue ? 'sort-img-td' : ''}`}>
                  {v.name}
                  <img src={this.state.sortIndex === index ? this.state.tradeSortImg : "/static/img/trade_rank.svg"} alt=""
                       className={`${v.sortValue ? '' : 'hide'}`}/>
                </td>)
              })}
            </tr>
          </thead>
          <tbody>
          {this.filte(this.state.homeMarketPairData, this.state.searchValue).map((v, index) => {
            return (
              <tr key={index} className={`pair-items${this.state.tradePair === v.trade_pair ? '-active' : ''}`}
                  onClick={this.pairChange.bind(this, v)}>
                <td>{v.trade_pair}</td>
                <td>{v.price}</td>
                <td>{v.rise}</td>
                <td><img src={v.isFavorite ? "/static/img/trade_star_select.svg" :  "/static/img/trade_star.svg"} alt=""/></td>
              </tr>
            )
          })}
          </tbody>

        </table>
      </div>
    )
  }
}