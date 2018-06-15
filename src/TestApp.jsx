import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import exchangeViewBase from './components/ExchangeViewBase'

export default class testApp extends exchangeViewBase {

  constructor(props) {
    super(props);
    this.state = {count: 1, test: { a: 1}}
    // console.log(props)
    const {controller} = props;
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    // console.log(this.state)
    //绑定方法
    this.getData = controller.getData.bind(controller)
    console.log(controller.configData)
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

  componentWillUpdate(props, state, next) {
    const {controller} = props
    console.log('testApp componentWillUpdate', props, state, next)

    // let arr = controller.filter([0], false)
    // console.log('start', Date.now())
    // let arr = controller.sort([{title: 'abc', pair: 'usd/btc', market: 'btc', trade: 'usd', price:{cny:1000, usd: 1001}},
    //   {title: 'defa', pair: 'usd/btc', market: 'btc', trade: 'usdt', price:{cny:1100, usd: 1000}},
    //   {title: 'ghi', pair: 'usd/btc', market: 'btc', trade: 'usd', price:{cny:100, usd: 1002}},
    //   {title: 'jkla', pair: 'usd/btc', market: 'btc', trade: 'usdt', price:{cny:100, usd: 1001}}], ['price', 'cny'], 1, ['price', 'usd'])
    // console.log('bbbbb', arr)

    // countDown(key, state, view) {
  }


  render() {
    return (
      <div>
        <div>{this.props.sta}</div>
        <div>{this.state.count}</div>
        <div>{this.state.test.a}</div>
        <div>{this.state.price}</div>
        <div>{this.state.testObj.b}</div>
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