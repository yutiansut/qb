import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import exchangeViewBase from '../ExchangeViewBase';

import OrderHistory from './children/OrderHistory.jsx';
import OrderCurrent from './children/OrderCurrent.jsx';

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
          <Route path={`${match.url}/current`} component={({history}) => (
							<OrderCurrent controller={this.props.controller} history={history}/>
					)}/>
					<Route path={`${match.url}/history`} component={({history}) => (
							<OrderHistory controller={this.props.controller} history={history}/>
					)}/>
					<Redirect to={`${match.url}/current`} />
				</Switch>
      </div>
    );
  }
}
