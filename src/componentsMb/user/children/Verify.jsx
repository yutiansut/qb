import React from "react";
import ExchangeViewBase from "../../../components/ExchangeViewBase.jsx";
import Input from "../../../common/component/Input";
import Button from "../../../common/component/Button";

export default class Verify extends ExchangeViewBase {
  constructor(props) {
    super(props);
    if(!this.props.location.query) this.props.history.push('/user/safe')
    const { controller } = this.props;
    controller.setView(this);
    this.state = {
      title: ["邮箱两步验证", "谷歌验证码", "短信两步验证"],
      disable: true,
      tip: false,
      type: controller.getQuery('type') - 0,//0 邮箱，1谷歌，2短信
      // type: 1,
      account: "",
      code: "",
      accountText: ["邮箱地址", "请输入谷歌验证码", "手机号码"],
      codeText: ["邮箱验证码", "", "短信验证码"],
      googleCode: ["", "", "", "", "", ""],
    };
    this.dealInput = controller.dealInput.bind(controller);
    this.delNum = controller.delNum.bind(controller);
  }

  componentWillMount() {}
  componentDidMount() {
    this.props.addContent({con: this.state.title[ this.state.type]})
  }

  render() {
    const { controller, history } = this.props;
    let { type, accountText, codeText, googleCode, tip} = this.state;
    return (
      <div className="user-center-verify">
        {[0, 2].includes(type) ? (
          <div className="user-center-phonemail">
            <div className="account">
              <h3>{accountText[type]}</h3>
              <Input
                placeholder="请输入你的手机号码"
                value={this.state.account}
                onInput={value => {
                  this.setState({ account: value });
                }}
              />
            </div>
            <div className="code">
              <h3>{codeText[type]}</h3>
              <Input
                value={this.state.code}
                className="code-input"
                onInput={value => {
                  this.setState({ code: value });
                }}
              />
              <Button title="获取验证码" type="base" className="send-code" />
            </div>
            <Button
              title="提交"
              type="base"
              className="submit"
              onClick={() => {
                console.log(999);
              }}
            />
          </div>
        ) : (
          <div className="user-center-google">
            <div className="google">
              <h3>{accountText[type]}</h3>
              <div className="clearfix input">
                {googleCode.map((v, index) => (
                  <input
                    className={`item-code ${index===5 ? 'last-child' : ''} ${tip ? 'tip' : ''}`}
                    ref={`input${index}`}
                    type="password"
                    key={index}
                    maxLength={1}
                    value={this.state.googleCode[index]}
                    onInput={e => {
                      this.dealInput(index, e.target.value, this)
                    }}
                    onKeyDown={(e)=>{this.delNum(index, e, this)}}
                  />
                ))}
              </div>
              <Button
              title="开启Google验证"
              type="base"
              disable={googleCode.join('').length === 6 ? false : true}
              className="submit"
              onClick={() => {
                console.log(googleCode.join(''));
              }}
            />
            </div>
            <p className="tips">
              温馨提示：<br/>
              谷歌验证器丢失，请联系客服进行申诉～
            </p>
          </div>
        )}
      </div>
    );
  }
}
