import React, {Component} from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase'
import Button from '../../../common/component/Button/index.jsx'
import Select from '../../../common/component/SelectButton/index.jsx'
import "../stylus/safe.styl"
import GooglePopup from '../userPopup/GooglePopup.jsx'
import PassPopup from '../userPopup/SetPassPopup.jsx'
import VerifyPopup from '../../viewsPopup/TwoVerifyPopup.jsx'

const verifyList = [
  {title: '登录验证', contentList: [{name: '谷歌验证', flag: false}, {name: '邮件', flag: false}, {name: '短信', flag: false}, {name: '无', flag: false}]},
  {title: '提现验证', contentList: [{name: '谷歌验证', flag: false}, {name: '邮件', flag: false}, {name: '短信', flag: false}]},
  {title: '修改资金密码验证', contentList: [{name: '谷歌验证', flag: false}, {name: '邮件', flag: false}, {name: '短信', flag: false}]}
];

const noticeList = [
  {name: '邮件通知', select: false, flag: true},
  {name: '短信通知', select: false, flag: true}
];

export default class userSafeCenter extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      showGoogle: 'none',
      showSet: 'none',
      showVerify: 'none',
      otherShow: false,
      selectItem: 5,
      selectIndex: 20,
      noticeIndex: 1,
      type: 0
    }
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getVerify = controller.getVerify.bind(controller)
    this.showOther = this.showOther.bind(this)

    console.log(3333,this.state)
  }
  changeGooglePopup(state) { // 谷歌验证码显示
    this.setState({
      showGoogle: state
    })
  }
  changeSetPopup(state, type) { // 设置密码显示
    this.setState({
      showSet: state,
      type: type
    })
  }
  changeVerifyPopup(state) { // 两步验证显示
    this.setState({
      showVerify: state
    })
  }
  showOther() {
    this.setState({
      otherShow: true,
    })
  }
  selectType(content, index, i) { // 单选按钮
    this.setState({
      selectItem: i,
      selectIndex: index,
      showGoogle: index === 0 ? 'block' : 'none',
      showVerify: index === 1 ? 'block' : 'none'
    })
    verifyList[i].contentList.forEach(v => {v.flag = false})
    content.flag = true
    console.log(2234555, verifyList, content, index, i)
    // content.select = !content.select
  }
  selectNotice(index) { // 选择通知
    console.log(45674, index)
    this.setState({
      noticeIndex: index
    })
  }
  componentWillMount() {
    verifyList[0].contentList[this.state.user_info.login_type].flag = true //根据后台返回数据进行两步认证数据渲染
    verifyList[1].contentList[this.state.user_info.cash_type].flag = true
    verifyList[2].contentList[this.state.user_info.fund_type].flag = true
    // super.componentWillMount();
    // console.log('user componentWillMount')
  }

  componentDidMount() {
    // super.componentDidMount();
    // console.log('user componenDidMount')
  }

  componentWillUpdate(props, state, next) {
    // console.log('user componentWillUpdate', props.match, props, state, next)
  }


  render() {
    return (
      <div className="safe-content">
        <h1>安全中心</h1>
        <div className="basic-data model-div clearfix">
          <h2>基本资料</h2>
          <ul className="fl clearfix">
            <li>用户ID</li>
            <li>{this.state.user_info.name && this.state.user_info.name || ''}</li>
            <li>电子邮件</li>
            <li onClick = {state => !this.state.user_info.email && this.changeSetPopup('block', 1)}>{this.state.user_info.email && this.state.user_info.email || '绑定邮箱'}</li>
            <li>手机号</li>
            <li onClick = {state => !this.state.user_info.phone && this.changeSetPopup('block', 2)}>{this.state.user_info.phone && this.state.user_info.phone || '绑定手机号'}</li>
            <li>用户等级</li>
            <li>
              <span>VIP{this.state.user_info.grade}</span>(积分：<span>{this.state.user_info.score}</span>)
            </li>
          </ul>
        </div>
        <div className="change-pass model-div clearfix">
          <h2>修改密码</h2>
          <div className="fl">
            <ol className="clearfix">
              <li>登录密码</li>
              <li onClick = {state => !this.state.user_info.password && this.changeSetPopup('block', 3)}>{this.state.user_info.password && '修改' || '设置'}</li>
            </ol>
            <ul className="clearfix">
              <li>资金密码</li>
              <li onClick = {state => !this.state.user_info.fundpass && this.changeSetPopup('block', 4)}>{this.state.user_info.fundpass && '修改' || '设置'}</li>
              <li>设置了资金密码后，提币和提现时均需要输入，账户更安全。</li>
            </ul>
          </div>
        </div>
        <div className="verify model-div clearfix">
          <h2>两步验证</h2>
          <div className="fl">
            <p>当您开启两步验证后，在进行登录、修改密码、提币、提现交易等重要操作时，必须输入某个一次性密码才能继续。</p>
            {verifyList.map((v, i) => (<dl className="clearfix" key={i}>
              <dt>{v.title}</dt>
              {v.contentList.map((item, index) => (<dd key={index} onClick = {(content) => this.selectType(item, index, i)}>
                <img src="/static/img/checked.svg" alt="" className={`${(item.flag) ? '' : 'hide'}`}/>
                <img src="/static/img/normal.svg" alt="" className={`${(item.flag) ? 'hide' : ''}`}/>
                <span>{item.name}</span>
              </dd>))}
            </dl>))}
          </div>
        </div>
        <div className={`${this.state.otherShow ? 'hide' : ''} other model-div`} onClick={this.showOther}>其他安全设置+</div>
        <div className={this.state.otherShow ? '' : 'hide'}>
          <div className="time model-div clearfix">
            <h2>其他设置</h2>
            <ul className="fl">
              <li>时区</li>
              <li>
                {/*<input type="text" placeholder="时区"/>*/}
                <Select title="全部" type="main" className="select" valueArr={["全部", "通过", "未通过","审核中"]} />
                <Button title="保存" className="time-btn"/>
              </li>
            </ul>
          </div>
          <div className="notify model-div clearfix">
            <h2>通知设置</h2>
            <ul className="fl">
              <li>登录/充值/提现到账区</li>
              <li>
                {noticeList.map((v, index) => (<span key={index}  onClick={i => this.selectNotice(index)}>
                  <img src="/static/img/checked.svg" alt="" className={`${this.state.noticeIndex === index ? '' : 'hide'}`}/>
                  <img src="/static/img/normal.svg" alt="" className={`${this.state.noticeIndex === index ? 'hide' : ''}`}/>
                  <b>{v.name}</b>
                </span>))}
              </li>
            </ul>
          </div>
          <div className="name-list model-div clearfix">
            <h2>IP白名单</h2>
            <div className="fl">
              <b>注：请勿添加IP会变动的网络至IP白名单（如：拨号上网）以免影响您的正常使用。</b>
              <div>
                <input type="text" placeholder="IP地址"/>
                <Button title="添加" className="name-btn" onClick={this.test}/>
                <p>{this.state.testAaA}</p>
              </div>
              <span>例如：216.58.197.238或104.244.42.0/24</span>
              <table>
                <thead>
                  <tr>
                    <th>IP地址</th>
                    <th>添加时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>216.58.197.238</td>
                    <td>2018-01-18 10:23:22</td>
                    <td>删除</td>
                  </tr>
                </tbody>
              </table>
              <p>
                添加IP地址或范围后，你将无法从这个白名单之外的IP地址登录你的账户。出于安全方面的考虑，添加或删除IP地址后，你的账户将在24小时内无法提现。你可以访问mixcoins.com/ip/获得当前IP地址。
              </p>
            </div>
          </div>
          <div className="login-device model-div clearfix">
            <h2>登录设备</h2>
            <div className="fl">
              <p>当前已登录你账户的浏览器或设备</p>
              <table>
                <thead>
                  <tr>
                    <th>登录时间</th>
                    <th>设备</th>
                    <th>IP</th>
                    <th>地点</th>
                    <th>是否当前</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.user_info.state.map((v, index) => (<tr key={index}>
                    <td>{v.time}</td>
                    <td>{v.dev}</td>
                    <td>{v.ip}</td>
                    <td>{v.ip_addr}</td>
                    <td>{`${v.key === this.state.user_info.session_key ? '是' : '否'}`}</td>
                  </tr>))}
                </tbody>
              </table>
              <Button title="退出所有其他状态" className="login-device-btn"/>
            </div>
          </div>
        </div>
        <div className="record model-div clearfix">
          <h2>最近10条记录</h2>
          <table className="fl">
            <thead>
            <tr>
              <th>日志类型</th>
              <th>IP</th>
              <th>地点</th>
              <th>时间</th>
            </tr>
            </thead>
            <tbody>
            {this.state.recent_info.map((v, index) => (<tr key={index}>
              <td>{v.catalog_name}</td>
              <td>{v.ip}</td>
              <td>{v.ip_addr}</td>
              <td>{v.time}</td>
            </tr>))}
            </tbody>
          </table>
        </div>
        <VerifyPopup changeVerifyPopup = {state => this.changeVerifyPopup(state)} isVerify = {this.state.showVerify} getVerify = {this.getVerify} verifyNum={this.state.verifyNum}/>
        <GooglePopup changeGooglePopup = {state => this.changeGooglePopup(state)} isGoogle = {this.state.showGoogle}/>
        <PassPopup changeSetPopup = {state => this.changeSetPopup(state)} isSet = {this.state.showSet} isType = {this.state.type} getVerify = {this.getVerify} verifyNum={this.state.verifyNum}/>
      </div>
    );
  }

}