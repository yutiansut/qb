import React, { Component } from "react";
import exchangeViewBase from "../ExchangeViewBase";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch
} from "react-router-dom";
import OrderCurrent from './children/OrderCurrent'
import OrderHistory from './children/OrderHistory'
import OrderDeal from './children/OrderDeal'

import './stylus/order.styl'

import OrderListController from '../../class/orderList/userOrderList/UserOrderListController';
let OrderCurrentController,OrderHistoryController,OrderDealController

const orderNavItems = [
  {name:'当前订单', address:'/current', type:'orderCurrent'},
  {name:'历史订单', address:'/history', type:'orderHistory'},
  {name:'历史成交', address:'/deal', type:'orderDeal'}
]
export default class OrderManage extends exchangeViewBase{
  constructor(props){
    super(props);
    // OrderCurrentController = new OrderListController();
    // OrderHistoryController = new OrderListController();
    // OrderDealController = new OrderListController();
    this.state = {
    pairIdMsg : {
    
    }
    };
    // const {controller} = this.props;
    //绑定view
    // controller.setView(this);
    //初始化数据，数据来源即store里面的state
    // this.state = Object.assign(this.state, controller.initState);
  }
  componentWillMount(){
  
  }
  componentDidMount(){
    let pairIdMsg = this.props.controller.marketController.getTradePairHandle();
    this.setState(
        {pairIdMsg}
    )
  }
  render(){
    const {match} = this.props;
    return(
        <div className='order-manage clearfix'>
          <ul className='order-nav fl'>
            {orderNavItems.map((v, index) => {
              return(
                  <li key={index}>
                    <NavLink activeClassName="active" to={`${match.url}${v.address}`} >
                      {v.name}
                    </NavLink>
                  </li>
              )
            })}
          </ul>
          <div className='order-content fr'>
            <Switch>
              <Route path={`${match.url}/current`} component={({match}) => (
                  <OrderCurrent controller={this.props.controller} type='orderCurrent' pairIdMsg={this.state.pairIdMsg}/>
              )}/>
              <Route path={`${match.url}/history`} component={({match}) => (
                  <OrderCurrent controller={this.props.controller} type='orderHistory' pairIdMsg={this.state.pairIdMsg}/>
              )}/>
              <Route path={`${match.url}/deal`} component={({match}) => (
                  <OrderCurrent controller={this.props.controller}  type='orderDeal' pairIdMsg={this.state.pairIdMsg}/>
              )}/>
              <Redirect to={`${match.url}/current`} />
            </Switch>
          </div>
        </div>
    )
  }
}