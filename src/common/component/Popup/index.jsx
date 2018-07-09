import React, { Component } from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";
import "./style.styl";
/*
  title 标题 type为tip1、tip2、tip3、tip4时不生效
  type  默认或不在选择范围内时为default(消息提示), 可选base(基础),confirm(确认消息),custom(自定义),tip1、tip2、tip3、tip4(带有倾向性成功，警告，错误，信息),
  onClose 关闭事件的handler
  onConfirm 确定事件的 handler
  closeButton 布尔值，是否显示关闭按钮，默认false
  autoClose 是否自动关闭（3s）自动关闭是调用onClose，无onClose时不生效
  msg 提示文案
  className 自定义类名
  icon 默认succeed 可选warning,wrong,message, type为
*/
export default class Popup extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.timer = null;
    this.onClose = props.onClose;
    this.iconArr = {
      succeed: "/static/images/succeed.svg",
      warning: "/static/images/warning.svg",
      wrong: "/static/images/wrong.svg",
      message: "/static/images/message.svg",
    }
  }
  componentDidMount() {
    let { autoClose } = this.props;
    document.addEventListener("click", this.onClose);
    if (!autoClose) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(this.onClose, 2000);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.onClose);
    clearTimeout(this.timer);
  }
  tipType(type) {
    let obj = {};
    if (type === "tip1") {
      obj.title = this.intl.get('tip-success');
      obj.icon = this.iconArr.succeed;
    }
    if (type === "tip2") {
      obj.title = this.intl.get('tip-warn');
      obj.icon = this.iconArr.warning;
    }
    if (type === "tip3") {
      obj.title = this.intl.get('tip-error');
      obj.icon = this.iconArr.wrong;
    }
    if (type === "tip4") {
      obj.title = this.intl.get('tip-message');
      obj.icon = this.iconArr.message;
    }
    return obj;
  }
  render() {
    let {
      type,
      title,
      onClose,
      onConfirm,
      closeButton,
      msg,
      autoClose,
      icon,
      className
    } = this.props;
    (!icon || (!["succeed", "warning", "wrong", "message"].includes(icon))) && (icon = 'succeed');
    (!type ||
      ![
        "default",
        "base",
        "confirm",
        "custom",
        "tip1",
        "tip2",
        "tip3",
        "tip4"
      ].includes(type)) &&
      (type = "default");
    ["tip1", "tip2", "tip3", "tip4"].includes(type) &&
      (title = this.tipType(type).title);
    return (
      <div className={`wrap ${["tip1", "tip2", "tip3", "tip4"].includes(type) ? 'trans' : ''}`}>
        <div
          className={`base-popup ${type} ${className ? className : ''}`}
          onClick={e => {
            e.nativeEvent.stopImmediatePropagation();
            ["tip1", "tip2", "tip3", "tip4"].includes(type) && onClose()
          }}
        >
          {["tip1", "tip2", "tip3", "tip4"].includes(type) && (
            <img src={this.tipType(type).icon} className="img" alt="" />
          )}
          <h5>
            {title}
            {closeButton && (
              <img
                src="/static/img/guanbi_hei.svg"
                alt=""
                onClick={() => {
                  clearTimeout(this.timer);
                  onClose();
                }}
              />
            )}
          </h5>
          <p>
            {["confirm", "custom"].includes(type) && (
              <img
                src={`${
                  type === "confirm"
                    ? "/static/images/warning.svg"
                    : this.iconArr[icon]
                  }`}
                alt=""
              />
            )}
            {msg}
          </p>
          {type === "default" && (
            <Button
              title={this.intl.get('tip-know')}
              type="base"
              className="button"
              onClick={() => {
                clearTimeout(this.timer);
                onClose();
              }}
            />
          )}
          {["confirm", "custom"].includes(type) && (
            <Button
              title={this.intl.get('tip-confirm')}
              type="base"
              className="button"
              onClick={() => {
                clearTimeout(this.timer);
                onConfirm();
              }}
            />
          )}
          {["confirm", "custom"].includes(type) && (
            <Button
              title={this.intl.get('tip-cancel')}
              className="button"
              onClick={() => {
                clearTimeout(this.timer);
                onClose();
              }}
            />
          )}
        </div>
      </div>
    );
  }
}
