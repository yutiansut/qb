import React, {Component} from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase'

// const contentList = ['联系邮箱及联系人姓名',
//                       '币种信息，名称、缩写及logo等',
//                       '币种发行日期及发行量，已上交易平台（若有）',
//                       '项目信息、核心价值及官方网站',
//                       '团队主要成员及其背景，团队成员Linkdelin链接（若有）',
//                       'ICO信息，发行时间、数量、兑换比例等信息',
//                       '用户及社区信息，现有注册、活跃用户数量及社区链接',
//                       '白皮书或其他补充说明材料']

export default class coinApply extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      contentList: [
        this.intl.get("notice-appleContent1"),
        this.intl.get("notice-appleContent2"),
        this.intl.get("notice-appleContent3"),
        this.intl.get("notice-appleContent4"),
        this.intl.get("notice-appleContent5"),
        this.intl.get("notice-appleContent6"),
        this.intl.get("notice-appleContent7"),
        this.intl.get("notice-appleContent8"),

      ]
    }
    // const {controller} = props
    // console.log('jsxconfig',controller.configData)
  }

  componentWillMount() {

  }

  componentDidMount() {


  }

  componentWillUpdate(...parmas) {

  }

  render() {
    const {controller} = this.props
    return (
      <div className="apply-wrap">
        <h1>{this.intl.get("notice-appleTitle")}</h1>
        <p>{`${this.intl.get("notice-appleState1")}${controller.configData.nameUsd}${this.intl.get("notice-appleState2")}`}</p>
        <span>{controller.configData.applyEmailUrl}</span>
        <dl>
          <dt>{this.intl.get("notice-appleDetailTile")}</dt>
          {this.state.contentList.map((v, index) => (<dd key={index}>{v}</dd>))}
        </dl>
      </div>
    );
  }

}