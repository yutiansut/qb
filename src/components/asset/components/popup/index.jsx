import React, { Component } from "react";
import exchangeViewBase from "../../../ExchangeViewBase";
import Button from "../../../../common/component/Button";
import "./style.styl";

export default class Popup extends exchangeViewBase {
  constructor(props) {
    super(props);
    //绑定方法
    // this.getData = controller.getData.bind(controller)
    // this.state = {
    // console.log(this.controller)
    // }
    let { type, onClose, addressArr, onSave, onCancel, onDelete } = props;
    this.popup = {
      popup1: () => {
        return (
          <div className="asset-popup-content base1">
            <img
              className="close"
              src="/static/img/guanbi_hei.svg"
              alt=""
              onClick={onClose && onClose()}
            />
            <p>
              <a href="#">请先进行身份认证</a>
            </p>
          </div>
        );
      },
      popup2: () => {
        return (
          <div className="asset-popup-content base2">
            <img
              className="close"
              src="/static/img/guanbi_hei.svg"
              alt=""
              onClick={onClose && onClose()}
            />
            <p>
              <span>未进行实名认证的用户,需要进行实名认证方可充值。</span>
              <br />
              <a href="#">请点击此处进行身份认证</a>
            </p>
          </div>
        );
      },
      // 添加地址弹窗
      popup3: () => {
        return (
          <div className="asset-popup-content base3">
            <img
              className="close"
              src="/static/img/guanbi_hei.svg"
              alt=""
              onClick={onClose && onClose()}
            />
            <h3>
              添加地址<span>添加</span>
            </h3>
            <table>
              <thead>
                <tr>
                  <th className="name">名称</th>
                  <th className="address">地址</th>
                  <th className="handel">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr className="input">
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <Button
                      type="base"
                      title="保存"
                      onClick={onSave && onSave()}
                    />
                    <Button title="取消" onClick={onCancel && onCancel()} />
                  </td>
                </tr>
                <tr className="content">
                  <td>yy</td>
                  <td>0x046e59335aaffd964cfbb05c6c15a1238d7e3543</td>
                  <td>
                    <Button
                      title="删除"
                      theme="danger"
                      onClick={onDelete && onDelete()}
                    />
                  </td>
                </tr>
                <tr className="content">
                  <td>yy</td>
                  <td>0x046e59335aaffd964cfbb05c6c15a1238d7e3543</td>
                  <td>
                    <Button
                      title="删除"
                      theme="danger"
                      onClick={onDelete && onDelete()}
                    />
                  </td>
                </tr>
                <tr className="content">
                  <td>yy</td>
                  <td>0x046e59335aaffd964cfbb05c6c15a1238d7e3543</td>
                  <td>
                    <Button
                      title="删除"
                      theme="danger"
                      onClick={onDelete && onDelete()}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
    };
  }
  render() {
    return <div className="asset-popup">{this.popup[type]()}</div>;
  }
}
