import React from "react";
import {Route, Redirect, Switch} from 'react-router-dom';
import exchangeViewBase from '../../components/ExchangeViewBase.jsx';

import UserCenterIndex from './children/UserCenterIndex.jsx';
import SafeCenter from './children/SafeCenter.jsx';
import AboutUs from './children/AboutUs.jsx';
import SetPwd from './children/SetPwd.jsx';

export default class UserCenter extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const {match, controller, history, location} = this.props;
    return (
      <Switch>
        <Route exact path={`${match.url}`} component={() => (
          <UserCenterIndex url={`${match.url}`}/>
        )}/>
        <Route exact path={`${match.url}/safe`} component={() => (
          <SafeCenter match={match} location={location} url={`${match.url}`} controller={controller} />
        )}/>
        <Route exact path={`${match.url}/aboutUs`} component={() => (
          <AboutUs match={match} controller={controller} history={history}/>
        )}/>
        <Route exact path={`${match.url}/setPwd`} component={() => (
          <SetPwd match={match} location={location} controller={controller} history={history}/>
        )}/>
        <Redirect to={`${match.url}`}/>
      </Switch>
    );
  }
}