import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
// import './test.styl'
import TestApp from './TestApp.jsx'

import './core/libs/ChangeFontSize'

import TestAppController from './TestAppController'

const testAppController = new TestAppController()

import UserInfo from './components/user/UserCenter.jsx'

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
}
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    }
  }

  add() {
    this.setState({count: this.state.count + 1});
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <ul className="headerNav" style={{height: '72px',width:'10rem'}}>
              <li><Link to="/">首页</Link></li>
              <li><Link to="/user">用户</Link></li>
              <li><Link to="/about">关于</Link></li>
              <li><Link to="/topics">主题列表</Link></li>
            </ul>

            <hr/>

            <Switch>
              <Route exact path="/" component={Home}/>
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
