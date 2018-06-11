import {observer} from "mobx-react";
import {observable, reaction,computed} from 'mobx';
import React from "react";
import {translate} from "react-i18next";
// import "../css/banner.css"

@translate(['translations'], {wait: true})
@observer
class BannerNoticeComponent extends React.Component {
  constructor(props) {
    super(props);
    const {store} = this.props;
    store.get();
    this.handleMouseEnter.bind(this);
    this.handleMouseLeave.bind(this);
  };

  componentDidMount() {
    const {store} = this.props;
    this.mySwiper = new Swiper('#home_banner_notice', {
        direction : 'vertical',
        autoplay: {
          delay: 3000,
        },//可选选项，自动滑动
        // grabCursor:'true',
        allowTouchMove: false,
        // touchMoveStopPropagation:true,
        observer:true,
        observeParents:true,
        autoplayDisableOnInteraction : false,
        // loop:true,
      }
    );
  }

  handleMouseEnter(){
    this.mySwiper.autoplay.stop()
  }

  handleMouseLeave(){
    this.mySwiper.autoplay.start()
  }
  render() {
    const {store} = this.props;
    const {t} = this.props;
    let bannerConent = store.bannerNoticeData.map((v, i) => (
        <div key={i} className="swiper-slide">
          <div style={{textAlign:'center',height:'22px',lineHeight:'22px',background: '#F2F4F8'}}>
            <a href={v.url} style={{color:'#25272D'}}>
              <span
                style={{background: `transparent url(/static/img/commonImg/tongzhi.svg) no-repeat left center/15px 16px `, padding:'0 0 0 25px', color:'#25272D'}}
                >{t('公告')}：{['zh-hans','zh-hant'].indexOf(conf.languageCode)===-1?v.title_en:v.title_cn}（{v.time.toDate('MM-dd')}）</span>
            </a>
          </div>
        </div>
      ))
    return (
      <div className="swiper-container" style={{width:'100%',height:'22px',background:'#F2F4F8'}} id="home_banner_notice" onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
        <div className="swiper-wrapper">
          {bannerConent}
        </div>
      </div>
    )

  }
}

export default BannerNoticeComponent
