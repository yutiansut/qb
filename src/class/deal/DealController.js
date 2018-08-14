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
  setPriceFlag(){
    this.view.setState(
        {
          inputBuyFlag: false,
          inputSellFlag: false
        }
    )
  }
  tradePairHandle(pair, prices, flag) {
    let pairArr = pair.split('/'),
      coin = pairArr[0],
      market = pairArr[1];

    this.view.setState(
      {
        NumUnit: coin,
        Market: market,
        buyNumFlag: false,
        Coin: coin,
        PriceUnit: ['CNY', 'USD'].includes(this.view.state.PriceUnit) && this.view.state.PriceUnit || market,
        priceBank: {
          CNY: Number(prices.priceCN * prices.price).toFixed(2),
          // CNY: Number(prices.priceCN).toFixed(2),
          USD: Number(prices.priceEN * prices.price).toFixed(2)
          // USD: Number(prices.priceEN).toFixed(2)
        },
        dealBank: prices
      }
    );
    // console.log('deal', pair, market)
    if (!['CNY', 'USD'].includes(this.view.state.PriceUnit)) {
      this.TradeMarketController.setUnitsType(market);
      this.userOrderController.setUnitsType(market);
      this.TradeRecentController.setUnitsType(market);
      this.TradeOrderListController.setUnitsType(market);
      this.store.state.PriceUnit = market;
    }

    this.store.state.prices = prices;
    this.store.state.buyNumFlag = false;
    this.setPriceInit(prices, flag);
    this.userOrderController.setInitUnit(market, coin);
    this.TradeRecentController.setInitUnit(market, coin);
    this.TradeOrderListController.setInitUnit(market, coin);
    this.store.state.NumUnit = coin;
    this.coinMinTradeHandle(coin);//最小交易量的处理
    this.getCharge(coin, market)
    // this.changeUnit(market, init)

  }

  orderHandle(prices) {
    this.view.setState({
      prices,
      inputBuyFlag: false,
      inputSellFlag: false,
      priceBank: {
        // CNY: Number(prices.priceCN).toFixed(2),
        CNY: Number(prices.priceCN * prices.price).toFixed(2),
        USD: Number(prices.priceEN * prices.price).toFixed(2)
        // USD: Number(prices.priceEN).toFixed(2)
      },
      dealBank: prices
    });
    this.store.state.prices = prices;
    this.setPriceInit(prices,true);
  }

  // 数字币计价 初始值获取
  setPriceInit(v, flag) {
    flag && this.view.setState({
      priceInit:v.price,
      buyMax:this.view.state.buyWallet / v.price,
      inputSellNum: 0,
      inputBuyNum: 0
      // sellMax:this.view.state.sellWallet
    })
  }
  // 设置市价交易的最大数量值
  setMarketPriceMaxNum(v){
    this.view.setState(
        {marketChangePrice: v.price}
    );
    this.view.setState({
      marketBuyMax: Number(Number(this.view.state.buyWallet).div(v.price)),
      marketSellMax: Number(this.view.state.sellWallet)
    })
  }

  changeUnit(unit, init) {
    let unitObj = {
      'CNY': 'CNY',
      'USD': 'USD',
    };
    unitObj[init] = this.view.state.Market;
    let fromValue = (this.store.state.prices.price || 1) * (this.store.state.PriceUnit === 'CNY' ? this.store.state.prices.priceCN : (this.store.state.PriceUnit === 'USD' && this.store.state.prices.priceEN || 1));
    let unitSelected = unitObj[unit];
    this.store.state.PriceUnit = unitSelected;
    this.view.setState({
      PriceUnit: unitSelected,
      UnitSelected: unit
    },this.changePrice(unitSelected, fromValue));
    // this.changePrice(unitSelected, fromValue);
    this.TradeOrderListController.setChangeFlagClose();
    this.store.state.PriceUnit = unitSelected;
    this.TradeMarketController.setUnitsType(unitSelected);
    this.userOrderController.setUnitsType(unitSelected);
    this.TradeRecentController.setUnitsType(unitSelected);
    this.TradeOrderListController.setUnitsType(unitSelected);
    // this.changeMaxNum(1, this.view.state.priceBank[this.store.state.PriceUnit] || this.view.state.priceInit)
    // this.changeMaxNum(0, this.view.state.priceBank[this.store.state.PriceUnit] || this.view.state.priceInit)
  }

  changePrice(v, fromValue) {
    let prices = this.store.state.prices,
        initPrice = prices.price,
      priceBank = {
        CNY: Number(prices.priceCN * prices.price).toFixedWithoutUp(2),
        USD: Number(prices.priceEN * prices.price).toFixedWithoutUp(2),
      }
    ;
    this.view.setState({
      priceBank,
      initPrice: prices.price
    });
    if (this.view.state.inputSellFlag || this.view.state.inputBuyFlag) {
      let toValue = (this.store.state.prices.price || 1) * (v === 'CNY' ? this.store.state.prices.priceCN : (v === 'USD' && this.store.state.prices.priceEN || 1)),
        inputSellValue, inputBuyValue;
      this.view.state.inputSellFlag && (inputSellValue = this.view.state.inputSellValue / fromValue * toValue);
      this.view.state.inputBuyFlag && (inputBuyValue = this.view.state.inputBuyValue / fromValue * toValue);
      let checkValue = inputSellValue || inputBuyValue;
      let checkNum = this.view.state.priceLimit;
      let limitedValue = (v === 'CNY' || v === 'USD') ? 2 : checkNum;
          this.view.statehandleValue = this.view.state.inputValue / fromValue * toValue;
      this.view.state.inputSellFlag && (inputSellValue = inputSellValue.toFixed(limitedValue));
      this.view.state.inputBuyFlag && (inputBuyValue = inputBuyValue.toFixed(limitedValue));
      this.view.setState({
            inputSellValue,
            inputBuyValue
      });
    }
  }

  changeMaxNum(t, v) {
    let a = Number(v) ? v : 0.000001;
    let changeBankPrice = this.store.state.PriceUnit === "CNY" ? (a * this.store.state.prices.price / this.store.state.prices.priceCN) :(this.store.state.PriceUnit === "USD" && (a * this.store.state.prices.price / this.store.state.prices.priceEN) || a);
    (t === 1) && (this.view.setState({sellMax: this.view.state.sellWallet}));
    (t === 0) && (this.view.setState({buyMax: this.view.state.buyWallet / changeBankPrice}));
    if(this.store.state.PriceUnit === "CNY" || this.store.state.PriceUnit === "USD") {
      t === 1 && (this.view.setState({changBankPriceS : changeBankPrice}));
      t === 0 && (this.view.setState({changBankPriceB : changeBankPrice}))
    }
    if (this.store.state.buyNumFlag && (t === 0)) {
      let checkNum = this.view.state.numLimit;
      this.view.setState({
        inputBuyNum: Number(this.view.state.buyWallet.div(changeBankPrice)).toFixedWithoutUp(checkNum)})
    }
    
  }

  async dealTrade(orderType,e) {
    // e.persist()
    // e.preventDefault();
    // e.stopPropagation();
    // e.preventDefault();
    // e.stopPropagation();
    
  
   
    // if(this.view.state.fundPwdInterval === -1){
    //   this.view.setState(
    //       {
    //         dealPopMsg: this.view.intl.get("pleaseSetFund"),
    //         dealPassType:'positi',// 弹窗类型倾向
    //         dealPass:true,// 下单弹窗
    //       }
    //   );
    //   return
    // }
    let funPwdInterval = await this.getFundPwdInterval();
    let numLimit = this.view.state.numLimit;
    let priceLimit = this.view.state.priceLimit;
    let sellPriceValue = (this.view.state.PriceUnit === 'CNY' || this.view.state.PriceUnit === 'USD') ? (this.view.state.dealSurePriceD.toFixed(priceLimit)) :(this.view.state.inputSellFlag ? (this.view.state.inputSellValue) : (this.view.state.priceBank[this.view.state.PriceUnit] || this.view.state.priceInit));
    let buyPriceValue = (this.view.state.PriceUnit === 'CNY' || this.view.state.PriceUnit === 'USD')?(this.view.state.dealSurePriceD.toFixed(priceLimit)) :(this.view.state.inputBuyFlag ? (this.view.state.inputBuyValue) : (this.view.state.priceBank[this.view.state.PriceUnit] || this.view.state.priceInit));
    // let emptyCharge = orderType === 'buy' ? this.view.state.funpassBuy : this.view.state.funpassSell
    let params = {
      token: this.userController.userToken,
      "orderType": orderType === 'buy' ? 0 : 1,//0买 1 卖
      "priceType": this.view.state.DealEntrustType,//0限价  1市价
      "price": this.view.state.DealEntrustType ? 0 : Number(orderType === 'buy' ? buyPriceValue : sellPriceValue),//价格
      "count": Number(orderType === 'buy' ? this.view.state.inputBuyNum : this.view.state.inputSellNum),//数量
      "tradePairId": this.TradeMarketController.tradePair.tradePairId,
      "tradePairName": this.TradeMarketController.tradePair.tradePairName,
      "funpass": funPwdInterval ? '' :orderType === 'buy' ? this.RSAencrypt(this.view.state.funpassBuy) : this.RSAencrypt(this.view.state.funpassSell),//资金密码
      "interval": funPwdInterval || 0,// 0:每次都需要密码 1:2小时内不需要 2:每次都不需要
      // "priceUnit": this.view.state.PriceUnit === 'CNY' && 1 || (this.view.state.PriceUnit === 'USD' && 2 || 0)//计价单位  0数字币  1人民币 2美元
      "priceUnit": 0
    };
   
   // if((this.view.state.PriceUnit === 'CNY' || this.view.state.PriceUnit === 'USD') &&this.view.state.DealEntrustType === 0 ){
   //   let legalPrice = Number(orderType === 'buy' ? buyPriceValue : sellPriceValue);
   //   let transBank = this.store.state.prices;
   //   let digitalPrice = this.view.state.PriceUnit === 'CNY' ? Number(Number(legalPrice).div(transBank.priceCN)) : Number(Number(legalPrice).div(transBank.priceEN));
   //   this.view.setState(
   //       {
   //         dealOrderType: orderType === 'buy' ? 0 : 1,
   //         dealSurePop: true,
   //         dealSurePriceL: legalPrice,
   //         dealSurePriceD: digitalPrice,
   //         dealSureVolume: Number(orderType === 'buy' ? this.view.state.inputBuyNum : this.view.state.inputSellNum)
   //       }
   //   );
   // }
    
    // //   价格判断不能为空
    // if(!params.price && params.priceType === 0){
    //   this.view.setState(
    //       {
    //         dealPopMsg: this.view.intl.get("noEmptyPrice"),
    //         dealPassType:'passive',// 弹窗类型倾向
    //         dealPass:true,// 下单弹窗
    //         inputSellNum: 0, // 数量清空
    //         inputBuyNum: 0,
    //       }
    //   )
    //   return
    // }
    // // 数量不能为最小交易量
    // if(Number(orderType === 'buy' ? this.view.state.inputBuyNum : this.view.state.inputSellNum) < this.store.state.coinMin){
    //   this.view.setState(
    //       {
    //         dealPopMsg: this.view.intl.get("noLowerMiniTradeNum"),
    //         dealPassType:'passive',// 弹窗类型倾向
    //         dealPass:true,// 下单弹窗
    //       });
    //   return
    // }
    // 判断数量精度
    let limitNum = params.count.toString().split('.');
    let limitPrice = params.price.toString().split('.')
    limitNum[1] = limitNum[1] || '';
    limitPrice[1] = limitPrice[1] || '';
   
    let regN = new RegExp(`^[0-9]{0,${numLimit}}$`);
    let regP = new RegExp(`^[0-9]{0,${priceLimit}}$`);
    let flagN =   regN.test(limitNum[1]) ;
    let flagP =   regP.test(limitPrice[1]) ;
    // let numLimited =
    // let numLimited =  (params.price >= 100 && (/^[0-9]{0,6}$/).test(limitNum[1]))
    //     || (params.price >= 0.1 && params.price < 100 && (/^[0-9]{0,4}$/).test(limitNum[1]))
    //     || (params.price >= 0.01 && params.price < 0.1 && (/^[0-9]{0,2}$/).test(limitNum[1]))
    //     || (params.price < 0.01 && (/^[0-9]{0,0}$/).test(limitNum[1]));
    if(!(flagN && flagP)){
      this.view.setState(
          {
            // dealPopMsg: this.intl.get('passError'),
            dealPopMsg: this.view.intl.get('deal-num-err'),
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          }
      );
      return
    }
    // if(params.interval === 0 && emptyCharge === ''){
    //   this.view.setState(
    //       {
    //         dealPopMsg: this.view.intl.get("deal-pass-empty"),
    //         dealPassType:'passive',// 弹窗类型倾向
    //         dealPass:true,// 下单弹窗
    //       }
    //   )
    //   return
    // }
    if(!this.view.state.dbPreOrder)
      return
    this.view.setState({
      dbPreOrder: false
    })
    let result = await this.store.dealTrade(params);
    this.view.setState({
      dbPreOrder:true,
      dealSurePop: false
    });
    if(result === null && funPwdInterval > 0){
      this.view.setState(
          {
            dealPopMsg: this.view.intl.get("orderSuccess"),
            dealPassType:'positi',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
            inputSellNum: 0, // 数量清空
            inputBuyNum: 0,
          }
      );
      return
    }
    if(result === null && funPwdInterval === 0){
      this.view.setState(
          {
            dealPopMsg: this.view.intl.get("orderSuccess"),
            dealPassType:'positi',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
            inputSellNum: 0, // 数量清空
            inputBuyNum: 0,
            funpassBuy: '',
            funpassSell: ''
          }
      );
      return
    }
    if(result && result.errCode === "ErrCodeUnknown"){
     
      this.view.setState(
          {
            dealPopMsg: result.msg,
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
            inputSellNum: 0, // 数量清空
            inputBuyNum: 0,
          }
      )
      return
    }
    if(result && result.ret === 1421){
      this.view.setState(
          {
            dealPopMsg: result.msg,
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
            inputSellNum: 0, // 数量清空
            inputBuyNum: 0,
          }
      )
      return
    }
    if(result && result.ret === 1422){
      this.view.setState(
          {
            dealPopMsg: result.msg,
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
            inputSellNum: 0, // 数量清空
            inputBuyNum: 0,
          }
      )
      return
    }
    if(result && (result.ret === 1412 && params.priceType === 0)){
      this.view.setState(
        {
          // dealPopMsg: this.intl.get('passError'),
          dealPopMsg: this.view.intl.get('asset-not-enough'),
          dealPassType:'passive',// 弹窗类型倾向
          dealPass:true,// 下单弹窗
        }
      );
      return
    }
    if(result && (result.ret === 611 || result.ret === 1416 || (result.ret === 1412 && params.priceType === 1))){
      this.view.setState(
          {
            // dealPopMsg: this.intl.get('passError'),
            dealPopMsg: result.msg,
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          }
      );
      return
    }
    if(result && result.errCode === "PWD_ERROR"){
      this.view.setState(
          {
            // dealPopMsg: this.intl.get('passError'),
            dealPopMsg: result.msg,
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          }
      );
      return
    }
    if(result && result.errCode === 'FREEZE_PASSWORD'){
      this.view.setState(
          {
            dealPopMsg: result.msg,
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          }
      );
      return
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
    return fundPwdInterval.mode
  }

  //设置可用额度
  setWallet(sellWallet, buyWallet) {
    this.store.setWallet(buyWallet, sellWallet)
    this.view.setState({
      sellWallet,
      buyWallet,
      sellMax:sellWallet
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
    this.store.state.coinMin = coinMinItem && coinMinItem.minTrade;
    this.view.setState({
      coinMin:coinMinItem && coinMinItem.minTrade
    })
  }

  setAccuracy(priceAccuracy,volumeAccuracy) {
    this.view.setState(
        {
          priceLimit: priceAccuracy,
          numLimit:volumeAccuracy
        },
    )
    // this.store.state.volumeAccuracy = volumeAccuracy;
    // this.store.state.priceAccuracy = priceAccuracy;
  }
  // 是否可充币处理
  async getCharge(coin, market){
    let result = await this.store.getCharge();
    let coinCharge = result.l.find(v => v.n === coin);
    let marketCharge = result.l.find(v => v.n === market);
    this.view.setState({
      coinChargeFlag: coinCharge && coinCharge.c,
      marketChargeFlag: marketCharge && marketCharge.c
    })
  }
}