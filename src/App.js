import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";


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
import TradeCon from './components/trade/Trade.jsx'
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
  marketController,
  userOrderController
;

const Asset = ({match}) => {
  return <AssetManange controller={assetController} match={match}/>;
};

const Trade = ({match}) => {
  return <TradeCon marketController={marketController} userOrderController={userOrderController} match={match}/>;
};

const User = ({match}) => {
  return <UserInfo controller={userController} match={match} history={history}/>
};

const Loign = ({match, history}) => {
  return <LoginCon controller={loginController} match={match} history={history}/>
};

const ForgetPass = ({match}) => {
  return <ForgetPassCon controller={loginController} match={match}/>
};

const Notice = ({match}) => {
  return <NoticeInfo controller={noticeController} match={match}/>
};

const tradeFooter = ({match}) => {
  return <div>tradeFotter</div>
}

const Help = ({match}) => {
  return <Helper controller={assetController} match={match}/>;
};

const Activity = ({match}) => {
  return <ActivityInfo controller={activityController} match={match}/>;
}

const header = ({match}) => {
  return <Header navClass={"headerNav"} userController={userController} configController={configController} match={match}/>;
}

const tradeHeader = ({match}) => {
  return <Header navClass={'tradeNav'} match={match} configController={configController}/>;
}

const HomeComponent = () => {
  return <Home marketController={marketController} activityController={activityController}
               noticeController={noticeController}/>
};
const Order = ({match}) => {
  return <OrderManage controller={userOrderController} match={match}/>
};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {initDone: false}

    configController = new ConfigController();
    assetController = new AssetController();
    userController = new UserController();
    loginController = new LoginController();
    noticeController = new NoticeController();
    activityController = new ActivityController();
    marketController = new MarketController('market');
    userOrderController = new UserOrderListController();

    noticeController.configController = configController;
    activityController.configController = configController;
    assetController.configController = configController;
    noticeController.userController = userController;
    assetController.configController = configController;
    assetController.userController = userController;
    assetController.marketController = marketController;
    loginController.userController = userController;
    userOrderController.marketController = marketController;

    configController.setAppView(this);//configController获取app view 以便设置语言后重新渲染
  }


  componentWillMount() {
    // console.log(111, window.innerHeight)
  }

  componentDidMount() {
    configController.loadLocales();
    marketController.getTradePairHandle();
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
            <Route path="/trade" component={tradeHeader}/>
            <Route component={header}/>
          </Switch>
          <div style={{height: '.5rem'}}></div>
          <div style={{minHeight: `${window.innerHeight - 2.1 * 100}px`}}>
            <Switch>
              {/*<Route exact path="/" component={HomeComponent}/>*/}
              <Route exact path="/home" component={HomeComponent}/>
              <Route path='/trade' component={Trade}/>
              <Route path="/login" component={Loign}/>
              <Route path="/wallet" component={Asset}/>
              <Route path="/order" component={Order}/>
              <Route path="/user" component={User}/>
              <Route path="/findPass" component={ForgetPass}/>
              <Route path="/notice" component={Notice}/>
              <Route path="/help" component={Help}/>
              <Route path="/activity" component={Activity}/>
              <Redirect to="/home"/>
            </Switch>
          </div>
          {/*<Footer/>*/}
          <Switch>
            <Route path="/trade" component={tradeFooter}/>
            <Route component={Footer}/>
          </Switch>
        </div>}
      </Router>
    );
  }
}
