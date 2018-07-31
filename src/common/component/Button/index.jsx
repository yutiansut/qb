import React from "react";
/*
href	点击跳转的地址，指定此属性 button 的行为和 a 链接一致
target	相当于 a 链接的 target 属性，href 存在时生效
title 按钮文案
type  默认default, 可选default、base、backg1、backg2、export
disable 按钮失效状态
onClick click 事件的 handler
theme 主题色 main、positive、warn、danger四种（type 为 default、base 时有效,
className 未预设宽高，自定义类名设置宽高，行高
*/
export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.elem = () => {
      let {
        title,
        type,
        onClick,
        theme,
        disable,
        href,
        target,
        className
      } = this.props;
      let element;
      href ? (element = (
        <a
          onClick={onClick}
          className={`base-button ${className ? className : ""} ${
            type ? type : "default"
            } ${!["back1", "back2", "export"].includes(type) && theme ? theme : "main"} ${
            disable ? "disable" : ""
            }`}
          disabled={disable ? disable : false}
          href={href}
          target={target ? "_blank" : ""}
        >
          {title}
        </a>
      ))
        : (element = (
          <button
            onClick={onClick}
            className={`base-button ${className ? className : ""} ${
              type ? type : "default"
              } ${!["back1", "back2", "export"].includes(type) && theme ? theme : "main"} ${
              disable ? "disable" : ""
              }`}
            disabled={disable ? disable : false}
          >
            {title}
          </button>
        ));
      return element;
    }
  }
  render() {
    return this.elem();
  }
}
