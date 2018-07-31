import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import {AsyncComponent} from './core'

import "./common/css/base.styl";
import "./common/css/reset.styl";
import "./common/component/style/index.styl";

import ConfigController from "./class/config/ConfigController";
import AssetController from "./class/asset/AssetController";
import UserController from "./class/user/UserController";
import LoginController from "./class/login/LoginController";
import NoticeController from "./class/notice/NoticeController";
import ActivityController from "./class/activity/ActivityController";
import UserOrderListController from "./class/orderList/userOrderList/UserOrderListController";
import MarketController from "./class/market/MarketController";

import Header from "./components/headerAndFooter/Header.jsx";
import Footer from "./components/headerAndFooter/footer.jsx";

import KlineController from "./class/kline/KlineController";

import SimpleAsset from "./components/asset/children/Simple";

let configController,
  assetController,
  userController,
  loginController,
  noticeController,
  activityController,
  marketController,
  userOrderController,
  klineController,
  Routers;

const tradeFooter = ({ match }) => {
  return <SimpleAsset controller={assetController} />;
};


const header = ({ match, history }) => {
  return (
    <div>
      <Header
        navClass={"headerNav"}
        userController={userController}
        configController={configController}
        noticeController={noticeController}
        loginController={loginController}
        match={match}
        history={history}
      />
      <div style={{ height: "70px" }} />
    </div>
  );
};

const homeHeader = ({ match, history }) => {
  return (
    <div>
      <Header
        navClass={"homeNav"}
        userController={userController}
        noticeController={noticeController}
        configController={configController}
        loginController={loginController}
        match={match}
        history={history}
      />
      <div style={{ height: "70px" }} />
    </div>
  );
};

const homeFooter = ({ match, history }) => {
    return <Footer configController={configController}/>;
};

const tradeHeader = ({ match, history }) => {
  return (
    <div>
      <Header
        navClass={"tradeNav"}
        userController={userController}
        noticeController={noticeController}
        configController={configController}
        loginController={loginController}
        match={match}
        history={history}
      />
      <div style={{ height: "50px" }} />
    </div>
  );
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
    marketController = new MarketController("market");
    userOrderController = new UserOrderListController();
    klineController = new KlineController();
    configController.getActivityState();

    userOrderController.userController = userController; //订单管理获取用户id

    noticeController.configController = configController;
    noticeController.userController = userController;

    klineController.configController = configController;

    userController.configController = configController;

    activityController.configController = configController;
    activityController.userController = userController;

    assetController.configController = configController;
    assetController.userController = userController;
    assetController.marketController = marketController;

    loginController.userController = userController;
    loginController.configController = configController;

    userOrderController.marketController = marketController;

    marketController.userController = userController;
    marketController.configController = configController;
    marketController.assetController = assetController;

    configController.setAppView(this); //configController获取app view 以便设置语言后重新渲染

    let Loign = AsyncComponent(()=>import("./components/login/Login.jsx"), {controller:loginController});
    let ForgetPass = AsyncComponent(()=>import("./components/login/ForgetPass.jsx"), {controller:loginController});
    let Notice = AsyncComponent(()=>import("./components/notice/NoticeBulletin.jsx"), {controller:noticeController});
    let UserNotice = AsyncComponent(()=>import("./components/notice/UserNotice.jsx"), {controller:noticeController});
    let Asset = AsyncComponent(()=>import("./components/asset/AssetManage"), {controller:assetController});
    // let tradeFooter = AsyncComponent(()=>import("./components/asset/children/Simple"), {controller:assetController});
    let Help = AsyncComponent(()=>import("./components/help/Help"), {controller:assetController});
    let Activity = AsyncComponent(()=>import("./components/activity/Activity.jsx"), {controller:activityController});
    let User = AsyncComponent(()=>import("./components/user/UserCenter.jsx"), {controller:userController});
    let NoticeDetail = AsyncComponent(()=>import("./components/notice/noticeChild/NoticeContentDetail.jsx"), {controller:noticeController});
    let Order = AsyncComponent(()=>import("./components/order/OrderManage.jsx"), {controller:userOrderController});
    let Trade = AsyncComponent(()=>import("./components/trade/Trade.jsx"), {marketController, userOrderController, assetController, userController, klineController});
    let HomeComponent = AsyncComponent(()=>import("./components/home/Home.jsx"), {marketController, activityController, noticeController});

    Routers = [
      { path: "/home", component: HomeComponent },
      { path: "/trade", component: Trade },
      { path: "/login/:uid", component: Loign },
      { path: "/login", component: Loign },
      { path: "/wallet", component: Asset, auth: true },
      { path: "/order", component: Order, auth: true },
      { path: "/user", component: User, auth: true },
      { path: "/findPass", component: ForgetPass },
      { path: "/notice/content/detail", component: NoticeDetail },
      { path: "/notice", component: Notice },
      { path: "/help", component: Help },
      { path: "/activity", component: Activity },
      { path: "/userNotice", component: UserNotice, auth: true }
    ];
  }
  componentWillMount() {
  }

  componentDidMount() {
    configController.loadLocales();
    // marketController.getTradePairHandle();
    // console.log(222, window.innerHeight)
  }

  componentWillUpdate(...parmas) {
    // console.log(333, window.innerHeight)
  }

  render() {
    return (
      <Router>
        {this.state.initDone && (
          <div className="web-wrap">
            {/*<Header/>*/}
            <Switch>
              <Route path="/home" component={homeHeader} />
              <Route path="/trade" component={tradeHeader} />
              <Route component={header} />
            </Switch>
            <div
              style={{
                minHeight: `${window.innerHeight - 2.1 * 100}px`,
                width: "100%"
              }}
            >
              <Switch>
                {/*<Route exact path="/" component={HomeComponent}/>*/}
                {Routers.map((item, i) => (
                  <Route
                    path={item.path}
                    key={i}
                    render={props => {
                      document.getElementById("app").scrollIntoView(true);
                      return !item.auth ? (
                        ["/login", "/login/:uid", '/findPass'].includes(item.path) && userController.Storage.userToken.get() ? (
                          <Redirect to={{ pathname: "/home" }} />
                        ) : (
                            <item.component {...props} />
                          )
                      ) : userController.Storage.userToken.get() ? (
                        <item.component {...props} />
                      ) : (
                            <Redirect
                              to={{
                                pathname: "/login",
                                state: { from: props.location }
                              }}
                            />
                          )
                      }
                    }
                  />
                ))}
                <Redirect to="/home" />
              </Switch>
            </div>
            {/*<Footer/>*/}
            <Switch>
              <Route path="/trade" component={tradeFooter} />
              <Route component={homeFooter} />
            </Switch>
          </div>
        )}
      </Router>
    );
  }
}
