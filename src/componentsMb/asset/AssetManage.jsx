import React, { Component } from "react";
import {
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import exchangeViewBase from "../ExchangeViewBase";
import Balance from "./children/Balance";
import Charge from "./children/Charge";
import Extract from "./children/Extract";
import History from "./children/History";

export default class AssetManage extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      // showPopup: 1
    };
    this.controller = props.controller;
    //绑定view
    // this.controller.setView(this);
    // //初始化数据，数据来源即store里面的state
    // this.state = Object.assign(this.state, this.controller.initState);
    // //绑定方法
    // this.getAssets = controller.getAssets.bind(controller)
    // this.getWallet = controller.getWallet.bind(controller)
    // this.changeVerify = (state)=>{
    //   this.setState({ showPopup: state})
    // }
  }

  componentWillMount() {
    // this.getAssets()
    // this.getWallet();
  }
  componentDidMount() { }

  componentWillUpdate() { }

  render() {
    let match = this.props.match;
    const Bala = ({ match, location, history }) => {
      return (
        <Balance
          controller={this.controller}
          location={location}
          history={history}
        />
      );
    };
    const Char = ({ match, location }) => {
      return <Charge controller={this.controller} location={location} />;
    };
    const Extr = ({ match, location }) => {
      return <Extract controller={this.controller} location={location} />;
    };
    const Hist = ({ match, location }) => {
      return <History controller={this.controller} location={location} />;
    };
    return (
      <div className="asset-mb">
        <Switch>
          <Route path={`${match.url}/balance`} component={Bala} />
          <Route path={`${match.url}/charge`} component={Char} />
          <Route path={`${match.url}/extract`} component={Extr} />
          <Route path={`${match.url}/dashboard`} component={Hist} />
          <Redirect to={`${match.url}/balance`} />
        </Switch>
      </div>
    );
  }
}
