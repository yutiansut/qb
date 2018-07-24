import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import ExchangeViewBase from '../../../components/ExchangeViewBase'

export default class HomeNotice extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      top1: 0,
      top2: 100,
      criticalArr: [0, 100]
    };
    const {controller} = props;
    // 绑定view
    controller.setView(this);
    // 初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getNoticeCon = controller.getNoticeCon.bind(controller) // 获取公告
  }

  componentWillMount(){}

  async componentDidMount() {
    await this.getNoticeCon(0, 5);
    let result = Object.keys(this.state.noticeList).length && this.state.noticeList.data || []
    if (Object.keys(this.state.noticeList).length) {
      this.setState(
        {
          top2: Math.ceil(result.length) * 100,
          criticalArr: Array.from(
            { length: Math.ceil(result.length + 1) },
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

  componentWillUnmount() {
    this.props.controller.swiperStop("carousel");
  }

  render() {
    return <div className={`${Object.keys(this.state.noticeList).length && this.state.noticeList.data ? "" : "hide"} home-notice-wrap`}>
      {Object.keys(this.state.noticeList).length && this.state.noticeList.data && <div className="home-notice-content">
        <ul style={{ top: this.state.top1 + "%" }}>
          {Object.keys(this.state.noticeList).length && this.state.noticeList.data && this.state.noticeList.data.map((v, index) => <li key={index}>
            <Link to={`wnotice/content/detail?noticeId=${v.activityId}`}>
              <i>【{v.createdAt.toDate('MM-dd')}】</i>
              <span>{this.props.controller.configData.language === "zh-CN" ? v.subjectCn : v.subjectEn}</span>
            </Link>
          </li>)}
        </ul>
        <ul style={{ top: this.state.top2 + "%" }}>
          {Object.keys(this.state.noticeList).length && this.state.noticeList.data && this.state.noticeList.data.map((v, index) => <li key={index}>
            <Link to={`wnotice/content/detail?noticeId=${v.activityId}`}>
              <i>【{v.createdAt.toDate('MM-dd')}】</i>
              <span>{this.props.controller.configData.language === "zh-CN" ? v.subjectCn : v.subjectEn}</span>
            </Link>
          </li>)}
        </ul>
      </div>}
    </div>;
  }
}
