import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import exchangeViewBase from '../../components/ExchangeViewBase'
import Pagination from '../../common/component/Pagination/index.jsx'
import "./stylus/userNotice.styl"

export default class userNotice extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {}
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getUserNocticeList = controller.getUserNocticeList.bind(controller) // 获取通知列表
  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }


  componentWillMount() {

  }

  async componentDidMount() {
    await this.getUserNocticeList()

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    console.log('内容', this.state)
    return (
      <div className="user-notice-wrap">
        <h1>通知</h1>
        <dl>
          <dt>
            <i>{this.intl.get("notice-title")}</i>
            <span>{this.intl.get("time")}</span>
          </dt>
          {this.state.userNocticeList.length && this.state.userNocticeList.map((v, index) => (
            <dd key={index}>
              <i>{v.content}</i>
              <span>{v.createAt}</span>
            </dd>))
          }
        </dl>
        <div className={this.state.userNocticeList.length ? '' : 'hide'}>
          {/*{this.state.noticeList.totalCount && <Pagination total={this.state.noticeList.totalCount}*/}
            {/*pageSize={10}*/}
            {/*showTotal={true}*/}            {/*showQuickJumper={true}/>}*/}
        </div>
      </div>
    );
  }
}