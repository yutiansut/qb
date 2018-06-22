import React, {Component} from 'react';
import exchangeViewBase from "../ExchangeViewBase";
import TradeMarket from './children/TradeMarket.jsx'
import LiveTrade from './children/LiveTrade.jsx'
import RecentTrade from './children/RecentTrade.jsx'
import CurrentOrder from './children/CurrentOrder.jsx'
import HistoryOrder from './children/HistoryOrder.jsx'

import MarketController from '../../class/market/MarketController'
import OrderListController from '../../class/orderList/OrderListController'
import TradeOrderController from '../../class/orderList/tradeOrderList/TradeOrderListController'
import UserOrderListController from '../../class/orderList/userOrderList/UserOrderListController'

import './stylus/trade.styl'
const TradeMarketController = new MarketController();
const TradeOrderListController = new TradeOrderController();
// const TradeRecentController = new TradeOrderController();
const TradeRecentController = new OrderListController();
const CurrentOrderController = new UserOrderListController();
const HistoryOrderController = new UserOrderListController();
export default class extends exchangeViewBase{
  constructor(props){
    super(props)
  }
  render(){
    return(
        <div id='trade' >
          <div className='clearfix'>
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
         
          <div className='trade-bottom clearfix'>
            <div className='trade-notice'></div>
            <div className='trade-order'>
              <CurrentOrder controller={CurrentOrderController}/>
              <HistoryOrder controller={HistoryOrderController}/>
            </div>
          </div>
          


        </div>
    )
  }
}