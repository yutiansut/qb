import React, {Component} from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase'

const contentList = ['联系邮箱及联系人姓名',
                      '币种信息，名称、缩写及logo等',
                      '币种发行日期及发行量，已上交易平台（若有）',
                      '项目信息、核心价值及官方网站',
                      '团队主要成员及其背景，团队成员Linkdelin链接（若有）',
                      'ICO信息，发行时间、数量、兑换比例等信息',
                      '用户及社区信息，现有注册、活跃用户数量及社区链接',
                      '白皮书或其他补充说明材料']

export default class coinApply extends exchangeViewBase {
  constructor(props) {
    super(props);
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
        <h1>上币申请信息及说明</h1>
        <p>{`为了保护投资者的利益，${controller.configData.nameUsd} 会对所有上线交易品种进行审核与评估，请申请人/机构提供相关信息并发送至邮箱：`}</p>
        <span>{controller.configData.applyEmailUrl}</span>
        <dl>
          <dt>所提供信息需包含但不仅限于：</dt>
          {contentList.map((v, index) => (<dd key={index}>{v}</dd>))}
        </dl>
      </div>
    );
  }

}