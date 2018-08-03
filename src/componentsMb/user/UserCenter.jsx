import React from "react";
import {Route, Redirect, Switch} from 'react-router-dom';
import ExchangeViewBase from '../../components/ExchangeViewBase.jsx';

import UserCenterIndex from './children/UserCenterIndex.jsx';
import SafeCenter from './children/SafeCenter.jsx';
import AboutUs from './children/AboutUs.jsx';
import SetPwd from './children/SetPwd.jsx';
import Identity from "./children/Identity";
import SetTwoVerify from "./children/SetTwoVerify";
import Verify from "./children/Verify";
import GoogleKey from "./children/GoogleKey";

import "./stylus/index.styl"

export default class UserCenter extends ExchangeViewBase {
  constructor(props) {
    super(props)
    const {controller} = this.props;
    this.addContent = controller.headerController.addContent.bind(controller.headerController);//设置头部方法
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
          <UserCenterIndex url={`${match.url}`} controller={controller} addContent={this.addContent}/>
        )}/>
        <Route exact path={`${match.url}/safe/twoverify`} component={() => (
          <SetTwoVerify match={match} location={location} url={`${match.url}`} controller={controller} history={history} addContent={this.addContent}/>
        )}/>
        <Route exact path={`${match.url}/safe`} component={() => (
          <SafeCenter match={match} location={location} url={`${match.url}`} controller={controller} history={history} addContent={this.addContent}/>
        )}/>
        <Route exact path={`${match.url}/identity`} component={() => (
          <Identity match={match} location={location} url={`${match.url}`} controller={controller} history={history} addContent={this.addContent}/>
        )}/>
        <Route path={`${match.url}/verifybind`} component={() => (
          <Verify match={match} location={location} url={`${match.url}`} controller={controller} history={history} addContent={this.addContent}/>
        )}/>
        <Route path={`${match.url}/googlekey`} component={() => (
          <GoogleKey match={match} location={location} url={`${match.url}`} controller={controller} history={history} addContent={this.addContent}/>
        )}/>
        <Route exact path={`${match.url}/aboutUs`} component={() => (
          <AboutUs match={match} controller={controller} history={history} addContent={this.addContent}/>
        )}/>
        <Route exact path={`${match.url}/setPwd`} component={() => (
          <SetPwd match={match} location={location} controller={controller} history={history} addContent={this.addContent}/>
        )}/>
        <Redirect to={`${match.url}`}/>
      </Switch>
    );
  }
}