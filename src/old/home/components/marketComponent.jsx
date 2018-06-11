import {observer} from "mobx-react";
import {observable, reaction, computed} from 'mobx';
import React from "react";

@observer
class MarketComponent extends React.Component{
  constructor() {
    super();
  }
  marketSelectedChange(index) {
    const store = this.props.store;
    store.marketSelected = index
  }
  active(index) {
    const store = this.props.store;
    return (store.marketSelected === index) ? 'all-markets-navItem-active' : ''
  }
  marketPairSort() {
    const store = this.props.store;
    store.marketPairSort = 'last';
  }
  componentWillMount() {
    const store = this.props.store;
    // store.get()
  }

  table(){

    return (
      <div className="all-markets">
        <ul className="all-markets-nav">
          {this.props.markets.map((v, index)=>
            <li className={`all-markets-navItem ${this.active(index)}`} onClick={this.marketSelectedChange.bind(this,index)}>{v.name}</li>
          )}
        </ul>
        <table className="all-markets-table">
          <tr className="all-markets-header">
            <th className="all-markets-option">收藏</th>
            <th>交易盘</th>
            <th onClick={this.marketPairSort.bind(this)}>最新成交价</th>
            <th>24H成交额</th>
            <th>24H成交量</th>
            <th>24H涨跌幅</th>
            <th>7日涨跌幅</th>
          </tr>
          <tbody>
          {this.props.pairs.map(v=>v.display())}
          </tbody>
        </table>
      </div>
    );
  }

  block(){
    return (
      <div className="rec-markets">
        {this.props.pairs.map(v=>v.display())}
      </div>
    );
  }

  render() {
    return this[this.props.type]();
  }
}
export default MarketComponent
