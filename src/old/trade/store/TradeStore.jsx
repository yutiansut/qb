import {computed, observable, reaction} from "mobx";
import {RequestStore} from "../../store/request.jsx";

/**
 * 限价委托/市价委托
 */
class TradePlanStore {

  ORDER_TYPE = {
    LIMIT: 0,
    AUTO: 1,
  };
  @observable tradePair = '';  // 交易对
  @observable order_type = this.ORDER_TYPE.LIMIT; // 交易类型, ['0', '1'], 0->限价交易， 1->市价交易
  @observable price = 0.0;
  @observable amount = '0.0';

  // @observable unit = settings.USD;  // 计价单位.

  constructor(buyStore, sellStore) {
    this.buyStore = buyStore;  // 限价委托
    this.sellStore = sellStore;  // 限价委托

    this.setTradePair = this.setTradePair.bind(this);
    this.setOrderType = this.setOrderType.bind(this);
  }

  setOrderType(order_type, e) {
    e.preventDefault();
    if (Object.values(this.ORDER_TYPE).includes(order_type)) {
      this.order_type = order_type;
      this.buyStore.setOrderType(order_type);
      this.sellStore.setOrderType(order_type);
    }
  }

  setTradePair(tradePair) {
    this.tradePair = tradePair;
    this.buyStore.trade = this.trade;
    this.buyStore.tradeUnit = this.trade;
    this.buyStore.marketUnit = this.market;
    this.buyStore.market = this.market;
    this.sellStore.trade = this.trade;
    this.sellStore.tradeUnit = this.trade;
    this.sellStore.marketUnit = this.market;
    this.sellStore.market = this.market;
  }

  @computed get buy() {
    if (this.tradePair) {
      return this.tradePair.split("_").map(i => i.toUpperCase())[0];
    }
    return "";
  }

  @computed get unit() {
    if (this.tradePair) {
      return this.tradePair.split("_").map(i => i.toUpperCase())[1];
    }
    return "";
  }


  @computed get market() {
    if (this.tradePair) {
      return this.tradePair.split("_").map(i => i.toUpperCase())[1];
    }
    return "";
  }

  @computed get trade() {
    if (this.tradePair) {
      return this.tradePair.split("_").map(i => i.toUpperCase())[0];
    }
    return "";
  }
}

function tradeFromAlert(msg) {

}


/**
 * 委托交易store
 */
class TradePlanItemStore extends RequestStore {
  ACTION_TYPE = {
    BUY: "buy",
    SELL: "sell"
  };

  @observable market = "";  //市场 e.g. BTC
  @observable marketUnit = "";  // 委托交易选择的计价单位,
  @observable trade = "";
  @observable tradeUnit = "";
  @observable price = 0.0;  // 当前输入的价格,计价方式相关
  @observable showPriceValue = 0.0;
  @observable amount = '';
  @observable password = "";
  @observable orderType = 0;

  constructor(action, url, settings = {}) {
    super(url, settings);
    this.action = action;
    this.inputValueFlag = false;
    this.bankStore = settings.bankStore;
    this.confStore = settings.confStore;
    this.orderStore = settings.orderStore;

    this.ChangePrice = this.ChangePrice.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.updateTradePair = this.updateTradePair.bind(this);
    this.SubmitOrder = this.SubmitOrder.bind(this);
    this.ChangePW = this.ChangePW.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.setOrderType = this.setOrderType.bind(this);
    this.getMarketPrice = this.getMarketPrice.bind(this);

    //
    reaction(() => this.response.jqXHR, data => {
      // console.log('下单',data)
      if (data.status === 200) {
        // alert("OK");
        // console.log(data,this.orderStore,this.recentTradeStore)
        let text = '操作成功'
        if (conf.LANGUAGECODE !== 'zh-hans')
          text = 'Done successfully'
        swalMix({
          width: 274,
          position: 'top-end',
          timer: 3000,
          padding: '0px',
          backdrop: false,
          customClass: 'trade-swalMix-one',
          showCloseButton: false,
          background: "rgba(27, 176, 224, 0.7) url('/static/trade/img/success.svg') no-repeat 14px center/42px 32px",
          html: `<div style="color:#FFFFFF;font-size: 14px;letter-spacing: 0;text-indent:65px;text-align:left;">${text}</div>`
        })
        this.amount = '';
        // 刷新当前订单
        // console.log('刷新当前订单')
        setTimeout(()=>this.orderStore.get({
          version: 2,
          status: 'oc',
          market: this.orderStore.coin_market,
          // success: ()=>{
          //   console.log('成功返回')
          // }
        }, 'application/x-www-form-urlencoded'),5000);
        // 刷新近期交易订单
        // this.recentTradeStore.get({
        //     trade_pair: data,
        //     status: 'closed',
        //   },'application/x-www-form-urlencoded')
      } else if (data.status === 302) {
        window.location.href = data.responseText;

      }
      else {
        swalMix({
          width: 274,
          position: 'top-end',
          timer: 3000,
          padding: '0px',
          backdrop: false,
          customClass: 'trade-swalMix-one',
          showCloseButton: false,
          background: "rgba(235, 90, 90, 0.5) url('/static/trade/img/chucuo.svg') no-repeat 14px center/42px 32px",
          html: `<div style="color:#FFFFFF;font-size: 14px;letter-spacing: 0;text-indent:65px;text-align:left;">${data.responseText}</div>`
        })
      }
    })
  }

  /**
   * 设置交易类型
   */
  setOrderType(type) {
    this.orderType = type;
  }

  ChangePrice(unit, value) {
    // e.preventDefault();
    this.inputValueFlag = true;
    const numberType = this.confStore.getUnitType(unit).toLowerCase();
    this.marketUnit = unit;
    // console.log('ChangePrice 0', value, this.price)
    let arr = value.split('.');
    // console.log('ChangePrice 0.3', arr, arr.length)
    if (arr.length > 2)
      return
    arr[1] = arr[1] || ''
    // console.log('ChangePrice 0.6', !((/^[0-9]*$/).test(arr[0]) && (/^[0-9]*$/).test(arr[1] || '')))
    if (!((/^[0-9]*$/).test(arr[0]) && (/^[0-9]*$/).test(arr[1])))
      return
    // console.log('ChangePrice', Number(value), arr[0], arr[1], (/^[0-9]{0,4}$/).test(arr[1]), (/^[0-9]{0,6}$/).test(arr[1]), (/^[0-9]{0,8}$/).test(arr[1]))
    let flag = (Number(value) > 100 && (/^[0-9]{0,2}$/).test(arr[1]))
        || ((Number(value) <= 100 && (/^[0-9]{0,4}$/).test(arr[1]))
        || (Number(value) < 0.1 && (/^[0-9]{0,6}$/).test(arr[1]))
        || (Number(value) < 0.01 && (/^[0-9]{0,8}$/).test(arr[1])));
    // console.log('ChangePrice 0.5',flag)
    if (numberType === 'legal')
      flag = (/^[0-9]{0,3}$/).test(arr[1])
    // console.log('ChangePrice 1', flag, numberType, (/^[0-9]{0,3}$/).test(arr[1]))
    if (flag)
      this.price = value
  }

  /**
   * 得到换算成unit后的价格
   * @param unit 币种
   */
  getPrice(unit) {
    // console.log('getPrice 0', this.inputValueFlag, this.price);
    const numberType = this.confStore.getUnitType(unit).toLowerCase();
    // console.log('getPrice 1', this.price)
    if (unit !== this.marketUnit) {
      const rate = this.bankStore.getRate(this.marketUnit, unit) || 1;
      // console.log('getPrice 2', rate, numberType, Number(this.price * rate).formatFixNumber(numberType))
      return Number(this.price * rate).formatFixNumber(numberType)
    }
    if (this.inputValueFlag){
      return this.price;
    };
    return Number(this.price).formatFixNumber(numberType)
  }

  /**
   * 得到按市场为单位的价格
   */
  getMarketPrice() {
    return this.getPrice(this.marketUnit)
  }

  @computed get TradePairStr() {
    return `${this.trade.toLowerCase()}_${this.market.toLowerCase()}`
  }


  @computed get submitData() {
    // console.log({
    //   op: this.action,
    //   price: this.getPrice(this.market) || 0,
    //   amount: this.amount || 0,
    //   password: this.password,
    //   order_type: this.orderType,  // 限价交易
    //   market: this.TradePairStr,
    // })
    return JSON.stringify({
      op: this.action,
      price: this.getPrice(this.market) || 0,
      amount: this.amount || 0,
      password: this.password,
      order_type: this.orderType,  // 限价交易
      market: this.TradePairStr,
    })
  }

  SubmitOrder(e) {
    e.preventDefault();
    this.post();
    this.password = '';
  }

  updateTradePair(tradePair) {
    const pair = tradePair.split("_").map(i => i.toUpperCase());
    this.marketUnit = pair[1];
    this.market = pair[1];
    this.tradeUnit = pair[0];
    this.trade = pair[0];
  }

  setAmount(value) {
    // console.log('setAmount 0',value, this.amount, this.price)
    let arr = ('' + value).split('.'), length = 6, arrLength = arr.length;
    // console.log('ChangePrice 0.3', arr, arr.length)
    if (arrLength > 2) {
      return
    }
    if (value === '.') {
      arr[0] = 0
    }1
    // console.log(this.bankStore.recentDealData && this.bankStore.recentDealData['CNY'][this.trade.toLowerCase()])
    if (this.bankStore.recentDealData && this.bankStore.recentDealData['CNY'][this.trade.toLowerCase()] < 100) {
      length = 4
    }
    arr[1] = arr[1] || ''
    if (!((/(^0?$)|(^[1-9][0-9]*$)/).test(arr[0]) && (/^[0-9]*$/).test(arr[1])))
      return
    arr[1] = arr[1].substring(0, length)
    arr.length = arrLength;
    // console.log('setAmount 1', arr, value, this.amount, length, arr.join('.'))
    this.amount = arr.join('.');
  }

  ChangePW(e) {
    e.preventDefault();
    this.password = e.target.value;
  }
}


export default {TradePlanItemStore, TradePlanStore}
