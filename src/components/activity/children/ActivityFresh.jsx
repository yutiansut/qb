import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import exchangeViewBase from '../../../components/ExchangeViewBase'
import "../stylus/activityFresh.styl"
import Button from "../../../common/component/Button";
import Popup from "../../../common/component/Popup";


// const ruleList = [
//   '3. 同一认证用户，只可参与一次免手续费活动',
//   '4. 如果已完成实名认证，并在活动期内的新用户，但是仍然扣除交易手续费，请您联系客服',
//   '5. 活动到期结束后，交易手续费请参照网站公布费率标准，若有调整，以网站公告为准。',
//   '6. 一经发现作弊行为，QB有权收回给您的奖励，并对账号进行相应处理',
//   '7. 该活动最终解释权规QB所有'
// ]


export default class activityFresh extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      ruleList: [
        this.intl.get('activity-rule-1'),
        this.intl.get('activity-rule-2'),
        this.intl.get('activity-rule-3'),
        this.intl.get('activity-rule-4'),
        this.intl.get('activity-rule-5'),
        this.intl.get('activity-rule-6'),
        this.intl.get('activity-rule-7'),
        this.intl.get('activity-rule-8'),
      ],
      // address:'还在等什么，邀请好友50万枚QB欢迎你来拿',
      address:'',
      // banner_img: '',
      bannerImgUrl: ''
    }
    const {controller} = props
    // 绑定view
    controller.setView(this)
    // 初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    // console.log('活动', this.state)
    this.copy = el => {
      this.setState({
        showPopup: true,
        copySuccess: controller.copy(el)
      });
    };
    this.getInvited = controller.getInvited.bind(controller)
    this.getHomeBanner = controller.getHomeBanner.bind(controller)
  }

  setView(view) {
    super.setView(view);
    return this.store.data
  }

  componentWillMount() {
    this.getHomeBanner(1,0);
  }

  componentDidMount() {
    this.getInvited()
  }

  componentWillUpdate(...parmas) {

  }

  render() {
    // const questionList = [
    //   '您对本次活动有任何疑问，请与我们取得联系咨询：',
    //   `客服电话：${this.props.controller.configData.servicePhone}`,
    //   `客服QQ：${this.props.controller.configData.serviceQQ}`
    // ]
    const {controller} = this.props
    return (
      <div className="active-fresh-wrap">
        {this.state.showPopup && (
          <Popup
            type={this.state.copySuccess ? "tip1" : "tip3"}
            msg={
              this.state.copySuccess
                ? this.intl.get("asset-copySuccess")
                : this.intl.get("asset-option-failed")
            }
            onClose={() => {
              this.setState({ showPopup: false });
            }}
            autoClose={true}
          />
        )}
        <div className="banner-img" style={{ 'background-size': `100% 100%`, backgroundImage: `url(${this.state.bannerImgUrl})`}}>
          {/* <img src="/static/img/banner_title.svg" alt=""/> */}
        </div>
        <h1>{this.intl.getHTML('activity-title')}{(!controller.userId && <Link to="/wlogin">{this.intl.get('activity-click')}</Link> || null)}</h1>
        <div className={`active-clip`}>
          <input
            type="text"
            ref="address"
            value={`${this.state.address}${controller.address}`}
            readOnly="readonly"
            className={`active-clip-input-active`}
          />
          <Button
            title={this.intl.get("asset-copy")}
            type="base"
            onClick={() => {
              this.copy(this.refs.address);
            }}
          />
        </div>
        <dl>
          <dt>{this.intl.get('activity-rule')}</dt>
          {/*<dd>1. 新用户即开通注册之日起30天内，可享受0手续费交易。<Link to="/trade">快来交易吧！</Link></dd>*/}
          {/*<dd>2. <span>用户需要完成实名认证后方可参与此活动</span></dd>*/}
          {this.state.ruleList.map((v, index) => (<dd key={index}>{v}</dd>))}
        </dl>
        {/*<ul>*/}
        {/*{questionList.map((v, index) => (<li key={index}>{v}</li>))}*/}
        {/*</ul>*/}
        <div className="record-list">
          <p>{this.intl.get('activity-Invitations')}</p>
          <table>
            <thead>
            <tr>
              <td>{this.intl.get('activity-Accounts')}</td>
              <td>{this.intl.get('activity-time1')}</td>
            </tr>
            </thead>
            <tbody>
            {!this.state.recordList.length && (<tr>
              <td colSpan={2} className={`record-list-no-data`}>{this.intl.get('noRecords')}</td>
            </tr>)}
            {this.state.recordList.map((v, index) => (<tr key={index}>
              <td>{v.invited}</td>
              <td>{v.timestamp.toDate('yyyy-MM-dd')}</td>
            </tr>))}
            </tbody>
          </table>
        </div>
        <div className="record-list">
          <p>{this.intl.get('activity-rewards')}</p>
          <table>
            <thead>
            <tr>
              <td>{this.intl.get('activity-rewards')}</td>
              <td>{this.intl.get('activity-time2')}</td>
            </tr>
            </thead>
            <tbody>
            {!this.state.recordList.length && (<tr>
              <td colSpan={2} className={`record-list-no-data`}>{this.intl.get('noRecords')}</td>
            </tr>)}
            {this.state.recordList.map((v, index) => (<tr key={index}>
              <td>{`${v.prize}QB`}</td>
              <td>{v.timestamp.toDate('yyyy-MM-dd')}</td>
            </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
