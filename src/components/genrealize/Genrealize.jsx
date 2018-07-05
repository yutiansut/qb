import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch
} from "react-router-dom";
import exchangeViewBase from "../ExchangeViewBase";
import Terms from "./children/Terms";
import Invite from "./children/Invite";
import Register from "./children/Register";
import { ChangeFontSize } from "../../core";

export default class Genrealize extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.controller = this.props.controller;
  }
  componentDidMount() {
    ChangeFontSize(0, 1440 * 1);
  }

  render() {
    let match = this.props.match;
    const Term = ({ match, location, history }) => {
      return <Terms controller={this.controller} />;
    };
    const Invit = ({ match, location, history }) => {
      return <Invite controller={this.controller} location={location} />;
    };
    const Regist = ({ match, location, history }) => {
      return <Register controller={this.controller} location={location} />;
    };
    // const Char = ({ match, location }) => {
    //   return <Charge controller={this.controller} location={location} />;
    // };
    // const Extr = ({ match, location }) => {
    //   return <Extract controller={this.controller} location={location} />;
    // };
    // const Hist = ({ match, location }) => {
    //   return <History controller={this.controller} location={location} />;
    // };
    return (
      <div className="genrealize-wrap">
        <Switch>
          <Route path={`${match.url}/terms`} component={Term} />
          <Route path={`${match.url}/invite`} component={Invit} />
          <Route path={`${match.url}/register`} component={Regist} />
          <Redirect to={`${match.url}/terms`} />
        </Switch>
      </div>
    );
  }
}
