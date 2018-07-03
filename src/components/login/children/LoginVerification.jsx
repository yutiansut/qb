import React, {Component} from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase'

import "../login.styl"

export default class LoginVerification extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {

    }
    const {controller} = props
    //绑定view
    // controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.initLoginVerification = controller.initLoginVerification.bind(controller)
    // console.log('手势验证', this.state)
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.initLoginVerification()
  }

  componentWillUpdate(...parmas) {

  }

  render() {
    return (
      <div id="vaptcha_container">
        {/*vaptcha_container是用来引入Vaptcha的容器，下面代码为预加载动画，仅供参考*/}
        <div className="vaptcha-init-main">
          <div className="vaptcha-init-loading">
            <a href="/" target="_blank"><img src="https://cdn.vaptcha.com/vaptcha-loading.gif"/></a>
            <span className="vaptcha-text">Vaptcha启动中...</span>
          </div>
        </div>
      </div>
    );
  }
}