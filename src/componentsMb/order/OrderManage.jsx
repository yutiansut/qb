import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import exchangeViewBase from '../../components/ExchangeViewBase';

import OrderHistory from './children/OrderHistory.jsx';
import OrderCurrent from './children/OrderCurrent.jsx';

import './stylus/order.styl';

export default class OrderManage extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      pairIdMsg: {}
    }
  }
  componentWillMount() {
  }
  async componentDidMount() {
    let pairIdMsg = await this.props.controller.marketController.getTradePairHandle();
    this.setState({pairIdMsg});
  }
  render() {
		const {match} = this.props;
    return (
      <div className='order-wrap'>
				<Switch>
          <Route path={`${match.url}/current`} component={({history}) => (
						<OrderCurrent controller={this.props.controller} pairIdMsg={this.state.pairIdMsg} match={this.props.match} history={history}/>
					)}/>
					<Route path={`${match.url}/history`} component={({history}) => (
						<OrderHistory controller={this.props.controller} pairIdMsg={this.state.pairIdMsg} history={history}/>
					)}/>
					<Redirect to={`${match.url}/current`} />
				</Switch>
      </div>
    );
  }
}
