import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../../components/ExchangeViewBase";
import Popup from '../../../common/component/Popup'

export default class Address extends exchangeViewBase {
    constructor(props) {
        super(props);
        let { controller } = props;
        this.state = {
            currency: "",
            walletExtract: {},

            inputAddrName: "",
            inputAddr: "",

            showPopup: false,
            popMsg: "",
            popType: "",

            showForm: false,    //添加地址表单隐藏
        };
        //绑定view
        controller.setView(this);

        // 添加提币地址
        this.appendAddressH5 = controller.appendAddressH5.bind(controller);
        // 删除提币地址
        this.deletAddressH5 = controller.deletAddressH5.bind(controller);
        // 获取提笔地址
        this.getExtract = controller.getExtract.bind(controller);

        this.addContent = controller.headerController.addContent.bind(controller.headerController) // 获取头部内容

        this.copy = el => {
            if(controller.copy(el)){
                this.setState({showPopup:true,popMsg:this.intl.get("asset-copySuccess"),popType:"tip1"})
            }else{
                this.setState({showPopup:true,popMsg:this.intl.get("asset-copyFail"),popType:"tip3"})
            }
        };
    }

    async componentDidMount() {

        // 获取路由参数
        let currency = this.props.controller.getQuery("currency").toUpperCase() || "";
        this.addContent({con: currency + this.intl.get("notice-addr")});
        this.setState({currency: currency});

        await this.getExtract();
    }

    render() {
        let {history} = this.props;
        let {
            currency,
            showPopup,
            popMsg,
            popType,
            inputAddrName,
            inputAddr,
            showForm} = this.state;

        //地址列表
        //let walletExtract = {extractAddr: [{coinId: 9, coinName: "ltc", minCount: 0.1, addressList: []}], minerFee: 0.0005}
        //let addressList = [{addressId:0, addressName:"xx", address:"xxx"}]
        let {extractAddr} = this.state.walletExtract;
        let {addressList} = extractAddr && extractAddr.filter(item => item.coinName.toLowerCase() === currency.toLowerCase())[0] || {};
        !addressList && (addressList = []);

        //是否能提交
        let canSubmit = inputAddr && inputAddrName;

        return (
            <div className="address">
                {/*添加地址表单*/}
                {showForm &&
                    <div className="form">
                      <p className="p1">
                          <label>地址名称</label>
                          <input type="text" placeholder=""
                                 value={inputAddrName}
                                 onInput={e=>{
                                     this.setState({inputAddrName: e.target.value})
                                 }}/>
                      </p>
                      <p className="p2">
                          <label>地址</label>
                          <textarea rows="2"
                                value={inputAddr}
                                onInput={e=>{
                                    this.setState({inputAddr: e.target.value});
                                }}/>
                      </p>
                    </div>}

                {/*地址列表*/}
                {addressList.map((item,index) => {
                    return (
                        <div className="li">
                            <h3>
                                <label>{item.addressName || "-"}</label>
                                <a onClick={()=>this.copy(this.ref[`addr_${index}`])}>{this.intl.get("h5-asset-copy-addr")}</a>
                                <img src="/static/mobile/asset/icon_delete_green@2x.png"
                                     onClick={()=>{
                                         this.deletAddressH5({
                                             coinName: currency,
                                             addressId: item.addressId,
                                             addressName: item.addressName,
                                             address: item.address
                                         });
                                     }}/>
                            </h3>
                            <textarea readOnly="true" ref={`addr_${index}`}>{item.address || "-"}</textarea>
                        </div>
                    )})}

                {/*空列表*/}
                {addressList.length<=0 &&
                    <div className="empty">
                        <b>{this.intl.get("h5-asset-empty5")}</b>
                        <span>{this.intl.get("h5-asset-empty6")}</span>
                    </div>}

                {/*添加地址*/}
                <div className="submit">
                    {!showForm ?
                        <button onClick={()=> this.setState({showForm: true})}>{this.intl.get("asset-addAddress")}</button>
                            :
                        <button className={canSubmit ? "":"disable"}
                                onClick={()=> {
                                    this.appendAddressH5({
                                        coinName: currency,
                                        addressName, inputAddrName,
                                        address: inputAddr,
                                    }, addressList);
                                }}>{this.intl.get("save")}</button>}
                </div>

                {/*提示框*/}
                {showPopup &&
                    <Popup
                        type={popType}
                        msg={popMsg}
                        h5={true}
                        onClose={() => this.setState({ showPopup: false})}
                        autoClose = {true}/>}
            </div>
        );
    }
}
