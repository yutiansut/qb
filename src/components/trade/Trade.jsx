import React, { Component } from 'react';
import exchangeViewBase from "../ExchangeViewBase";
import TradeMarket from './children/TradeMarket.jsx'
import LiveTrade from './children/LiveTrade.jsx'
import RecentTrade from './children/RecentTrade.jsx'
import TradePairDeal from './children/TradePairDeal.jsx'
import TradePlan from './children/TradePlan.jsx'
import TradeNotice from '../notice/TradeNotice.jsx'
import ReactKline from './kline'
import ReactKDepth from './depth'

import MarketController from '../../class/market/MarketController'
import OrderListController from '../../class/orderList/OrderListController'
import TradeOrderController from '../../class/orderList/tradeOrderList/TradeOrderListController'
import UserOrderListController from '../../class/orderList/userOrderList/UserOrderListController'
import NoticeController from "../../class/notice/NoticeController";
import DealController from '../../class/deal/DealController'
import UserController from '../../class/user/UserController'
// import KlineController from '../../class/kline/KlineController'
import KdepthController from '../../class/kdepth/KdepthController'

import './stylus/trade.styl'
import UserOrder from "./children/UserOrder";
import ConfigController from "../../class/config/ConfigController";

let TradeMarketController,
  TradeOrderListController,
  TradeRecentController,
  userOrderController,
  noticeController,
  TradeDealController,
  TradeUserListController,
  TradePlanController,
  userController,
  configController,
  assetController,
  // klineController,
  kdepthController

// const userOrderItems = []
export default class extends exchangeViewBase {
  constructor(props) {
    super(props)

    TradeMarketController = props.marketController; //市场
    TradeOrderListController = new TradeOrderController();//挂单列表
    TradeRecentController = new OrderListController();//近期交易
    userOrderController = props.userOrderController;//用户订单
    noticeController = new NoticeController(); //资讯
    TradeDealController = new DealController(); //交易
    TradePlanController = new DealController();//市场上交易价格
    userController = props.userController; //用户
    assetController = props.assetController; //用户
    configController = new ConfigController(); // 基础设置
    // klineController = new KlineController();
    kdepthController = new KdepthController();
    TradeMarketController.klineController = props.klineController;
    kdepthController.configController = configController;

    // TradeMarketController.klineController = klineController;
    TradePlanController.userController = userController;

    // TradeUserListController = new UserOrderListController();
    // userController = new UserController()

    TradeMarketController.TradeDealController = TradeDealController;
    TradeMarketController.TradePlanController = TradePlanController;
    TradeMarketController.TradeRecentController = TradeRecentController;
    TradeMarketController.TradeOrderListController = TradeOrderListController;

    TradeOrderListController.TradeMarketController = TradeMarketController;
    TradeOrderListController.TradePlanController = TradePlanController;
    TradeOrderListController.kdepthController = kdepthController;

    TradeRecentController.userController = userController;
    TradeRecentController.TradeMarketController = TradeMarketController


    //id处理的两种方式:
    TradeMarketController.userOrderController = userOrderController;
    userOrderController.TradeMarketController = TradeMarketController;


    TradePlanController.TradeMarketController = TradeMarketController;
    TradePlanController.TradeRecentController = TradeRecentController;
    TradePlanController.userOrderController = userOrderController;
    TradePlanController.TradeOrderListController = TradeOrderListController;

    noticeController.configController = configController;

    // noticeController.userController = userController;
    assetController.TradePlanController = TradePlanController;
    // 父子实例
    userOrderController.TradeRecentController = TradeRecentController;

    this.state = {
      curChart: "kline",
    }
  }

  switchChart(name) {
    this.setState({ curChart: name });
  }
  componentWillUnmount() {
    TradeMarketController.klineController = null;
  }


  render() {
    return <div id="trade">
        <div className="clearfix">
          <div className="trade-left">
            <div className="trade-left-top">
              <div className="fl" style={{width: '2.92rem', height: '4rem'}}>
                <div className="trade-pair-msg">
                  <TradePairDeal controller={TradeDealController} />
                </div>
                <TradeMarket controller={TradeMarketController} location={this.props.location}/>
              </div>
              <div className="trade-chart">
                <div className="k-menu">
                  <button className={this.state.curChart === "kline" ? "active" : ""} onClick={this.switchChart.bind(this, "kline")}>
                      {this.intl.get("kline")}
                  </button>
                  <button className={this.state.curChart === "depth" ? "active" : ""} onClick={this.switchChart.bind(this, "depth")}>
                      {this.intl.get("depth")}
                  </button>
                </div>
                <ReactKline show={this.state.curChart === "kline"} controller={TradeMarketController.klineController} />
                <ReactKDepth show={this.state.curChart === "depth"} controller={kdepthController}/>
              </div>
            </div>
            <div className="trade-left-bottom">
              <div className="fl trade-recent">
                <RecentTrade controller={TradeRecentController} />
              </div>
              <div className="fr trade-plan">
                <TradePlan controller={TradePlanController} />
              </div>
            </div>
          </div>
          <div className="trade-right">
            <LiveTrade controller={TradeOrderListController} />
          </div>
        </div>
        <div className="trade-bottom clearfix">
          <div className="trade-notice">
            <TradeNotice controller={noticeController} />
          </div>
          <div className="trade-order">
            <UserOrder controller={userOrderController} />
          </div>
        </div>
      </div>;
  }
}