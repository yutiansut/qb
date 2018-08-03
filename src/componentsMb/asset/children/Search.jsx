import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../../components/ExchangeViewBase";

export default class Search extends exchangeViewBase {
    constructor(props) {
        super(props);
        let { controller } = props;
        this.state = {
            to: "",
            wallet: [],
            recommendData: [],       //推荐列表
            historyList: [],
            input: "",
        };
        //绑定view
        controller.setView(this);
        controller.marketController.setView(this);

        let {wallet} = controller.initState;
        this.state = Object.assign(this.state, {wallet});

        // 绑定方法
        this.getAssets = controller.getAssets.bind(controller);
        this.filter = controller.filte.bind(controller);
        this.addSearchHistory = controller.addSearchHistory.bind(controller);
        this.getSearchHistory = controller.getSearchHistory.bind(controller);
        this.clearSearchHistory = controller.clearSearchHistory.bind(controller);
        this.getRecommendCoins = controller.marketController.getRecommendCoins.bind(controller.marketController);
        this.addContent = controller.headerController.addContent.bind(controller.headerController) // 获取头部内容
    }

    async componentWillMount() {
        this.addContent({nav: false});
        //路由参数to
        this.state.to = this.props.location.query && this.props.location.query.to || "/wallet";

        await this.getAssets();
        await this.getRecommendCoins();
    }

    render() {
        let {history} = this.props;
        let {recommendData, wallet, input, to} = this.state;
        let historyList = this.getSearchHistory() || [];
        let recommendList = recommendData || [];
        let resultList = this.filter(wallet, input) || [];

        return (
           <div className="search">
               {/*搜索头部*/}
                <div className="header">
                    <img src={this.$imagesMap.$h5_search}/>
                    <input type="text"
                           value={input}
                           placeholder={this.intl.get("h5-asset-search-placeholder")}
                           onInput={e=>this.setState({input: e.target.value})}/>
                    <a onClick={()=>history.goBack()}>{this.intl.get("cance")}</a>
                </div>
               {/*搜索历史*/}
               {!input && historyList.length>0 && (
                   <div className="list1">
                       <h3>
                           {this.intl.get("h5-asset-search-history")}
                           <img src="/static/mobile/asset/icon_delete_green@2x.png" onClick={()=>this.clearSearchHistory()}/>
                       </h3>
                       <p>
                           {historyList.map((item, index) => {
                               return <a key={index} onClick={() => history.push({pathname: to, query: {currency: item}})}>{item}</a>
                           })}
                       </p>
                   </div>)}
               {/*推荐币种*/}
               {!input && recommendList.length>0 &&
                   <div className="list1">
                       <h3>{this.intl.get("h5-asset-recommend-currency")}</h3>
                       <p>
                           {recommendList.map((item,index)=>{
                               return <a key={index} onClick={()=>history.push({pathname:to,query:{currency:item.coinName}})}>{item.coinName}</a>
                           })}
                       </p>
                   </div>}
               {/*搜索结果*/}
               {input && (
                   resultList.length>0 ?
                   <div className="list2">
                       {resultList.map((item, index) => {
                           return (
                               <div className="li" key={index}
                                    onClick={() => {
                                        this.addSearchHistory(item.coinName);
                                        history.push({pathname: to, query: {currency: item.coinName}})
                                    }}>
                                   <label><b>{item.coinName}</b><i>({item.fullName})</i></label>
                                   <span>{item.totalCount}</span>
                               </div>
                           )
                       })}
                   </div>
                   :
                   <div className="empty">
                       <b>{this.intl.get("h5-asset-empty1")}</b>
                       <i>{this.intl.get("h5-asset-empty2")}</i>
                   </div>)}
           </div>
        );
    }
}
