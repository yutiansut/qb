import React, { Component } from "react";

import ExchangeViewBase from "../../components/ExchangeViewBase";
import Input from "../../common/component/Input";
import Button from "../../common/component/Button";
import "./stylus/towVerifyPopupH5.styl";

// destroy 组件销毁时执行的方法
// onClose 关闭弹窗
// onConfirm 确认触发的handel
// onSend
// onSend 发送的handel
// type 验证类型
export default class VerifyPopupH5 extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      // type: 2,
      code: '',
      type: this.props.type, //0,1,2 邮箱、谷歌、短信
      title: [this.intl.get('user-verifyEmailTitle'), this.intl.get('user-googleVerify'), this.intl.get('user-verifyPhoneTitle')],
      holderText: [this.intl.get('user-verifyEmail'), "", this.intl.get('user-verifySMS')],
    };
  }
  componentWillUnmount() {
    this.props.destroy && this.props.destroy();
  }
  render() {
    let { title, type, holderText, code } = this.state;
    let {
      onClose,
      googleCode,
      dealInput,
      delNum,
      verifyNum,
      onSend,
      onConfirm
    } = this.props;
    return (
      <div className="two-verify-popup-h5">
        <div className="poup">
          <h4>
            {title[type]}{" "}
            <i
              onClick={() => {
                onClose && onClose();
              }}
            >
              {this.intl.get('cance')}
            </i>
          </h4>
          {[0, 2].includes(type) ? (
            <div className="normal clearfix">
              <Input placeholder={holderText[type]} value={this.state.code} onInput={(value)=>{this.setState({code: value})}}/>
              <Button
                title={verifyNum}
                type="base"
                onClick={() => {
                  onSend && onSend();
                }}
              />
            </div>
          ) : (
            <div className="google">
              {googleCode.map((v, index) => (
                <input
                  className={`item-code`}
                  ref={`input${index}`}
                  type="password"
                  key={index}
                  maxLength={1}
                  value={googleCode[index]}
                  onInput={e => {
                    dealInput(index, e.target.value, this);
                  }}
                  onKeyDown={e => {
                    delNum(index, e, this);
                  }}
                />
              ))}
            </div>
          )}
          <Button
            title={this.intl.get('ok')}
            type="base"
            className="submit"
            disable={[0, 2].includes(type) ? !code.length : googleCode.join("").length !== 6}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              onConfirm && onConfirm(this.state.code || googleCode.join(''));
            }}
          />
        </div>
      </div>
    );
  }
}
