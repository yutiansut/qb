import React from "react";
import Button from "../Button/";
import "./style.styl";
export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.onClose = props.onClose;
  }
  componentDidMount() {
    let { autoClose } = this.props;
    document.addEventListener("click", this.onClose);
    if (!autoClose) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(this.onClose, 3000);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.onClose);
    clearTimeout(this.timer);
  }
  tipType(type){
    let obj = {}
    if(type === "tip1") {
      obj.title = "成功";
      obj.icon = '';
    }
    if(type === "tip2") {
      obj.title = "警告";
      obj.icon = "";
    }
    if(type === "tip3") {
      obj.title = "错误";
      obj.icon = "";
    }
    if(type === "tip4") {
      obj.title = "信息";
      obj.icon = "";
    }
    return obj;
  }
  render() {
  /*  
  title 标题
  type  默认或不在选择范围内时为default(消息提示), 可选base(基础),confirm(确认消息),custom(自定义),tip1、tip2、tip3、tip4(带有倾向性成功，警告，错误，信息),
  onClose 关闭事件的handler
  onConfirm 确定事件的 handler
  closeButton 布尔值，是否显示关闭按钮，默认false
  autoClose 是否自动关闭（3s）
  msg 提示文案
*/
    let {
      type,
      title,
      onClose,
      onConfirm,
      closeButton,
      msg,
      autoClose
    } = this.props;
    (!type || !["default", "base", "confirm", "custom", "tip1", "tip2", "tip3", "tip4"].includes(type)) && (type = "default");
    ["tip1", "tip2", "tip3", "tip4"].includes(type) && (title = this.tipType(type).title);
    return <div className="wrap">
        <div className={`popup ${type}`} onClick={e => {
            e.nativeEvent.stopImmediatePropagation();
          }}>
        {["tip1", "tip2", "tip3", "tip4"].includes(type) && <img src={this.tipType(type).icon} className="img" alt="" />}
          <h5>
            {title}
            {closeButton && <img src="" alt="" onClick={() => {
                  clearTimeout(this.timer);
                  onClose();
                }} />}
          </h5>
          <p>
            {["confirm", "custom"].includes(type) && <img src="" alt="" />}
            {msg}
          </p>
          {type === "default" && <Button title="知道了" type="base" className="button" onClick={() => {
                clearTimeout(this.timer);
                onClose();
              }} />}
          {["confirm", "custom"].includes(type) && <Button title="确 定" type="base" className="button" onClick={() => {
                clearTimeout(this.timer);
                onConfirm();
              }} />}
          {["confirm", "custom"].includes(type) && <Button title="取 消" className="button" onClick={() => {
                clearTimeout(this.timer);
                onClose();
              }} />}
        </div>
      </div>;
  }
}
