import React from "react";
import ExchangeViewBase from "../../../components/ExchangeViewBase.jsx";
import Input from "../../../common/component/Input";
import Button from "../../../common/component/Button";
import Popup from "../../../common/component/Popup"

export default class Verify extends ExchangeViewBase {
  constructor(props) {
    super(props);
    const { controller } = this.props;
    if (!this.props.location.query){
      history.replaceState(
        null,
        "",
        `${window.location.origin}/user`
      );
      this.props.history.push("/user/safe/twoverify");}
    let currentType = controller.getQuery("currentType") && Number(controller.getQuery("currentType")),
        currentKey = controller.getQuery("currentKey") && Number(controller.getQuery("currentKey"));
    controller.setView(this);
    this.state = {
      popupFlag: false,
      popupType: false,
      popupText: '',
      verifyNum: this.intl.get("sendCode"),
      title: [this.intl.get('user-verifyEmailTitle'), this.intl.get('user-popGoole'), this.intl.get('user-verifyPhoneTitle')],
      placeholderText: [this.intl.get('user-inputEmail'), "", this.intl.get('user-inputPhone')],
      disable: true,
      tip1: false,
      tip2: false,
      tip1Text: [
        this.intl.get("user-checkEmail"),
        "",
        this.intl.get("user-checkPhone")
      ],
      tip2Text: this.intl.get(608),
      type: controller.getQuery("type") - 0, //0 邮箱，1谷歌，2短信
      mode: { 2: 0, 0: 1 },
      // type: 1,
      account: "",
      code: "",
      accountText: [this.intl.get('user-emailAddress'), this.intl.get('user-inputVerifyGoogle'), this.intl.get('user-phoneNumber')],
      codeText: [this.intl.get('user-verifyEmail'), "", this.intl.get('user-verifySMS')],
      googleCode: ["", "", "", "", "", ""],
      currentType: currentType || false,
      currentKey: currentKey || false
      // userInfo: this.props.location.query && this.props.location.query.userInfo
    };
    this.dealInput = controller.dealInput.bind(controller);
    this.delNum = controller.delNum.bind(controller);
    this.bindUserH5 = controller.bindUserH5.bind(controller); //绑定邮箱或手机
    this.getVerify = controller.getVerify.bind(controller); //获取验证码
    this.setGoogleVerifyH5 = controller.setGoogleVerifyH5.bind(controller)//验证开启谷歌验证
    this.verifyAccount = controller.verifyAccount.bind(controller);//验证账户正则
  }

  componentWillMount() {}
  componentDidMount() {
    this.props.addContent({ con: this.state.title[this.state.type] });
  }

  render() {
    const { controller, history } = this.props;
    let {
      type,
      accountText,
      placeholderText,
      account,
      code,
      codeText,
      googleCode,
      tip1,
      tip2,
      tip1Text,
      tip2Text,
      verifyNum,
      mode
    } = this.state;
    return (
      <div className="user-center-verify">
        {[0, 2].includes(type) ? (
          <div className="user-center-phonemail">
            <div className="account">
              <h3>{accountText[type]}</h3>
              <Input
                placeholder={placeholderText[type]}
                value={this.state.account}
                onInput={value => {
                  this.setState({ account: value });
                }}
                className={`${tip1 ? 'error' : ''}`}
                onBlur={() => {
                  if(this.verifyAccount(mode[type], account)){
                    tip1 && this.setState({tip1: false})
                  }else{
                    !tip1 && this.setState({tip1: true})
                  }
                }}
              />
              {tip1 && <b className="error-tip">!&nbsp;{tip1Text[type]}</b>}
            </div>
            <div className="code">
              <h3>{codeText[type]}</h3>
              <div className={`${tip2 ? 'error' : ''}`}>
                <Input
                  value={this.state.code}
                  className="code-input"
                  onInput={value => {
                    this.setState({ code: value });
                  }}
                />
                {tip2 && <b className="error-tip">!&nbsp;{tip2Text}</b>}
                <Button
                  title={verifyNum ? (verifyNum === this.intl.get("sendCode") ? verifyNum : verifyNum+'s') : this.intl.get("sendCode")}
                  type="base"
                  className="send-code"
                  onClick={() => {
                    this.getVerify(account, mode[type], 3, 4);
                  }}
                />
              </div>
            </div>
            <Button
              title={this.intl.get('submit')}
              type="base"
              disable={!(account && code && !tip1 && !tip2)}
              className="submit"
              onClick={() => {
                this.bindUserH5(account, mode[type], code);
              }}
            />
            {type === 0 && <p className="tips">
              {this.intl.get('asset-reminder')}：<br />
              若未收到邮件，请检查邮箱垃圾箱～
            </p>}
          </div>
        ) : (
          <div className="user-center-google">
            <div className="google">
              <h3>{accountText[type]}</h3>
              <div className="clearfix input">
                {googleCode.map((v, index) => (
                  <input
                    className={`item-code ${index === 5 ? "last-child" : ""} ${
                      tip2 ? "tip" : ""
                    }`}
                    ref={`input${index}`}
                    key={index}
                    maxLength={1}
                    value={this.state.googleCode[index]}
                    onInput={e => {
                      this.dealInput(index, e.target.value, this);
                    }}
                    onKeyDown={e => {
                      this.delNum(index, e, this);
                    }}
                  />
                ))}
              </div>
              <Button
                title={this.intl.get('user-googleOn')}
                type="base"
                disable={googleCode.join("").length === 6 ? false : true}
                className="submit"
                onClick={() => {
                  this.setGoogleVerifyH5(googleCode.join(""));
                }}
              />
            </div>
            <p className="tips">
            {this.intl.get('asset-reminder')}：<br />
              {this.intl.get('user-googleLost')}
            </p>
          </div>
        )}
       {this.state.popupFlag && <Popup
            type={this.state.popupType ? "tip1" : "tip3"}
            msg={this.state.popupText}
            h5={true}
            onClose={() => {
              if(this.state.popupType){
                history.push({pathname: '/user/safe/twoverify', query:{showBottom: true, currentType: this.state.currentType, currentKey: this.state.currentKey}})
                return;
              }
              this.setState({ popupFlag: false });
            }}
            autoClose={true}
          />
        }
      </div>
    );
  }
}
