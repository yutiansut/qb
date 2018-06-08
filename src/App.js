import React, { Component } from 'react';
import './test.styl'
import TestApp from './TestApp.jsx'

import './core/ChangeFontSize'

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
        <TestApp className="testAAA" sta="111123123" />
        <div className="color1">1111</div>
        <div className="color2">
          <p>2222</p>
          <p>3333</p>
        </div>
        <div className="color3"></div>
        {/*<h1>{this.state.count}</h1>*/}
        {/*<button onClick={() => this.add()}>增加1</button>*/}
        {/*<h1>{this.state.count}</h1>*/}
        {/*<h1>h1</h1>*/}
        {/*<h1>{this.state.count}</h1>*/}
        {/*<h1>h1</h1>*/}
        {/*<h1>h1</h1>*/}
        {/*<h1>h1</h1>*/}
        {/*<h1>{this.state.count}</h1>*/}
      </div>
    );
  }
}
