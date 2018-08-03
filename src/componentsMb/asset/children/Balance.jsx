import React, { Component } from 'react';
import exchangeViewBase from "../../../components/ExchangeViewBase";
import {
    NavLink,
} from "react-router-dom";

export default class Balance extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.name = "balance";
    this.state = {
        totalAsset: {},
        wallet: [],
        hideLittle: false,
        showAsset: true,
        sort: 0,  // 0-总资产降序,1-总资产升序,2-无序
    };
    let { controller } = props;
    //绑定view
    controller.setView(this);
    let { totalAsset, wallet } = controller.initState;
    this.state = Object.assign(this.state, { totalAsset, wallet });
    //绑定方法
    this.getAssets = controller.getAssets.bind(controller);
    this.filter = controller.filte.bind(controller);
    this.rank = controller.rank.bind(controller);
    // 获取Qbt
    this.getQbt = controller.getMyQbt.bind(controller);
    //头部
    this.addContent = controller.headerController.addContent.bind(controller.headerController) // 获取头部内容
  }

  async componentDidMount() {
      this.addContent({con: this.intl.get("header-assets2"), search: true, selectFn: () => {

          }
      });

      await this.getAssets();
      if (this.props.controller.configData.activityState) {
          let qbt = await this.getQbt();
          if (qbt && this.state.wallet) {
              this.state.wallet.unshift(qbt);
              this.setState({wallet: this.state.wallet})
          }
      }
  }

  render() {
    let {controller,history} = this.props;
    let lang = controller.configData.language;
    let {totalAsset, wallet, hideLittle, showAsset, sort} = this.state;
    let result = this.filter(wallet, "", hideLittle, null);
    result = this.rank(result, {totalCount:sort});

    return (
      <div className="balance">
        {/*总资产*/}
        <div className="total-asset">
            {/*总资产约(btc)*/}
            <div className="dv1">
                <label>{this.intl.get("asset-totalAssets")}(BTC):</label>
                <img src={showAsset ? "/static/mobile/asset/icon_show@2x.png" : "/static/mobile/asset/icon_hidden@2x.png"}
                    onClick={()=>this.setState({showAsset:!showAsset})}/>
            </div>
            <div className="dv2">
                <b>{showAsset && Number(totalAsset.valuationBTC).format({ number: "property" , style:{ decimalLength: 8}}) || "******"}</b>
                <i>≈{showAsset && (lang === "zh-CN" ?
                      `${Number(totalAsset.valuationCN).format({ number: "legal" })} ¥` :
                      `${Number(totalAsset.valuationEN).format({ number: "legal" })} $`) || "******"}</i>
            </div>
            <div className="dv3">
              {/*24h提币额度*/}
              <p className="p1">
                  <label>{this.intl.get("asset-24hQuota")}:</label>
                  <i>{totalAsset.totalQuota} BTC</i>
              </p>
              {/*可用额度*/}
              <p className="p2">
                  <label>{this.intl.get("asset-usedAsset")}:</label>
                  <i>{Number(totalAsset.usedQuota)} BTC</i>
              </p>
              {/*提币申请*/}
              {totalAsset.totalQuota === 10 ?
                  <a className="disable">{this.intl.get("asset-limitApply")}</a> :
                  <NavLink to="/user/identity">{this.intl.get("asset-limitApply")}</NavLink>}
            </div>
        </div>
        {/*充提菜单*/}
        <ul className="menu-ul">
          <li><NavLink to="/wallet/charge"><img src="/static/mobile/asset/icon_zc_cb@2x.png"/>{this.intl.get("asset-charge")}</NavLink></li>
          <li><NavLink to=""><img src="/static/mobile/asset/icon_zc_tb@2x.png"/>{this.intl.get("asset-withdraw")}</NavLink></li>
        </ul>
        {/*钱包列表*/}
        <div className="asset-wallet">
            {/*隐藏小额资产*/}
            <div className="filter">
                <a className="f1" onClick={()=>this.setState({hideLittle:!hideLittle})}>
                    <img src={hideLittle ? "/static/mobile/asset/icon_zc_yincang@2x.png" : "/static/mobile/asset/icon_zc_xianshi@2x.png"}/>
                    <i>{this.intl.get("asset-hideLittle")}</i>
                </a>
                <a className="f2" onClick={()=>this.setState({sort:++sort%2})}>
                    <i>总资产</i>
                    <img src={["/static/web/home/rank_down.svg","/static/web/home/rank_up.svg"][sort]}/>
                </a>
            </div>
            {/*列表数据显示*/}
            {result && result.map((item, index) => {
                return item.coinName.toUpperCase() !== 'QBT' ?
                    /*普通币种*/
                    <div className="wallet-li" key={index} onClick={()=>history.push({pathname: `/wallet/detail/`, query: {currency: item.coinName}})}>
                        <label>{item.coinName.toUpperCase()}<i>({item.fullName})</i></label>
                        <span>{Number(item.totalCount).format({number: "property", style: {decimalLength: 8}})}</span>
                    </div>
                    :
                    /*QBT*/
                    <div className="wallet-li" key={index}>
                        <label>{item.coinName.toUpperCase()}<i>({item.fullName})</i></label>
                        <span>{Number(item.availableCount).format({number: "property", style: {decimalLength: 8}})}</span>
                    </div>
            })}
        </div>
    </div>)
  }
}