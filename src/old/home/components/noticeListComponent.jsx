import {observer} from "mobx-react";
import React from "react";
import "../css/notice.css"
import {translate} from "react-i18next";

@translate(['translations'], {wait: true})
@observer
class NoticeListComponent extends React.Component {
  constructor(props) {
    super(props);
    const {store} = this.props;
    store.get();
  }

  get title() {
    const {t} = this.props;//18-06-08 03:37
    return (
      <div className="home-notice-title">
        <h3>{t('资讯概览')}</h3>
        <div className="notice-check-more">
          <a href='/help/news#infoAnchor' className="mix-title-font">{t('查看更多')}<img src="/static/img/commonImg/more_icon.svg" alt=""/></a>
        </div>
      </div>
    )
  }

  get noticeContent() {
    const {store} = this.props;
    const {t} = this.props;
    console.log('store.notice_table',store.notice_table)
    return store.notice_table.map((v, i) => (
        <ul key={i}>
          <li className="notice-img"><img src={v.img} alt=""/></li>
          <li className="notice-time mix-text-gray"><span>{v.time}</span></li>
          <li className="notice-title mix-title-font mix-text-black">
            {['zh-hans','zh-hant'].indexOf(conf.languageCode)===-1?v.title_en:v.title}
          </li>
          <li className="notice-detail">
            {/*<span className="mix-h-blue">阅读详情</span>*/}
            {<a href={v.url} className="mix-h-blue">{t('阅读详情')}</a>}
            <img src="/static/img/commonImg/more_icon.svg" alt=""/>
          </li>
        </ul>
      )
    )
  }

  render() {
    return (
      <div className="notice-main">
        {this.title}
        <div className="notice-body">
          {this.noticeContent}
        </div>
      </div>
    );
  }
}

export default NoticeListComponent
