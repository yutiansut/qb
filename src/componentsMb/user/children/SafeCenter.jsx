import React from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase.jsx';
import {NavLink} from 'react-router-dom'
import '../stylus/userSafeCenter.styl'
import PassPopup from '../userPopup/SetPassPopup.jsx'
import RemindPopup from '../../../common/component/Popup/index.jsx'
import {AsyncAll} from "../../../core";
import Input from "../../../common/component/Input";
import Button from '../../../common/component/Button/index.jsx'

export default class UserCenterIndex extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      setFundPass: false,
      showSet: false,
      verifyFund: false,
      fundPassArr : ['每次', '2小时', '不输入', '取消'],
      remindPopup: false,
      popType: "tip1",
      popMsg: "",
      fundPassType: 0
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
    this.modifyFundPwd = controller.modifyFundPwd.bind(controller) // 设置修改资金密码
    this.initData = controller.initData.bind(controller) // 获取用户信息
    this.getCaptchaVerify = controller.getCaptchaVerify.bind(controller) // 获取图形验证码
    this.bindUser = controller.bindUser.bind(controller)
    this.setFundPwdSpace = controller.setFundPwdSpace.bind(controller) // 设置资金密码间隔
    this.needFundPwdInterval = this.needFundPwdInterval.bind(this) // 设置密码间隔
    this.fundPwdSpace = this.fundPwdSpace.bind(this) // 资金密码内容
    // this.closeSet = this.closeSet.bind(this)
  }

  componentWillMount() {
  }

  async componentDidMount() {
    await AsyncAll([this.initData(), this.getCaptchaVerify()])
  }

  needFundPwdInterval() { // 是否需要资金密码
    // if (this.state.userInfo.fundPwd) {
    //   // this.view.history.push('/muser/setPwd?type=5')
    //   location.href = '/muser/setPwd?type=5'
    //   return
    // }
    this.setState({
      setFundPass: true
    })

  }

  fundPwdSpace(v, index) { // 资金密码内容
    // 0:每次都需要密码 1:2小时内不需要 2:每次都不需要
    this.setState({
      setFundPass: false,
      verifyFund: true,
      fundPassType: index
    })
    console.log('资金密码内容', v, index )
    // this.setFundPwdSpace(index)
  }

  // changeSetPopup(type) { // 设置密码显示
  //   this.setState({
  //     showSet: true,
  //     type: type,
  //     verifyNum: this.intl.get("sendCode")
  //   })
  // }

  // closeSet() {
  //   this.setState({
  //     showSet: false
  //   })
  //   this.getCaptchaVerify()
  // }


  render() {
    const {controller, url} = this.props
    console.log('安全中心', this.state)
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
            {/*<NavLink to={`${url}/setPwd` }>dfasdfasd</NavLink>*/}
            {/*<NavLink to={{pathname: `${url}/setPwd`, query: {type: this.state.userInfo.loginPwd ? 3 : 4}}}>{`${this.state.userInfo.loginPwd && this.intl.get("set") || this.intl.get("alter")}登录密码`}</NavLink>*/}
            <NavLink className="fl" to={`${url}/setPwd?type=${this.state.userInfo.loginPwd ? 3 : 4}`}>{`${this.state.userInfo.loginPwd && this.intl.get("set") || this.intl.get("alter")}登录密码`}</NavLink>
            {/*<span className="fl"*/}
                  {/*onClick={state => this.state.userInfo.loginPwd ? this.changeSetPopup(3) : this.changeSetPopup(4)}>{`${this.state.userInfo.loginPwd && this.intl.get("set") || this.intl.get("alter")}登录密码`}</span>*/}
            <div className="fr">
              <img src="../../../static/mobile/user/icon_qianjb@3x.png"/>
            </div>
          </li>
          <li className="item clearfix">
            <NavLink className="fl" to={`${url}/setPwd?type=${this.state.userInfo.fundPwd ? 5 : 6}`}>{`${this.state.userInfo.fundPwd && this.intl.get("set") || this.intl.get("alter")}资金密码`}</NavLink>
            {/*<span className="fl"*/}
                  {/*onClick={state => this.state.userInfo.fundPwd ? this.changeSetPopup(5) : this.changeSetPopup(6)}>{`${this.state.userInfo.fundPwd && this.intl.get("set") || this.intl.get("alter")}资金密码`}</span>*/}
            <div className="fr">
              <img src="../../../static/mobile/user/icon_qianjb@3x.png"/>
            </div>
          </li>
          <li className="item clearfix" onClick={this.needFundPwdInterval}>
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
            {this.state.fundPassArr.map((v, index) =>
              <button key={index} onClick={value => this.fundPwdSpace(v, index)}>{v}</button>
            )}
          </div>
        </div>}
        {this.state.verifyFund && <div className="verify-fund-pass-wrap">
          <div className="verify-fund-pass clearfix">
            <h1 className="clearfix">
              <span>资金密码</span>
              <img src="/static/img/guanbi_hei.svg" alt="" className="close-popup" onClick={() => {this.setState({ verifyFund: false });}}/>
            </h1>
            <Input oriType="password" placeholder="请输入资金密码"/>
            <Button title="确定" onClick={this.setFundPwdSpace}/>
          </div>
        </div>}
        {this.state.remindPopup && <RemindPopup
          type={this.state.popType}
          msg={this.state.popMsg}
          autoClose = {true}
          onClose={() => {this.setState({ remindPopup: false });}}/>}
      </div>
    );
  }
}