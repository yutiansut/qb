import React from 'react';
import {observer} from "mobx-react";
const isEmpty = require('lodash.isempty');

@observer
class MarketHall extends React.Component{
  constructor(props){
    super(props);
    this.changeMarket = this.changeMarket.bind(this)
  }

  componentDidMount() {
    const {store} = this.props;
    store.get({'market_index':store.marketType});
  }

  changeMarket(type,e){
    const {store} = this.props;
    store.marketType = type;
    store.get({'market_index':type});
  }

  render(){
    const {store} = this.props;
    return(
      <div>
        <div className="col-md-12 column">
          <div className="btn-group">
            <button className="btn btn-default" type="button" onClick={this.changeMarket.bind(this,-1)}> 收藏区</button>
            <button className="btn btn-default" type="button" onClick={this.changeMarket.bind(this,0)}> BTC市场</button>
            <button className="btn btn-default" type="button" onClick={this.changeMarket.bind(this,1)}> USD市场</button>
            <button className="btn btn-default" type="button" onClick={this.changeMarket.bind(this,2)}> USDT市场</button>
            <button className="btn btn-default" type="button" onClick={this.changeMarket.bind(this,3)}> EYH市场</button>
          </div>
        </div>

        <div>
          {isEmpty(store.marketData)?<p>暂无</p>:
          <table className='table'>
            <thead>
              <tr>
                <th className='collect-none'>收藏</th>
                <th className='market'>交易盘</th>
                <th data-sort=''>最新成交价 </th>
                <th data-sort=''>24H成交额</th>
                <th className='sort' data-name='vol' data-sort=''>24H成交量<i className="fa fa-sort"></i></th>
                <th className='sort' data-name='updown' data-sort=''>24H涨跌幅 <i className="fa fa-sort"></i></th>
                <th>7日涨跌幅</th>
              </tr>
            </thead>
            <tbody>
              {store.marketData.map((i, index) => {
                return (<tr key={index}>
                  <td></td>
                  <td>{i.name}</td>
                  <td>{i.last}</td>
                  <td>{i.money}</td>
                  <td>{i.vol}</td>
                  <td>{i.updown}</td>
                  <td>{i.line}</td>
                </tr>)
              })}
            </tbody>
          </table>
          }
        </div>
      </div>
    )
  }
}

export default MarketHall
