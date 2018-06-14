import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch
} from "react-router-dom";
import exchangeViewBase from "../ExchangeViewBase";

import "./style/index.styl"

const Topic1 = ({ match }) => {
  return (
    <div>
    </div>
  );
};
const Topic2 = ({ match }) => {
  return (
    <div>
    </div>
  );
};
const Topic3 = ({ match }) => {
  return (
    <div>
     
    </div>
  );
};

export default class AssetManage extends exchangeViewBase {
  constructor(props) {
    super(props);

    this.controller = props.controller;
    //绑定view
    this.state = this.controller.setView(this);
    //绑定方法
    // this.getData = controller.getData.bind(controller)
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUpdate() {}

  render() {
    let match = this.props.match;
    return <div className="asset">
        <ul>
          <li>
            <NavLink activeClassName="active" to={`${match.url}/balance`}>账户余额</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={`${match.url}/charge`}>充币</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={`${match.url}/extract`}>提币</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={`${match.url}/history`}>资产记录</NavLink>
          </li>
        </ul>
        <div className="route">
          <Switch>
            <Route path={`${match.url}/balance`} component={Topic1} />
            <Route path={`${match.url}/charge`} component={Topic2} />
            <Route path={`${match.url}/extract`} component={Topic3} />
            <Route path={`${match.url}/history`} component={Topic2} />
            <Redirect to={`${match.url}/balance`}/>
          </Switch>
        </div>
      </div>;
  }
}
