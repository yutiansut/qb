import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import {AsyncComponent} from './core'

// import "./core/libs/ChangeFontSize";
import "./common/css/index.styl";

import ConfigController from "./class/config/ConfigController";
import AssetController from "./class/asset/AssetController";
import UserController from "./class/user/UserController";
import LoginController from "./class/login/LoginController";
import NoticeController from "./class/notice/NoticeController";
import ActivityController from "./class/activity/ActivityController";
import UserOrderListController from "./class/orderList/userOrderList/UserOrderListController";
import MarketController from "./class/market/MarketController";

// import UserInfo from "./components/user/UserCenter.jsx";
import Header from "./components/headerAndFooter/Header.jsx";
import Footer from "./components/headerAndFooter/footer.jsx";
// import LoginCon from "./components/login/Login.jsx";
// import Home from "./components/home/Home.jsx";
// import TradeCon from "./components/trade/Trade.jsx";
// import ForgetPassCon from "./components/login/ForgetPass.jsx";
// import NoticeInfo from "./components/notice/NoticeBulletin.jsx";
// import UserNoticeInfo from "./components/notice/UserNotice.jsx"; // 用户通知
// import OrderManage from "./components/order/OrderManage.jsx";
// import AssetManange from "./components/asset/AssetManage";
// import Helper from "./components/help/Help";
// import ActivityInfo from "./components/activity/Activity.jsx";
// import NoticeDetailCon from "./components/notice/noticeChild/NoticeContentDetail.jsx";
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

// const Asset = ({ match }) => {
//   return <AssetManange controller={assetController} match={match} />;
// };

// const Trade = ({ match, location }) => {
//   return (
//     <TradeCon
//       marketController={marketController}
//       userOrderController={userOrderController}
//       match={match}
//       userController={userController}
//       assetController={assetController}
//       klineController={klineController}
//       location={location}
//     />
//   );
// };

// const User = ({ match, history }) => {
//   return (
//     <UserInfo controller={userController} match={match} history={history} />
//   );
// };

// controller={loginController}
// match={match}
// history={history}
// location={location}

// const Loign = ({ match, history, location }) => {
//   let obj = {
//     match, history, location, controller: loginController
//   }
//   return (
//     <LoginCon {...obj} />
//   );
// };

// let obj = {controller: loginController}


// const ForgetPass = ({ match, history }) => {
//   return (
//     <ForgetPassCon
//       controller={loginController}
//       match={match}
//       history={history}
//     />
//   );
// };

// const Notice = ({ match }) => {
//   return <NoticeInfo controller={noticeController} match={match} />;
// };

// const UserNotice = ({ match, location }) => {
//   return (
//     <UserNoticeInfo
//       controller={noticeController}
//       match={match}
//       location={location}
//     />
//   );
// };

// const NoticeDetail = ({ match, location }) => {
//   return (
//     <NoticeDetailCon
//       controller={noticeController}
//       match={match}
//       location={location}
//     />
//   );
// };

const tradeFooter = ({ match }) => {
  return <SimpleAsset controller={assetController} />;
};

// const Help = ({ match }) => {
//   return <Helper controller={assetController} match={match} />;
// };

// const Activity = ({ match }) => {
//   return <ActivityInfo controller={activityController} match={match} />;
// };

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
      <div style={{ height: ".7rem" }} />
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
      <div style={{ height: ".7rem" }} />
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
      <div style={{ height: ".5rem" }} />
    </div>
  );
};

// const HomeComponent = () => {
//   return (
//     <Home
//       marketController={marketController}
//       activityController={activityController}
//       noticeController={noticeController}
//     />
//   );
// };
// const Order = ({ match }) => {
//   return <OrderManage controller={userOrderController} match={match} />;
// };

// const

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
      { path: "/whome", component: HomeComponent },
      { path: "/trade", component: Trade },
      { path: "/wlogin/:uid", component: Loign },
      { path: "/wlogin", component: Loign },
      { path: "/wallet", component: Asset, auth: true },
      { path: "/worder", component: Order, auth: true },
      { path: "/wuser", component: User, auth: true },
      { path: "/wfindPass", component: ForgetPass },
      { path: "/wnotice/content/detail", component: NoticeDetail },
      { path: "/wnotice", component: Notice },
      { path: "/help", component: Help },
      { path: "/activity", component: Activity },
      { path: "/wuserNotice", component: UserNotice, auth: true }
    ];
  }

  componentWillMount() {}

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
              <Route path="/whome" component={homeHeader} />
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
                        ["/wlogin", "/wlogin/:uid", '/wfindPass'].includes(item.path) && userController.Storage.userToken.get() ? (
                          <Redirect to={{ pathname: "/whome" }} />
                        ) : (
                            <item.component {...props} />
                          )
                      ) : userController.Storage.userToken.get() ? (
                        <item.component {...props} />
                      ) : (
                            <Redirect
                              to={{
                                pathname: "/wlogin",
                                state: { from: props.location }
                              }}
                            />
                          )
                      }
                    }
                  />
                ))}
                <Redirect to="/whome" />
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
