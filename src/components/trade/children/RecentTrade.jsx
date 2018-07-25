import ExchangeViewBase from '../../ExchangeViewBase'
import React, {Component} from "react";
import '../stylus/tradeRecent.styl'

export default class extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      sortIndex: -1,
      tradeSortImg: '/static/img/trade_rank.svg',
      recentTradeListArr: [],
      recentItem:
          [
            {name: this.intl.get('order-market'), type: 'mineLess', isPersonal: 0},
            {name: this.intl.get('order-mine'), type: 'mine', isPersonal: 1}
          ],
      isPersonal: 0,
      recentTableHead:[
        {name: this.intl.get('time'), sortValue: ''},
        {name: this.intl.get('price'), sortValue: ['price'], type: 0, sortDefault: 'price'},
        {name: this.intl.get('amount'), sortValue: ['volume'], type: 1, sortDefault: 'price'},],
      recentTableMarketHead : [
        {name: this.intl.get('time'), sortValue: ''},
        {name: this.intl.get('price'), sortValue: ['price'], type: 0, sortDefault: 'price'},
        {name: this.intl.get('amount'), sortValue: ['volume'], type: 1, sortDefault: 'price'},],
      recentTableMineHead : [
        {name: this.intl.get('time'), sortValue: ''},
        {name: this.intl.get('price'), sortValue: ['avgPrice'], type: 0, sortDefault: 'avgPrice'},
        {name: this.intl.get('amount'), sortValue: ['dealDoneCount'], type: 1, sortDefault: 'avgPrice'},],
      recentItemSelect: 'mineLess'
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.changeRecentItem = controller.changeRecentItem.bind(controller);
    // this.recentTradeList = controller.recentTradeList.bind(controller)
    this.tradeSort = controller.tradeSort.bind(controller) // 近期交易排序
    this.clearRoom = controller.clearRoom.bind(controller)
  }

  componentDidMount() {
    // this.props.controller.emitRecentOrderWs();
    // this.recentTradeList();
    // this.props.controller.getRecentOrder(this.state.isPersonal);
  }

  componentWillMount() {

  }

  componentWillUnmount() {
    this.clearRoom()
  }


  render() {
    return <div>
        <div className="trade-recent-title">
          <h3>{this.intl.get("order-recent")}</h3>
          <div style={{ display: "flex" ,height : '.24rem', alignItems: 'center'}}>
            {this.state.recentItem.map((v, index) => {
              return <div className={`recent-item recent-item-${this.state.recentItemSelect === v.type ? "active" : ""}`} key={index} onClick={this.changeRecentItem.bind(this, v)}>
                  {v.name}
                </div>;
            })}
          </div>
        </div>
        <div className="scroll-bar-recenttrade">
        <table className="trade-recent-table">
          <thead>
            <tr>
              {this.state.recentTableHead.map((v, index) => {
                return <td key={index} onClick={this.tradeSort.bind(this, v, index)}>
                    {v.name}
                    <img src={this.state.sortIndex === index ? this.state.tradeSortImg : "/static/img/trade_rank.svg"} alt="" className={`${v.sortValue ? "" : "hide"}`} />
                  </td>;
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.recentTradeListArr && this.state.recentTradeListArr.length && this.state.recentTradeListArr.map(
              (v, index) =>
                index <= 50 && (
                  <tr key={index}>
                    <td>{this.state.recentItemSelect === 'mineLess' ? Number(v.dealTime).toDate('HH:mm:ss'):Number(v.orderTime).toDate('HH:mm:ss')}</td>
                    <td>
                      {this.state.recentItemSelect === 'mineLess' ? ((this.state.unitsType === "CNY" && Number(v.priceCN).format({number:'legal',style:{name:'cny'}})) || ((this.state.unitsType === "USD" && Number(v.priceEN).format({number:'legal',style:{name:'usd'}})) || Number(v.price).format({number:'digital'}))): ((this.state.unitsType === "CNY" && Number(v.avgPriceCN).format({number:'legal',style:{name:'cny'}})) || ((this.state.unitsType === "USD" && Number(v.avgPriceEN).format({number:'legal',style:{name:'usd'}})) || Number(v.avgPrice).format({number:'digital'})))}
                    </td>
                    <td>{this.state.recentItemSelect === 'mineLess' ? Number(v.volume).formatFixNumberForAmount(Number(v.price)) : Number(v.dealDoneCount).formatFixNumberForAmount(Number(v.avgPrice))}</td>
                  </tr>
                )
            ) || <tr><td><span>{this.intl.get('noRecords')}</span></td></tr>}
          </tbody>
        </table>
        </div>
      </div>;
  }
}