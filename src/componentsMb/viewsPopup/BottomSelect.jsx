import React, { Component } from "react";

import ExchangeViewBase from "../../components/ExchangeViewBase";
import "./stylus/bottomSelect.styl";

// destroy 组件销毁时执行的方法
// onSelect
// onCancel

export default class BottomSelect extends ExchangeViewBase {
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
              {this.props.current !== undefined && this.props.current === v.i ? <i>（已设置）</i> : ''}
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
