import {observer} from "mobx-react";
import {observable, reaction,computed} from 'mobx';
import {translate} from "react-i18next";
import React from "react";
import "../css/banner.css"

@translate(['translations'], {wait: true})
@observer
class BannerComponent extends React.Component {
  constructor(props) {
    super(props);
    const {store} = this.props;
    store.get();
  };
  get activityMsg(){
    return [{bannerTitle:'新用户注册免费送', bannerContent:'数字货币', bannerButton:'立即注册'}, {bannerTitle:'邀请好友', bannerContent:'返90%交易佣金', bannerButton:'立即邀请'}]
  }
  componentDidMount() {
    const {store} = this.props;
    let mySwiper = new Swiper('#home_banner_img', {
        direction: 'horizontal',
        speed: 2000,
        effect: 'fade',
        // autoplay: true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
        autoplay:{
            disableOnInteraction: false,
        },
        pagination:
          {
            el: '.swiper-pagination',
            clickable: true,
            type:'bullets',
          },

      }
    );
  }

  render() {
    const {store, t} = this.props;
    let bannerConent = store.bannerData.map((v, i) => {
      return (
        <div key={i} className="swiper-slide" >
          {/*<a href={v.src}>*/}
            <div style={{background: `url(/media/${v.pic_src_cn}) no-repeat center / cover`,width: '100%',height: document.documentElement.clientHeight, position:'relative'}} className='banner-img'>
              <h2>{t(`${this.activityMsg[i].bannerTitle}`)}</h2>
              <h3>{t(`${this.activityMsg[i].bannerContent}`)}</h3>
              <a href={v.src}>{t(`${this.activityMsg[i].bannerButton}`)}</a>
            </div>
            {/*<img src={`/media/${v.pic_src_cn}`} alt="" style={{'height': document.documentElement.clientHeight}}/>*/}
          {/*</a>*/}
        </div>
      )
    })
    return (
      <div className="swiper-container" id="home_banner_img" style={{'height': document.documentElement.clientHeight}}>
        <div className="swiper-wrapper">
          {bannerConent}
        </div>
        <div className="swiper-pagination"></div>
        <div className="banner-bottom"></div>
      </div>
    )

  }
}

export default BannerComponent
