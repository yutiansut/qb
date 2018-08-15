
import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import exchangeViewBase from "../../components/ExchangeViewBase";

import Invite from './children/Invite';
import MyQBT from './children/MyQBT';

import "./stylus/index.styl";

export default class Activity extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      tab: ''
    };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tab) {
    this.setState({tab});
  }

  render() {
    const {match, controller, headerController, location} = this.props;
    
    return (
      <div className="activity">
        <Switch>
          <Route path={`${match.url}/invite`} component={({history}) => (
            <Invite history={history} controller={controller} tab={this.state.tab} headerController={headerController}/>
          )}/>
          <Route path={`${match.url}/myqbt`} component={({history}) => (
            <MyQBT history={history} controller={controller} changeTab={this.changeTab}/>
          )}/>
          <Redirect to={`${match.url}/myqbt`}/>
        </Switch>
      </div>
    );
  }
}
