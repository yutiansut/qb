import ExchangeControllerBase from '../ExchangeControllerBase'
import DealStore from './DealStore'

export default class DealController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new DealStore();
  }

  setView(view) {
    super.setView(view)
  }

  setPairMsg(value) {
    this.view.setState({
      tradePairMsg: value
    });
  }

  tradePairHandle(pair, prices) {
    let pairArr = pair.split('/'),
      coin = pairArr[0],
      market = pairArr[1];
    this.view.setState(
      {
        // PriceUnit: market,
        NumUnit: coin,
        Market: market,
        Coin: coin,
        // prices,
        priceBank: prices,
        inputBuyFlag: false,
        inputSellFlag: false,
      }
    );
    this.store.state.prices = prices;
    this.setPriceInit(prices.price);
    // this.TradeMarketController.setUnitsType(market, coin);
    this.userOrderController.setInitUnit(market, coin);
    this.TradeRecentController.setInitUnit(market, coin);
    this.TradeOrderListController.setInitUnit(market, coin);
    this.store.state.PriceUnit = market;
    this.store.state.NumUnit = coin;
    // this.view.state.Market = market;
    this.coinMinTradeHandle(coin);//最小交易量的处理
    console.log('this.view.state.coinMinTrade111111111111', this.store.state.coinMinTrade)
  }

  orderHandle(prices) {
    this.view.setState({
      prices,
      inputBuyFlag: false,
      inputSellFlag: false,
      priceBank: prices
    });
    this.store.state.prices = prices;
    this.setPriceInit(prices.price);
  }

  // 数字币计价 初始值获取
  setPriceInit(v) {
    this.view.state.priceInit = v;
    this.view.state.buyMax = this.view.state.buyWallet / v;
    this.view.state.sellMax = this.view.state.sellWallet;
  }

  changeUnit(unit, init) {
    let unitObj = {
      'CNY': 'CNY',
      'USD': 'USD',
    };
    unitObj[init] = this.view.state.Market;
    let fromValue = this.store.state.prices[this.store.state.PriceUnit === 'CNY' && 'priceCN' || (this.store.state.PriceUnit === 'USD' && 'priceEN' || 'price')];
    let unitSelected = unitObj[unit];
    this.view.setState({
      PriceUnit: unitSelected,
      UnitSelected: unit
    });
    this.changePrice(unitSelected, fromValue);
    this.store.state.PriceUnit = unitSelected;
    this.TradeMarketController.setUnitsType(unitSelected);
    this.userOrderController.setUnitsType(unitSelected);
    this.TradeRecentController.setUnitsType(unitSelected);
    this.TradeOrderListController.setUnitsType(unitSelected);
  }

  changePrice(v, fromValue) {
    let initPrice = this.view.state.priceInit,
      prices = this.store.state.prices,
      priceBank = {
        CNY: initPrice / prices.price * prices.priceCN,
        USD: initPrice / prices.price * prices.priceEN,
      }
    ;
    this.view.setState({
      priceBank
      // inputValue: priceBank[v] || initPrice
    })
    if (this.view.state.inputSellFlag || this.view.state.inputBuyFlag) {
      let toValue = this.store.state.prices[v === 'CNY' && 'priceCN' || (v === 'USD' && 'priceEN' || 'price')],
        inputSellValue, inputBuyValue;
      this.view.state.inputSellFlag && (inputSellValue = this.view.state.inputSellValue / fromValue * toValue);
      this.view.state.inputBuyFlag && (inputBuyValue = this.view.state.inputBuyValue / fromValue * toValue);
      console.log('inputSellValue', inputSellValue, inputBuyValue)
      this.view.statehandleValue = this.view.state.inputValue / fromValue * toValue
      this.view.setState({
        inputSellValue,
        inputBuyValue
      });
    }
  }

  changeMaxNum(t, v) {
    (t === 1) && (this.view.setState({sellMax: this.view.state.sellWallet}));
    (t === 0) && (this.view.setState({buyMax: this.view.state.buyWallet / v}))
    if (this.view.state.buyNumFlag && (t === 0)) {
      let limit = v.split('.')[1] && v.split('.')[1].length || 0;
      this.view.setState({inputBuyNum: Number(this.view.state.buyWallet.div(v)).toFixedWithoutUp(8 - limit)})
    }
    // if(this.view.state.sellNumFlag && (t === 1)){
    //   this.view.setState({inputSellNum: this.view.state.sellWallet / v})
    // }
  }

  async dealTrade(orderType,e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.view.state.fundPwdInterval === -1){
      this.view.setState(
          {
            dealPopMsg:'请设置资金密码',
            dealPassType:'positi',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          }
      );
      return
    }
    if(Number(orderType === 'buy' ? this.view.state.inputBuyNum : this.view.state.inputSellNum) < this.store.state.coinMin){
      this.view.setState(
          {
            dealPopMsg:'不能低于最小交易量',
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          });
      return
    }
    let sellPriceValue = this.view.state.inputSellFlag ? (this.view.state.inputSellValue) : (this.view.state.priceBank[this.view.state.PriceUnit] || this.view.state.priceInit);
    let buyPriceValue = this.view.state.inputBuyFlag ? (this.view.state.inputBuyValue) : (this.view.state.priceBank[this.view.state.PriceUnit] || this.view.state.priceInit);
    let params = {
      // token: this.userController.userToken,
      userId: this.userController.userId,
      token: this.userController.userToken,
      "orderType": orderType === 'buy' ? 0 : 1,//0买 1 卖
      "priceType": this.view.state.DealEntrustType,//0限价  1市价
      "price": Number(orderType === 'buy' ? buyPriceValue : sellPriceValue),//价格
      "count": Number(orderType === 'buy' ? this.view.state.inputBuyNum : this.view.state.inputSellNum),//数量
      "tradePairId": this.TradeMarketController.tradePair.tradePairId,
      "tradePairName": this.TradeMarketController.tradePair.tradePairName,
      "funpass": orderType === 'buy' ? this.view.state.funpassBuy : this.view.state.funpassSell,//资金密码
      "interval": this.view.state.fundPwdInterval,// 0:每次都需要密码 1:2小时内不需要 2:每次都不需要
      "priceUnit": this.view.state.PriceUnit === 'cny' && 1 || (this.view.state.PriceUnit === 'usd' && 2 || 0)//计价单位  0数字币  1人民币 2美元
      // this.view.state.PriceUnit || this.view.state.Market
    };
    
    let result = await this.store.dealTrade(params);
    if(result === null){
      this.view.setState(
          {
            dealPopMsg:'下单成功',
            dealPassType:'positi',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
            inputSellNum: 0, // 数量清空
            inputBuyNum: 0,
          }
      );
    }
    if(result && result.wrongTime < 5){
      this.view.setState(
          {
            // dealPopMsg: this.intl.get('passError'),
            dealPopMsg: '下单成功123',
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          }
      );
    }
    if(result && result.wrongTime >=5){
      this.view.setState(
          {
            dealPopMsg:'资金密码错误超过5次,已锁定',
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          }
      );
    }
    if(!this.view.state.fundPwdInterval){
      this.view.setState(
          {
            funpassBuy:'',
            funpassSell:'',
          }
      )
    }
    // }
    // await this.store.dealTrade(v);
  }

  async getFundPwdInterval() {
    let fundPwdInterval = await this.userController.getFundPwdInterval();
    this.view.setState({
      fundPwdInterval: fundPwdInterval.mode
    })
  }

  //设置可用额度
  setWallet(sellWallet, buyWallet) {
    // console.log('setWallet(buyWallet, sellWallet)', buyWallet, sellWallet, this.view)
    this.store.setWallet(buyWallet, sellWallet)
    this.view.setState({
      sellWallet,
      buyWallet
    })
  }
  // 获取最小额度
  async getCoinMinTrade(){
    let result = this.store.getCoinMinTrade();
    this.view.setState(
        {coinMinTrade: result}
    )
  }
  
  coinMinTradeHandle(coin){
    let coinMinTrade = this.store.state.coinMinTrade;
    let coinMinItem = coinMinTrade.find(v => v.coinName === coin);
    this.store.state.coinMin = coinMinItem.minTrade;
    this.view.setState({
      coinMin:coinMinItem.minTrade
    })
  }
}