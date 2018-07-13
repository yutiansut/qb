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
      dealPopMsg:'',
      dealPassType:'positi',// 弹窗类型倾向
      dealPass:false,// 下单弹窗
      fundPwdIntervalClick:0,
      fundPwdIntervalShow: 0,
      fundPwdInterval: '',
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
      buyNumFlag: false,
      DealEntrust: [{name: `${this.intl.get('deal-limit')}`, type: 0}, {name: `${this.intl.get('deal-market')}`, type: 1}],
      ControllerProps: [{name: `${this.intl.get('buy')}`, tradeType: 'buy', dealType: 0}, {name: `${this.intl.get('sell')}`, tradeType: 'sell', dealType: 1},],
      UnitSelected: this.intl.get('deal-digital'),
      fundPwdIntervalWindow: [{id: 'pwd_e', value: 0, label:this.intl.get('deal-every')}, {id: 'pwd_2', value: 1, label:this.intl.get('deal-2h')}, {id: 'pwd_n', value: 2, label:this.intl.get('deal-never')}],
      fundPwdIntervalWindowFlag: false,
      fundPwdIntervalSetFlag: false,
      setPass: ''
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
    // console.log('componentWillMount', this.state.prices[this.props.PriceUnit === 'CNY' && 'priceCN' || (this.state.PriceUnit === 'USD' && 'priceEN' || 'price')])
  }

  componentDidMount() {
    this.props.controller.getFundPwdInterval()
    // this.setState({
    //   inputValue:this.props.prices[this.props.PriceUnit === 'CNY' && 'priceCN' || (this.props.PriceUnit === 'USD' && 'priceEN' || 'price')]
    // })
  }
//切换市价委托/限价委托
  changeEntrustType(v) {
    this.setState({
      DealEntrustType: v.type
    })
  }

  numInput(dealType, e) {
    let diffArr = [{
      inputValue: 'inputBuyValue',
      wallet: 'buyWallet',
      setValue: 'inputBuyNum',
      max: 'buyMax'
    }, {inputValue: 'inputSellValue', wallet: 'sellWallet', setValue: 'inputSellNum', max: 'sellMax'}];
    // let wallet = this.state[diffArr[dealType].wallet];
    // let price =  dealType ?  this.state.inputSellFlag ? ( this.state.inputSellValue ) : (this.state.priceBank[this.state.PriceUnit] || this.state.priceInit) :this.state.inputBuyFlag ? ( this.state.inputBuyValue ) : (this.state.priceBank[this.state.PriceUnit] || this.state.priceInit);
    let maxNum = this.state[diffArr[dealType].max];
    let numValue = e.target.value >= maxNum ? maxNum : e.target.value;
    dealType ? (this.setState({inputSellNum: numValue})) : (this.setState({inputBuyNum: numValue}))
    dealType ? (e.target.value >= maxNum && this.setState({sellNumFlag: true})) : (e.target.value >= maxNum && this.setState({buyNumFlag: true}))
  }

  priceInput(dealType, e) {
    dealType ? (this.setState({
      inputSellValue: e.target.value,
      inputSellFlag: true,
      dealType
    })) : (this.setState({inputBuyValue: e.target.value, inputBuyFlag: true, dealType}));
    this.changeMaxNum(dealType, e.target.value)
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
  async setPassSubmit(){
    let type, pwd;
    type = this.state.fundPwdIntervalClick;
    pwd = this.state.setPass;
    let result = await this.props.controller.userController.setFundPwdInterval(type, pwd);
    console.log('shezhi111111111111111111111', result, this)
    result === null && this.setState(
        {fundPwdInterval: type, fundPwdIntervalShow: type, fundPwdIntervalWindowFlag: false, fundPwdIntervalSetFlag: false}
    );
    result && result.errCode === 'PWD_ERROR' && this.setState(
        {
          dealPopMsg:'资金密码错误',
          dealPassType:'passive',// 弹窗类型倾向
          dealPass:true,// 下单弹窗
        }
    )
  }
  render() {
    // console.log('设置密码', this.props.controller.userController.userVerify.fundPwd)
    return (
      <div className='trade-plan-deal'>
        <div className='deal-entrust'>
          {this.state.DealEntrust.map((v, index) => {
            return (
              <span key={index} className={this.state.DealEntrustType === v.type ? 'entrust-active' : ''}
                    onClick={this.changeEntrustType.bind(this, v)}>{v.name}</span>
            )
          })}
          <div style={{float: 'right', marginRight: '.1rem'}}>
            <SelectButton
              title={this.state.UnitSelected}
              type="trade"
              className="select"
              valueArr={[`${this.intl.get('deal-digital')}`, "CNY", "USD"]}
              onSelect={(e) => {
                this.changeUnit(e,this.intl.get('deal-digital'))
              }}
            />
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
                                 // funpass={this.state.funpass}
                                 funpassBuy={this.state.funpassBuy}
                                 funpassSell={this.state.funpassSell}
                                 wallet={index ? this.state.sellWallet : this.state.buyWallet}
                                 priceInput={this.priceInput.bind(this)}
                                 numInput={this.numInput.bind(this)}
                                 dealTrade={this.dealTrade.bind(this)}
                                 passInput={this.passInput.bind(this)}
                                 fundPwdInterval={this.state.fundPwdInterval}
                                 fundPassVerify={this.props.controller.userController.userVerify.fundPwd}
                                 DealEntrustType={this.state.DealEntrustType}
                                 freePwd={this.freePwd.bind(this)}
              />

            )
          })}
          {/*<TradeDealExchange PriceUnit ={this.state.PriceUnit} NumUnit ={this.state.NumUnit}/>*/}
        </div>
        <div className='deal-set-pwd' style={{display: this.state.fundPwdIntervalWindowFlag ? 'block' : 'none'}}>
          <div className='deal-pwd-detail'>
            <div className='deal-pwd-title'>
              {this.state.fundPwdIntervalSetFlag && this.intl.get('deal-identify')||this.intl.get('deal-timeSetting')}
              <em onClick={() => this.setState({fundPwdIntervalWindowFlag: false, fundPwdIntervalSetFlag: false})} style={{cursor: 'pointer'}}></em>
            </div>
            <div className='deal-pwd-content'>
                {this.state.fundPwdIntervalSetFlag && (
                    <div>
                      <div className='set-pwd-msg'>
                        {this.intl.get('deal-inputpwdplease')}
                      </div>
                      <p className='set-pwd-input'>
                        <span>{this.intl.get('fundPass')}:</span>
                        <input type="password" className='set-pwd' onChange={this.changeSetPass.bind(this)} value={this.state.setPass}/>
                        <input type="button" value={this.intl.get('user-submit')} className='set-pwd-sub' onClick={this.setPassSubmit.bind(this)}/>
                      </p>
                    </div>
                ) || this.state.fundPwdIntervalWindow.map((v, index) => {
                  return(
                      <div key={index}>
                        <input type="radio" className='pwd-radio' name='pwd-Radio' value={v.value} id={v.id} checked={this.state.fundPwdInterval === v.value ? true : false} onChange={this.setFunPwdIntervalShow.bind(this,v)}/><label htmlFor={v.id}>{v.label}</label>
                      </div>
                  )
                })}
            </div>
          </div>
        </div>
        <div className='deal-pop'>
          {this.state.dealPass && <TradePopup theme={this.state.dealPassType} msg={this.state.dealPopMsg} onClose={() => {
            this.setState({ dealPass: false });
          }} className='deal-pop-location'/>}
        </div>
      </div>)
  }
}