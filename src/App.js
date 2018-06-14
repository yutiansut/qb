import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import "./common/css/index.styl"

import './common/css/headerNav.styl'
// import './test.styl'
import TestApp from './TestApp.jsx'

import './core/libs/ChangeFontSize'

import TestAppController from './TestAppController'

const testAppController = new TestAppController();

import UserInfo from './components/user/UserCenter.jsx'

import Header from './components/home/children/header.jsx'

const Home = () => (
  <div>
    <h2>首页</h2>
  </div>
);

const About = () => (
  <div>
    <ul>
      <li><Link to="/">首页</Link></li>
      <li><Link to="/about">关于</Link></li>
      <li><Link to="/topics">主题列表</Link></li>
      <TestApp className="testAAA" sta="aaaaaaaa" controller={testAppController}/>
    </ul>
  </div>
);
const Topics = ({match}) => (
  <div>
    <h2>主题列表</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          使用 React 渲染
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          组件
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          属性 v. 状态
        </Link>
      </li>
      <li>
        <Link to="/">
          回退
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>请选择一个主题。</h3>
    )}/>
  </div>
);

const Topic = ({match}) => {
  console.log(match);
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  )
};

const User = ({match}) => {
  return <UserInfo  match={match}/>
};

const navArray = [
  {label:'首页', to:'/home', select: false, linkUser:false},
  // {label:'币币交易页', to:'/home', select: false, linkUser:false},
  {label:'用户', to:'/user', select: false, linkUser:false},
  {label:'关于', to:'/about', select: false, linkUser:false},
  {label:'主题列表', to:'/topics', select: false, linkUser:false},
];

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <Router>
          <div>
            {/*<ul className="headerNav">*/}
              {/*{navList}*/}
              <Header/>
            {/*</ul>*/}

            <hr/>

            <Switch>
              <Route exact path="/home" component={Home}/>
              <Route path="/trade" component={Home}/>
              <Route path="/user" component={User}/>
              <Route path="/about" component={About}/>
              <Route path="/topics" component={Topics}/>
              <Redirect to="/user" />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
