import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../../ExchangeViewBase";
import Button from "../../../../common/component/Button";
import Input from "../../../../common/component/Input";
// import "./style.styl";

export default class Popup extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      newAddress: []
    };
    this.add = async (item, index) => {
      let flag;
      this.props.onSave && (flag = await this.props.onSave(item));
      if (flag) {
        this.state.newAddress.splice(index, 1);
        this.setState({
          newAddress: this
            .state
            .newAddress
        });
      }
    }
    //绑定方法
    // this.getData = controller.getData.bind(controller)
    // this.state = {
    // console.log(this.controller)
    // }
  }
  render() {
    let { type, onClose, addressArr, onSave, onCancel, onDelete } = this.props;
    this.popup = {
      // popup1: () => {
      //   return <div className="asset-popup-content base1">
      //       <img className="close" src="/static/img/guanbi_hei.svg" alt="" onClick={() => {
      //           onClose && onClose();
      //         }} />
      //       <p>
      //         <NavLink to="/user/identity">请先进行身份认证</NavLink>
      //       </p>
      //     </div>;
      // },
      // popup2: () => {
      //   return (
      //     <div className="asset-popup-content base2">
      //       <img
      //         className="close"
      //         src="/static/img/guanbi_hei.svg"
      //         alt=""
      //         onClick={() => {
      //           onClose && onClose();
      //         }}
      //       />
      //       <p>
      //         <span>未进行实名认证的用户,需要进行实名认证方可充值。</span>
      //         <br />
      //         <NavLink to="/user/identity">请点击此处进行身份认证</NavLink>
      //       </p>
      //     </div>
      //   );
      // },
      // 添加地址弹窗
      popup3: () => {
        return (
          <div className="asset-popup-content base3">
            <img
              className="close"
              src={this.$imagesMap.$guanbi_hei}
              alt=""
              onClick={() => {
                onClose && onClose();
              }}
            />
            <h3>
              {this.intl.get('asset-addAddress')}<span
                onClick={() => {
                  if(this.state.newAddress.length){
                    this.props.addTip()
                    return;
                  }
                  this.state.newAddress.push({ addressName: "", address: "" });
                  this.setState({
                    showInput: true,
                    newAddress: this.state.newAddress
                  });
                }}
              >
                {this.intl.get('add')}
              </span>
            </h3>
            <table className="list">
              <thead>
                <tr>
                  <th className="name">{this.intl.get('name')}</th>
                  <th className="base3-address">{this.intl.get('address')}</th>
                  <th>{this.intl.get('action')}</th>
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
                            placeholder={this.intl.get('asset-inputName')}
                            onInput={value => {
                              item.addressName = value;
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
                            placeholder={this.intl.get('asset-inputAddress')}
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
                            title={this.intl.get('save')}
                            onClick={() => { this.add(item, index) }}
                          />
                          <Button
                            title={this.intl.get('cance')}
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
                    <td>{item.addressName}</td>
                    <td><p>{item.address}</p></td>
                    <td>
                      <Button
                        title={this.intl.get('delete')}
                        theme="danger"
                        onClick={() => { onDelete && onDelete(item) }}
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
