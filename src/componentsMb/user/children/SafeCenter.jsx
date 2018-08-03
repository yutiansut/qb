import React from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase.jsx";
import { NavLink } from 'react-router-dom';

import RemindPopup from "../../../common/component/Popup/index.jsx";
import { AsyncAll } from "../../../core";
import Input from "../../../common/component/Input/index.jsx";
import Button from "../../../common/component/Button/index.jsx";
import BottomSelect from "../../viewsPopup/BottomSelect";

export default class UserCenterIndex extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.fundPassArr = [
      this.intl.get("deal-every"),
      this.intl.get("deal-2h"),
      this.intl.get("deal-never"),
    ];
    this.state = {
      setFundPass: false,
      showSet: false,
      verifyFund: false,
      remindPopup: false,
      popType: "tip1",
      popMsg: "",
      fundPassType0: 0,
      fundPassType: 0,
      fundValue: ""
    };
    const { controller } = props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getFundPwdInterval = controller.getFundPwdInterval.bind(controller); // 查看资金密码间隔
    this.getVerify = controller.getVerify.bind(controller); // 发送短信验证码
    this.setLoginPass = controller.setLoginPass.bind(controller); // 设置登录密码
    this.modifyFundPwd = controller.modifyFundPwd.bind(controller); // 设置修改资金密码
    this.initData = controller.initData.bind(controller); // 获取用户信息
    this.getCaptchaVerify = controller.getCaptchaVerify.bind(controller); // 获取图形验证码
    this.bindUser = controller.bindUser.bind(controller);
    this.setFundPwdSpace = controller.setFundPwdSpace.bind(controller); // 设置资金密码间隔
    this.needFundPwdInterval = this.needFundPwdInterval.bind(this); // 设置密码间隔
    this.fundPwdSpace = this.fundPwdSpace.bind(this); // 资金密码内容
    this.changeFundValue = this.changeFundValue.bind(this); // 输入资金密码
    // this.closeSet = this.closeSet.bind(this)
  }

  componentWillMount() { }

  async componentDidMount() {
    this.props.addContent({con: '安全中心'})
    await AsyncAll([this.initData(), this.getCaptchaVerify()]);
    let result = await this.getFundPwdInterval();
    this.setState({
      fundPassType0: result.mode,
      fundPassType: result.mode
    });
  }

  needFundPwdInterval() {
    // 是否需要资金密码
    if (this.state.userInfo.fundPwd) {
      this.props.history.push("/user/setPwd?type=5");
      return;
    }
    this.setState({
      setFundPass: true
    });
  }

  changeFundValue(value) {
    // 输入资金密码
    this.setState({ fundValue: value });
  }

  fundPwdSpace(v, index) {
    // 资金密码内容
    // 0:每次都需要密码 1:2小时内不需要 2:每次都不需要
    this.setState({
      setFundPass: false,
      verifyFund: true,
      fundPassType: index,
      fundValue: ""
    });
  }

  render() {
    const { controller, url, match } = this.props;
    return (
      <div className="user-safe-center">
        {/* <div className="safe-center-header">
          <div className="back">
            <img src="../../../../static/mobile/user/Back@3x.png" />
            <NavLink to={`${url}`}>{this.intl.get("back")}</NavLink>
          </div>
          <div className="name">{this.intl.get("header-security")}</div>
        </div> */}
        <div className="safe-center-container">
          <NavLink
            className="item clearfix"
            to={`${url}/setPwd?type=${this.state.userInfo.loginPwd ? 3 : 4}`}
          >
            <span className="fl">
              {(this.state.userInfo.loginPwd &&
                this.intl.get("user-popSetLoginPwd")) ||
                this.intl.get("user-popRecoverLoginPwd")}
            </span>
            <img className="fr" src="/static/mobile/user/icon_qianjb@3x.png" />
          </NavLink>
          <NavLink
            className="item clearfix"
            to={`${url}/setPwd?type=${this.state.userInfo.fundPwd ? 5 : 6}`}
          >
            <span className="fl">
              {(this.state.userInfo.fundPwd &&
                this.intl.get("user-popSetFundPwd")) ||
                this.intl.get("user-popRecoverFundPwd")}
            </span>
            <img className="fr" src="/static/mobile/user/icon_qianjb@3x.png" />
          </NavLink>
          <a className="item clearfix" onClick={this.needFundPwdInterval}>
            <span className="fl">{this.intl.get("user-needFundPwd")}</span>
            <span className="fr">
              {this.fundPassArr[this.state.fundPassType0]}
            </span>
          </a>
          <a className="item br" />
          <NavLink
            className="item clearfix"
            to={`${match.url}/safe/twoverify`}
          >
            <span className="fl">{this.intl.get("twoStep")}</span>
            <img className="fr" src="/static/mobile/user/icon_qianjb@3x.png" />
          </NavLink>
        </div>
        {/*底部列表*/}
        {this.state.setFundPass && (
          <BottomSelect
            data={this.fundPassArr.map((v, index) => {
              return { value: v, i: index };
            })}
            onSelect={value => {
              if(value.i === this.state.fundPassType0) return;
              this.fundPwdSpace(value.value, value.i);
            }}
            onCancel={() => {
              this.setState({
                setFundPass: false,
                verifyFund: false
              });
            }}
          />
        )}
        {/*输入资金密码弹窗*/}
        {this.state.verifyFund &&
          (<div className="verify-fund-pass-wrap">
            <div className="verify-fund-pass clearfix">
              <h1 className="clearfix">
                <span>{this.intl.get("fundPass")}</span>
                <img src={this.$imagesMap.$guanbi_hei} alt="" className="close-popup" onClick={() => { this.setState({ verifyFund: false }); }} />
              </h1>
              <Input oriType="password" placeholder={this.intl.get("asset-inputFundPassword")} value={this.state.fundValue} onInput={value => this.changeFundValue(value)} />
              <Button title={this.intl.get("ok")} onClick={() => this.state.fundValue && this.setFundPwdSpace(this.state.fundPassType, this.state.fundValue)} />
            </div>
          </div>
          )}
        {/*提示框*/}
        {this.state.remindPopup && (
          <RemindPopup
            type={this.state.popType}
            msg={this.state.popMsg}
            h5={true}
            autoClose={true}
            onClose={() => {
              this.setState({ remindPopup: false });
            }}
          />
        )}
      </div>
    );
  }
}
