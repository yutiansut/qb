import React, { Component } from "react";
import {
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import exchangeViewBase from "../../components/ExchangeViewBase";
import Balance from "./children/Balance";
import History from "./children/History";
import BalanceDetail from "./children/balanceDetail";
import Charge from "./children/Charge";
import MyQBT from "../activity/children/MyQBT";
import "./style/asset.styl"

export default class AssetManage extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {};
    this.controller = props.controller;
  }

  componentWillMount() {}

  componentDidMount() { }

  componentWillUpdate() { }

  render() {
    let match = this.props.match;

    const Bala = ({ match, location, history }) => {
      return <Balance controller={this.controller} location={location} history={history}/>;
    };

    const Hist = ({ match, location }) => {
      return <History controller={this.controller} location={location} />;
    };

    const Detail = ({ match, location, history }) => {
      return <BalanceDetail controller={this.controller} location={location} history={history} />;
    };

    const Char = ({ match, location }) => {
        return <Charge controller={this.controller} location={location} />;
    };
    const MyQB = ({ match, location, history }) => {
      return <MyQBT controller={this.controller} location={location} />;
    };
    return (
      <div className="asset-mb">
        <Switch>
          <Route path={`${match.url}/balance`} component={Bala} />
          <Route path={`${match.url}/dashboard`} component={Hist} />
          <Route path={`${match.url}/detail`} component={Detail} />
          <Route path={`${match.url}/charge`} component={Char} />
          <Route path={`${match.url}/myqbt`} component={MyQB} />
          <Redirect to={`${match.url}/balance`} />
        </Switch>
      </div>
    );
  }
}
