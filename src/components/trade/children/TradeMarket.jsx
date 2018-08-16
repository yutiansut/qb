import ExchangeViewBase from '../../ExchangeViewBase'
import React, {Component} from "react";

export default class TradeMarket extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.name = 'tradeMarket'
    this.state = {
      query:'',
      searchInput: false,
      searchValue: '',
      mainMarketPair: [], // 主流区数据
      newMarketPair: [],  // 创新区数据
      sortIndex: -1,
      tradeSortImg: this.$imagesMap.$trade_rank,
      collectActive: false, // 控制收藏区的active
      marketTableHead : [
        {name: `${this.intl.get('market-markets')}`, sortValue: ''},
        {name: `${this.intl.get('market-lastPrice')}`, sortValue: ['price'], type: 1, sortDefault: 'rise'},
        {name: `${this.intl.get('market-change')}`, sortValue: ['rise'], type: 1, sortDefault: 'rise'},
      ]
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
    // this.tradePairSelect = controller.tradePairSelect.bind(controller);
    this.addCollect = controller.addCollect.bind(controller) // 添加收藏
    this.collectMarket = controller.collectMarket.bind(controller) // 点击收藏
    this.joinHome = controller.joinHome.bind(controller) // 加入房间
    this.clearRoom = controller.clearRoom.bind(controller) //推出房间
    this.clearHistory = controller.clearHistory.bind(controller) //推出房间
    this.marketContent = this.marketContent.bind(this)
    // this.getBank = controller.getBank.bind(controller) //获取汇率
  }

  componentDidMount() {
    this.marketDataHandle();
    if(this.props.location.query){
      this.setState({query:this.props.location.query.pairName})
      // this.props.controller.querySelectPair(this.props.location.query.pairName)
    }
    //清除websocket历史
    this.clearHistory()
    this.joinHome();
    // this.getBank()
    
  }
  
  componentWillUnmount() {
    this.clearRoom()
  }

  marketContent(v, index) { // 市场内容
    return (
      <tr key={index} className={`pair-items${this.state.tradePair === v.tradePairName ? '-active' : ''} pop-parent`}
          onClick={this.pairChange.bind(this, v)} style={{cursor: 'pointer'}}>
        <td>{v.tradePairName.toUpperCase()}</td>
        <td className={`${v.updown && (v.updown > 0 && "market-up" || "market-down")}`}>{this.state.unitsType === 'CNY' && Number(v.priceCNY).format({number:'legal',style:{name:'cny'}}) || (this.state.unitsType === 'USD' && Number(v.priceUSD).format({number:'legal',style:{name:'usd'}}) || Number(v.price).format({number:'digital'})) || 0 }</td>
        <td className={`${v.rise < 0 ? 'down-td' : 'up-td'}`}>{Number(v.rise).toPercent()}</td>
        {this.props.controller.token && (<td onClick={e => this.addCollect(v, index, e)} className="img-td">
          <img src={v.isFavorite ? this.$imagesMap.$trade_star :  this.$imagesMap.$trade_star_select} alt=""/>
        </td>) || null}
        <td className="pop-children rightpop-children trade-remind">{`${this.intl.get('market-trade-volume')}`}：{Number(v.volume) && Number(v.volume).formatFixNumberForAmount(v.priceCN) || 0}</td>
      </tr>
    )
  }

  pairChange(v, e) {
    e.preventDefault();
    this.tradePairChange(v)
  }
  onInputValue(e) { // 获取输入框的值
    this.setState({
      searchValue: e.target.value
    })
  }
  onEnter(e) { // 搜索回车选中事件
    if (e.nativeEvent.keyCode !== 13) return;
    let resultLength = this.filte(this.state.mainMarketPair, this.state.searchValue).length
    let result = resultLength ? this.filte(this.state.mainMarketPair, this.state.searchValue) : this.filte(this.state.newMarketPair, this.state.searchValue)
    this.setState({
      searchInput: false,
      searchValue: ''
    })
    this.pairChange(result[0], e)
  }

  render() {
    const {controller} = this.props;
    let newMarketPairLength = this.filte(this.state.newMarketPair, this.state.searchValue).length,
        mainMarketPairLength = this.filte(this.state.mainMarketPair, this.state.searchValue).length
    return (
      <div className='trade-market'>
        <div className='trade-market-list'>
          {!this.state.searchInput && <ul>
            {controller.token && (<li onClick={this.collectMarket} className={`${this.state.collectActive ? 'trade-market-item-active' : ''}`}>{this.intl.get('market-favorite')}</li>) || null}
            {this.state.marketDataHandle.map((v, index) => {
              return (
                <li
                  className={`trade-market-item${this.state.market.toUpperCase() === v.toUpperCase() ? '-active' : ''}`}
                  key={index} onClick={this.changeMarket.bind(this, v)}>
                  {v.toUpperCase()}
                </li>
              )
            })}
          </ul>}
          <div className={this.state.searchInput ? 'input-div' : 'img-div'}>
            <img src={this.$imagesMap.$trade_search} alt="" className={this.state.searchInput ? 'hide' : ''} onClick={() => {this.setState({searchInput: true, searchValue: ''})}}/>
            {this.state.searchInput && <p>
              <input type="text"
                     placeholder={this.intl.get("market-search")}
                     onChange={this.onInputValue.bind(this)}
                     onKeyDown={this.onEnter.bind(this)}
              />
              <img src={this.$imagesMap.$trade_close} alt="" onClick={() => {this.setState({searchInput: false, searchValue: ''})}}/>
            </p>}
          </div>
        </div>
        <div className="scroll-bar">
          <table className='trade-market-table'>
            <thead>
              <tr>
                {this.state.marketTableHead.map((v, index) => {
                  return (<td onClick={this.pairSort.bind(this, v, index)} key={index} className={`${v.sortValue ? 'sort-img-td' : ''}`}>
                    {v.name}
                    <img src={this.state.sortIndex === index ? this.state.tradeSortImg : this.$imagesMap.$trade_rank} alt=""
                        className={`${v.sortValue ? '' : 'hide'}`}/>
                  </td>)
                })}
              </tr>
            </thead>
            {((newMarketPairLength && mainMarketPairLength) || (!newMarketPairLength && !mainMarketPairLength) || mainMarketPairLength) && <tbody className="main-tbody">
            <tr className="zone-name">
              <td colSpan={controller.token ? 4 : 3}><p>{this.intl.get('market-main')}</p></td>
            </tr>
            {mainMarketPairLength ? this.filte(this.state.mainMarketPair, this.state.searchValue).map((v, index) =>
              this.marketContent(v, index)
            ) : <tr className="nothing-market-pair" ><td colSpan={controller.token ? 4 : 3}>{this.intl.get('noDate')}</td></tr>}
            </tbody> || null}

            {((newMarketPairLength && mainMarketPairLength) || (!newMarketPairLength && !mainMarketPairLength) || newMarketPairLength) && <tbody>
            <tr className={`zone-name ${mainMarketPairLength ? 'new-zone-name' : ''}`}>
              <td colSpan={controller.token ? 4 : 3}><p>{this.intl.get('market-new')}</p></td>
            </tr>
            {newMarketPairLength ? this.filte(this.state.newMarketPair, this.state.searchValue).map((v, index) =>
              this.marketContent(v, index)
            ) : <tr className="nothing-market-pair" ><td colSpan={controller.token ? 4 : 3}>{this.intl.get('noDate')}</td></tr>}
            </tbody> || null}
          </table>
        </div>
      </div>
    )
  }
}