import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";
import SelectButton from "../../../common/component/SelectButton"

import "../stylus/orderFilter.styl"

export default class orderFilter extends exchangeViewBase{
  constructor(props){
    super(props);
    this.controller = this.props.controller;
    this.state = {
      startTime: Math.floor(new Date().getTime() / 1000) - 1000 * 24 * 60 * 60,
      startTimeType: 'all',
      orderType: 2,
      totalDeal: true,
      reseted: true,
      partDeal: true,
      coinArray: [],
      marketArray: [],
      idArray: [],
      coinSelect: this.intl.get('all'),
      marketSelect: this.intl.get('all'),
      hideOther: 0,
    }
    this.selectReset = this.selectReset.bind(this);
    this.orderSelect = this.orderSelect.bind(this);
  }
  componentWillMount(){
  
  }
  componentDidMount(){
    const {pairIdMsg} = this.props;
    console.log("3333333", pairIdMsg)
    let coinArray = pairIdMsg.pairIdCoin && Object.keys(pairIdMsg.pairIdCoin);
    let marketArray = pairIdMsg.pairIdMarket && Object.keys(pairIdMsg.pairIdMarket);
    marketArray && marketArray.unshift(this.intl.get('all'));
    coinArray && coinArray.unshift(this.intl.get('all'));
    this.setState({
      coinArray,
      marketArray
    })
    setTimeout(() => {
      console.log("1111111", coinArray)
    }, 5000);
    setTimeout(() => {
      console.log("2222222", marketArray)
    }, 5000);
  }
  changeCoin(e) {
    const {pairIdMsg} = this.props;
    let marketArray = [];
    let coinValue = (e === this.intl.get('all')) ? '' : e;
    let marketValue = (this.state.marketSelect === this.intl.get('all')) ? '' : this.state.marketSelect;
    let idArray = [];
    let hideOther = 1;
    if (coinValue) {
      marketArray = pairIdMsg.pairNameCoin[coinValue];
      marketArray.unshift(this.intl.get('all'));
      marketValue && (idArray.push(pairIdMsg.pairIdCoin[coinValue][marketValue])) || (idArray = Object.values(pairIdMsg.pairIdCoin[coinValue]));
    }
    else {
      marketValue && (idArray = Object.values(pairIdMsg.pairIdMarket[marketValue])) && (marketArray = pairIdMsg.pairNameMarket[marketValue] && (marketArray.unshift(this.intl.get('all')))) || ((idArray = []) && (hideOther = 0) && (marketArray = pairIdMsg.pairIdMarket && Object.keys(pairIdMsg.pairIdMarket)) && (marketArray.unshift(this.intl.get('all'))))
    }
    this.setState(
        {
          marketArray,
          idArray,
          coinSelect: coinValue,
          hideOther
        }
    )
  }
  
  changeMarket(e) {
    const {pairIdMsg} = this.props;
    let coinArray = [];
    let marketValue = (e === this.intl.get('all')) ? '' : e;
    let coinValue = (this.state.coinSelect === this.intl.get('all')) ? '' : this.state.coinSelect;
    let idArray = [];
    let hideOther = 1;
    if (marketValue) {
      coinArray = pairIdMsg.pairNameMarket[marketValue];
      coinArray.unshift(this.intl.get('all'));
      coinValue && (idArray.push(pairIdMsg.pairIdMarket[marketValue][coinValue])) || (idArray = Object.values(pairIdMsg.pairIdMarket[marketValue]));
    }
    else {
      coinValue && (idArray = Object.values(pairIdMsg.pairIdCoin[coinValue])) && (coinArray = pairIdMsg.pairNameCoin[coinValue] && (coinArray.unshift(this.intl.get('all')))) || ((idArray = []) && (hideOther = 0) && (coinArray = pairIdMsg.pairIdCoin && Object.keys(pairIdMsg.pairIdCoin)) && (coinArray.unshift(this.intl.get('all'))))
    }
    this.setState(
        {
          coinArray,
          idArray,
          marketSelect: marketValue,
          hideOther
        }
    )
  }
  selectReset() {
    if (this.props.type === "current") {
      this.setState({orderType: 2})
    } else {
      this.setState({
        startTime: Math.floor(new Date().getTime() / 1000) - 1000 * 24 * 60 * 60,
        startTimeType: 'all',
        orderType: 2,
        totalDeal: true,
        reseted: true,
        partDeal: true,
      });
    }
  }
  orderSelect() {
    if (this.props.type === "current") {
      let filterPramas = {
        idArray: this.state.idArray,
        orderType: this.state.orderType
      };
      this.props.orderSelect(filterPramas);
    } else {
      let orderStatus = [];
      this.state.totalDeal && orderStatus.push(2);
      this.state.reseted && orderStatus.push(3);
      this.state.partDeal && orderStatus.push(6);
      let filterPramas = {
        idArray: this.state.idArray,
        startTime: this.state.startTime,
        orderType: this.state.orderType,
        orderStatus: orderStatus
      };
      console.log('OrderFilter', filterPramas);
      this.props.orderSelect(filterPramas);
    }
  }
  render(){
    return(
        <div className='order-history-filter'>
          {this.props.type === "current" ? (
            <div className="filter-container">
            <h1>交易对</h1>
              <div className="select-section">
              <SelectButton
                  title={this.state.coinSelect}
                  type="main"
                  className="select"
                  onSelect={(e) => this.changeCoin(e)}
                  valueArr={this.state.coinArray}
              />
              <em>——</em>
              <SelectButton
                  title={this.state.marketSelect}
                  type="main"
                  className="select"
                  onSelect={(e) => this.changeMarket(e)}
                  valueArr={this.state.marketArray}
              />
              </div>
              <h1>类型</h1>
              <div className="select-section">
                <button 
                  className={`${this.state.orderType === 0 ? "selected" : ""} choose-button`} 
                  onClick={() => {this.setState({orderType : 0})}}>买入</button>
                <button 
                  className={`${this.state.orderType === 1 ? "selected" : ""} choose-button`} 
                  onClick={() => {this.setState({orderType : 1})}}>卖出</button>
              </div>
            </div>
          ) : (
            <div className="filter-container">
            <h1>日期</h1>
            <div className="select-section">
              <button 
                className={`${this.state.startTimeType === "day" ? "selected" : ""} choose-button`} 
                onClick={() => {
                  this.setState({startTime: Math.floor(new Date().getTime() / 1000) - 24 * 60 * 60})
                  this.setState({startTimeType: 'day'})
                }}
              >一天</button>
              <button 
                className={`${this.state.startTimeType === "week" ? "selected" : ""} choose-button`} 
                onClick={() => {
                  this.setState({startTime: Math.floor(new Date().getTime() / 1000) - 7 * 24 * 60 * 60})
                  this.setState({startTimeType: 'week'})
                }}
              >一周</button>
              <button 
                className={`${this.state.startTimeType === "month" ? "selected" : ""} choose-button`} 
                onClick={() => {
                  this.setState({startTime: Math.floor(new Date().getTime() / 1000) - 24 * 60 * 60})
                  this.setState({startTimeType: 'month'})
                }}
              >一月</button>
              <button 
                className={`${this.state.startTimeType === "all" ? "selected" : ""} choose-button`} 
                onClick={() => {
                  this.setState({startTime: Math.floor(new Date().getTime() / 1000) - 1000 * 24 * 60 * 60})
                  this.setState({startTimeType: 'all'})
                }} 
                style={{marginRight: 0}}
              >全部</button>
            </div>
            <h1>交易对</h1>
            <div className="select-section">
            <SelectButton
                  title={this.state.coinSelect}
                  type="main"
                  className="select"
                  onSelect={(e) => this.changeCoin(e)}
                  valueArr={this.state.coinArray}
              />
              <em>——</em>
              <SelectButton
                  title={this.state.marketSelect}
                  type="main"
                  className="select"
                  onSelect={(e) => this.changeMarket(e)}
                  valueArr={this.state.marketArray}
              />
            </div>
            <h1>类型</h1>
            <div className="select-section">
              <button 
                className={`${this.state.orderType === 2 ? "selected" : ""} choose-button`} 
                onClick={() => {this.setState({orderType : 2})}}>买入/卖出</button>
              <button 
                className={`${this.state.orderType === 0 ? "selected" : ""} choose-button`} 
                onClick={() => {this.setState({orderType : 0})}}>买入</button>
              <button 
                className={`${this.state.orderType === 1 ? "selected" : ""} choose-button`} 
                onClick={() => {this.setState({orderType : 1})}}>卖出</button>
            </div>
            <h1>订单状态</h1>
            <div className="select-section">
              <button 
                className={`${this.state.totalDeal ? "selected" : ""} choose-button`} 
                onClick={() => {
                  let orderStatusBool = this.state.totalDeal
                  this.setState({totalDeal : !orderStatusBool})
                }}>已成交</button>
              <button 
                className={`${this.state.reseted ? "selected" : ""} choose-button`} 
                onClick={() => {
                  let orderStatusBool = this.state.reseted
                  this.setState({reseted : !orderStatusBool})
                }}>已撤销</button>
              <button 
                className={`${this.state.partDeal ? "selected" : ""} choose-button`} 
                onClick={() => {
                  let orderStatusBool = this.state.partDeal
                  this.setState({partDeal : !orderStatusBool})
                }}>部分成交</button>
            </div>
          </div>
          )}
          <div className="filter-operate">
            <button onClick={this.selectReset}>重置</button>
            <button onClick={this.orderSelect}>确定</button>
          </div>
        </div>
    )
  }
}