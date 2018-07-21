import React, { Component } from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";

import OrderItem from "./OrderItem.jsx"
import OrderDetails from "./OrderDetails.jsx"
import SelectButton from '../../../common/component/SelectButton'

import '../stylus/orderHistory.styl'

export default class OrderHistory extends exchangeViewBase{
  constructor(props){
    super(props);
    const {controller} = props;
    this.state = {
      idArray: [],
      coinSelect: this.intl.get('all'),     // SelectButton选中币种
      marketSelect: this.intl.get('all'),   // SelectButton选中市场
      showCoinSelect: this.intl.get('all'),
      showMarketSelect: this.intl.get('all'),
      coinArray: [],    // SelectButton币种数组
      marketArray: [],  // SelectButton市场数组
      showCoinArray: [],
      showMarketArray: [],
      hideOther: 0,     // SelectButton隐藏
      orderType: 2,
      orderStatus: [2, 3, 5, 6, 7],
      totalDeal: true,  // 订单状态——已成交
      reseted: true,    // 订单状态——已撤销
      partDeal: true,   // 订单状态——部分成交
      startTime: Math.floor(new Date().getTime() / 1000) - 1000 * 24 * 60 * 60,
      startTimeType: 'all',
      endTime: Math.floor(new Date().getTime() / 1000),
      page: 1,
      pageSize: 100,
      filterShow: false,
      displayType: "list",
      viewIndex: 0,
      pairIdMsg : {},
    };
    controller.setView(this)
    this.state = Object.assign(this.state, controller.initState);

    this.getOrderList = this.getOrderList.bind(this);
    this.setDetailsDisplay = this.setDetailsDisplay.bind(this);
    this.setListDisplay = this.setListDisplay.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.choiceReset = this.choiceReset.bind(this);
    this.choiceEnsure = this.choiceEnsure.bind(this);
    // this.changeCoin = this.changeCoin.bind(this);
    // this.changeMarket = this.changeMarket.bind(this);
  }
  componentWillMount(){
    this.getOrderList()
  }
  componentDidMount(){
    const {pairIdMsg} = this.props;
    let coinArray = pairIdMsg.pairIdCoin && Object.keys(pairIdMsg.pairIdCoin);
    let marketArray = pairIdMsg.pairIdMarket && Object.keys(pairIdMsg.pairIdMarket);
    let showCoinArray = coinArray && coinArray.map(function(item) {
      return item.toUpperCase()
    })
    let showMarketArray = marketArray && marketArray.map(function(item) {
      return item.toUpperCase()
    })
    marketArray && marketArray.unshift(this.intl.get('all'));
    coinArray && coinArray.unshift(this.intl.get('all'));
    showCoinArray && showCoinArray.unshift(this.intl.get('all'));
    showMarketArray && showMarketArray.unshift(this.intl.get('all'));
    this.setState({
      coinArray,
      marketArray,
      showCoinArray,
      showMarketArray
    })
  }
  getOrderList() {
    const {controller} = this.props;
    const params = {
      idArray: this.state.idArray,
      orderType: this.state.orderType,
      orderStatus: this.state.orderStatus,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      page: this.state.page,
      pageSize: this.state.pageSize
    }
    controller.getHistoryOrder(true, params)
    setTimeout(() => {
      console.log(this.state.orderListArray)
    }, 5000);
  }

  setListDisplay() {
    this.setState({displayType: "list"})
  }
  setDetailsDisplay(index) {
    console.log('index1111111111111111', index)
    this.setState({viewIndex: index});
    this.setState({displayType: "details"})
  }
  // 筛选项的显示与关闭
  changeFilter() {
    if (this.state.filterShow) {
      this.setState({filterShow: false});
    } else {
      this.setState({filterShow: true});
    }
  }
  // 修改时间
  changeDate(dateType) {
    let startTime;
    if (dateType === "day") {
      startTime = Math.floor(new Date().getTime() / 1000) - 24 * 60 * 60;
    } else if (dateType === "week") {
      startTime = Math.floor(new Date().getTime() / 1000) - 7 * 24 * 60 * 60;
    } else if (dateType === "month") {
      startTime = Math.floor(new Date().getTime() / 1000) - 30 * 24 * 60 * 60;
    } else {
      startTime = Math.floor(new Date().getTime() / 1000) - 1000 * 24 * 60 * 60;
    }
    this.setState({
      startTime,
      startTimeType: dateType,
    })
  }
  // 筛选项重置
  choiceReset() {
    this.setState({
      startTime: Math.floor(new Date().getTime() / 1000) - 1000 * 24 * 60 * 60,
      startTimeType: 'all',
      idArray: [],
      coinSelect: this.intl.get('all'),
      marketSelect: this.intl.get('all'),
      showCoinSelect: this.intl.get('all'),
      showMarketSelect: this.intl.get('all'),
      orderType: 2,
      totalDeal: true,
      reseted: true,
      partDeal: true,
    });
  }
  // 根据筛选项选择列表
  choiceEnsure() {
    let orderStatus = [];
    this.state.totalDeal && orderStatus.push(2);
    this.state.reseted && orderStatus.push(3);
    this.state.partDeal && orderStatus.push(6);
    this.state.partDeal && orderStatus.push(7);
    this.setState({
      orderStatus,
      filterShow: false
    });
    setTimeout(() => {
      this.getOrderList();
    }, 0);
  }
  // 选择币种
  changeCoin(e) {
    const {pairIdMsg} = this.props;
    let marketArray = [];
    if(e.toLowerCase() === this.state.coinSelect){
      return
    }
    let coinValue = (e === this.intl.get('all')) ? '' : e.toLowerCase();
    let marketValue = (this.state.marketSelect === this.intl.get('all')) ? '' : this.state.marketSelect;
    let idArray = [];
    let hideOther = 1;
    if (coinValue) {
      marketArray = pairIdMsg.pairNameCoin[coinValue];
      // marketArray.unshift(this.intl.get('all'));
      marketValue && (idArray.push(pairIdMsg.pairIdCoin[coinValue][marketValue])) || (idArray = Object.values(pairIdMsg.pairIdCoin[coinValue]));
    }
    else {
      marketValue && (idArray = Object.values(pairIdMsg.pairIdMarket[marketValue])) || (idArray = []);
    // && (marketArray = pairIdMsg.pairNameMarket[marketValue])
      marketArray = Object.keys(pairIdMsg.pairIdMarket)
      coinValue = this.intl.get('all');
    }
    marketArray.indexOf(this.intl.get('all')) === -1 && marketArray.unshift(this.intl.get('all'));
    this.setState(
        {
          marketArray,
          idArray,
          coinSelect: coinValue,
          hideOther,
          showCoinSelect: e
        }
    )
  }
  // 选择市场
  changeMarket(e) {
    const {pairIdMsg} = this.props;
    let coinArray = [];
    if(e.toLowerCase() === this.state.marketSelect){
      return
    }
    let marketValue = (e === this.intl.get('all')) ? '' : e.toLowerCase();
    let coinValue = (this.state.coinSelect === this.intl.get('all')) ? '' : this.state.coinSelect;
    let idArray = [];
    let hideOther = 1;
    if (marketValue) {
      coinArray = pairIdMsg.pairNameMarket[marketValue];
      coinValue && (idArray.push(pairIdMsg.pairIdMarket[marketValue][coinValue])) || (idArray = Object.values(pairIdMsg.pairIdMarket && pairIdMsg.pairIdMarket[marketValue]));
    }
    else {
      coinValue  && (coinArray = pairIdMsg.pairNameCoin[coinValue]) || (idArray = []);
      coinArray = pairIdMsg.pairIdCoin && Object.keys(pairIdMsg.pairIdCoin)
      marketValue = this.intl.get('all')
    }
    coinArray.indexOf(this.intl.get('all')) === -1 && coinArray.unshift(this.intl.get('all'));
    this.setState(
        {
          coinArray,
          idArray,
          marketSelect: marketValue,
          hideOther,
          showMarketSelect: e
        }
    )
  }

  render(){
    const displayType = this.state.displayType;
    return(displayType ==="list" ? (
      <div className='order-history'>
        <div className='order-history-header clearfix'>
          <div className="back fl" onClick={() =>{this.props.history.goBack()}}>
            <img src="../../../../static/mobile/order/icon_fh@3x.png"/>
            <span>{this.intl.get("back")}</span>
          </div>
          <div className="name">{this.intl.get("order-history")}</div>
          <div className="filter fr" onClick={this.changeFilter}>
            <img src="../../../../static/mobile/order/icon_shaixuan@3x.png"/>
          </div>
        </div>
        {this.state.filterShow &&
        <div className='order-history-filter'>
          <div className="filter-container">
            <h1>{this.intl.get("date")}</h1>
            <div className="choose-section">
              <button className={`${this.state.startTimeType === "day" && "chosen"} choose-button`} onClick={() => {this.changeDate('day')}}>{this.intl.get("oneDay")}</button>
              <button className={`${this.state.startTimeType === "week" && "chosen"} choose-button`} onClick={() => {this.changeDate('week')}}>{this.intl.get("oneWeek")}</button>
              <button className={`${this.state.startTimeType === "month" && "chosen"} choose-button`} onClick={() => {this.changeDate('month')}}>{this.intl.get("oneMonth")}</button>
              <button className={`${this.state.startTimeType === "all" && "chosen"} choose-button`} onClick={() => {this.changeDate('all')}} style={{marginRight: 0}}>{this.intl.get("all")}</button>
            </div>
            <h1>{this.intl.get("pair")}</h1>
            <div className="choose-section">
              <SelectButton
                title={this.state.showCoinSelect}
                type="main"
                className="select"
                onSelect={(e) => this.changeCoin(e)}
                valueArr={this.state.showCoinArray}
              />
              <em>——</em>
              <SelectButton
                title={this.state.showMarketSelect}
                type="main"
                className="select"
                onSelect={(e) => this.changeMarket(e)}
                valueArr={this.state.showMarketArray}
              />
            </div>
            <h1>{this.intl.get("type")}</h1>
            <div className="choose-section">
              <button className={`${this.state.orderType === 2 && "chosen"} choose-button`} onClick={() => {this.setState({orderType : 2})}}>{this.intl.get("buy")}/{this.intl.get("sell")}</button>
              <button className={`${this.state.orderType === 0 && "chosen"} choose-button`} onClick={() => {this.setState({orderType : 0})}}>{this.intl.get("buy")}</button>
              <button className={`${this.state.orderType === 1 && "chosen"} choose-button`} onClick={() => {this.setState({orderType : 1})}}>{this.intl.get("sell")}</button>
            </div>
            <h1>{this.intl.get("orderStatus")}</h1>
            <div className="choose-section">
              <button
                className={`${this.state.totalDeal && "chosen"} choose-button`}
                onClick={() => {
                  let orderStatusBool = this.state.totalDeal
                  this.setState({totalDeal : !orderStatusBool})
                }}>{this.intl.get("dealed")}</button>
              <button
                className={`${this.state.reseted && "chosen"} choose-button`}
                onClick={() => {
                  let orderStatusBool = this.state.reseted
                  this.setState({reseted : !orderStatusBool})
                }}>{this.intl.get("reseted")}</button>
              <button
                className={`${this.state.partDeal && "chosen"} choose-button`}
                onClick={() => {
                  let orderStatusBool = this.state.partDeal
                  this.setState({partDeal : !orderStatusBool})
                }}>{this.intl.get("partDeal")}</button>
            </div>
          </div>
          <div className="filter-operate">
            <button onClick={this.choiceReset}>{this.intl.get("reset")}</button>
            <button onClick={this.choiceEnsure}>{this.intl.get("ok")}</button>
          </div>
        </div>
        }
        <div className="order-history-list">
          {this.state.orderListArray.map((order, index) => {
            return (
              <OrderItem type="history" index={index} setDetailsDisplay={this.setDetailsDisplay} orderInfo={order} key={index}/>
            )
          })}
        </div>
      </div>
    ) : (
      <OrderDetails type="history" setListDisplay={this.setListDisplay} orderInfo={this.state.orderListArray[this.state.viewIndex]} controller={this.props.controller}/>
    ))
  }
}