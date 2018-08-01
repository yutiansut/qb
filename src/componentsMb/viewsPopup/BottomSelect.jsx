import React, { Component } from "react";

import exchangeViewBase from "../../components/ExchangeViewBase";
import "./stylus/bottomSelect.styl";

// destroy 组件销毁时执行的方法
// onClose 关闭弹窗
// onSelect
// onCancel

export default class SelectButton extends exchangeViewBase {
  constructor(props) {
    super(props);
  }
  componentWillUnmount() {
    this.props.destroy && this.props.destroy();
  }
  render() {
    return (
      <div className="need-fund-pass">
        <div className="select-section">
          {this.props.data.map((v, index) => (
            <a
              key={index}
              onClick={() => {
                this.props.onSelect && this.props.onSelect(v);
              }}
            >
              {v.value}
            </a>
          ))}
          <a
            onClick={() => {
              this.props.onCancel && this.props.onCancel();
            }}
          >
            {this.intl.get("cance")}
          </a>
        </div>
      </div>
    );
  }
}
