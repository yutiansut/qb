import ExchangeViewBase from '../../ExchangeViewBase'
import React, {Component} from "react";
import SelectButton from "../../../common/component/SelectButton";
import TradeDealExchange from './TradeDealExchange.jsx'
import '../stylus/tradePlan.styl'

const DealEntrust = [{name: '限价委托', type: 0}, {name: '市价委托', type: 1}];

export default class TradePlan extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      DealEntrustType: 0,
      PassType: '',
      ControllerProps: [{name: '买入', tradeType: 'buy', entrustType: 0,}]
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
  }
  
  componentWillMount() {
  
  }
  
  componentDidMount() {
  
  }
  changeEntrustType(v){
    this.setState({
      DealEntrustType: v.type
    })
  }
  selected(e){
    console.log(e)
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
                onSelect={(e) => {this.selected(e)}}
            />
          </div>
          <div className='trade-deal-exchanged'>
            <TradeDealExchange />
            <TradeDealExchange />
          </div>
         
        </div>
    )
  }
}