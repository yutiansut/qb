import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import ExchangeViewBase from '../../ExchangeViewBase';
import "../stylus/homeActivity.styl";
import Progressive from '../../../class/lib/lazy'
import index from "../../../common/component/TitleInput";

export default class HomeActivity extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      homeBanner: {},
    };
    const {controller} = props;
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
    // status 1 进行中  2未开始   3已过期  0获取所有类型
    // position 0 首页  1活动页
    // it 1-web,2-h5
    this.getHomeBanner(1, 0, 1);
  }

  componentWillUpdate(...parmas) {

  }

  render() {
    let userToken = this.props.controller.userController.userToken
    // console.log('登录', userToken) /activity/fresh
    let lang = this.props.controller.configController.store.state.language;
    let homeBanner = this.state.homeBanner || {};
    let hB = {"zh-CN": homeBanner.hBc, "en-US": homeBanner.hBe}[lang] || ""; // 背景图片
    debugger;
    let t = {"zh-CN": homeBanner.tc, "en-US": homeBanner.te}[lang] || ""; // 标题图片
    let btn = {"zh-CN": homeBanner.btc, "en-US": homeBanner.bte}[lang] || ""; // 按钮图片
    return (
      <div className="banner-wrap" id="active" style={{height: `${document.body.clientWidth * 750 / 1440 - 60}px`}}>
        <div className="banner-content" style={{height: `${document.body.clientWidth * 750 / 1440 - 60}px`}}>
          <img src={t}
               alt=""
               className={`${lang === "zh-CN" ? 'img-cn' : 'img-en'} ${userToken ? 'login-content' : ''} content`}/>
          {this.props.controller.configData.activityState ? (
            <Link to="/activity/fresh"
                  className={`${this.props.controller.configController.store.state.language === "zh-CN" ? 'cn-content' : 'en-content'} content-link`}>
              <span className="banner-btn" style={{background: `url(${btn}) center center / 100% no-repeat`}}></span>
            </Link>
          ) : (
            !userToken &&
            <Link to="/login" className={`${lang === "zh-CN" ? 'cn-content' : 'en-content'} content-link`}>
              <span className="banner-btn" style={{background: `url(${btn}) center center / 100% no-repeat`}}></span>
            </Link>
          )}
        </div>

        <div alt="" className="banner-img" style={{
        background: `url(${hB}) center center / cover no-repeat`,
        height: `${document.body.clientWidth * 750 / 1440 - 60}px`
        }}/>

        {/* ↓ 懒加载首页大图*/}
        {/*<div id="lazy-container" className="banner-img">*/}
          {/*<div className="progressive" style={*/}
            {/*{*/}
              {/*height: `${document.body.clientWidth * 750 / 1440 - 60}px`,*/}
              {/*width: `100%`,*/}
              {/*zIndex: -1*/}
            {/*}*/}
          {/*}>*/}
            {/*<img className="preview lazy" src="/static/banner_web_small.jpg"*/}
                 {/*data-src={hB}*/}
            {/*/>*/}
          {/*</div>*/}
        {/*</div>*/}


      </div>
    );
  }
}
