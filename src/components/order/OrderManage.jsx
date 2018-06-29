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
  constructor(){
    super();
    OrderCurrentController = new OrderListController();
    OrderHistoryController = new OrderListController();
    OrderDealController = new OrderListController();
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
                  <OrderCurrent controller={OrderCurrentController} type='orderCurrent' />
              )}/>
              <Route path={`${match.url}/history`} component={({match}) => (
                  <OrderCurrent controller={OrderHistoryController} type='orderHistory' />
              )}/>
              <Route path={`${match.url}/deal`} component={({match}) => (
                  <OrderCurrent controller={OrderDealController}  type='orderDeal' />
              )}/>
              <Redirect to={`${match.url}/current`} />
            </Switch>
          </div>
        </div>
    )
  }
}