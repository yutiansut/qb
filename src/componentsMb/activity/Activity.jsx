
import React, { Component } from 'react';
import {
  Route,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'

import ActivityInvite from './children/ActivityInvite'
import Invite from './children/Invite'
import MyQBT from './children/MyQBT'

import "./stylus/activity.styl"

import exchangeViewBase from "../../components/ExchangeViewBase";

export default class Help extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {tab: ''};
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tab) {
    this.setState({tab});
  }

  render() {
    const {match, controller, headerController, history, location} = this.props;
    const ActivityInvit = () => {
      return <ActivityInvite history={history} controller={controller} tab={this.state.tab} headerController={headerController} />;
    };
    const Invit = () => {
      return <Invite history={history} controller={controller} />;
    };
    const MyQB = () => {
      return <MyQBT history={history} controller={controller} changeTab={this.changeTab}/>;
    };

    return <div className="activity">
          <Switch>
            <Route path={`${match.url}/index`} component={ActivityInvit}/>
            <Route path={`${match.url}/invite`} component={Invit} />
            <Route path={`${match.url}/myqbt`} component={MyQB} />
            <Redirect to={`${match.url}/myqbt`} />
          </Switch>
    </div>
  }
}
