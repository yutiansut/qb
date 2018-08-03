import React from 'react';
import ExchangeViewBase from '../../../components/ExchangeViewBase.jsx';

export default class AboutUs extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      qbtTrade: [],
      introduceList: [
        {title: this.intl.get("user-aboutUsSecurity"), url: this.$imagesMap.$h5_user_about_anquan, content: this.intl.getHTML("user-aboutUsSecurityCon")},
        {title: this.intl.get("user-aboutUsQuality"), url: this.$imagesMap.$h5_user_about_pinzhi, content: this.intl.getHTML("user-aboutUsQualityCon")}
      ],
      // contactList: [
      //   {title: this.intl.get("user-aboutUsTwitter"), link:"@QB_Exchange"},
      //   {title: this.intl.get("user-aboutUsWeChat"), link:"QBservice"},
      //   {title: this.intl.get("user-aboutUsTelegraph"), link:"https://t.me/QB_ExchangeEN"},
      //   {title: this.intl.get("user-aboutUsEmail"), link:"support@qb.com"}
      // ]
    }
    const {controller} = this.props
    controller.setView(this)
    console.log('关于我们', controller.configData)
    this.getQbtTrade = controller.getQbtTrade.bind(controller)
    this.addContent = controller.headerController.addContent.bind(controller.headerController)
  }

  componentWillMount() {
  }
  componentDidMount() {
    this.getQbtTrade()
    this.addContent({con: '关于我们'})
  }

  render() {
    const {controller, history} = this.props;
    const language = this.props.controller.configData.language;
    return (
      <div className={`about-us`}>
        {/*{this.state.qbtTrade && this.state.qbtTrade.map((v,index) =>*/}
          {/*<img key={index} src={language === "zh-CN" ? v.uc : v.ue}/>*/}
          {/*)}*/}
        <div className="about-us-con">
          <img src={this.$imagesMap.$h5_logo} alt="" className="logo"/>
          <p>{this.intl.getHTML("user-aboutUsIntroduce")}</p>
          <h1>{this.intl.get("user-aboutUsAdvantages")}</h1>
          <ul>
            {this.state.introduceList && this.state.introduceList.map((v, index) => (<li key={index}>
              <h2>{v.title}</h2>
              <img src={v.url} alt=""/>
              <p>{v.content}</p>
            </li>))}
          </ul>
          <h1>{this.intl.get("notice-contact")}</h1>
          <ol>
            {/*{this.state.contactList && this.state.contactList.map((v, index) => (<li key={index}>*/}
              {/*<span>{v.title}</span>*/}
              {/*<b>{v.link}</b>*/}
            {/*</li>))}*/}
            <li><span>{this.intl.get("user-aboutUsTwitter")}</span><b>{controller.configData.twitter}</b></li>
            <li><span>{this.intl.get("user-aboutUsWeChat")}</span><b>{controller.configData.weChat}</b></li>
            <li><span>{this.intl.get("user-aboutUsTelegraph")}</span><b>{controller.configData.telegraph}</b></li>
            <li><span>{this.intl.get("user-aboutUsEmail")}</span><b>{controller.configData.contactEmailUrl}</b></li>
          </ol>
        </div>
        {this.props.controller.configData.activityState ? <a className="invite-btn" onClick={e => {
              history.push(`/mgenrealize/invite/?uid=${controller.userId}`)
          }}>{this.intl.get("activity-rule-42")}</a> : ''}
      </div>
    );
  }
}