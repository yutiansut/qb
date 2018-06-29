import React, {Component} from 'react';
import exchangeViewBase from "../ExchangeViewBase";
import TradeMarket from './children/TradeMarket.jsx'
import LiveTrade from './children/LiveTrade.jsx'
import RecentTrade from './children/RecentTrade.jsx'
import CurrentOrder from './children/CurrentOrder.jsx'
import HistoryOrder from './children/HistoryOrder.jsx'
import TradePairDeal from './children/TradePairDeal.jsx'
import TradePlan from './children/TradePlan.jsx'
import TradeNotice from '../notice/TradeNotice.jsx'
import ReactKline from './kline'

import MarketController from '../../class/market/MarketController'
import OrderListController from '../../class/orderList/OrderListController'
import TradeOrderController from '../../class/orderList/tradeOrderList/TradeOrderListController'
import UserOrderListController from '../../class/orderList/userOrderList/UserOrderListController'
import NoticeController from "../../class/notice/NoticeController";
import DealController from '../../class/deal/DealController'


import './stylus/trade.styl'

let TradeMarketController,
  TradeOrderListController,
  TradeRecentController,
  CurrentOrderController,
  HistoryOrderController,
  noticeController,
  TradeDealController,
  TradePlanController;


export default class extends exchangeViewBase{
  constructor(props){
    super(props)

    TradeMarketController = new MarketController();
    TradeOrderListController = new TradeOrderController();
// TradeRecentController = new TradeOrderController();
    TradeRecentController = new OrderListController();
    CurrentOrderController = new UserOrderListController();
    HistoryOrderController = new UserOrderListController();
    noticeController = new NoticeController();
    TradeDealController = new DealController();
    TradePlanController = new DealController();

    TradeMarketController.TradeDealController = TradeDealController;
    TradeMarketController.TradePlanController = TradePlanController;
    TradeOrderListController.TradePlanController = TradePlanController;

    TradePlanController.TradeMarketController = TradeMarketController;
    TradePlanController.TradeRecentController = TradeRecentController;
    TradePlanController.CurrentOrderController = CurrentOrderController;
    TradePlanController.HistoryOrderController = HistoryOrderController;
    TradePlanController.TradeOrderListController = TradeOrderListController;
  }
  render(){
    return(
        <div id='trade' >
          <div className='clearfix'>
            <div className='trade-left'>
              <div className='trade-left-top'>
                <div className='fl'>
                  <div className='trade-pair-msg'>
                    <TradePairDeal controller={TradeDealController}/>
                  </div>
                  <TradeMarket controller={TradeMarketController}/>
                </div>
                <div className='trade-chart'>
                  <ReactKline />
                </div>
              </div>
              <div className='trade-left-bottom'>
                <div className='fl trade-recent'>
                  <RecentTrade controller={TradeRecentController}/>
                </div>
                <div className='fr trade-plan'>
                  <TradePlan controller={TradePlanController}/>
                </div>
              </div>
            </div>
            <div className='trade-right'>
              <LiveTrade controller={TradeOrderListController}/>
            </div>
          </div>
         
          <div className='trade-bottom clearfix'>
            <div className='trade-notice'>
              <TradeNotice controller={noticeController}/>
            </div>
            <div className='trade-order'>
              <CurrentOrder controller={CurrentOrderController}/>
              <HistoryOrder controller={HistoryOrderController}/>
            </div>
          </div>
        </div>
    )
  }
}