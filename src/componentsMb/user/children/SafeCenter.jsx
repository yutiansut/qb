import React from 'react';
import exchangeViewBase from '../../ExchangeViewBase.jsx';
import {NavLink} from 'react-router-dom'
import '../stylus/userSafeCenter.styl'
import PassPopup from '../userPopup/SetPassPopup.jsx'

export default class UserCenterIndex extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      setFundPass : false,
      showSet:false
    }
    const {controller} = props
    //绑定view
    controller.setView(this)
    // console.log('props', props)
    // this.history = props.history
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getVerify = controller.getVerify.bind(controller) // 发送短信验证码
    this.setLoginPass = controller.setLoginPass.bind(controller) // 设置登录密码
    // this.setFundPass = controller.setFundPass.bind(controller) // 设置资金密码
    this.modifyFundPwd = controller.modifyFundPwd.bind(controller) // 设置修改资金密码
    this.initData = controller.initData.bind(controller) // 获取用户信息
    this.getCaptchaVerify = controller.getCaptchaVerify.bind(controller) // 获取图形验证码
    this.bindUser = controller.bindUser.bind(controller)
    this.closeSet = this.closeSet.bind(this)
  }
  componentWillMount() {
  }
  componentDidMount() {
    this.initData()
  }

  changeSetPopup(type) { // 设置密码显示
    this.setState({
      showSet: true,
      type: type,
      verifyNum: this.intl.get("sendCode")
    })
  }

  closeSet() {
    this.setState({
      showSet: false
    })
    this.getCaptchaVerify()
  }


  render() {
    const {controller, url} = this.props
    console.log('this.state', this.state)
    return (
      <div className="user-safe-center">
        <div className="safe-center-header">
          <div className="back">
            <img src="../../../../static/mobile/user/Back@3x.png"/>
            <NavLink to={`${url}`}>返回</NavLink>
          </div>
          <div className="name">安全中心</div>
        </div>
        <ul className="safe-center-container">
          <li className="item clearfix">
            <span className="fl" onClick = {state => this.state.userInfo.loginPwd ? this.changeSetPopup(3) : this.changeSetPopup(4)}>{`${this.intl.get("set") || this.intl.get("alter")}登录密码`}</span>
            <div className="fr">
              <img src="../../../static/mobile/user/icon_qianjb@3x.png"/>
            </div>
          </li>
          <li className="item clearfix">
            <span className="fl" onClick = {state => this.state.userInfo.fundPwd ? this.changeSetPopup(5) : this.changeSetPopup(6)}>{`${this.intl.get("set") || this.intl.get("alter")}资金密码`}</span>
            <div className="fr">
              <img src="../../../static/mobile/user/icon_qianjb@3x.png"/>
            </div>
          </li>
          <li className="item clearfix">
            <span className="fl">需要资金密码</span>
            <div className="fr">
              <span>每次</span>
              <img src="../../../static/mobile/user/icon_qianjb@3x.png"/>
            </div>
          </li>
          <li className="item clearfix">
            <span className="fl">两步验证</span>
            <div className="fr">
              <img src="../../../static/mobile/user/icon_qianjb@3x.png"/>
            </div>
          </li>
        </ul>
        {this.state.setFundPass && <div className="need-fund-pass">
          <div className="select-section">
            <button>每次</button>
            <button>2小时</button>
            <button>不输入</button>
            <button>取消</button>
          </div>
        </div>}
        {this.state.showSet && <PassPopup onClose={this.closeSet}
                                          phone = {this.state.userInfo.phone}
                                          email = {this.state.userInfo.email}
                                          isType = {this.state.type}
                                          getVerify = {this.getVerify}
                                          bindUser = {this.bindUser}
                                          setLoginPass = {this.setLoginPass}
                                          // setFundPass = {this.setFundPass}
                                          modifyFundPwd = {this.modifyFundPwd}
                                          fundPassType = {this.state.userInfo.fundPassVerify}
                                          captcha = {this.state.captcha}
                                          captchaId = {this.state.captchaId}
                                          getCaptcha = {this.getCaptchaVerify}
                                          verifyNum = {this.state.verifyNum}
                                          clearErr2 = {() => {this.clearErr2()}}
                                          destroy={this.destroy}
                                          popupInputErr2 = {this.state.popupInputErr2}/>}
      </div>
    );
  }
}