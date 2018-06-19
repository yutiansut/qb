import React from "react";
import "./style.styl";
/*  
  placeholder, 占位文案
  type,  默认default, 可选search1(带搜索按钮),search2(带搜索图标),textarea
  value, input的value值
  oriType, input类型 默认input
  onEnter,  回车事件的 handler
  onInput, input 事件的handler
  onChange, change事件的handler
  disabled, 设置disable状态
  className, 未预设宽高，自定义类名设置宽高，行高,
  children, 类似vue插槽,用作自定义下拉菜单
*/
export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : ""
    };
    this.elem = props => {
      let {
        placeholder,
        type,
        value,
        oriType,
        onEnter,
        onInput,
        onChange,
        onSearch,
        disabled,
        className,
        children
      } = props;
      !oriType && (oriType = "text");
      !["search1", "search2", "textarea"].includes(type) && (type = "default");
      let element;
      element = (
        <div
          className={`base-input-wrap ${type === "search1" ? type : ""} ${
            type === "search2" ? type : ""
            }`}
        >
          {["default", "search1", "search2"].includes(type) && (
            <input
              ref="input"
              type={oriType}
              className={`${className ? className : ""} ${
                disabled ? "disabled" : ""
                }`}
              disabled={disabled}
              placeholder={placeholder && placeholder}
              onKeyDown={e => {
                if (e.nativeEvent.keyCode !== 13) return;
                this.refs.input.blur();
                onEnter && onEnter(this.refs.input.value);
              }}
              onInput={() => {
                this.setState({ value: this.refs.input.value });
                onInput && onInput(this.refs.input.value);
              }}
              onChange={() => {
                onChange && onChange(this.refs.input.value);
              }}
              value={this.state.value}
            />
          )}
          {type === "textarea" && (
            <textarea
              ref="input"
              type={oriType}
              className={`${className ? className : ""} ${
                disabled ? "disabled" : ""
                }`}
              disabled={disabled}
              placeholder={placeholder && placeholder}
              onKeyDown={e => {
                if (e.nativeEvent.keyCode !== 13) return;
                this.refs.input.blur();
                onEnter && onEnter(this.refs.input.value);
              }}
              onInput={() => {
                this.setState({ value: this.refs.input.value });
                onInput && onInput(this.refs.input.value);
              }}
              onChange={() => {
                onChange && onChange(this.refs.input.value);
              }}
              value={this.state.value}
            />
          )}
          {type === "search1" && (
            <button
              onClick={() => {
                onEnter && onEnter(this.refs.input.value);
              }}
            />
          )}
          {children}
        </div>
      );
      return element;
    };
  }

  render() {
    return this.elem(this.props);
  }
}
