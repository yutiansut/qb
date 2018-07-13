import React from "react";
import {Route, Redirect, Switch} from 'react-router-dom';
import exchangeViewBase from '../ExchangeViewBase.jsx';

import UserCenterIndex from './children/UserCenterIndex.jsx';
import SafeCenter from './children/SafeCenter.jsx';
import SetPassword from './children/SetPassword.jsx';
import AboutUs from './children/AboutUs.jsx';

export default class UserCenter extends exchangeViewBase {
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
      <Switch>
        <Route exact path={`${match.url}`} component={() => (
            <UserCenterIndex/>
        )}/>
        <Route exact path={`${match.url}/safe`} component={() => (
            <SafeCenter match={match}/>
        )}/>
        <Route path={`${match.url}/safe/password`} component={() => (
            <SetPassword match={match}/>
        )}/>
        <Route exact path={`${match.url}/safe/aboutus`} component={() => (
            <AboutUs/>
        )}/>
        <Redirect to={`${match.url}`} />
      </Switch>
    );
  }
}