import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
import exchangeViewBase from "../../../components/ExchangeViewBase";

import OrderItem from "./OrderItem.jsx"
import OrderDetails from "./OrderDetails.jsx"
import SelectButton from '../../../common/component/SelectButton'

export default class OrderHistory extends exchangeViewBase{
  constructor(props){
    super(props);
    const {controller} = props;
    this.state = {
      idArray: [],
      coinSelect: this.intl.get('all'),     // SelectButton选中币种
      marketSelect: this.intl.get('all'),   // SelectButton选中市场
      coinArray: [],    // SelectButton币种数组
      marketArray: [],  // SelectButton市场数组
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

    this.addContent = controller.headerController.addContent.bind(controller.headerController) // 获取头部内容
  }
  componentWillMount(){
    this.getOrderList()
  }
  componentDidMount(){
    this.addContent({con: this.intl.get("header-order"), filter: true, selectFn: this.changeFilter})
    const {pairIdMsg} = this.props;
    let coinArray = pairIdMsg.pairIdCoin && Object.keys(pairIdMsg.pairIdCoin);
    let marketArray = pairIdMsg.pairIdMarket && Object.keys(pairIdMsg.pairIdMarket);
    marketArray && marketArray.unshift(this.intl.get('all'));
    coinArray && coinArray.unshift(this.intl.get('all'));
    this.setState({
      coinArray,
      marketArray,
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
    controller.getHistoryOrder(true, params);
  }

  setListDisplay() {
    this.setState({displayType: "list"})
  }
  setDetailsDisplay(index) {
    // console.log('index1111111111111111', index)
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
    console.log('确定按钮调用了！！！！')
    this.getOrderList();
  }
  // 选择币种
  changeCoin(e) {
    const {pairIdMsg} = this.props;
    let marketArray = [];
    if(e === this.state.coinSelect){
      return
    }
    let coinValue = (e === this.intl.get('all')) ? '' : e;
    let marketValue = (this.state.marketSelect === this.intl.get('all')) ? '' : this.state.marketSelect;
    let idArray = [];
    let hideOther = 1;
    if (coinValue) {
      marketArray = pairIdMsg.pairNameCoin[coinValue.toLowerCase()];
      marketValue && (idArray.push(pairIdMsg.pairIdCoin[coinValue.toLowerCase()][marketValue.toLowerCase()])) || (idArray = Object.values(pairIdMsg.pairIdCoin[coinValue.toLowerCase()]));
    }
    else {
      marketValue && (idArray = Object.values(pairIdMsg.pairIdMarket[marketValue.toLowerCase()])) || (idArray = []);
      marketArray = Object.keys(pairIdMsg.pairIdMarket)
      coinValue = this.intl.get('all');
    }
    marketArray.indexOf(this.intl.get('all')) === -1 && marketArray.unshift(this.intl.get('all'));
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
    if(e === this.state.marketSelect){
      return
    }
    let marketValue = (e === this.intl.get('all')) ? '' : e;
    let coinValue = (this.state.coinSelect === this.intl.get('all')) ? '' : this.state.coinSelect;
    let idArray = [];
    let hideOther = 1;
    if (marketValue) {
      coinArray = pairIdMsg.pairNameMarket[marketValue.toLowerCase()];
      coinValue && (idArray.push(pairIdMsg.pairIdMarket[marketValue.toLowerCase()][coinValue.toLowerCase()])) || (idArray = Object.values(pairIdMsg.pairIdMarket && pairIdMsg.pairIdMarket[marketValue.toLowerCase()]));
    }
    else {
    // && (idArray = Object.values(pairIdMsg.pairIdCoin[coinValue]))
      coinValue  && (coinArray = pairIdMsg.pairNameCoin[coinValue.toLowerCase()]) || (idArray = []);
      coinArray = pairIdMsg.pairIdCoin && Object.keys(pairIdMsg.pairIdCoin)
      marketValue = this.intl.get('all')
    }
    coinArray.indexOf(this.intl.get('all')) === -1 && coinArray.unshift(this.intl.get('all'));
    this.setState(
        {
          coinArray,
          idArray,
          marketSelect: marketValue,
          hideOther
        }
    )
  }

  render() {
    return (
      <div className='order-history'>
        <div className='order-switch'>
          <NavLink to='/order/current'>当前订单</NavLink>
          <NavLink to='/order/history'>历史订单</NavLink>
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
                title={this.state.coinSelect.toUpperCase()}
                type="main"
                className="select"
                onSelect={(e) => this.changeCoin(e)}
                valueArr={this.state.coinArray && this.state.coinArray.map(v=>v.toUpperCase())}
              />
              <em>——</em>
              <SelectButton
                title={this.state.marketSelect.toUpperCase()}
                type="main"
                className="select"
                onSelect={(e) => this.changeMarket(e)}
                valueArr={this.state.marketArray && this.state.marketArray.map(v=>v.toUpperCase())}
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
              <OrderItem type="history" index={index} orderInfo={order} key={index} controller={this.props.controller} history={this.props.history} changeViewType={this.props.changeViewType}/>
            )
          })}
        </div>
      </div>
    );
  }
}