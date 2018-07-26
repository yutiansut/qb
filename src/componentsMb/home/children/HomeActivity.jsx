import React, {Component} from 'react';
import ExchangeViewBase from '../../../components/ExchangeViewBase'

export default class HomeActivity extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
        homeBanner: {},
    };
    const {activityController} = props;
    // 绑定view
      activityController.setView(this);
    // 初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, activityController.initState);
    this.getHomeBanner = activityController.getHomeBanner.bind(activityController);
  }

  componentDidMount() {
    // status 1 进行中  2未开始   3已过期  0获取所有类型
    // position 0 首页  1活动页
    // it 1-web,2-h5
    this.getHomeBanner(1,0,2)
  }

  render() {
    let {history,activityController}=this.props;
    let lang = activityController.configController.store.state.language;
    let homeBanner = this.state.homeBanner || {};
    let hB = {"zh-CN":homeBanner.hBc,"en-US":homeBanner.hBe}[lang];
    let t = {"zh-CN":homeBanner.tc,"en-US":homeBanner.te}[lang];
    return (
      <div className="banner-wrap-mb">
        {/*<div className="banner-wrap-mb" onClick={() => history.push("/mgenrealize/invite")}>*/}
          <img src={t} alt=""/>
        <div alt="" className="banner-img"
               style={{background: `url(${hB}) center center / cover no-repeat`}}/>
      </div>
    );
  }
}
