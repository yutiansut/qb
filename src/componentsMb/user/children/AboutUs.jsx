import React from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase.jsx';

export default class AboutUs extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      qbtTrade: [],
      introduceList: [
        {title: this.intl.get("user-aboutUsSecurity"), url:"", content: this.intl.getHTML("user-aboutUsSecurityCon")},
        {title: this.intl.get("user-aboutUsQuality"), url:"", content: this.intl.getHTML("user-aboutUsQualityCon")}
      ],
      contact: [
        {title:"", link:""},
        {title:"", link:""},
        {title:"", link:""},
        {title:"", link:""}
      ]
    }
    const {controller} = this.props
    controller.setView(this)
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
        <div>
          <img src="" alt=""/>
          <p>{this.intl.getHTML("user-aboutUsIntroduce")}</p>
          <h1>{this.intl.get("user-aboutUsAdvantages")}</h1>
          <ul>
            {this.state.introduceList && this.state.introduceList.map((v, index) => (<li key={index}>
              <h2>{v.title}</h2>
              <img src={v.url} alt=""/>
              <p>{v.content}</p>
            </li>))}
          </ul>
          <h1></h1>
        </div>
        {this.props.controller.configData.activityState ? <a className="invite-btn" onClick={e => {
              history.push(`/mgenrealize/invite/?uid=${controller.userId}`)
          }}>{this.intl.get("activity-rule-42")}</a> : ''}
      </div>
    );
  }
}