import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import ExchangeViewBase from '../../ExchangeViewBase'
import "../stylus/homeActivity.styl"

export default class HomeActivity extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      bannerImgUrl:''
    }
    const {controller} = props
    // 绑定view
    controller.setView(this)
    // 初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    // console.log('活动', this.state)
    this.getHomeBanner = controller.getHomeBanner.bind(controller)
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.getHomeBanner(1,0)
  }

  componentWillUpdate(...parmas) {

  }

  render() {
    let userToken = this.props.controller.userController.userToken
     // console.log('登录', userToken) /activity/fresh
    return (
      <div className="banner-wrap" id="active" style={{height: `${document.body.clientWidth * 750 / 1440 - 60}px`}}>
        <div className="banner-content" style={{height: `${document.body.clientWidth * 750 / 1440 - 60}px`}}>
          <img src={this.props.controller.configController.store.state.language === "zh-CN" ? this.$imagesMap.$home_banner_text_cn : this.$imagesMap.$home_banner_text_en}
               alt=""
               className={`${this.props.controller.configController.store.state.language === "zh-CN" ? 'img-cn' : 'img-en'} content`}/>
          {userToken ? (
            <a href="/wlogin" target="_blank" className={`${this.props.controller.configController.store.state.language === "zh-CN" ? 'cn-content' : 'en-content'} content-link`}>
              <span className="banner-btn"></span>
            </a>
          ) : (
            <Link to="/wlogin" className={`${this.props.controller.configController.store.state.language === "zh-CN" ? 'cn-content' : 'en-content'} content-link`}>
              <span className="banner-btn"></span>
            </Link>
          )}
        </div>
        <div alt="" className="banner-img" style={{background: `url(${this.state.bannerImgUrl}) center center / cover no-repeat`, height: `${document.body.clientWidth * 750 / 1440 - 60}px`}}/>
      </div>
    );
  }
}
