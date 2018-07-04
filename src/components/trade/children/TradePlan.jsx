import ExchangeViewBase from '../../ExchangeViewBase'
import React, {Component} from "react";
import SelectButton from "../../../common/component/SelectButton";
import TradeDealExchange from './TradeDealExchange.jsx'
import '../stylus/tradePlan.styl'


export default class TradePlan extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      buyMax: 0,
      sellMax: 0,
      buyWallet: 123,
      sellWallet: 321,
      DealEntrustType: 0,
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
      UnitSelected: this.intl.get('deal-digital')
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

    // this.setState({
    //   inputValue:this.props.prices[this.props.PriceUnit === 'CNY' && 'priceCN' || (this.props.PriceUnit === 'USD' && 'priceEN' || 'price')]
    // })
  }

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

  render() {
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
                                 wallet={index ? this.state.sellWallet : this.state.buyWallet}
                                 priceInput={this.priceInput.bind(this)}
                                 numInput={this.numInput.bind(this)}
                                 dealTrade={this.dealTrade.bind(this)}
              />

            )
          })}
          {/*<TradeDealExchange PriceUnit ={this.state.PriceUnit} NumUnit ={this.state.NumUnit}/>*/}
        </div>

      </div>)
  }
}