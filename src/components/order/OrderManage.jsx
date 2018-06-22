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

import OrderListController from '../../class/orderList/userOrderList/UserOrderListController'
const OrderCurrentController = new OrderListController();
const OrderHistoryController = new OrderListController();
const OrderDealController = new OrderListController();
const orderNavItems = [
  {name:'当前订单', address:'/current'},
  {name:'历史订单', address:'/history'},
  {name:'历史成交', address:'/deal'}
]
export default class OrderManage extends exchangeViewBase{
  constructor(){
    super()
  }
  componentWillMount(){
  
  }
  componentDidMount(){
  
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
                  <OrderCurrent controller={OrderCurrentController} />
              )}/>
              <Route path={`${match.url}/history`} component={({match}) => (
                  <OrderHistory controller={OrderHistoryController} />
              )}/>
              <Route path={`${match.url}/deal`} component={({match}) => (
                  <OrderDeal controller={OrderDealController} />
              )}/>
              <Redirect to={`${match.url}/current`} />
            </Switch>
          </div>
        </div>
    )
  }
}