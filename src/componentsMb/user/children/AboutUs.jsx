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
    const {controller, history} = this.props
    return (
      <div className={`about-us`}>
        {this.state.qbtTrade && this.state.qbtTrade.map((v,index) =>
          <img key={index} src={v.url} onClick={e => v.status && history.push(`/mgenrealize/invite/?uid=${controller.userId}`)}/>
          )}
      </div>
    );
  }
}