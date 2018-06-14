import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import exchangeViewBase from './components/ExchangeViewBase'

export default class testApp extends exchangeViewBase {

  constructor(props) {
    super(props);
    // this.state = {count: 1}
    // console.log(props)
    const {controller} = props 
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = controller.getInitState()
    // console.log(this.state)
    //绑定方法
    this.getData = controller.getData.bind(controller)
    // this.data =
  }

  componentWillMount() {
    // super.componentWillMount();
    this.getData()
    console.log('testApp componentWillMount')
  }

  componentDidMount() {
    // super.componentDidMount();
    console.log('testApp componenDidMount')
  }

  componentWillUpdate(...parmas) {
    console.log('testApp componentWillUpdate', ...parmas)
  }


  render() {
    return (
      <div>
        <div>{this.props.sta}</div>
        <div>{this.state.count}</div>
        <button onClick={this.getData}>11111</button>
        {/*<Router>*/}
        <div>
          <Link to="/">
            回退
          </Link>
          <Link to="/topics">
            回退
          </Link>
        </div>
        {/*</Router>*/}
      </div>
    );
  }

}