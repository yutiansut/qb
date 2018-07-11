import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import "./common/css/index.styl"

import ConfigController from "./class/config/ConfigController";
import AssetController from "./class/asset/AssetController";
import UserController from "./class/user/UserController";
import LoginController from "./class/login/LoginController";
import NoticeController from "./class/notice/NoticeController";
import ActivityController from "./class/activity/ActivityController";
import UserOrderListController from "./class/orderList/userOrderList/UserOrderListController";
import MarketController from "./class/market/MarketController"

import Header from './componentsMb/header/Header.jsx'
import Home from './componentsMb/home/Home.jsx'
import Login from './componentsMb/login/Login.jsx'


let testAppController,
    configController,
    assetController,
    userController,
    loginController,
    noticeController,
    activityController,
    marketController,
    userOrderController
;

const header = ({ match, history}) => {
    return <Header/>;
};

const LoginComponent = ({ match, history }) => {
    return <Login controller={loginController} match={match} history={history} />
};

const HomeCompoment = () => {
  return <Home activityController={activityController} marketController={marketController}/>
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { initDone: false };

      configController = new ConfigController();
      assetController = new AssetController();
      userController = new UserController();
      loginController = new LoginController();
      noticeController = new NoticeController();
      activityController = new ActivityController();
      marketController = new MarketController('market');
      
      noticeController.configController = configController;

      activityController.configController = configController;
      noticeController.userController = userController;

      assetController.configController = configController;
      assetController.userController = userController;
      assetController.marketController = marketController;
      loginController.userController = userController;

      marketController.userController = userController;
      marketController.configController = configController;
      marketController.assetController = assetController;

      configController.setAppView(this);
  }


  componentWillMount() {

  }

  componentDidMount() {
    configController.loadLocales();

  }

  componentWillUpdate(...parmas) {


  }

  render() {
    return <Router>
          {this.state.initDone && <div>
              {/*<Header/>*/}
              <Switch>
                  <Route component={header} />
              </Switch>
              <div>
                  <Switch>
                      <Route exact path="/home" component={HomeCompoment} />
                      <Route exact path="/login" component={LoginComponent} />
                      <Redirect to="/home" />
                  </Switch>
              </div>
          </div>}
      </Router>;
  }
}
