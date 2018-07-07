import React, {Component} from 'react';
import exchangeViewBase from '../../components/ExchangeViewBase'
import "./stylus/homeNotice.styl"

export default class homeNotice extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      top1: 0,
      top2: 100,
      criticalArr: [0, 100]
    }
    const {controller} = props
    // 绑定view
    controller.setView(this)
    // 初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getNoticeCon = controller.getNoticeCon.bind(controller) // 获取公告
  }

  // setView(view){
  //   super.setView(view);
  //   return this.store.data
  // }

  componentWillMount() {

  }

  async componentDidMount() {
    await this.getNoticeCon(0, 5);
    let result = this.state.noticeList
    if (this.state.noticeList.length) {
      this.setState(
        {
          top2: Math.ceil(result.length / 2) * 100,
          criticalArr: Array.from(
            { length: Math.ceil(result.length / 2 + 1) },
            (item, index) => index * 100
          )
        },
        () => {
          this.props.controller.swiper(
            "carousel",
            this,
            "top1",
            "top2",
            this.state.criticalArr,
            10,
            3000
          );
        }
      );
    }
  }

  componentWillUpdate(...parmas) {

  }
  componentWillunmount() {
    this.props.controller.swiperStop("carousel");
  }

  render() {
    console.log('首页公告', this.state)
    return (
      <div className="home-notice-wrap">
        {this.state.noticeList.length && <div className="home-notice-content clearfix">
            <p>公告</p>
          {/*style={{ top: this.state.top1 + "%" }}*/}
            <ul >
              {this.state.noticeList.map((v, index) => (<li key={index}>
                {this.props.controller.configData.language === 'zh-CN' ? v.subjectCn : v.subjectEn}
              </li>))}
            </ul>
          </div>}
      </div>
    );
  }
}
