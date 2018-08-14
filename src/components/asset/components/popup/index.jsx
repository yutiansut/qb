import React, { Component } from "react";
import exchangeViewBase from "../../../ExchangeViewBase";
import Button from "../../../../common/component/Button";
import Input from "../../../../common/component/Input";
import BasePopup from "../../../../common/component/Popup";
// import "./style.styl";

export default class Popup extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      deleTip: false,
      deleText: this.intl.get('asset-delet-confirm'),
      deleItem: ''
    };
    this.setAddress = props.changeNewAddress
    this.add = async () => {
      let flag;
      this.props.onSave && (flag = await this.props.onSave());
      if (flag) {
        this.setAddress([]);
      }
    }
  }
  componentWillUnmount(){
    this.setAddress([])
  }
  render() {
    let {onClose, addressArr, onDelete } = this.props;
    let newAddress = JSON.parse(JSON.stringify(this.props.newAddress))
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
                  if(newAddress.length){
                    this.props.addTip()
                    return;
                  }
                  newAddress.push({ addressName: "", address: "" });
                  this.setState({
                    showInput: true,
                  })
                  this.setAddress(newAddress);
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
                  newAddress.map((item, index) => {
                    return (
                      <tr className="input" key={index}>
                        <td>
                          <Input
                            type="text"
                            value={item.name}
                            placeholder={this.intl.get('asset-inputName')}
                            onInput={value => {
                              item.addressName = value;
                              this.setAddress(newAddress);
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
                              this.setAddress(newAddress);
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
                              this.setAddress([]);
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
                        onClick={() => { this.setState({deleTip: true, deleItem: item}) }}
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
    return <div className="asset-popup">
        {this.popup[this.props.type]()}
        {/*确认弹窗  */}
        {this.state.deleTip && (
          <BasePopup
            type="confirm"
            msg={this.state.deleText}
            onClose={() => {
              this.setState({ deleTip: false });
            }}
            onConfirm={async () => {
              onDelete && await onDelete(this.state.deleItem)
              this.setState({ deleTip: false });
            }}
            onCancel={()=>{
              this.setState({ deleTip: false });
            }}
          />
        )}
    </div>;
  }
}
