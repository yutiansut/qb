import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './test.styl'
import TestApp from './TestApp.jsx'


import './core/libs/ChangeFontSize'

import testPanage from './testPanage'
import Calendar from './common/component/DatePicker/DatePicker.jsx'
import './common/stylus/qbBase.styl'


import TestAppController from './TestAppController'

const testAppController = new TestAppController()


const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/about">关于</Link></li>
        <li><Link to="/topics">主题列表</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
);

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

  seletTime(state) {
    console.log('日历', state, new Date(state).getTime())
  }
  render() {
    return (
      <div>

        <BasicExample> </BasicExample>
        <div className="color1">1111</div>
        <BasicExample> </BasicExample>
        <div className="color2">
          <p>2222</p>
          <p>3333</p>
        </div>
        <div className="color3"></div>
        <h1>{this.state.count}</h1>
        <button onClick={() => this.add()}>增加1</button>
        <button onClick={() => testPanage.addOne.apply(this)}>增加2</button>
        <h1>{this.state.count}</h1>
        <h1>h1</h1>
        <h1>{this.state.count}</h1>
        <h1>h1</h1>
        <h1>h1</h1>
        <h1>h1</h1>
        <h1>{this.state.count}</h1>

      </div>
    );
  }
}
