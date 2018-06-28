import ExchangeViewBase from '../../ExchangeViewBase'
import React, {Component} from "react";
import SelectButton from "../../../common/component/SelectButton";
import TradeDealExchange from './TradeDealExchange.jsx'
import '../stylus/tradePlan.styl'

const DealEntrust = [{name: '限价委托', type: 0}, {name: '市价委托', type: 1}];
const ControllerProps = [{name: '买入', tradeType: 'buy', dealType: 0}, {name: '卖出', tradeType: 'sell', dealType: 1},];
export default class TradePlan extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      buyMax:0,
      sellMax:0,
      buyWallet: 123,
      sellWallet: 321,
      DealEntrustType: 0,
      PassType: '',
      Market:'',
      Coin: '',
      inputValue:0,
      inputSellValue:0,
      inputBuyValue:0,
      inputBuyFlag:false,
      inputSellFlag:false,
      dealType: 0,
      inputSellNum:0,
      inputBuyNum:0,
      sellNumFlag:false,
      buyNumFlag:false
      };
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.setPriceInit = controller.setPriceInit.bind(controller);
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
  changeEntrustType(v){
    this.setState({
      DealEntrustType: v.type
    })
  }
  numInput(dealType, e){
    let diffArr = [{inputValue:'inputBuyValue',wallet:'buyWallet',setValue:'inputBuyNum',max:'buyMax'},{inputValue:'inputSellValue',wallet:'sellWallet',setValue:'inputSellNum',max:'sellMax'}];
    // let wallet = this.state[diffArr[dealType].wallet];
    // let price =  dealType ?  this.state.inputSellFlag ? ( this.state.inputSellValue ) : (this.state.priceBank[this.state.PriceUnit] || this.state.priceInit) :this.state.inputBuyFlag ? ( this.state.inputBuyValue ) : (this.state.priceBank[this.state.PriceUnit] || this.state.priceInit);
    let maxNum = this.state[diffArr[dealType].max];
    let numValue = e.target.value >= maxNum ? maxNum : e.target.value;
    dealType ? ( this.setState({inputSellNum: numValue})) : ( this.setState({inputBuyNum: numValue}))
   dealType ? (e.target.value >= maxNum && this.setState({sellNumFlag: true})) :(e.target.value >= maxNum && this.setState({buyNumFlag: true}))
  }
  
  priceInput(dealType,e){
    dealType ? (this.setState({inputSellValue:e.target.value,inputSellFlag:true,dealType})) : (this.setState({inputBuyValue:e.target.value,inputBuyFlag:true,dealType}));
    this.changeMaxNum(dealType,e.target.value)
  }
  render() {
    return (
        <div className='trade-plan-deal'>
          <div className='deal-entrust'>
            {DealEntrust.map((v, index) => {
              return(
                  <span key={index} className={this.state.DealEntrustType === v.type ? 'entrust-active' : ''} onClick={this.changeEntrustType.bind(this, v)}>{v.name}</span>
              )
            })}
            <SelectButton
                title="数字币计价"
                type="main"
                className="select"
                valueArr={["数字币计价", "CNY计价", "USD计价"]}
                onSelect={(e) => {this.changeUnit(e)}}
            />
          </div>
          <div className='trade-deal-exchanged'>
            {ControllerProps.map((v, index) => {
              return(
                  <TradeDealExchange PriceUnit ={this.state.PriceUnit} NumUnit ={this.state.NumUnit} key={index} ControllerProps={v} steadUnitP={this.state.Market} steadUnitN={this.state.Coin} prices={this.state.prices} Market={this.state.Market}
                                     avalue={ this.state.inputSellFlag ? ( this.state.inputSellValue ) : (this.state.priceBank[this.state.PriceUnit] || this.state.priceInit)}
                                     bvalue={ this.state.inputBuyFlag ? ( this.state.inputBuyValue ) : (this.state.priceBank[this.state.PriceUnit] || this.state.priceInit)}
                                     sellNum={this.state.inputSellNum}
                                     buyNum={this.state.inputBuyNum}
                                     buyMax={this.state.buyMax}
                                     sellMax={this.state.sellMax}
                                     wallet={index ? this.state.sellWallet : this.state.buyWallet}
                                     priceInput={this.priceInput.bind(this)}
                                     numInput={this.numInput.bind(this)} />
                                    
              )
            })}
            {/*<TradeDealExchange PriceUnit ={this.state.PriceUnit} NumUnit ={this.state.NumUnit}/>*/}
          </div>
         
        </div>
    )
  }
}