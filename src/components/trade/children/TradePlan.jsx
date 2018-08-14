import ExchangeViewBase from '../../ExchangeViewBase'
import React, {Component} from "react";
import SelectButton from "../../../common/component/SelectButton";
import TradeDealExchange from './TradeDealExchange.jsx';
import TradePopup from '../../../common/component/TradePopup/index.jsx'
import '../stylus/tradePlan.styl'


export default class TradePlan extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      marketBuyMax: 0,// 市价最大数量
      coinChargeFlag: false, // 币种充币开关
      marketChargeFlag: false, // 币种充币开关
      priceLimit : 6, // 价格精度限制
      numLimit: 2, // 数量精度限制
      marketChangePrice:0,
      changeBankPriceB:0, //买入价格输入框实时汇率
      changeBankPriceS:0,//卖入价格输入框实时汇率
      dbPrePass:false, // 免输资金密码二次点击
      dbPreOrder:true, // 下单二次点击
      dealPopMsg:'',// 弹窗信息
      dealPassType:'positi',// 弹窗类型倾向
      dealPass:false,// 下单弹窗
      fundPwdIntervalClick:0, // 免输密码选中状态
      fundPwdIntervalShow: 0, // 免输密码框显示
      fundPwdInterval: '', // 密码间隔
      funpass: '',
      funpassBuy:'',
      funpassSell:'',
      buyMax: 0, // 买入最大数量
      sellMax: 0,
      buyWallet: 0, //买入可用余额
      sellWallet: 0, //卖出可用余额
      DealEntrustType: 0,// 委托类型
      PassType: '',
      Market: '',
      Coin: '',
      inputValue: 0,
      inputSellValue: 0,
      inputBuyValue: 0,
      inputBuyFlag: false,
      inputSellFlag: false,
      dealType: 0,
      inputSellNum: 0,
      inputBuyNum: 0,
      sellNumFlag: false,
      userVerify:false,
      buyNumFlag: false,
      DealEntrust: [{name: `${this.intl.get('deal-limit')}`, type: 0}, {name: `${this.intl.get('deal-market')}`, type: 1}],
      ControllerProps: [{name: `${this.intl.get('buy')}`, tradeType: 'buy', dealType: 0}, {name: `${this.intl.get('sell')}`, tradeType: 'sell', dealType: 1},],
      UnitSelected: this.intl.get('deal-digital'),
      fundPwdIntervalWindow: [{id: 'pwd_e', value: 0, label:this.intl.get('deal-every')}, {id: 'pwd_2', value: 1, label:this.intl.get('deal-2h')}, {id: 'pwd_n', value: 2, label:this.intl.get('deal-never')}],
      fundPwdIntervalWindowFlag: false,
      fundPwdIntervalSetFlag: false,
      setPass: '',
      dealSurePop: false,//下单确认弹窗
      dealOrderType: 0,//下单类型
      dealSure: [{title:this.intl.get('deal-sure-buy'),
      price:this.intl.get('deal-sure-buy-price'),volume: this.intl.get("deal-sure-buy-volume")},{title:this.intl.get('deal-sure-sell'),
        price:this.intl.get("deal-sure-sell-price"),volume: this.intl.get("deal-sure-sell-volume")}],
      dealSurePriceL: 0, //买入法币价格
      dealSurePriceD: 0, //买入数字币价格
      dealSureVolume: 0, //买入数量
      dealSureFlag: false, // 下单确认
      dealBank: {}
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.setPriceInit = controller.setPriceInit.bind(controller);
    this.dealTrade = controller.dealTrade.bind(controller)
    this.changeUnit = controller.changeUnit.bind(controller);
    this.changeMaxNum = controller.changeMaxNum.bind(controller);
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.controller.getFundPwdInterval();
    this.props.controller.getCoinMinTrade();
    this.props.controller.getCharge();
  }
//切换市价委托/限价委托
  changeEntrustType(v) {
    this.setState({
      DealEntrustType: v.type,
      inputBuyNum: 0,
      inputSellNum: 0
    })
  }

  numInput(dealType,type, e) {
    let diffArr = [{
      inputValue: 'inputBuyValue',
      wallet: 'buyWallet',
      setValue: 'inputBuyNum',
      max: 'buyMax',
      changeBank: 'changBankPriceB',
      marketMax: 'marketBuyMax'
    }, {
      inputValue: 'inputSellValue',
      wallet: 'sellWallet',
      setValue: 'inputSellNum',
      max: 'sellMax',
      changeBank: 'changBankPriceS',
      marketMax: 'marketSellMax'
    }];
    // console.log('his.state.buyNumFlag', this.state.buyNumFlag, this.state, diffArr[dealType].max)
    this.setState({buyNumFlag: false, sellNumFlag: false});
    let maxNum = this.state.DealEntrustType ? this.state[diffArr[dealType].marketMax] : this.state[diffArr[dealType].max];
    let priceValue = this.state.DealEntrustType ? this.state.marketChangePrice : (this.state[diffArr[dealType].inputValue]);
    // if(this.state.DealEntrustType === 0 && (this.state.PriceUnit === 'CNY' || this.state.PriceUnit === 'USD')){
    //   priceValue = this.state[diffArr[dealType].changeBank] || this.state.priceInit
    // }
    // console.log(this.state[diffArr[dealType].inputValue],789456,this.state.priceInit)
    let value = e.target.value;
    let limitNum = value.split('.');
    if(limitNum.length > 2)
      return
    
    limitNum[1] = limitNum[1] || '';
    // console.log('limitNum[1]1',limitNum[1])
    if(maxNum < this.state.coinMin){
        this.setState(
            {
              dealPopMsg: this.intl.get('deal-num-limited'),
              dealPassType: 'passive',// 弹窗类型倾向
              dealPass: true,// 下单弹窗
            }
        )
        return
    }
    if (!((/^[0-9]*$/).test(limitNum[0]) && (/^[0-9]*$/).test(limitNum[1])))
      return
    // if(limitNum[1].length > 8 - (limitPrice[1] && limitPrice[1].length || 0))
    //   return

    // let flag =  type ? ((priceValue > 100 && (/^[0-9]{0,6}$/).test(limitNum[1]))
    //     || (priceValue > 0.1 && priceValue <= 100 && (/^[0-9]{0,4}$/).test(limitNum[1]))
    //         || (priceValue >= 0.01 && priceValue <= 0.1 && (/^[0-9]{0,2}$/).test(limitNum[1]))
    //         || (priceValue < 0.01 && (/^[0-9]{0,0}$/).test(limitNum[1]))) : true;
    let numLimit = this.state.numLimit;
    let reg = new RegExp(`^[0-9]{0,${numLimit}}$`);
    let flag =  type ? reg.test(limitNum[1]) : true;
    if(!flag)
      return
  
    // console.log('his.state.buyNumFlag', flag)
    // let limitPrice = 0;
    // priceValue >= 100 && (limitPrice = 6);
    // priceValue >= 0.1 && priceValue < 100 && (limitPrice = 4);
    // priceValue >= 0.01 && priceValue < 0.1 && (limitPrice = 2);
    let numValue = e.target.value > maxNum ? maxNum.toFixedWithoutUp(numLimit) : value;
    if(type) {
      dealType ? (this.setState({inputSellNum: numValue})) : (this.setState({inputBuyNum: numValue}))
      dealType ? (numValue>= maxNum.toFixedWithoutUp(numLimit) && this.setState({sellNumFlag: true}))
          : (numValue>= maxNum.toFixedWithoutUp(numLimit) && (this.props.controller.store.state.buyNumFlag = true) && this.setState({buyNumFlag: true}))
    } else {
      // let a = Number(numValue).formatFixNumberForAmount(Number(priceValue));
      // let b = a.split(',');
      // let c;
      // b.length > 1 && (c = b.join(''));
      // dealType ? (this.setState({inputSellNum: c && Number(c) || Number(numValue).formatFixNumberForAmount(Number(priceValue))})) : (this.setState({inputBuyNum: c && Number(c) || Number(numValue).formatFixNumberForAmount(Number(priceValue))}))
      // dealType ? (e.target.value >= maxNum && this.setState({sellNumFlag: true})) : (e.target.value >= maxNum && this.setState({buyNumFlag: true}))
      
      dealType ? (this.setState({inputSellNum: Number(numValue).toFixedWithoutUp(numLimit)})) : (this.setState({inputBuyNum: Number(numValue).toFixedWithoutUp(numLimit)}));
      dealType ? (numValue >= maxNum.toFixedWithoutUp(numLimit) && this.setState({sellNumFlag: true})) : (numValue >= maxNum.toFixedWithoutUp(numLimit) && (this.props.controller.store.state.buyNumFlag = true) && this.setState({buyNumFlag: true}))
    }
  }

  priceInput(dealType, e) {
    let value = e.target.value;
    let arr = value.split('.');
    // console.log('ChangePrice 0.3', arr, arr.length)
    if (arr.length > 2)
      return
    arr[1] = arr[1] || ''
    // console.log('ChangePrice 0.6', !((/^[0-9]*$/).test(arr[0]) && (/^[0-9]*$/).test(arr[1] || '')))
    if (!((/^[0-9]*$/).test(arr[0]) && (/^[0-9]*$/).test(arr[1])))
      return
    // console.log('ChangePrice', Number(value), arr[0], arr[1], (/^[0-9]{0,4}$/).test(arr[1]), (/^[0-9]{0,6}$/).test(arr[1]), (/^[0-9]{0,8}$/).test(arr[1]))
    let priceLimit = this.state.priceLimit;
    let reg = new RegExp(`^[0-9]{0,${priceLimit}}$`);
    // let flag = (Number(value) >= 100 && (/^[0-9]{0,2}$/).test(arr[1]))
    //     || ((Number(value) < 100 && (/^[0-9]{0,4}$/).test(arr[1]))
    //         || (Number(value) < 0.1 && (/^[0-9]{0,6}$/).test(arr[1]))
    //         || (Number(value) < 0.01 && (/^[0-9]{0,8}$/).test(arr[1])));
    let flag = reg.test(arr[1]);
    // console.log('ChangePrice 0.5',flag,this.state.PriceUnit)
    if(this.state.PriceUnit === 'CNY' || this.state.PriceUnit === 'USD'){
      flag = (/^[0-9]{0,2}$/).test(arr[1])
    }
    if(flag){
      dealType ? (this.setState({
        inputSellValue: value,
        inputSellFlag: true,
        dealType
      })) :
          (this.setState({
            inputBuyValue: value,
            inputBuyFlag: true,
            dealType
          }));
      value && this.changeMaxNum(dealType, value)
    }

  }

  passInput(v,e) {
    if(!v){
      this.setState({funpassBuy: e.target.value})
      return
    }
    this.setState({funpassSell: e.target.value})
  }

  setFunPwdIntervalShow(v){

      this.setState(
          {fundPwdIntervalSetFlag: true,
           fundPwdIntervalClick: v.value
          }
      )

  }
  changeSetPass(e){
    this.setState(
        {
          setPass: e.target.value
        }
    )
  }
  freePwd(){
    this.setState({
      fundPwdIntervalWindowFlag: true
    })
  }
  async setPassSubmit(e){
    e.preventDefault();
    e.stopPropagation();
    let type, pwd;
    type = this.state.fundPwdIntervalClick;
    pwd = this.state.setPass;
    if(pwd === ''){
      this.setState(
          {
            dealPopMsg: this.intl.get('deal-pass-empty'),
            dealPassType: 'passive',// 弹窗类型倾向
            dealPass: true,// 下单弹窗
          }
      );
      return
    }
    this.setState(
        {
          dbPrePass: true
        }
    )
    let result = await this.props.controller.userController.setFundPwdInterval(type, pwd);
    result === null && this.setState(
        {
          fundPwdInterval: type,
          fundPwdIntervalShow: type,
          fundPwdIntervalWindowFlag: false,
          fundPwdIntervalSetFlag: false,
          setPass: '',
          dealPopMsg: this.intl.get('user-setSucc'),
          dealPassType: 'positi',// 弹窗类型倾向
          dealPass: true,// 下单弹窗
          dbPrePass: false
        }
    );
    result && result.errCode === 'FREEZE_PASSWORD' && this.setState(
          {
            dealPopMsg: result.msg,
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
            dbPrePass: false
          }
      );
    
    result && result.errCode === 'PWD_ERROR' && this.setState(
        {
          dealPopMsg:this.intl.get('passError'),
          dealPassType:'passive',// 弹窗类型倾向
          dealPass:true,// 下单弹窗
          dbPrePass: false
        }
    )
  }
  async dealTradeSure(orderType,e){
    e.preventDefault();
    e.stopPropagation();
    let sellPriceValue = this.state.inputSellFlag ? (this.state.inputSellValue) : (this.state.priceBank[this.state.PriceUnit] || this.state.priceInit);
    let buyPriceValue = this.state.inputBuyFlag ? (this.state.inputBuyValue) : (this.state.priceBank[this.state.PriceUnit] || this.state.priceInit);
    let emptyCharge = orderType === 'buy' ? this.state.funpassBuy : this.state.funpassSell;
    let funPwdInterval = await this.props.controller.getFundPwdInterval();
    let params = {
      "orderType": orderType === 'buy' ? 0 : 1,//0买 1 卖
      "priceType": this.state.DealEntrustType,//0限价  1市价
      "price": this.state.DealEntrustType ? 0 : Number(orderType === 'buy' ? buyPriceValue : sellPriceValue),//价格
      "count": Number(orderType === 'buy' ? this.state.inputBuyNum : this.state.inputSellNum),//数量
      "interval": funPwdInterval || 0,// 0:每次都需要密码 1:2小时内不需要 2:每次都不需要
      "priceUnit": this.state.PriceUnit === 'CNY' && 1 || (this.state.PriceUnit === 'USD' && 2 || 0)//计价单位  0数字币  1人民币 2美元
      // "priceUnit": 0
    };
    if(funPwdInterval === -1){
      this.setState(
          {
            dealPopMsg: this.intl.get("pleaseSetFund"),
            dealPassType:'positi',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          }
      );
      return
    }
    //   价格判断不能为空
    if(!params.price && params.priceType === 0){
      this.setState(
          {
            dealPopMsg: this.intl.get("noEmptyPrice"),
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
            inputSellNum: 0, // 数量清空
            inputBuyNum: 0,
          }
      )
      return
    }
    // 数量不能为最小交易量
    if(Number(orderType === 'buy' ? this.state.inputBuyNum : this.state.inputSellNum) < this.state.coinMin){
      this.setState(
          {
            dealPopMsg: this.intl.get("noLowerMiniTradeNum"),
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          });
      return
    }
    if(params.interval === 0 && emptyCharge === ''){
      this.setState(
          {
            dealPopMsg: this.intl.get("deal-pass-empty"),
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          }
      )
      return
    }
    if((params.priceUnit !== 0) && this.state.DealEntrustType === 0 ){
      let sellPriceValue = this.state.inputSellFlag ? (this.state.inputSellValue) : (this.state.priceBank[this.state.PriceUnit] || this.state.priceInit);
      let buyPriceValue = this.state.inputBuyFlag ? (this.state.inputBuyValue) : (this.state.priceBank[this.state.PriceUnit] || this.state.priceInit);
      let legalPrice = Number(orderType === 'buy' ? buyPriceValue : sellPriceValue);
      let transBank = this.state.dealBank;
      let digitalPrice = this.state.PriceUnit === 'CNY' ? Number(Number(legalPrice).div(transBank.priceCN)) : Number(Number(legalPrice).div(transBank.priceEN));
      this.setState(
          {
            dealOrderType: orderType === 'buy' ? 0 : 1,
            dealSurePop: true,
            dealSurePriceL: legalPrice,
            dealSurePriceD: digitalPrice,
            dealSureVolume: Number(orderType === 'buy' ? this.state.inputBuyNum : this.state.inputSellNum)
          }
      );
      return
    }
      this.dealTrade(orderType,e)
  }
  //法币下单确认弹窗
  dealTradeConfirm(e){
    e.preventDefault();
    e.stopPropagation();
    let orderType = this.state.dealOrderType ? 'sell' : 'buy';
   this.setState({dealSureFlag: true},
       );
    this.dealTrade(orderType,e)
  }
  //滑动尺节点点击
  rangeItemsSelect(dealType, index, e){
    e.preventDefault();
    e.stopPropagation();
    let diffArr = [{
      // inputValue: 'inputBuyValue',
      // wallet: 'buyWallet',
      // setValue: 'inputBuyNum',
      max: 'buyMax',
      // changeBank: 'changBankPriceB',
      marketMax: 'marketBuyMax'
    }, {
      // inputValue: 'inputSellValue',
      // wallet: 'sellWallet',
      // setValue: 'inputSellNum',
      max: 'sellMax',
      // changeBank: 'changBankPriceS',
      marketMax: 'marketSellMax'
    }];
    
    // console.log('his.state.buyNumFlag', this.state.buyNumFlag, this.state, diffArr[dealType].max)
    this.setState({buyNumFlag: false, sellNumFlag: false});
    let maxNum = this.state.DealEntrustType ? this.state[diffArr[dealType].marketMax] : this.state[diffArr[dealType].max];
    if(maxNum < this.state.coinMin){
      this.setState(
          {
            dealPopMsg: this.intl.get('deal-num-limited'),
            dealPassType: 'passive',// 弹窗类型倾向
            dealPass: true,// 下单弹窗
          }
      )
      return
    }
    let numValue = maxNum * 0.25 * index;
    let numLimit = this.state.numLimit;
    dealType ? (this.setState({inputSellNum: Number(numValue).toFixedWithoutUp(numLimit)})) : (this.setState({inputBuyNum: Number(numValue).toFixedWithoutUp(numLimit)}));
    dealType ? (index === 4 && this.setState({sellNumFlag: true})) : (index === 4 && (this.props.controller.store.state.buyNumFlag = true) && this.setState({buyNumFlag: true}))
  }
  render() {
    // console.log('交易市场', this.state)
    return (
      <div className='trade-plan-deal'>
        <div className='deal-entrust'>
          {this.state.DealEntrust.map((v, index) => {
            return (
              <span key={index} className={this.state.DealEntrustType === v.type ? 'entrust-active' : ''}
                    onClick={this.changeEntrustType.bind(this, v)}>{v.name}</span>
            )
          })}
          <div style={{float: 'right', marginRight: '.1rem'}} className="pop-parent">
            <SelectButton
              title={this.state.UnitSelected}
              type="trade"
              className="select"
              valueArr={[`${this.intl.get('deal-digital')}`, "CNY", "USD"]}
              onSelect={(e) => {
                this.changeUnit(e,this.intl.get('deal-digital'))
              }}
            />
            <em className="pop-children rightpop-children">{this.intl.get("deal-price-tip")}</em>
          </div>

        </div>
        <div className='trade-deal-exchanged'>
          {this.state.ControllerProps.map((v, index) => {
            return (
              <TradeDealExchange PriceUnit={this.state.PriceUnit} NumUnit={this.state.NumUnit} key={index}
                                 ControllerProps={v} steadUnitP={this.state.Market} steadUnitN={this.state.Coin}
                                 prices={this.state.prices} Market={this.state.Market}
                                 avalue={this.state.inputSellFlag ? (this.state.inputSellValue) : (this.state.priceBank[this.state.PriceUnit] || this.state.priceInit)}
                                 bvalue={this.state.inputBuyFlag ? (this.state.inputBuyValue) : (this.state.priceBank[this.state.PriceUnit] || this.state.priceInit)}
                                 sellNum={this.state.inputSellNum}
                                 buyNum={this.state.inputBuyNum}
                                 buyMax={this.state.buyMax}
                                 sellMax={this.state.sellMax}
                                 marketBuyMax={this.state.marketBuyMax}
                                 marketSellMax={this.state.marketSellMax}
                                 // funpass={this.state.funpass}
                                 funpassBuy={this.state.funpassBuy}
                                 funpassSell={this.state.funpassSell}
                                 wallet={index ? this.state.sellWallet : this.state.buyWallet}
                                 priceInput={this.priceInput.bind(this)}
                                 numInput={this.numInput.bind(this)}
                                 dealTrade={this.dealTradeSure.bind(this)}
                                 passInput={this.passInput.bind(this)}
                                 rangeItemsSelect={this.rangeItemsSelect.bind(this)}
                                 fundPwdInterval={this.state.fundPwdInterval}
                                 fundPassVerify={this.state.fundPwdInterval<0}
                                 DealEntrustType={this.state.DealEntrustType}
                                 freePwd={this.freePwd.bind(this)}
                                 coinChargeFlag={this.state.coinChargeFlag}
                                 marketChargeFlag={this.state.marketChargeFlag}
              />

            )
          })}
          {/*<TradeDealExchange PriceUnit ={this.state.PriceUnit} NumUnit ={this.state.NumUnit}/>*/}
        </div>
        <div className='deal-set-pwd' style={{display: this.state.fundPwdIntervalWindowFlag ? 'block' : 'none'}}>
          <div className='deal-pwd-detail'>
            <div className='deal-pwd-title'>
              {this.state.fundPwdIntervalSetFlag && this.intl.get('deal-identify')||this.intl.get('deal-timeSetting')}
              <em onClick={() => this.setState({fundPwdIntervalWindowFlag: false, fundPwdIntervalSetFlag: false, setPass: ''})} style={{cursor: 'pointer'}}></em>
            </div>
            <div className='deal-pwd-content'>
                {this.state.fundPwdIntervalSetFlag && (
                    <div>
                      <div className='set-pwd-msg'>
                        {this.intl.get('deal-inputpwdplease')}
                      </div>
                      <p className='set-pwd-input'>
                        <span>{this.intl.get('fundPass')}:</span>
                        <input type="password" className='set-pwd' onChange={this.changeSetPass.bind(this)} value={this.state.setPass} autoFocus/>
                        <input type="button" value={this.intl.get('user-submit')} className='set-pwd-sub' onClick={this.setPassSubmit.bind(this)} style={{cursor: 'pointer'}} disabled={this.state.dbPrePass}/>
                      </p>
                    </div>
                ) || this.state.fundPwdIntervalWindow.map((v, index) => {
                  return(
                      <div className="choice" key={index}>
                        <input type="radio" className='pwd-radio' name='pwd-Radio' value={v.value} id={v.id} checked={this.state.fundPwdInterval === v.value ? true : false} onChange={this.setFunPwdIntervalShow.bind(this,v)}/><label htmlFor={v.id}>{v.label}</label>
                      </div>
                  )
                })}
            </div>
          </div>
        </div>
        <div className='deal-pop'>
          {this.state.dealPass && <TradePopup theme={this.state.dealPassType} msg={this.state.dealPopMsg} onClose={() => {this.setState({ dealPass: false });}} className='deal-pop-location'/>}
        </div>
        <div className='deal-login-shadow' style={{display:this.props.controller.userController.userId ? 'none' : 'block'}}>
          <p>
            <a href="/login/">{this.intl.get('deal-login')}</a>
            <span>{this.intl.get('deal-after')}</span>
          </p>
        </div>
        <div className='deal-exchange-pop' style={{display: this.state.dealSurePop ? 'block' : 'none'}}>
          <div className='deal-exchange-pop-detail'>
            <div className='deal-exchange-pop-title'>
              {this.state.dealSure[this.state.dealOrderType].title}
            </div>
            <div className='deal-exchange-pop-content'>
              <p>{this.state.dealSure[this.state.dealOrderType].price}:
                <span style={{color: this.state.dealOrderType ? '#F25656' : '#2BB789'}}>{Number(this.state.dealSurePriceD.toFixed(this.state.priceLimit))} </span>
                <em>{`(${this.intl.get('deal-convert-into')}${this.state.dealSurePriceL.format({number: 'legal',style:{name:this.state.PriceUnit && this.state.PriceUnit.toLowerCase()}})}${this.state.PriceUnit})`}</em>
              </p>
              <p>{this.state.dealSure[this.state.dealOrderType].volume}:
                <span style={{color: this.state.dealOrderType ? '#F25656' : '#2BB789'}}>{this.state.dealSureVolume.formatFixNumberForAmount(this.state.numLimit, false)}</span>
                <em>{this.state.NumUnit.toUpperCase()}</em>
              </p>
              <div className='deal-exchange-pop-button'>
                <button onClick={this.dealTradeConfirm.bind(this)}>{this.intl.get('deal-sure-order')}</button>
                <button className='deal-exchange-pop-exit' onClick={() => {this.setState({dealSureFlag: false,dealSurePop: false,})}}>{this.intl.get('cance')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }
}