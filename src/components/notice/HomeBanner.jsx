import React, {Component} from 'react';
import "./stylus/homeNotice.styl"
import exchangeViewBase from "../ExchangeViewBase";

const list = [4444444, 111111, 222222, 3333333, 4444444, 111111]

export default class HomeBanner extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {

    }
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    // console.log(1111, this.state)
    // this.bannerSwiper = controller.bannerSwiper.bind(controller)
  }

  componentWillMount() {
    // this.bannerSwiper()
  }

  componentDidMount() {

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    return (
      <div className="banner-wrap">
        <ul className="clearfix">
          {list.map((v, index) => (<li key={index}>{v}</li>))}
        </ul>
      </div>
    );
  }
}