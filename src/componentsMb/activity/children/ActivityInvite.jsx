import React from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase.jsx';

import '../stylus/activityinvite.styl'
import '../stylus/activity.styl'

export default class ActivityInvite extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      showSection: 'index' // index、invite、board
    };
  }

  componentWillMount() {

  }
  componentDidMount() {

  }

  render() {
    return(
      <div className='activity-wrap'>
        <div className='activity-header'></div>
        <div className='activity-switch'>
          <ul className="clearfix">
            <li className={this.state.showSection === "index" ? "active" : ""} onClick={() => {this.setState({showSection: 'index'})}}>邀请奖励</li>
            <li className={this.state.showSection === "invite" ? "active" : ""} onClick={() => {this.setState({showSection: 'invite'})}}>已邀请</li>
            <li className={this.state.showSection === "board" ? "active" : ""} onClick={() => {this.setState({showSection: 'board'})}}>排行榜</li>
          </ul>
        </div>
        <div className='activity-content'>
          {this.state.showSection === 'index' && 
          <div className='activity-index'>
            <div className='rule'>
              <p>每邀请一位好友注册QB.com完成：</p>
              <dl>
                <dt>1、注册送币</dt>
                <dd>即日起，新用户注册完成后，可领取20枚QB。</dd>
                <dt>2、邀请送币</dt>
                <dd>好友注册，您获得5 QB作为奖励，上不封顶~</dd>
              </dl>
              <ul>
                <li>同时，您的好友也将获得<span>20QB</span>福利</li>
                <li>本次活动共发放<span>5,000,000</span>枚QB，送完即止</li>
                <li>有福同享真哥们，赶紧转发海报邀请吧~</li>
              </ul>
            </div>
            <div className='code'>
              <h1>500万QB欢迎你来拿！</h1>
              <img src="../../../static/mobile/activity/img_qb_gywm_erweima@3x.png"/>
            </div>
            <div className='introduce'>
              <h2>QB介绍</h2>
              <p>QB是QB.com发行的代币，QB网通过QB与全体支持者共享平台成长利益。</p>
              <p className="note">QB总量500万枚，定期回购销毁，永不增发。</p>
            </div>
            <div className='value'>
              <h2>QB的价值与用途</h2>
              <p>QB网将通过与全球支持者实现利益共享，方式包括但不限于：</p>
              <p>更多价值将进一步挖掘，敬请期待！</p>
            </div>
          </div>}
          {this.state.showSection === 'invite' && 
          <div className='activity-invite'>
            <div className='ranking'>
              <p>恭喜你获得30QB，排名1440</p>
            </div>
            <ul>
              <li className="clearfix">
                <span className="user">136****1234</span>
                <span className="mount">+5 QB</span>
              </li>
              <li className="clearfix">
                <span className="user">136****1234</span>
                <span className="mount">+5 QB</span>
              </li>
              <li className="clearfix">
                <span className="user">136****1234</span>
                <span className="mount">+5 QB</span>
              </li>
              <li className="clearfix">
                <span className="user">136****1234</span>
                <span className="mount">+5 QB</span>
              </li>
              <li className="clearfix">
                <span className="user">136****1234</span>
                <span className="mount">+5 QB</span>
              </li>
            </ul>
          </div>}
          {this.state.showSection === 'board' && 
          <div className='activity-board'>
            <div className='ranking'>
              <p>恭喜你获得30QB，排名1440</p>
            </div>
            <ul>
              <li className="clearfix">
                <img src="../../../static/mobile/activity/icon_zc_qb_paiming_one@3x.png"/>
                <span className="user">136****1234</span>
                <span className="mount">+5 QB</span>
              </li>
              <li className="clearfix">
                <img src="../../../static/mobile/activity/icon_zc_qb_paiming_two@3x.png"/>
                <span className="user">136****1234</span>
                <span className="mount">+5 QB</span>
              </li>
              <li className="clearfix">
                <img src="../../../static/mobile/activity/icon_zc_qb_paiming_three@3x.png"/>
                <span className="user">136****1234</span>
                <span className="mount">+5 QB</span>
              </li>
              <li className="clearfix">
                <span className="rank">4</span>
                <span className="user">136****1234</span>
                <span className="mount">+5 QB</span>
              </li>
              <li className="clearfix">
                <span className="rank">5</span>
                <span className="user">136****1234</span>
                <span className="mount">+5 QB</span>
              </li>
            </ul>
          </div>}
        </div>
      </div>
    );
  }
}