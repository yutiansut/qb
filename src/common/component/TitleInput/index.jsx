import React, { Component } from 'react'
import "./style.styl";
/*
  placeholder, 占位文案
  type 默认无，可选left, right
  titleLeft, 左侧 文案标题
  titleRight, 右侧 文案标题
  theme 默认default,可选dark(币币交易主题色)
  value, input的value值
  onInput, input 事件的handler
  onFocus,focus事件的handler
  onBlur, blur事件的handler
  className, input外层父级元素的自定义类名（设置高度和行高，子元素继承）
  className1, 左侧自定义类名,
  className2, input自定义类名,
  className3, 右侧自定义类名,
*/
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : "",
      istarget: false,
      focus: false
    };
  }
  render() {
    let {
      placeholder,
      type,
      titleLeft,
      titleRight,
      theme,
      value,
      onInput,
      onFocus,
      onBlur,
      onEnter,
      className1,
      className2,
      className3
    } = this.props;
    !type && (type ='')
    !theme && (theme = 'default')
    return (
      <div className={`title-input ${theme} ${type} ${this.state.focus ? 'focus' : ''}`}>
        {type !== "right" && <p className={`${className1 ? className1 : ''}`}>{titleLeft}</p>}
        <input
          type="text"
          ref="input"
          className={`${className2 ? className2 : ''}`}
          placeholder={placeholder && placeholder}
          value={this.state.value}
          onInput={
            (e) => {
              this.setState({ value: e.target.value });
              onInput && onInput(e.target.value);}
            }
          onKeyDown={e => {
            if (e.nativeEvent.keyCode !== 13) return;
            this.refs.input.blur();
            onEnter && onEnter(this.state.value);
          }}
          onFocus={() => {
            this.setState({ focus: true });
            onFocus && onFocus(this.state.value);
          }}
          onBlur={() => {
            this.setState({ focus: false });
            onBlur && onBlur(this.state.value);
          }}
          />
        {type !== "left" && <p className={`${className3 ? className3 : ''}`}>{titleRight}</p>}
      </div>
    )
  }
}
