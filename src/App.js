import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import './test.styl'
import TestApp from './TestApp.jsx'
import Button from "./common/component/Button/";
import SelectButton from "./common/component/SelectButton/";
import Popup from "./common/component/Popup/";

import testPanage from './testPanage'

// import HomeOld from  './old/home/app.jsx'

import './core/ChangeFontSize'
import './common/rest.styl'

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/about">关于</Link>
        </li>
        <li>
          <Link to="/topics">主题列表</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
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
            <TestApp className="testAAA" sta="111123123" />
        </ul>
    </div>
);

const Topics = ({ match }) => (
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

const Topic = ({ match }) => {
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
      showPopup: false
    }
    testPanage.setThis(this);
  }

  add() {
    this.setState({count: this.state.count + 1});
  }

  render() {
    return <div>
        <div className="color1">1111</div>
        <BasicExample> </BasicExample>
        <div className="color2">
          <p>2222</p>
          <p>3333</p>
        </div>
        <div className="color3"> </div>
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
        <Button title="默认" className="button" />
        <Button title="defalut禁用" disable={true} />
        <Button title="链接百度" theme="positive" href="https://www.baidu.com" target={true} />
        <Button title="链接百度" type="base" theme="positive" className="button-a" href="https://www.baidu.com" target={true} />
        <Button title="警示" theme="warn" />
        <Button title="危险" theme="danger" />
        <br />
        <Button title="默认" type="base" />
        <Button title="base禁用" type="base" disable={true} />
        <Button title="弹窗" type="base" theme="positive" onClick={() => this.setState({ showPopup: true })} />
        <Button title="警示" type="base" theme="warn" />
        <Button title="危险" type="base" theme="danger" />
        <br />
        <Button title="带背景按钮" type="back1" />
        <Button title="带背景按钮" type="back2" className="button-back2" theme="danger" />
        <a href="#">文字按钮</a>
        <br />
        <br />
        <br />
        <SelectButton className="select" valueArr={["1", 2, 3, 4, 5]} title="简体中文" onSelect={item => {
            console.log(item);
          }} />
        <SelectButton className="select" type="main" valueArr={["撒发达", "fsdgg", 3, 4, 5]} title="更多操作" onSelect={item => {
            console.log(item);
          }} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* {this.state.showPopup && <Popup title="标题" msg="khlsdhfshfdasujdasfh" onClose={() => { this.setState({showPopup: false})}}></Popup>} */}
        {this.state.showPopup && <Popup title="标题" type="tip" msg="khlsdhfshfdasujdasfh" onClose={() => { this.setState({showPopup: false})}}></Popup>}
        <br />
        <br />
        <br />
        <br />
      </div>;
  }
}
