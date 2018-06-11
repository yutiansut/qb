import React from 'react';
import {reaction, computed} from 'mobx';
import {observer} from "mobx-react";
import io from 'socket.io-client';
import Order from './components/Order.jsx'
import DealStore from "./store/DealStore.jsx";
import Deal from "./components/Deal.jsx";
import Info from "./components/Info.jsx";
import Market from './components/Market.jsx';
import TradePlan from './components/TradePlan.jsx';
import LiveTrade from './components/LiveTrade.jsx';
import RecentTrade from './components/RecentTrade.jsx';
import Chart from './components/Chart.jsx';
import UserAsset from './components/UserAsset.jsx'
import TradeStore from './store/TradeStore.jsx';
import {UserStore, KLineStore, BankStore} from './store/base.jsx';
import ConfStore from './store/ConfStore.jsx';
import InfoStore from './store/InfoStore.jsx';
import LiveTradeStore from './store/LiveTradeStore.jsx';
import MarketStore from './store/MarketStore.jsx';
import OrderStore from './store/OrderStore.jsx';
import RecentTradeStore from './store/RecentTradeStore.jsx';
import TradePairStore from './store/TradePairStore.jsx';
import ChartStore from "./store/ChartStore.jsx";
import ModalDialogStore from './store/ModalDialogStore.jsx';
import UserAssetStore from './store/UserAssetStore.jsx';
import i18n from "../common/i18n.jsx";

const isEmpty = require('lodash.isempty');

/**
 * websocket
 */
const socket = io(socket_io_url, {transports: ['websocket']});
socket.on('connect', function () {
  console.log('socket连接')
});

socket.on('err', function () {
  console.log('error')
});

// 页面配置
const confStore = new ConfStore();
confStore.language = conf.languageCode;
// 汇率转换

const bankStore = new BankStore(conf.exchange_url);
// const bankStore = new BankStore();
$.ajax({
  url: '/trade/min_trade/',
  method: "GET",
  success: function (data) {
    // console.log('min_trade', data)
    bankStore.min_trade = data
  }
})

const chartStore = new ChartStore();

// TODO: 仅发请求且与数据不相关的可不使用store
const marketActionStore = new MarketStore.MarketActionStore(market_url, {headers: {"X-CSRFToken": conf.csrf_token}});

const marketStore = new MarketStore.MarketStore(
  {
    actionStore: marketActionStore,
    bankStore: bankStore
  }, market_url);
const userAssetStore = new UserAssetStore('/trade/fee/');

// 交易对的实时数据. 买入, 卖出, 深度图数据
const liveTradeStore = new LiveTradeStore();
liveTradeStore.depthSettings = {
  tooltip: {
    trigger: 'axis',
    position: [20, 20]
  },
  toolbox: {
    show: false,
    feature: {
      dataView: {show: true, readOnly: false},
      magicType: {show: true, type: ['line', 'bar']},
      restore: {show: true},
      saveAsImage: {show: true}
    }
  },
  legend: {
    data: []
  },
  xAxis: {
    show: false,
    // axisLine: {show: false},
    type: 'category',
    splitLine: {show: false},
    data: []
  },
  yAxis: [
    {
      show: false,
      // axisLine: {show: false},
      type: 'value',
      splitLine: {show: false},
      name: '',
      axisLabel: {
        formatter: '{value}'
      }
    },
  ],
  grid: {
    // width: '100%',
    bottom: 10,
    left: 0,
    right: 50,
    top: 0
  },
  series: [
    {
      name: 'bids',
      type: 'line',
      showSymbol: false,
      smooth: true,
      lineStyle: {
        normal: {
          width: 2,
          color: '#1BB0E0'
        }
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#1BB0E0' // 0% 处的颜色
          }, {
            offset: 1, color: '#1E565E' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      },
      data: []
    },
    {
      name: 'ask',
      type: 'line',
      showSymbol: false,
      smooth: true,
      lineStyle: {
        normal: {
          width: 2,
          color: '#EB5B5B'
        }
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#EB5B5B' // 0% 处的颜色
          }, {
            offset: 1, color: '#9E5252' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      },
      data: []
    }
  ]
};

const modalDialogStore = new ModalDialogStore(conf.fundPasswordIgnore);

reaction(() => modalDialogStore.response.jqXHR, data => {
  if (data.status === 200) {
    swalMix({
      width: 274,
      position: 'top-end',
      timer: 3000,
      padding: '0px',
      backdrop: false,
      customClass: 'trade-swalMix-one',
      showCloseButton: false,
      background: "rgba(27, 176, 224, 0.5) url('/static/trade/img/success.svg') no-repeat 14px center/42px 32px",
      html: `<div style="color:#FFFFFF;font-size: 14px;letter-spacing: 0;text-indent:65px;text-align:left;">${data.responseText}</div>`
    })
  } else {
    swalMix({
      width: 274,
      position: 'top-end',
      timer: 3000,
      padding: '0px',
      backdrop: false,
      customClass: 'trade-swalMix-one',
      showCloseButton: false,
      background: "rgba(235, 91, 91, 0.5) url('/static/trade/img/chucuo.svg') no-repeat 14px center/42px 32px",
      html: `<div style="color:#FFFFFF;font-size: 14px;letter-spacing: 0;text-indent:65px;text-align:left;">${data.responseText}</div>`
    })
  }
});

// 用户
const userStore = new UserStore();

reaction(() => userStore.data, data => {
  // console.log('reaction userStore.data', data.safe.need_input_pwd)
  modalDialogStore.setUserWay(data.safe.need_input_pwd || 'EVERY')
});

// Order Action store
const orderActionStore = new OrderStore.OrderActionStore(conf.order_action_url, {headers: {"X-CSRFToken": conf.csrf_token}});

// Order
const orderStore = new OrderStore.OrderStore(orderActionStore, conf.orderUrl);

// 部分成交/全部成交 Store
const dealStore = new DealStore(conf.tradeDealList2);

// 部分成交/全部成交
reaction(() => orderStore.clickedStatus, data => {
  dealStore.get({
    coin_market: orderStore.coin_market,
    pk: data,
  })
});


// 近期交易store
const recentStore = new RecentTradeStore();

// 最新的交易对信息
const tradePairStore = new TradePairStore(conf.currency_info_url);

// K线图配置
let klineStore = null;
if (conf.tradePair) {
  klineStore = new KLineStore({
    locale: conf.LANGUAGECODE,
    symbol: conf.tradePair
});
} else {
  klineStore = new KLineStore({
    locale: conf.LANGUAGECODE,
  });
}


// 委托买入
const buyStore = new TradeStore.TradePlanItemStore('buy', conf.trade_url,
  {
    headers: {"X-CSRFToken": conf.csrf_token},
    bankStore: bankStore,
    orderStore,
    confStore,
  });
// 委托卖出
const sellStore = new TradeStore.TradePlanItemStore('sell', conf.trade_url,
  {
    headers: {"X-CSRFToken": conf.csrf_token},
    bankStore: bankStore,
    orderStore,
    confStore,
  });
// 委托交易
const tradeStore = new TradeStore.TradePlanStore(buyStore, sellStore);

// 当选择了某一条买入卖出记录时.
reaction(() => liveTradeStore.clickedItem, data => {
  // console.log(data)
  tradeStore.buyStore.price = data.price;
  // tradeStore.buyStore.amount = data.vol;

  tradeStore.sellStore.price = data.price;
  // tradeStore.sellStore.amount = data.vol;
});
/**
 * 个人资产数据.
 */
socket.on('asset-data', function (data) {
  userStore.data = data;
});


/**
 * 市场最新交易对信息{交易对， [价格， 数量， 24h]}
 */
socket.on("ticker-data", function (data) {
  tradePairStore.data = data;
  marketStore.updateItem(data);
});

//汇率转换
socket.on('rate-data', function (data) {
  bankStore.recentDealData = data
});

// 近期交易
// //market data
socket.on("trades-data", function (data) {
  console.log('近期交易返回的数据',data)
  recentStore.marketData = data;
});
// // market user data.
socket.on(`recent-order-data`, data => {
  recentStore.userData = data;
});


/**
 * 当选择指定交易对时
 */
reaction(() => marketStore.tradePair, tradePair => {
  // console.log('asdadsasdasdadasd', `eth_btc-depth-data`, marketStore.tradePair)
  // socket.removeListener(`eth_btc-depth-data`, function(data) {
  //   console.log('关闭socket', data)
  // })
  // console.log('reaction tradePair', tradePair)
  if (!tradePair) {
    return
  }

  marketStore.market = marketStore.getMarketName(tradePair);
  // 初始化委托交易部分.
  tradeStore.setTradePair(tradePair);
  tradeStore.buyStore.inputValueFlag = false;
  tradeStore.sellStore.inputValueFlag = false;
  const [tf, tt] = marketStore.TradePair;
  buyStore.price = marketStore.bankStore.getRate(tf, tt);
  sellStore.price = marketStore.bankStore.getRate(tf, tt);
  // 设置计价模式.
  confStore.coinPriceType = tradeStore.unit;
  // socket.emit("user-orders",  {'market': tradePair, userWspk: conf.userWspk});
  // socket.on("user-order-data", function (data) {
  //   orderStore.recvData = data;
  // })
  klineStore = new KLineStore({
    locale: conf.LANGUAGECODE,
    symbol: tradePair
  });
  orderStore.coin_market = tradePair;
  dealStore.coin_market = tradePair;

  orderStore.get({
      version: 2,
      status: 'oc',
      market: tradePair
    },
    'application/x-www-form-urlencoded');

  //初始化K线图市场
  if (chartStore.chartReady) {
    chartStore.widget.setSymbol(tradePair.toUpperCase(), "30");
  }
  liveTradeStore.market = tradePair;

  // 买入卖出
  // let tradePairCache = tradePair;
  // console.log('socket.on', `${tradePair}-depth-data`, socket)
  socket.on(`${tradePair}-depth-data`, function (data) {
    console.log('socket', tradePair, data, marketStore.tradePair)
    if(tradePair !== marketStore.tradePair){
      return
    }
    let ldata = [];
    if (data && data.asks) {
      data['asks'].map(i => ldata.push({
        price: i[0],
        vol: i[1],
        trade_type: 'SELL'
      }));
    }
    if (data && data.bids) {
      data['bids'].map(i => ldata.push({
        price: i[0],
        vol: i[1],
        trade_type: 'BUY'
      }));
    }
    liveTradeStore.market = tradePair;
    liveTradeStore.select = "ALL";
    // liveTradeStore.data = ldata.concat(liveTradeStore.data.slice());
    liveTradeStore.data = ldata;
    liveTradeStore.rawData = data;
    liveTradeStore.updateDepthSettings();

  });

  // 近期交易
  recentStore.tradePair = tradePair;
  socket.emit('trades', {
    tradePair: tradePair,
  });
  socket.emit('recentOrder', {
    tradePair: tradePair,
    userWspk: conf.userWspk
  });
  socket.emit('enter', `${tradePair}-depth`);
});


if (conf.market) {
  marketStore.market = conf.market.toUpperCase();
  // marketStore.tradePair = marketStore.OrderData[0] && marketStore.OrderData[0].id
}
if (conf.coin) {
  marketStore.tradePair = `${conf.coin.toLowerCase()}_${conf.market.toLowerCase()}`
}
/**
 * 当获取market市场数据时
 *
 * */
reaction(() => JSON.stringify(marketStore.AData), data => {
  const aData = JSON.parse(data);
  // 默认选中第一个交易对
  if (isEmpty(marketStore.recvData)) {
    return;
  }
  if (!marketStore.tradePair) {
    if (!conf.market) {
      marketStore.market = 'BTC';
      marketStore.tradePair = marketStore.OrderData && marketStore.OrderData[0].id
    }
  }
});

const infoStore = new InfoStore(
  conf.article_url,
  {
    detailUrl: conf.article_detail_url,
    detailUrlPlaceHolder: conf.article_detail_url_placeholder
  }
);
// 监控coinPriceType状态
reaction(() => confStore.coinPriceType, data => {
  orderStore.priceType = data;
});

/**
 * 页面入口
 */
@observer
class APP extends React.Component {
  constructor(props) {
    super(props);
    // 个人资产数据.
    socket.emit('listen-asset', user_wspk);
    // 市场最新交易对信息{交易对， [价格， 数量， 24h]}
    socket.emit('ticker');
    // 最新汇率即最新成交价
    socket.emit('exchangeRate');

  }

  get eClicentHeight() {
    return document.documentElement.clientHeight - 56
  }

  render() {
    i18n.options.fallbackLng = Array(LANGUAGE_CODE);
    return (
      <div>
        <div className="d-flex flex-row">
          <Deal id="order-modal-dialog" store={dealStore} confStore={confStore} bankStore={bankStore}/>
          <div className="d-flex flex-column left p-0">
            <Market store={marketStore}
                    bankStore={bankStore}
                    sameHeight={this.eClicentHeight * 0.553}
                    confStore={confStore}
                    tradePairStore={tradePairStore}/>
            <RecentTrade store={recentStore}
                         bankStore={bankStore}
                         sameHeight={this.eClicentHeight - Math.round(this.eClicentHeight * 0.553)}
                         confStore={confStore}/>
            <Info store={infoStore} orderStore={orderStore}/>
          </div>
          {/* k线图+交易记录 */}
          <div className="d-flex flex-column flex-fill pl-1">
            {/* k线图部分*/}
            <div className="d-flex flex-row mb-1" style={{height: `${this.eClicentHeight}px`}}>
              {/*k线图 width: '72.2%', */}
              <div className="d-flex flex-column flex-fill" style={{height: '100%', minWidth:'645px'}}>
                {/*k线图*/}
                <div className="mix-dark d-flex flex-column mb-1" id="kline-height"
                     style={{height: Math.round(this.eClicentHeight * 0.553)}}>
                  <Chart klineStore={klineStore}
                         store={chartStore}
                         confStore={confStore}
                         dStore={liveTradeStore}
                         marketStore={marketStore}
                  />
                </div>
                {/*委托交易*/}
                <div className="mix-dark d-flex pl-5 pr-5 pt-2 mix-trade-plan justify-content-center" id="trade-plan"
                     style={{width: '100%', height: this.eClicentHeight - Math.round(this.eClicentHeight * 0.553)}}>
                  <TradePlan store={tradeStore}
                             confStore={confStore}
                             userStore={userStore}
                             bankStore={bankStore}
                             recentStore={recentStore}
                             modalDialogStore={modalDialogStore}
                             signUpIn={conf.signup_in_url}
                  />
                </div>
              </div>
              {/*挂单*/}
              <div className="d-flex flex-column pl-1 mix-buy-sell">
                <LiveTrade store={liveTradeStore}
                           marketStore={marketStore}
                           confStore={confStore}
                           bankStore={bankStore}
                           eClicentHeight={this.eClicentHeight}
                />
              </div>
            </div>
            {/*交易记录*/}
            <div className="mix-dark d-flex flex-row mb-1" id='order-height'>
              <Order store={orderStore} marketStore={marketStore} confStore={confStore} bankStore={bankStore}/>
            </div>
          </div>
        </div>
        <div className='user-asset'>
          <UserAsset userStore={userStore} bankStore={bankStore} confStore={confStore} marketStore={marketStore}
                     userAssetStore={userAssetStore}/>
        </div>
      </div>

    )
  }
}

export default APP
