import React from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase.jsx';

export default class AboutUs extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      qbtTrade: [],
      introduceList: [
        {title:"", url:"", content:""},
        {title:"", url:"", content:""}
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
          <p></p>
          <h1></h1>
          <ul>
            <li>
              <h2></h2>
            </li>
          </ul>
        </div>
        {this.props.controller.configData.activityState ? <a className="invite-btn" onClick={e => {
              history.push(`/mgenrealize/invite/?uid=${controller.userId}`)
          }}>{this.intl.get("activity-rule-42")}</a> : ''}
      </div>
    );
  }
}