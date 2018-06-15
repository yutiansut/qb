import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch
} from "react-router-dom";
import exchangeViewBase from "../ExchangeViewBase";
import Balance from "./Balance";
import Charge from "./Charge";
import Extract from "./Extract";

import "./style/index.styl";



export default class AssetManage extends exchangeViewBase {
  constructor(props) {
    super(props);
    let { controller } = props;
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = controller.getInitState()
    //绑定方法
    this.getAssets = controller.getAssets.bind(controller)
    this.getWallet = controller.getWallet.bind(controller)
  }

  componentWillMount() {
    this.getAssets()
    this.getWallet();
  }

  componentDidMount() { }

  componentWillUpdate() { }

  render() {
    let match = this.props.match;
    const Bala = ({ match }) => {
      return <Balance data={this.state} />;
    };
    const Char = ({ match }) => {
      return <Charge></Charge>;
    };
    const Extr = ({ match }) => {
      return <Extract></Extract>;
    };
    return <div className="asset clearfix">
      <ul>
        <li>
          <NavLink activeClassName="active" to={`${match.url}/balance`}>
            账户余额
            </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to={`${match.url}/charge`}>
            充币
            </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to={`${match.url}/extract`}>
            提币
            </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to={`${match.url}/history`}>
            资产记录
            </NavLink>
        </li>
      </ul>
      <div className="route">
        <Switch>
          <Route path={`${match.url}/balance`} component={Bala} />
          <Route path={`${match.url}/charge`} component={Char} />
          <Route path={`${match.url}/extract`} component={Extr} />
          <Route path={`${match.url}/history`} component={Char} />
          <Redirect to={`${match.url}/balance`} />
        </Switch>
      </div>
    </div>;
  }
}
