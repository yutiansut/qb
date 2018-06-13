import React, { Component } from "react";
import "./style.styl";

export default class SelectButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      istarget: false
    };
    this.clickoutside = () => {
      if (this.state.istarget) {
        this.state.istarget = false;
        return;
      };
      if (!this.state.show) return;
      this.setState({
        show: false
      });
    } 
  }
  componentDidMount() {
    window.addEventListener("click", this.clickoutside);
  }
  componentWillUnmount(){
    window.removeEventListener("click", this.clickoutside);
  }
  render() {
/*  
  title 按钮文案
  type  默认无, 可选main
  className 自定义类名方便自定义按钮宽高
  valueArr 选项菜单内容数组
  onSelect  选项click 事件的 handler
*/
    let { type, title, className, valueArr, onSelect } = this.props;
    let { show } = this.state;
    type ? type : "";
    return (
      <div className="select-button">
        {!type ? (
          <button
            className={`${className ? className : ""} ${show ? "" : "hide"}`}
            onClick={(e) => {
              this.state.istarget = true;
              this.setState({
                show: show ? false : true
              });
            }}
          >
            {title}
          </button>
        ) : (
          <div
            className={`${className ? className : ""} ${show ? "" : "hide"} ${type}`}
            onClick={(e) => {
              this.state.istarget = true;
              this.setState({
                show: show ? false : true
              });
            }}
          >
            {title}
          </div>
        )}
        <ul className={`${show ? "" : "hide"}`}>
          {valueArr.map((item, index) => {
            return (
              <li
                key={index}
                onClick={(e) => {
                  e.nativeEvent.stopImmediatePropagation();
                  onSelect(item);
                  this.setState({
                    show: false
                  });
                }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
