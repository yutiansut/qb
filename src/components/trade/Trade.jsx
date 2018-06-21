import React, {Component} from 'react';
import exchangeViewBase from "../ExchangeViewBase";
import TradeMarket from './children/TradeMarket.jsx'
import LiveTrade from './children/LiveTrade.jsx'
import RecentTrade from './children/RecentTrade.jsx'
import MarketController from '../../class/market/MarketController'
import TradeOrderController from '../../class/orderList/tradeOrderList/TradeOrderListController'
import './stylus/trade.styl'
const TradeMarketController = new MarketController();
const TradeOrderListController = new TradeOrderController();
const TradeRecentController = new TradeOrderController();
export default class extends exchangeViewBase{
  constructor(props){
    super(props)
  }
  render(){
    return(
        <div id='trade' className='clearfix'>
          <div className='trade-left'>
            <div className='trade-left-top'>
              <div className='fl'>
                <div className='trade-pair-msg'>交易盘详细信息</div>
                <TradeMarket controller={TradeMarketController}/>
              </div>
              <div className='trade-chart'>
              
              </div>
            </div>
            <div className='trade-left-bottom'>
              <div className='fl trade-recent'>
                <RecentTrade controller={TradeRecentController}/>
              </div>
              <div className='fr trade-plan'>
              
              </div>
            </div>
          </div>
          <div className='trade-right'>
            <LiveTrade controller={TradeOrderListController}/>
          </div>
          


        </div>
    )
  }
}