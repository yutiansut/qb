import React, { Component } from "react";
import exchangeViewBase from "../../../ExchangeViewBase";
import Button from "../../../../common/component/Button";
import Input from "../../../../common/component/Input";
import "./style.styl";

export default class Popup extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      newAddress: []
    };
    //绑定方法
    // this.getData = controller.getData.bind(controller)
    // this.state = {
    // console.log(this.controller)
    // }
  }
  render() {
    let { type, onClose, addressArr, onSave, onCancel, onDelete } = this.props;
    this.popup = {
      popup1: () => {
        return (
          <div className="asset-popup-content base1">
            <img
              className="close"
              src="/static/img/guanbi_hei.svg"
              alt=""
              onClick={() => {
                onClose && onClose();
              }}
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
              onClick={() => {
                onClose && onClose();
              }}
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
              onClick={() => {
                onClose && onClose();
              }}
            />
            <h3>
              添加地址<span
                onClick={() => {
                  this.state.newAddress.push({ name: "", address: "" });
                  this.setState({
                    showInput: true,
                    newAddress: this.state.newAddress
                  });
                }}
              >
                添加
              </span>
            </h3>
            <table className="list">
              <thead>
                <tr>
                  <th className="name">名称</th>
                  <th className="base3-address">地址</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {this.state.showInput &&
                  this.state.newAddress.map((item, index) => {
                    return (
                      <tr className="input" key={index}>
                        <td>
                          <Input
                            type="text"
                            value={item.name}
                            placeholder="输入名称"
                            onInput={value => {
                              item.name = value;
                              this.setState({
                                newAddress: this.state.newAddress
                              });
                            }}
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={item.address}
                            placeholder="输入地址"
                            onInput={value => {
                              item.address = value;
                              this.setState({
                                newAddress: this.state.newAddress
                              });
                            }}
                          />
                        </td>
                        <td>
                          <Button
                            type="base"
                            title="保存"
                            onClick={() => {
                              this.state.newAddress.splice(index, 1);
                              this.setState({
                                newAddress: this
                                  .state
                                  .newAddress
                              });
                              onSave && onSave(item);
                            }}
                          />
                          <Button
                            title="取消"
                            onClick={() => {
                              this.state.newAddress.splice(index, 1);
                              this.setState({
                                newAddress: this.state.newAddress
                              });
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                {addressArr &&
                  addressArr.map((item, index) => <tr className="base3-content" key={index}>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td>
                        <Button
                          title="删除"
                          theme="danger"
                          onClick={()=>{onDelete && onDelete(item)}}
                        />
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        );
      }
    };
    return <div className="asset-popup">{this.popup[this.props.type]()}</div>;
  }
}
