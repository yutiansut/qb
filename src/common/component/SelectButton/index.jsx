import React, { Component } from "react";
import "./style.styl";

export default class SelectButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      istarget: false,
      title: this.props.title
    };
    this.clickoutside = () => {
      if (this.state.istarget) {
        this.state.istarget = false;
        return;
      }
      if (!this.state.show) return;
      this.setState({
        show: false
      });
    };
  }
  componentDidMount() {
    window.addEventListener("click", this.clickoutside);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.clickoutside);
  }
  render() {
    /*  
  title 按钮文案
  type  默认无, 可选main
  simple type为main时有效，简化，不显示title
  className 自定义类名方便自定义按钮宽高
  valueArr 选项菜单内容数组
  onSelect  选项click 事件的 handler
*/
    let { type, title, className, valueArr, onSelect, simple } = this.props;
    let { show } = this.state;
    !type && (type = "");
    !valueArr && (valueArr = []);
    return (
      <div className="select-button">
        {!type ? (
          <button
            className={`${className ? className : ""} ${show ? "" : "hide"}`}
            onClick={e => {
              this.state.istarget = true;
              this.setState({ show: show ? false : true });
            }}
          >
            {this.state.title}
          </button>
        ) : (
          <div
            className={`${className ? className : ""} ${
              show ? "" : "hide"
            } ${type} ${simple ? "simple" : ""}`}
            onClick={e => {
              this.state.istarget = true;
              this.setState({ show: show ? false : true });
            }}
          >
              { simple ? '' :this.state.title}
          </div>
        )}
        {valueArr.length > 0 && (
          <ul className={`${show ? "" : "hide"}`}>
            {valueArr.map((item, index) => {
              return (
                <li
                  className={item === this.state.title ? "active" : ""}
                  key={index}
                  onClick={e => {
                    e.nativeEvent.stopImmediatePropagation();
                    onSelect && onSelect(item);
                    this.setState({ show: false, title: item });
                  }}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
