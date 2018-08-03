
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
import QBT from './children/QBT'

import "./stylus/activity.styl"

import exchangeViewBase from "../../components/ExchangeViewBase";

export default class Help extends exchangeViewBase {
  constructor(props) {
    super(props);

  }

  render() {
    const {match, controller, history, location} = this.props;

    const ActivityInvit = () => {
      return <ActivityInvite history={this.props.history} controller={controller} />;
    };
    const Invit = () => {
      return <Invite history={this.props.history} controller={controller} />;
    };
    const MyQB = () => {
      return <MyQBT history={this.props.history} controller={controller} />;
    };
    const QB = () => {
      return <QBT history={this.props.history} controller={controller} />;
    };

    return <div className="activity">
          <Switch>
            <Route path={`${match.url}/activityinvite`} component={ActivityInvit} />
            <Route path={`${match.url}/invite`} component={Invit} />
            <Route path={`${match.url}/myqbt`} component={MyQB} />
            <Route path={`${match.url}/qbt`} component={QB} />
            <Redirect to={`${match.url}/myqbt`} />
          </Switch>
    </div>
  }
}
