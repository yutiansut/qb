import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../../components/ExchangeViewBase";
import Popup from "../../../common/component/Popup";
import TwoVerify from "../../viewsPopup/TwoVerifyPopupH5";

export default class Address extends exchangeViewBase {
  constructor(props) {
    super(props);
    let { controller } = props;
    console.log(controller)
    this.state = {
      currency: "",
      walletExtract: {},
      mode:{
        1: 1,
        2: 2,
        3: 0
      },
      inputAddrName: "",
      inputAddr: "",

      showPopup: false,
      popMsg: "",
      popType: "",

      showForm: false, //添加地址表单隐藏
      showTwoVerify: false,
      verifyType: 1,
      googleCode: ["", "", "", "", "", ""],
      verifyNum: this.intl.get("sendCode"),
      firstVerify: 2//1邮件 2谷歌 3短信
      // this.state.firstVerify: 1 //1邮件 2谷歌 3短信
    };
    //绑定view
    controller.setView(this);

    // 添加提币地址
    this.appendAddressH5 = controller.appendAddressH5.bind(controller);
    // 删除提币地址
    this.deletAddressH5 = controller.deletAddressH5.bind(controller);
    // 获取提笔地址
    this.getExtract = controller.getExtract.bind(controller);

    this.addContent = controller.headerController.addContent.bind(
      controller.headerController
    ); // 获取头部内容
    this.getWalletList = controller.getWalletList.bind(controller);

    this.dealInput = controller.dealInput.bind(controller);
    this.delNum = controller.delNum.bind(controller);
    this.getVerify = controller.getVerify.bind(controller); //获取验证码
    this.clearVerify = controller.clearVerify.bind(controller);
    this.getUserInfo = controller.getUserInfo.bind(controller);

    this.copy = el => {
      if (controller.copy(el)) {
        this.setState({
          showPopup: true,
          popMsg: this.intl.get("asset-copySuccess"),
          popType: "tip1"
        });
      } else {
        this.setState({
          showPopup: true,
          popMsg: this.intl.get("asset-copyFail"),
          popType: "tip3"
        });
      }
    };
  }

  async componentDidMount() {
    await this.getWalletList();
    // 获取路由参数
    let currency =
    this.props.controller.getQuery("currency").toUpperCase() || "";
    this.addContent({ con: currency + " " + this.intl.get("notice-addr") });
    this.setState({ currency: currency });

    await this.getExtract();
    await this.getUserInfo()
  }

  render() {
    let { history } = this.props;
    let {
      currency,
      showPopup,
      popMsg,
      popType,
      inputAddrName,
      inputAddr,
      showForm,
      verifyNum
    } = this.state;

    //地址列表
    //let walletExtract = {extractAddr: [{coinId: 9, coinName: "ltc", minCount: 0.1, addressList: []}], minerFee: 0.0005}
    //let addressList = [{addressId:0, addressName:"xx", address:"xxx"}]
    let { extractAddr } = this.state.walletExtract;
    let { addressList } =
      (extractAddr &&
        extractAddr.filter(
          item => item.coinName.toLowerCase() === currency.toLowerCase()
        )[0]) ||
      {};
    !addressList && (addressList = []);

    //是否能提交
    let canSubmit = inputAddr && inputAddrName;

    return (
      <div className="address">
        {/*添加地址表单*/}
        {showForm && (
          <div className="form">
            <p className="p1">
              <label>{this.intl.get("asset-address-name")}</label>
              <input
                type="text"
                placeholder=""
                value={inputAddrName}
                onInput={e => {
                  this.setState({ inputAddrName: e.target.value });
                }}
              />
            </p>
            <p className="p2">
              <label>{this.intl.get("address")}</label>
              <textarea
                rows="2"
                value={inputAddr}
                onInput={e => {
                  this.setState({ inputAddr: e.target.value });
                }}
              />
            </p>
          </div>
        )}

        {/*地址列表*/}
        {addressList.map((item, index) => {
          return (
            <div className="li" key={index}>
              <h3>
                <label>{item.addressName || "-"}</label>
                <a onClick={() => this.copy(this.refs["text"])}>
                  {this.intl.get("h5-asset-copy-addr")}
                </a>
                <img
                  src="/static/mobile/asset/icon_delete_green@2x.png"
                  onClick={() => {
                    this.deletAddressH5({
                      coinName: currency,
                      addressId: item.addressId,
                      addressName: item.addressName,
                      address: item.address
                    });
                  }}
                />
              </h3>
              {/*<textarea readOnly="true" ref={`addr_${index}`}>{item.address || "-"}</textarea>*/}
              <textarea
                readOnly="true"
                ref="text"
                onClick={()=>{
                   history.push({pathname: `/wallet/withdraw/?currency=${currency.toLowerCase()}`, query:{address: item}})
                }}
                value={`${item.address} `}
              />
            </div>
          );
        })}

        {/*空列表*/}
        {addressList.length <= 0 && (
          <div className="empty">
            <b>{this.intl.get("h5-asset-empty5")}</b>
            <span>{this.intl.get("h5-asset-empty6")}</span>
          </div>
        )}

        {/*添加地址*/}
        <div className="submit">
          {!showForm ? (
            <button onClick={() => this.setState({ showForm: true })}>
              {this.intl.get("asset-addAddress")}
            </button>
          ) : (
            <button
              className={canSubmit ? "" : "disable"}
              onClick={() => {
                // 验证地址是否存在
                let flag = false, obj = {
                    coinName: currency,
                    addressName: inputAddrName,
                    address: inputAddr
                  };
                addressList && addressList.forEach(v => {
                    v.address === obj.address && (flag = 713);
                    v.addressName === obj.addressName && (flag = "asset-name-existing");
                });
                if (flag) {
                    this.setState({
                      showPopup: true,
                      popMsg: this.intl.get(flag),
                      popType: "tip3"
                    });
                  return false;
                }
                this.setState({
                  showTwoVerify:true,
                  verifyNum: this.intl.get("sendCode")
                })
              }}
            >
              {this.intl.get("save")}
            </button>
          )}
        </div>

        {/*提示框*/}
        {showPopup && (
          <Popup
            type={popType}
            msg={popMsg}
            useType={popType === "tip1" ? true : false}
            h5={true}
            onClose={() => this.setState({ showPopup: false })}
            autoClose={true}
          />
        )}
        {this.state.showTwoVerify && <TwoVerify
            googleCode={this.state.googleCode}
            dealInput={this.dealInput}
            delNum={this.delNum}
            type={this.state.firstVerify - 1}
            destroy={this.clearVerify}
            verifyNum={
              verifyNum
                ? verifyNum === this.intl.get("sendCode")
                  ? verifyNum
                  : verifyNum + "s"
                : this.intl.get("sendCode")
            }
            onSend={() => {
              this.getVerify();
            }}
            onClose={() => {
              this.setState({ showTwoVerify: false });
            }}
            onConfirm={code => {
              let obj = {
                    coinName: currency,
                    addressName: inputAddrName,
                    address: inputAddr,
                    code: code,
                    account: '',
                    mode: 2,
                    os: 4
                  };
                  let type = this.state.firstVerify;
                  (type === 1 || type === 3) && (obj.account = this.props.controller.account[type]);
                  obj.mode = this.state.mode[type];
              this.appendAddressH5(
                  obj,
                  addressList
                );
            }}
          />
        }
      </div>
    );
  }
}
