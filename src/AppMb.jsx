import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import "./common/css/index.styl";

import ConfigController from "./class/config/ConfigController";
import AssetController from "./class/asset/AssetController";
import UserController from "./class/user/UserController";
import LoginController from "./class/login/LoginController";
import NoticeController from "./class/notice/NoticeController";
import ActivityController from "./class/activity/ActivityController";
import UserOrderListController from "./class/orderList/userOrderList/UserOrderListController";
import MarketController from "./class/market/MarketController";

import Header from "./componentsMb/header/Header.jsx";
import Home from "./componentsMb/home/Home.jsx";
import Login from "./componentsMb/login/Login.jsx";
import Help from "./componentsMb/help/Help.jsx";
import ForgetPass from "./componentsMb/login/ForgetPass.jsx";
import AssetManange from "./componentsMb/asset/AssetManage";
import Genrealize from "./componentsMb/genrealize/Genrealize.jsx";
import OrderManage from "./componentsMb/order/OrderManage.jsx";
import UserCenter from "./componentsMb/user/UserCenter.jsx";

let testAppController,
  configController,
  assetController,
  userController,
  loginController,
  noticeController,
  activityController,
  marketController,
  userOrderController;

const header = ({ match, history }) => {
  return (
    <Header
      userController={userController}
      loginController={loginController}
      history={history}
    />
  );
};

const LoginComponent = ({ match, history, location }) => {
  return (
    <Login
      controller={loginController}
      match={match}
      history={history}
      location={location}
    />
  );
};

const HomeCompoment = () => {
  return (
    <Home
      activityController={activityController}
      marketController={marketController}
    />
  );
};

const HelpComponent = ({ match }) => {
  return <Help controller={assetController} match={match} />;
};

const ForgetPassComponent = ({ match, history }) => {
  return (
    <ForgetPass controller={loginController} match={match} history={history} />
  );
};

const AssetComponent = ({ match }) => {
  return <AssetManange controller={assetController} match={match} />;
};
const OrderManageCompoment = ({ match }) => {
  return <OrderManage controller={userOrderController} match={match} />;
};

const UserCenterComponent = ({ match, history, location }) => {
  return (
    <UserCenter
      match={match}
      controller={userController}
      history={history}
      location={location}
    />
  );
};

const Gener = ({ match }) => {
  return <Genrealize match={match} controller={activityController} />;
};

const Routers = [
  { path: "/mhome", component: HomeCompoment },
  { path: "/mlogin", component: LoginComponent },
  { path: "/mlogin/:uid", component: LoginComponent },
  { path: "/mfindPass", component: ForgetPassComponent },
  { path: "/mgenrealize", component: Gener },
  { path: "/mhelp", component: HelpComponent },
  { path: "/mwallet", component: AssetComponent, auth: true },
  { path: "/morder", component: OrderManageCompoment, auth: true },
  { path: "/muser", component: UserCenterComponent, auth: true }
];

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
    marketController = new MarketController("market");
    userOrderController = new UserOrderListController();

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

    userOrderController.userController = userController;
    userOrderController.marketController = marketController;

    configController.setAppView(this);
  }

  componentWillMount() {}

  componentDidMount() {
    configController.loadLocales();
  }

  componentWillUpdate(...parmas) {}

  render() {
    return (
      <Router>
        {this.state.initDone && (
          <div>
            {/*<Header/>*/}
            <Switch>
              <Route component={header} />
            </Switch>
            <div>
              <Switch>
                {Routers.map((item, i) => (
                  <Route
                    path={item.path}
                    key={i}
                    render={props =>
                      !item.auth ? (
                        <item.component {...props} />
                      ) : userController.Storage.userToken.get() ? (
                        <item.component {...props} />
                      ) : (
                        <Redirect
                          to={{
                            pathname: "/mlogin",
                            state: { from: props.location }
                          }}
                        />
                      )
                    }
                  />
                ))}
                <Redirect to="/mhome" />
              </Switch>
            </div>
          </div>
        )}
      </Router>
    );
  }
}
