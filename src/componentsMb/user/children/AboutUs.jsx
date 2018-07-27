import React from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase.jsx';

import '../stylus/aboutUs.styl'

export default class AboutUs extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      qbtTrade: []
    }
    const {controller} = this.props
    controller.setView(this)
    this.getQbtTrade = controller.getQbtTrade.bind(controller)
  }

  componentWillMount() {
  }
  componentDidMount() {
    this.getQbtTrade()
  }

  render() {
    const {controller, history} = this.props;
    const language = this.props.controller.configData.language;
    return (
      <div className={`about-us`}>
        {this.state.qbtTrade && this.state.qbtTrade.map((v,index) =>
          <img key={index} src={language === "zh-CN" ? v.uc : v.ue}/>
          )}
        {this.props.controller.configData.activityState && <a className="invite-btn" onClick={e => {
              history.push(`/mgenrealize/invite/?uid=${controller.userId}`)
          }}>{this.intl.get("activity-rule-42")}</a>}
      </div>
    );
  }
}