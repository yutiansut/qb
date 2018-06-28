import ExchangeViewBase from '../../ExchangeViewBase'
import React, {Component} from "react";
import Input from "../../../common/component/Input";
import '../stylus/tradeDealExchange.styl'

const rangeItems = [{value:'0%'},{value:'25%'},{value:'50%'},{value:'75%'},{value:'100%'}];
export default class TradeDealExchange extends  ExchangeViewBase{
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }
  componentWillMount() {
  
  }
  
  componentDidMount() {
 
  }
  get priceValue(){
    return this.props.prices[this.props.PriceUnit === 'CNY' && 'priceCN' || (this.props.PriceUnit === 'USD' && 'priceEN' || 'price')] || 0
  }

  // priceInput(e){
  //   console.log(e.target.value,this.props.prices[this.props.PriceUnit === 'CNY' && 'priceCN' || (this.props.PriceUnit === 'USD' && 'priceEN' || 'price')])
  // }
  render(){
    let maxValue = this.props.ControllerProps.dealType ? this.props.sellMax : this.props.buyMax;
    return(
        <div className='trade-deal-exchange'>
          <div className='trade-deal-asset'>
            <div className='deal-asset-wallet'>
              可用:<span>{this.props.wallet}</span>
              <i>
              {this.props.ControllerProps.dealType ? this.props.steadUnitN : this.props.steadUnitP}
            </i>
            </div>
            <div className={`deal-asset-charge deal-asset-charge-${this.props.ControllerProps.tradeType}`}>
              <a href="#">充币</a>
            </div>
          </div>
          <div className='trader-deal-input'>
            <div className='deal-input-label'>价格</div>
            {/*<Input/>*/}
            <input type="text" value={this.props.ControllerProps.dealType ? this.props.avalue : this.props.bvalue} name='price' onChange={this.props.priceInput.bind(this, this.props.ControllerProps.dealType)}/>
            <div className='deal-input-unit'>
              {this.props.PriceUnit || this.props.Market}
            </div>
          </div>
          <div className='trader-deal-input'>
            <div className='deal-input-label'>数量</div>
            {/*<Input/>*/}
            <input type="text" value={this.props.ControllerProps.dealType ? this.props.sellNum : this.props.buyNum} onChange={this.props.numInput.bind(this, this.props.ControllerProps.dealType)}/>
            <div className='deal-input-unit'>
              {this.props.NumUnit}
            </div>
          </div>
          <div className='deal-number-range'>
            <input type="range"  min='0' max={maxValue} step={maxValue/100} className={`r-${this.props.ControllerProps.tradeType}`} value={this.props.ControllerProps.dealType ? this.props.sellNum : this.props.buyNum} onChange={this.props.numInput.bind(this, this.props.ControllerProps.dealType)}/>
            <ul>
              {rangeItems.map((v, index) => {
                return(
                    <li key={index}>
                      {/*{v.value}*/}
                    </li>
                )
              })}
            </ul>
          </div>
          <div className='deal-number-percent'>
            <ul>
              {rangeItems.map((v, index) => {
                return(
                    <li key={index}>
                      {v.value}
                    </li>
                )
              })}
            </ul>
          </div>
          <div className='trade-password clearfix'>
            <div className='trade-password-input'>
              <span>资金密码:</span>
              <input type="password"/>
            </div>
            <p className='password-msg'>
              <span>设置资金密码</span>
              <span>(免输资金密码)</span>
            </p>
          </div>
          <div className='trade-deal-turnover'>
            <span>交易额:</span>
            <em>{this.props.ControllerProps.dealType ? this.props.sellNum * this.props.avalue : this.props.buyNum * this.props.bvalue}</em>
            <i>{this.props.PriceUnit || this.props.Market}</i>
          </div>
          <div className={`trade-deal-button-${this.props.ControllerProps.tradeType}`}>
            {this.props.ControllerProps.dealType ? '卖出' : '买入'}
          </div>
        </div>
    )
  }
}