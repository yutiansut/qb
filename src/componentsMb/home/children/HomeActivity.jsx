import React, {Component} from 'react';
import ExchangeViewBase from '../../../components/ExchangeViewBase'

export default class HomeActivity extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      bannerImgUrl:''
    };
    const {activityController} = props;
    // 绑定view
      activityController.setView(this);
    // 初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, activityController.initState);
    this.getHomeBanner = activityController.getHomeBanner.bind(activityController);
  }

  componentDidMount() {
    this.getHomeBanner(1,0)
  }

  render() {
    let {history,activityController}=this.props;
    let lang = activityController.configController.store.state.language;
    return (
      <div className="banner-wrap-mb" onClick={() => history.push("/mgenrealize/invite")}>
          <img src={lang === "zh-CN" ? this.$imagesMap.$home_banner_text_cn : this.$imagesMap.$home_banner_text_en} alt=""/>
        <div alt="" className="banner-img"
               style={{background: `url(${this.state.bannerImgUrl}) center center / cover no-repeat`}}/>
      </div>
    );
  }
}
