import ExchangeViewBase from '../../ExchangeViewBase'
import React, {Component} from "react";
import Input from "../../../common/component/Input";
import '../stylus/tradeDealExchange.styl'

export default class TradeDealExchange extends  ExchangeViewBase{
  constructor(props){
    super(props);
    this.state = {
    
    };
  }
  componentWillMount() {
  
  }
  
  componentDidMount() {
  
  }
  render(){
    return(
        <div className='trade-deal-exchange'>
          <div className='trade-deal-asset'>
            <div className='deal-asset-wallet'>
              可用:<span>0.123456</span><i>BTC</i>
            </div>
            <div className='deal-asset-charge'>
              <a href="#">充币</a>
            </div>
          </div>
          <div className='trader-deal-input'>
            <div className='deal-input-label'>价格</div>
            {/*<Input/>*/}
            <input type="text"/>
            <div className='deal-input-unit'>
              BTC
            </div>
          </div>
          <div className='trader-deal-input'>
            <div className='deal-input-label'>数量</div>
            {/*<Input/>*/}
            <input type="text"/>
            <div className='deal-input-unit'>
              ETH
            </div>
          </div>
        </div>
    )
  }
}