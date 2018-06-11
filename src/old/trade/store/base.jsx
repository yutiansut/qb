import {observable} from 'mobx';
// import jQuery from 'jquery';
import {market} from '../utils.jsx';
const isEmpty = require('lodash.isempty');

/**
 * 用户Store
 */
class UserStore {
  @observable data = {};

  constructor() {
    this.available = this.available.bind(this);
  }

  available(market) {
    if (isEmpty(this.data)) {
      return 0.0
    }
    if (this.data.wallet.hasOwnProperty(market.toLowerCase())) {
      return this.data.wallet[market.toLowerCase()].avail;
    }
    return 0.0;
  }
}

class KLineStore {
  constructor(settings = {}) {
    // const {marketStore} = this.props;
    // console.log('marketStorekk', marketStore)
    this.settings = Object.assign(
      {
        autosize: true,
        symbol: "ETH_BTC",
        container_id: "kline-component",
        interval: '30',
        timezone: 'Asia/Shanghai',
        hideideas: true,
        overrides: {
          "mainSeriesProperties.candleStyle.upColor": '#EB5B5B',
          "mainSeriesProperties.candleStyle.downColor": '#1BB0E0',
          "mainSeriesProperties.candleStyle.borderUpColor": '#EB5B5B',
          "mainSeriesProperties.candleStyle.borderDownColor": '#1BB0E0',
          "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0)",
          "paneProperties.background": "#0E131A",
          "paneProperties.vertGridProperties.color": 'rgba(0,0,0,0)',
          "paneProperties.horzGridProperties.color": 'rgba(0,0,0,0)',
          "symbolWatermarkProperties.transparency": '90',
          "scalesProperties.textColor": '#AAA'
        },
        studies_overrides: {
          "volume.volume.color.0": "#1BB0E0",
          "volume.volume.color.1": "#EB5B5B",
          "volume.volume.transparency": 80,
        },
        toolbar_bg: '#191F28',
        allow_symbol_change: false,
        //	BEWARE: no trailing slash is expected in feed URL
        datafeed: new Datafeeds.UDFCompatibleDatafeed(conf.datafeed_url, 15000),
        library_path: conf.tv_lib_path,
        locale: "zh-hans",
        //	Regression Trend-related functionality is not implemented yet, so it's hidden for a while
        drawings_access: {
          type: 'black',
          tools: [{
            name: "Regression Trend"
          }]
        },
        // charts_storage_api_version: "1.1",
        disabled_features: [
          "use_localstorage_for_settings",
          "header_saveload",
          "header_interval_dialog_button",
          "show_interval_dialog_on_key_press",
          "left_toolbar",
          "header_screenshot",
          "save_chart_properties_to_local_storage",
          "study_buttons_in_legend"
        ],
        favorites: {chartTypes: ["Area", "Line"]},
        custom_css_url: 'tv_custom_dark.css',
      }, settings)
  }
}

class BankStore {
  @observable recentDealData = {};
  @observable min_trade = {};
  constructor(url) {
    this.exchangeRate = new Map();
    this.url = url;
    this.getRate = this.getRate.bind(this);
  }

  /**
   * 得到从交易对(tp)到指定币种(to)的汇率
   * @param tp str e.g. eth_btc
   * @param to str usd
   */
  getRateFromTradePair(tp, to) {
    const from = market(tp);
    if (from.toUpperCase() === to.toUpperCase()) {
      return 1
    }
    return this.getRate(from, to);
  }

  /**
   * 得到从from到to的汇率
   * @param from BTC
   * @param to  USD
   */
  getRate(from, to) {
    from = from.toUpperCase();
    to = to.toUpperCase();
    if (!(from && to)) {
      return undefined;
    }
    if (from === to) {
      return 1;
    }
    const key = `${from}_${to}`;
    let rate = this.exchangeRate.get(key);
    if (!rate) {
      $.ajax({
        url: this.url,
        method: "GET",
        async: false,
        data: {
          who: from,
          to: to
        },
        success: function (data, textStatus, jqXHR) {
          // console.log('ajax 请求')
          rate = data.rate;
          this.exchangeRate.set(key, rate);
        }.bind(this),
        error: function (jqXHR, textStatus, errorThrown) {
          // console.log(textStatus);
          rate = undefined
        }.bind(this)
      });
    }
    return rate
  }
}

export {
  UserStore,
  KLineStore,
  BankStore
}
