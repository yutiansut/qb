import React, {Component} from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase'
import Button from '../../../common/component/Button/index.jsx'
import Input from '../../../common/component/Input/index.jsx'
import RemindPopup from '../../../common/component/Popup/index.jsx'
import Select from '../../../common/component/SelectButton/index.jsx'
import "../stylus/safe.styl"
import GooglePopup from '../userPopup/GooglePopup.jsx'
import PassPopup from '../userPopup/SetPassPopup.jsx'
import ChangeVerifyPopup from '../userPopup/ChangeVerifyPopup.jsx'
import JsonBig from "json-bigint";
// import VerifyPopup from '../../viewsPopup/TwoVerifyPopup.jsx'

let noticeList = [
  {name: '邮件通知', flag: true},
  {name: '短信通知', flag: true}
];
let timeAddrList = ['1111', '2222', '3333']

export default class userSafeCenter extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      showGoogle: 'none',
      showSet: 'none',
      // showVerify: 'none',
      showChange: 'none',
      otherShow: false, // 打开其他安全设置
      noticeIndex: 1, // 选择通知设置
      type: 0, // 设置密码弹窗所需参数
      changeType: 0, // 更改两步验证弹窗所需参数 根据后台返回确定每种验证对象
      isTwoVerify: 0, // 确认两步验证类型
      sureTwoVerify: 0, // 点击更改验证类型
      timeAddr: '', // 时区
      verifyList: [
        {title: '登录验证', contentList: [{name: '谷歌验证', flag: false}, {name: '邮件', flag: false}, {name: '短信', flag: false}, {name: '无', flag: false}]},
        {title: '提现验证', contentList: [{name: '谷歌验证', flag: false}, {name: '邮件', flag: false}, {name: '短信', flag: false}]},
        {title: '修改资金密码验证', contentList: [{name: '谷歌验证', flag: false}, {name: '邮件', flag: false}, {name: '短信', flag: false}]}
      ],
      remindPopup: false,
      ipValue: '',
      popupInputErr2:"",
    }

    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getVerify = controller.getVerify.bind(controller) // 发送短信验证码
    this.clearVerify = controller.clearVerify.bind(controller) // 清除倒计时
    this.setLoginPass = controller.setLoginPass.bind(controller) // 设置登录密码
    this.setFundPass = controller.setFundPass.bind(controller) // 设置资金密码
    this.initData = controller.initData.bind(controller) // 获取用户信息
    this.getUserAuthData = controller.getUserAuthData.bind(controller) // 获取认证信息
    this.getLoginList = controller.getLoginList.bind(controller) // 获取登录日志
    this.getCurrentLogin = controller.getCurrentLogin.bind(controller) // 获取当前登录设备
    this.getIpList = controller.getIpList.bind(controller) // 获取ip白名单
    this.addIp = controller.addIp.bind(controller) // 添加ip白名单
    this.delIp = controller.delIp.bind(controller) // 删除ip白名单
    this.getGoogle = controller.getGoogle.bind(controller) // 获取谷歌密钥
    this.getCaptchaVerify = controller.getCaptchaVerify.bind(controller) // 获取图形验证码
    this.setTwoVerify = controller.setTwoVerify.bind(controller) // 修改两步认证
    this.setGoogleVerify = controller.setGoogleVerify.bind(controller) // 验证谷歌验证码
    this.showOther = this.showOther.bind(this)
  }
  changeGooglePopup(state) { // 谷歌验证码显示
    this.setState({
      showGoogle: state
    })
  }
  changeSetPopup(state, type) { // 设置密码显示
    this.setState({
      showSet: state,
      type: type,
      verifyNum: '获取验证码'
    })
    this.clearVerify()
  }
  // changeVerifyPopup(state) { // 两步验证显示
  //   this.setState({
  //     showVerify: state
  //   })
  // }
  changeVerifyTypePopup(state) { // 改变两步验证显示
    this.setState({
      showChange: state,
      verifyNum: '获取验证码'
    })
    this.clearVerify()
  }
  showOther() { // 打开其他安全设置
    this.setState({
      otherShow: true,
    })
  }
  selectType(content, index, i, type) { // 两步认证单选
    let changeArr = [3, 1, 0, 2]  // 2 谷歌验证 1 邮件 3 短信 0 无
    let changeTypeArr = [this.state.userInfo.loginVerify, this.state.userInfo.withdrawVerify, this.state.userInfo.fundPassVerify]
    this.setState({
      type: type,
      changeType: changeTypeArr[i],
      isTwoVerify: i,
      sureTwoVerify: index,
      showGoogle: this.state.userInfo.googleAuth === 1 && index === 0 ? 'block' : 'none',
      // showVerify: this.state.user_info.email && index === 1 ? 'block' : 'none',
      showSet: !this.state.userInfo.email && index === 1 ? 'block' : 'none',
      showChange: changeArr[changeTypeArr[i]] === index || changeTypeArr[i] === 0 || (this.state.userInfo.googleAuth === 1 && index === 0) || (!this.state.userInfo.email && index === 1) || (!this.state.userInfo.phone && index === 2) ? 'none' : 'block'
    })
    // verifyList[i].contentList.forEach(v => {v.flag = false})
    // if (index === 1 && !this.state.user_info.email) {
    //   content.flag = false
    //   i === 0 && (verifyList[0].contentList[this.state.user_info.login_type].flag = true) //根据后台返回数据进行两步认证数据渲染
    //   i === 1 && (verifyList[1].contentList[this.state.user_info.cash_type].flag = true)
    //   i === 2 && (verifyList[2].contentList[this.state.user_info.fund_type].flag = true)
    //   return
    // }
    // content.flag = true
  }
  selectNotice(index, type) { // 选择通知
    this.setState({
      type: type,
      noticeIndex: !this.state.userInfo.email && index === 0 ? 1 : index,
      showSet: !this.state.userInfo.email && index === 0 ? 'block' : 'none'
    })
  }

  ipInput(value) { // 输入白名单
    this.setState({
      ipValue: value
    })
    console.log(this.state.ipValue)
  }

  componentWillMount() {

  }

  async componentDidMount() {
    await Promise.all([this.initData(), this.getLoginList(), this.getCurrentLogin(), this.getIpList(), this.getGoogle(), this.getCaptchaVerify()])
    // await this.initData()
    // await this.getLoginList()
    // await this.getCurrentLogin()
    let verifyArr = [3, 1, 0, 2]
    let verifyList = this.state.verifyList
    // console.log('flag', this.state.userInfo.withdrawVerify, verifyArr[this.state.userInfo.withdrawVerify], verifyList[1].contentList, verifyList[1].contentList[verifyArr[this.state.userInfo.withdrawVerify]])
    verifyList[0].contentList[verifyArr[this.state.userInfo.loginVerify]].flag = true //根据后台返回数据进行两步认证数据渲染
    verifyList[1].contentList[verifyArr[this.state.userInfo.withdrawVerify]].flag = true
    verifyList[2].contentList[verifyArr[this.state.userInfo.fundPassVerify]].flag = true
    verifyList.forEach((v, i) => { // 两步验证未绑定邮箱时
      v.contentList[1].name = this.state.userInfo.email ? '邮箱' : '绑定／验证邮箱后开启'
    })
    verifyList.forEach((v, i) => { // 两步验证未绑定手机时
      v.contentList[2].name = this.state.userInfo.phone ? '短信' : '绑定／验证手机号后开启'
    })
    noticeList[0].name = this.state.userInfo.email ? '邮件通知' : '绑定／验证邮箱后开启' // 通知设置未绑定邮箱时
    noticeList[1].name = this.state.userInfo.email ? '短信' : '绑定／验证手机号后开启' // 通知设置未绑定手机号时

    this.setState({verifyList})
  }

  componentWillUpdate(props, state, next) {

  }
  clearErr2() {
    this.setState({
      popupInputErr2: ''
    })
  }

  render() {
    console.log('用户信息111', this.state)
    return (
      <div className="safe-content">
        <h1>{this.intl.get("security")}</h1>
        <div className="basic-data model-div clearfix">
          <h2>{this.intl.get("user-base")}</h2>
          <ul className="fl clearfix">
            <li>{this.intl.get("user-id")}</li>
            <li>{JSON.stringify(this.state.userInfo.userId) || ''}</li>
            <li>{this.intl.get("email")}</li>
            <li className={`${this.state.userInfo.email ? '' : 'basic-popup'}`} onClick = {state => !this.state.userInfo.email && this.changeSetPopup('block', 1)}>{this.state.userInfo.email && this.state.userInfo.email || '绑定邮箱'}</li>
            <li>{this.intl.get("phone")}</li>
            <li className={`${this.state.userInfo.phone ? '' : 'basic-popup'}`} onClick = {state => !this.state.userInfo.phone && this.changeSetPopup('block', 2)}>{this.state.userInfo.phone && this.state.userInfo.phone || '绑定手机号'}</li>
            <li>{this.intl.get("user-level")}</li>
            <li>
              <span>VIP{this.state.userInfo.level}</span>({this.intl.get("points")}：<span>{this.state.userInfo.credits}</span>)
            </li>
          </ul>
        </div>
        <div className="change-pass model-div clearfix">
          <h2>{this.intl.get("user-changePwd")}</h2>
          <div className="fl">
            <ol className="clearfix">
              <li>{this.intl.get("loginPwd")}</li>
              <li onClick = {state => this.state.userInfo.loginPwd ? this.changeSetPopup('block', 3) : this.changeSetPopup('block', 4)}>{this.state.userInfo.loginPwd && '设置' || '修改'}</li>
            </ol>
            <ul className="clearfix">
              <li>{this.intl.get("fundPass")}</li>
              <li onClick = {state => this.state.userInfo.fundPwd ? this.changeSetPopup('block', 5) : this.changeSetPopup('block', 6)}>{this.state.userInfo.fundPwd && '设置' || '修改'}</li>
              <li>{this.intl.get("user-setFund")}</li>
            </ul>
          </div>
        </div>
        <div className="verify model-div clearfix">
          <h2>{this.intl.get("twoStep")}</h2>
          <div className="fl">
            <p>{this.intl.get("user-twoVerify")}</p>
            {this.state.verifyList.map((v, i) => (<dl className="clearfix" key={i}>
              <dt>{v.title}</dt>
              {v.contentList.map((item, index) => (<dd key={index} onClick = {(content) => this.selectType(item, index, i, 1)}>
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
            <h2>{this.intl.get("user-otherSet")}</h2>
            <ul className="fl time-ul">
              <li>{this.intl.get("user-time")}</li>
              <li className="clearfix">
                <Input
                  type="select"
                  readOnly={true}
                  valueArr={timeAddrList.map(item => item)}
                  onSelect={value => {
                    this.setState({ timeAddr: value });
                  }}
                  value={this.state.timeAddr}
                />
                <Button title={this.intl.get("save")} className="time-btn"/>
              </li>
            </ul>
          </div>
          <div className="notify model-div clearfix">
            <h2>{this.intl.get("user-noticeSet")}</h2>
            <ul className="fl">
              <li>{this.intl.get("user-noticeRemind")}</li>
              <li>
                {noticeList.map((v, index) => (<span key={index}  onClick={i => this.selectNotice(index, 1)}>
                  <img src="/static/img/checked.svg" alt="" className={`${this.state.noticeIndex === index ? '' : 'hide'}`}/>
                  <img src="/static/img/normal.svg" alt="" className={`${this.state.noticeIndex === index ? 'hide' : ''}`}/>
                  <b>{v.name}</b>
                </span>))}
              </li>
            </ul>
          </div>
          <div className="name-list model-div clearfix">
            <h2>{this.intl.get("user-ipWhite")}</h2>
            <div className="fl">
              <b>{this.intl.get("user-ipRemind")}</b>
              <div className="clearfix">
                <Input placeholder={this.intl.get("user-ipAddr")}  onInput={value => {this.ipInput(value)}}/>
                <Button title={this.intl.get("add")} className="name-btn" onClick={() => this.addIp(this.state.ipValue)}/>
              </div>
              <span>{this.intl.get("user-ipExample")}</span>
              <table>
                <thead>
                  <tr>
                    <th>{this.intl.get("user-ipAddr")}</th>
                    <th>{this.intl.get("addTime")}</th>
                    <th>{this.intl.get("action")}</th>
                  </tr>
                </thead>
                <tbody className={`${this.state.ipList.length ? '' : 'hide'}`}>
                  {this.state.ipList.map((v, index) => (<tr key={index}>
                    <td>{v.IPAddress}</td>
                    <td>{v.createAt}</td>
                    <td onClick={() => this.delIp(v.IPId, v.IPAddress)}>{this.intl.get("delete")}</td>
                  </tr>))}
                </tbody>
              </table>
              <p className={`${this.state.ipList.length ? 'hide' : ''} nothing-text`}>暂无</p>
              <p>
                {this.intl.get("user-ipAddRemind")}
              </p>
            </div>
          </div>
          <div className="login-device model-div clearfix">
            <h2>{this.intl.get("user-current")}</h2>
            <div className="fl">
              <p>{this.intl.get("user-currentTitle")}</p>
              <table>
                <thead>
                  <tr>
                    <th>{this.intl.get("loginTime")}</th>
                    <th>{this.intl.get("equipment")}</th>
                    <th>{this.intl.get("ip")}</th>
                    <th>{this.intl.get("place")}</th>
                    <th>{this.intl.get("user-isCurrent")}</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.currentLogin.map((v, index) => (<tr key={index}>
                    <td>{v.time}</td>
                    <td>{v.dev}</td>
                    <td>{v.ip}</td>
                    <td>{v.ip_addr}</td>
                    <td>{`${v.key === this.state.user_info.session_key ? '是' : '否'}`}</td>
                  </tr>))}
                </tbody>
              </table>
              <Button title={this.intl.get("user-out")} className="login-device-btn"/>
            </div>
          </div>
        </div>
        <div className="record model-div clearfix">
          <h2>{this.intl.get("user-records")}</h2>
          <table className="fl">
            <thead>
            <tr>
              <th>{this.intl.get("user-recordType")}</th>
              <th>{this.intl.get("ip")}</th>
              <th>{this.intl.get("place")}</th>
              <th>{this.intl.get("time")}</th>
            </tr>
            </thead>
            <tbody>
            {this.state.loginList.map((v, index) => (<tr key={index}>
              <td>{v.catalog}</td>
              <td>{v.ip}</td>
              <td>{v.src}</td>
              <td>{v.createdTime}</td>
            </tr>))}
            </tbody>
          </table>
        </div>
        {/*<VerifyPopup changeVerifyPopup = {state => this.changeVerifyPopup(state)}*/}
                     {/*isVerify = {this.state.showVerify}*/}
                     {/*getVerify = {this.getVerify}*/}
                     {/*verifyNum={this.state.verifyNum}/>*/}
        <GooglePopup changeGooglePopup = {state => this.changeGooglePopup(state)}
                     googleSecret = {this.state.googleSecret.secret}
                     setGoogleVerify = {this.setGoogleVerify}
                     isGoogle = {this.state.showGoogle}/>
        <PassPopup changeSetPopup = {state => this.changeSetPopup(state)}
                   phone = {this.state.userInfo.phone}
                   email = {this.state.userInfo.email}
                   isSet = {this.state.showSet}
                   isType = {this.state.type}
                   getVerify = {this.getVerify}
                   setLoginPass = {this.setLoginPass}
                   setFundPass = {this.setFundPass}
                   captcha = {this.state.captcha}
                   captchaId = {this.state.captchaId}
                   getCaptcha = {this.getCaptchaVerify}
                   verifyNum = {this.state.verifyNum}
                   clearErr2 = {() => {this.clearErr2()}}
                   popupInputErr2 = {this.state.popupInputErr2}/>
        <ChangeVerifyPopup changeVerifyTypePopup = {state => this.changeVerifyTypePopup(state)}
                           phone = {this.state.userInfo.phone}
                           email = {this.state.userInfo.email}
                           isType = {this.state.changeType}
                           sureTwoVerify = {this.state.sureTwoVerify}
                           isTwoVerify = {this.state.isTwoVerify}
                           getVerify = {this.getVerify}
                           verifyNum = {this.state.verifyNum}
                           captcha = {this.state.captcha}
                           captchaId = {this.state.captchaId}
                           getCaptcha = {this.getCaptchaVerify}
                           setTwoVerify = {this.setTwoVerify}
                           isChange = {this.state.showChange}/>
        {this.state.remindPopup && <RemindPopup
                     type="tip1"
                     msg="添加成功"
                     autoClose = {true}
                     onClose={() => {this.setState({ remindPopup: false });}}/>}
      </div>
    );
  }

}