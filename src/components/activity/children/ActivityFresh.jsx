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
        '1.即日起，新用户完成注册后，可领取20枚QB。',
        '2.用户邀请好友注册后，即可领取5枚QB，多邀多得，上不封顶。',
        '3.请使用您的专属邀请链接或邀请码进行邀请',
        '4.本次活动共发放5,000,000 枚QB，送完即止',
        '5.新注册用户需要登录后在资产页面查看奖励，或下载App并登录查看奖励。',
        '6.如果奖励未到账，请您先刷新页面查看，如果依然未到账，请您与客服联系。',
        '7.一经发现作弊行为，QB有权收回给您的奖励，并对账号进行相应处理',
        '8.该活动最终解释权归QB所有'
      ],
      address:'还在等什么，邀请好友50万枚QB欢迎你来拿',
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
  }

  setView(view) {
    super.setView(view);
    return this.store.data
  }

  componentWillMount() {

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
        <div className="banner-img">
          <img src="/static/img/banner_title.svg" alt=""/>
        </div>
        <h1>QB限量 <span>5,000,000</span> 枚大放送，注册就送 <span>20</span> 枚！每邀请一人送 <span>5</span> 枚！{(!controller.userId && <Link to="/wlogin">点我领取</Link> || null)}</h1>
        <div className={`active-clip`}>
          <input
            type="text"
            ref="address"
            value={`${this.state.address}~${controller.address}`}
            readOnly="readonly"
            className={`active-clip-input-active`}
          />
          {/*<input*/}
            {/*type="text"*/}
            {/*ref="address"*/}
            {/*readOnly="readonly"*/}
            {/*value={`${controller.address}`}*/}
            {/*className={`active-clip-input-hidden`}*/}
          {/*/>*/}
          <Button
            title={this.intl.get("asset-copy")}
            type="base"
            onClick={() => {
              this.copy(this.refs.address);
            }}
          />
        </div>
        <dl>
          <dt>活动规则</dt>
          {/*<dd>1. 新用户即开通注册之日起30天内，可享受0手续费交易。<Link to="/trade">快来交易吧！</Link></dd>*/}
          {/*<dd>2. <span>用户需要完成实名认证后方可参与此活动</span></dd>*/}
          {this.state.ruleList.map((v, index) => (<dd key={index}>{v}</dd>))}
        </dl>
        {/*<ul>*/}
        {/*{questionList.map((v, index) => (<li key={index}>{v}</li>))}*/}
        {/*</ul>*/}
        <div className="record-list">
          <p>邀请记录</p>
          <table>
            <thead>
            <tr>
              <td>好友账号</td>
              <td>邀请时间</td>
            </tr>
            </thead>
            <tbody>
            {!this.state.recordList.length && (<tr>
              <td colSpan={2} className={`record-list-no-data`}>{`暂无记录`}</td>
            </tr>)}
            {this.state.recordList.map((v, index) => (<tr key={index}>
              <td>{v.invited}</td>
              <td>{v.timestamp.toDate('yyyy-MM-dd')}</td>
            </tr>))}
            </tbody>
          </table>
        </div>
        <div className="record-list">
          <p>奖励记录</p>
          <table>
            <thead>
            <tr>
              <td>奖励记录</td>
              <td>奖励时间</td>
            </tr>
            </thead>
            <tbody>
            {!this.state.recordList.length && (<tr>
              <td colSpan={2} className={`record-list-no-data`}>{`暂无记录`}</td>
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
