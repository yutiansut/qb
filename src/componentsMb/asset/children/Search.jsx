import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../../components/ExchangeViewBase";

export default class Charge extends exchangeViewBase {
    constructor(props) {
        super(props);
        let { controller } = props;
        this.state = {
            to: "",
            walletList: [],            //钱包列表
            recommendList: [],       //推荐列表
            historyList: [],        //搜索历史
        };
        //绑定view
        controller.setView(this);

        let {walletList} = controller.initState;
        this.state = Object.assign(this.state, {walletList});

        // 绑定方法
        this.getWalletList = controller.getWalletList.bind(controller);
        this.addContent = controller.headerController.addContent.bind(controller.headerController) // 获取头部内容
    }

    async componentWillMount() {
        this.addContent({nav: false});
        //路由参数to
        this.state.to = this.props.location.query && this.props.location.query.to || "/wallet";
        await this.getWalletList();
    }


    render() {
        let {history} = this.props;
        let {historyList,recommendList,walletList} = this.state;

        return (
           <div className="search">
               {/*搜索头部*/}
                <div className="header">
                    <img src={this.$imagesMap.$h5_search}/>
                    <input type="text"/>
                    <a onClick={()=>history.goBack()}>{this.intl.get("cance")}</a>
                </div>
               {/*搜索历史*/}
               <div className="his">
                   <h3>
                       {this.intl.get("h5-asset-search-history")}
                        <img src="/static/mobile/asset/icon_delete_green@2x.png"/>
                   </h3>
                   {historyList && historyList.map((item,index)=>{
                       return
                   })}
               </div>

           </div>
        );
    }
}
