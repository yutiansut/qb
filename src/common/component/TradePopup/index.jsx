import React from "react";
import "./style.styl";
/*
type  默认default(无提示性图标，文案居中), 可选ico(带有提示性图标，文案左对齐)
theme 主题 默认positi,可选passive
onClose 关闭弹窗，组件销毁
msg 文案
className 自定义类名设置弹窗位置
3秒后，或点击页面自动关闭(调用onClose方法)
*/
export default class TradePopup extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = props.onClose;
    this.timer = null;
  }
  componentDidMount(){
    this.onClose && (this.timer = setTimeout(()=>{this.onClose()}, 3000))
    this.onClose && window.addEventListener('click', this.onClose)
  }
  componentWillUnmount(){
    window.removeEventListener('click', this.onClose)
    clearTimeout(this.timer)
  }
  render() {
    let {
      type,
      theme,
      msg,
      className
    } = this.props;
    !type && (type = 'default');
    !theme && (theme = 'positi');
    return <div className="trade-popup">
      <div className={`${type} ${theme} ${className ? className : ""}`}>
        {msg}
      </div>
    </div>;
  }
}
