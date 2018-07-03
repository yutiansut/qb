import React, {Component} from 'react';
import exchangeViewBase from '../../components/ExchangeViewBase'
import "./stylus/tradeNotice.styl"

export default class tradeNotice extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {}
    const {controller} = props
    // 绑定view
    controller.setView(this)
    // 初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getNoticeCon = controller.getNoticeCon.bind(controller) // 获取资讯
    console.log('资讯', this.state)
  }

  setView(view){
    super.setView(view);
    return this.store.data
  }

  componentWillMount() {

  }

  async componentDidMount() {
    await this.getNoticeCon()
  }

  componentWillUpdate(...parmas) {

  }

  render() {
    return (
      <div className="trade-notice-wrap">
        <h3>资讯</h3>
        <ul>
          {/*{this.state.infoList.data.map((v, index) => (<li key={index}>*/}
            {/*<p>{v.subjectCN}</p>*/}
            {/*<span>{v.createdAt}</span>*/}
          {/*</li>))}*/}
        </ul>
      </div>
    );
  }
}
