import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";
import SelectButton from "../../../common/component/SelectButton";
import '../stylus/tradeLive.styl'

const tradeLiveItem = [{name:'买卖', type:'all'}, {name:'买入', type:'buy'}, {name:'卖出', type:'sell'}];
export default class LiveTrade extends ExchangeViewBase{
  constructor(props){
    super(props);
    this.state = {
      depthSelected: -1,
      userTagArr:[], //用户挂单数组
      sellMid: 0, //中位数
      buyMid: 0, //中位数
      changeFlag:true,
      titleSelect: 'all',
      newPrice: 0,
      prices:{},
      tradeLiveItem: [{name: this.intl.get('order-bs'), type:'all'}, {name:this.intl.get('buy'), type:'buy'}, {name:this.intl.get('sell'), type:'sell'}]
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.liveTradeListHandle = controller.liveTradeListHandle.bind(controller);
    this.orderListSelect = controller.orderListSelect.bind(controller);
    // this.getNewPrice = controller.getNewPrice.bind(controller)
    this.clearRoom = controller.clearRoom.bind(controller);
    this.changeLiveTitleSelect = controller.changeLiveTitleSelect.bind(controller);
    this.depthSelect = controller.depthSelect.bind(controller)
  }
  componentWillMount(){
  
  }
  componentDidMount(){
  }
  // changeLiveTitleSelect(v){
  //   this.setState({
  //     titleSelect: v.type
  //   });
  //   //预留方法
  // }
  componentWillUnmount() {
    this.clearRoom()
  }

  render() {
    return(
        <div className='live-trade' style={{width: '3.2rem'}}>
          <div className='trade-live-title'>
            <div className='trade-live-title-items'>
              {this.state.tradeLiveItem.map((v, index) => {
                return(
                    <div className={`trade-live-item live-item-${this.state.titleSelect === v.type ? 'active' : ''}`} key={index} onClick={this.changeLiveTitleSelect.bind(this, v)}>
                      {v.name}
                    </div>
                )
              })}
            </div>
            <div className='trade-depth'>
              <SelectButton
                  title={`${this.intl.get('order-depth')} ${this.state.depthSelected === -1 ? this.props.controller.accuracy.depthArray[0] : this.state.depthSelected}` }
                  type="trade"
                  className="select-depth"
                  valueArr={this.props.controller.accuracy.depthArray}
                  onSelect={this.depthSelect.bind(this)}/>
            </div>
          </div>
          <table className='trade-live-table'>
            <thead>
              {/*<tr style={{height: this.state.liveSellArray && this.state.liveSellArray.length ? "0.49rem" : '0.63rem', lineHeight: '0.49rem'}}>  */}
                <tr style={{height: '.31rem', lineHeight: '.31rem'}}>
                <td> </td>
                <td>{`${this.intl.get('price')}(${(this.state.unitsType && this.state.unitsType.toUpperCase()) || (this.state.market && this.state.market.toUpperCase())})`}</td>
                <td>{`${this.intl.get('amount')}(${(this.state.coin && this.state.coin.toUpperCase())})`}</td>
                <td>{`${this.intl.get('total')}(${(this.state.unitsType && this.state.unitsType.toUpperCase()) || (this.state.market && this.state.market.toUpperCase())})`}</td>
              </tr>
            </thead>
            <tbody className='trade-live-sell'>
            <tr className={`no-content-${this.state.titleSelect !== 'all' ? 'none' : ''}`} style={{height: `${(15 - (this.state.liveSellArray && this.state.liveSellArray.length || 0)) >= 0 ? (15 - (this.state.liveSellArray && this.state.liveSellArray.length ) || 0) * .21 : 0}rem`}}>
            </tr>
            {this.state.liveSellArray && this.state.liveSellArray.map((v,index) =>
               (
                  <tr key={index} onClick={this.orderListSelect.bind(this,v)} style={{cursor:'pointer'}}>
                    <td style={{position: 'relative'}}>
                      <span>{`${this.intl.get('order-s')}${this.state.liveSellArray.length - index}`}</span>
                    <div style={{width: v.amount >= this.state.sellMid ? '3.18rem' : `${3.18 * v.amount / this.state.sellMid}rem`}} className={this.state.userTagArr.indexOf(v.price) === -1 ? 'user-none' : 'user-arrow'}></div></td>
                    <td style={{color : '#F25656 '}}>{v.priceR}</td>
                    <td>{v.amountR}</td>
                    <td>{v.turnover}</td>
                  </tr>
              )
            ) || null}
            <tr style={{height: '.1rem'}}> </tr>
            </tbody>
          
          <tbody className='live-deal'>
            <tr><td colSpan='4' className={`${this.state.updown && (this.state.updown > 0 && "market-up" || "market-down")}`} style={{fontSize: '28px'}}>{this.state.dealPrice}</td></tr>
          </tbody>
            <tbody className='trade-live-buy'>
            <tr style={{height: '.1rem'}}> </tr>
            {this.state.liveBuyArray && this.state.liveBuyArray.map((v,index) =>
                (
                  <tr key={index}  onClick={this.orderListSelect.bind(this,v)} style={{cursor:'pointer'}}>
                    <td style={{position: 'relative'}}>
                      <span>{`${this.intl.get('order-b')}${index + 1}`}</span>
                      <div style={{width: v.amount >= this.state.buyMid ? '3.18rem' : `${3.18 * v.amount / this.state.buyMid}rem`}} className={this.state.userTagArr.indexOf(v.price) === -1 ? 'user-none' : 'user-arrow'}></div>
                    </td>
                    <td style={{color : '#2BB789 '}}>{v.priceR}</td>
                    <td>{v.amountR}</td>
                    <td>{v.turnover}</td>
                  </tr>
              )
            )}
            </tbody>
            
          </table>
        </div>
    )
  }
}