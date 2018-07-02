import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";



import "./core/libs/ChangeFontSize";
import "./common/css/index.styl"

import ConfigController from "./class/config/ConfigController";
import AssetController from "./class/asset/AssetController";
import UserController from "./class/user/UserController";
import LoginController from "./class/login/LoginController";
import NoticeController from "./class/notice/NoticeController";
import ActivityController from "./class/activity/ActivityController";
import UserOrderListController from "./class/orderList/userOrderList/UserOrderListController";
import MarketController from "./class/market/MarketController"


import UserInfo from './components/user/UserCenter.jsx'
import Header from './components/headerAndFooter/Header.jsx'
import Footer from './components/headerAndFooter/footer.jsx'
import LoginCon from './components/login/Login.jsx'
import Home from './components/home/Home.jsx'
import Trade from './components/trade/Trade.jsx'
import ForgetPassCon from "./components/login/ForgetPass.jsx";
import NoticeInfo from './components/notice/NoticeBulletin.jsx'
import OrderManage from './components/order/OrderManage.jsx'
import AssetManange from "./components/asset/AssetManage";
import Helper from "./components/help/Help";
import ActivityInfo from "./components/activity/Activity.jsx"

let testAppController,
  configController,
  assetController,
  userController,
  loginController,
  noticeController,
  activityController,
  marketController
  ;

const Asset = ({ match }) => {
  return <AssetManange controller={assetController} match={match} />;
};
const Order = ({ match }) => {
  return <OrderManage controller={UserOrderListController} match={match} />
};
const User = ({ match }) => {
  return <UserInfo controller={userController} match={match} />
};

const Loign = ({ match }) => {
  return <LoginCon controller={loginController} match={match} />
};

const ForgetPass = ({ match }) => {
  return <ForgetPassCon controller={loginController} match={match} />
};

const Notice = ({ match }) => {
  return <NoticeInfo controller={noticeController} match={match} />
};

const tradeFooter = ({ match }) => {
  return <div>tradeFotter</div>
}

const Help = ({ match }) => {
  return <Helper controller={assetController} match={match} />;
};

const Activity = ({ match }) => {
  return <ActivityInfo controller={activityController} match={match} />;
}

const header = ({ match }) => {
  return <Header navClass={'headerNav'} match={match} />;
}

const tradeHeader = ({ match }) => {
  return <Header navClass={'tradeNav'} match={match} />;
}

import TestApp from './TestApp'
import TestAppController from "./TestAppController";

const about = ({ match }) => {
  return <TestApp controller={testAppController} match={match} />;
};
const HomeComponent = () => {
  return <Home marketController={marketController} />
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { initDone: false }

    testAppController = new TestAppController();
    configController = new ConfigController();
    assetController = new AssetController();
    userController = new UserController();
    loginController = new LoginController();
    noticeController = new NoticeController();
    activityController = new ActivityController();
    marketController = new MarketController();


    testAppController.configController = configController;
    noticeController.configController = configController;
    activityController.configController = configController;
    assetController.configController = configController;
    noticeController.userController = userController;
    assetController.configController = configController;
    assetController.userController = userController;
    assetController.marketController = marketController;
    loginController.userController = userController;

  }


  componentWillMount() {
    // console.log(111, window.innerHeight)
  }

  async componentDidMount() {
    let flag = await configController.loadLocales();
    flag && this.setState({ initDone: true });
    // console.log(222, window.innerHeight)
  }

  componentWillUpdate(...parmas) {
    // console.log(333, window.innerHeight)

  }


  render() {

    return (
      <Router>
        {this.state.initDone && <div>
          {/*<Header/>*/}
          <Switch>
            <Route path="/trade" component={tradeHeader} />
            <Route component={header} />
          </Switch>
          <div style={{ height: '.5rem' }}></div>
          <div style={{ minHeight: `${window.innerHeight - 2.1 * 100}px` }}>
            <Switch>
              <Route exact path="/" component={HomeComponent} />
              <Route path="/home" component={HomeComponent} />
              <Route path='/trade' component={Trade} />
              <Route path="/login" component={Loign} />
              <Route path="/wallet" component={Asset} />
              <Route path="/order" component={Order} />
              <Route path="/user" component={User} />
              <Route path="/about" component={about} />
              <Route path="/findPass" component={ForgetPass} />
              <Route path="/notice" component={Notice} />
              <Route path="/help" component={Help} />
              <Route path="/activity" component={Activity} />
              <Redirect to="/" />
            </Switch>
          </div>
          {/*<Footer/>*/}
          <Switch>
            <Route path="/trade" component={tradeFooter} />
            <Route component={Footer} />
          </Switch>
        </div>}
      </Router>
    );
  }
}
