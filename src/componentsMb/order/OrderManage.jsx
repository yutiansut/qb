import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import exchangeViewBase from '../ExchangeViewBase';

import OrderHistory from './child/OrderHistory.jsx';
import OrderCurrent from './child/OrderCurrent.jsx';

import './stylus/order.styl';

export default class OrderManage extends exchangeViewBase {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
		const {match} = this.props;
    return (
      <div className="order-wrap">
				<Switch>
          <Route path={`${match.url}/current`} component={() => (
							<OrderCurrent controller={this.props.controller}/>
					)}/>
					<Route path={`${match.url}/history`} component={() => (
							<OrderHistory controller={this.props.controller}/>
					)}/>
					<Redirect to={`${match.url}/current`} />
				</Switch>
      </div>
    );
  }
}
