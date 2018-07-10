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
      recentTableHead : [
        {name: this.intl.get('time'), sortValue: ''},
        {name: this.intl.get('price'), sortValue: ['price'], type: 0, sortDefault: 'price'},
        {name: this.intl.get('amount'), sortValue: ['volume'], type: 1, sortDefault: 'price'},]
      // recentItemSelect: 'mineLess'
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
          <div style={{ display: "flex" }}>
            {this.state.recentItem.map((v, index) => {
              return <div className={`recent-item recent-item-${this.state.recentItemSelect === v.type ? "active" : ""}`} key={index} onClick={this.changeRecentItem.bind(this, v)}>
                  {v.name}
                </div>;
            })}
          </div>
        </div>
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
            {this.state.recentTradeListArr && this.state.recentTradeListArr.map(
              (v, index) => {
                return (
                  <tr key={index}>
                    <td>{v.dealTime}</td>
                    <td>
                      {(this.state.unitsType === "CNY" && v.priceCN) ||
                        ((this.state.unitsType === "USD" && v.priceEN) ||
                          v.price)}
                    </td>
                    <td>{v.volume}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>;
  }
}