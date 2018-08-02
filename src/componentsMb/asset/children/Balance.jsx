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
        hideZero: false,
        showAsset: true,
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
  }

  async componentDidMount() {
    await this.getAssets();
    if (this.props.controller.configData.activityState) {
      let qbt = await this.getQbt();
      if (qbt && this.state.wallet) {
        this.state.wallet.unshift(qbt);
        this.setState({ wallet: this.state.wallet })
      }
    }
  }

  render() {
    let {controller } = this.props;
    let {totalAsset, wallet, hideZero, showAsset} = this.state;
    let result = this.filter(wallet, "", null, hideZero);
    let lang = controller.configData.language;
    return (
      <div className="balance">
        {/*总资产*/}
        <div className="total-asset">
            <div className="total">
                <div className="dv1">
                    <label>{this.intl.get("asset-totalAssets")}(BTC):</label>
                    <img src={showAsset ? "/static/mobile/asset/icon_show@2x.png" : "/static/mobile/asset/icon_hidden@2x.png"}/>
                </div>
                <div className="dv2">
                    <b>{showAsset && Number(totalAsset.valuationBTC).format({ number: "property" , style:{ decimalLength: 8}}) || "******"}</b>
                    <i>≈{showAsset && (lang === "zh-CN" ?
                          `${Number(totalAsset.valuationCN).format({ number: "legal" })} CNY` :
                          `${Number(totalAsset.valuationEN).format({ number: "legal" })} USD`) || "******"}</i>
                </div>
                <div className="dv3">
                  <p><label>24h提币额度：</label><i>267 BTC</i></p>
                  <p><label>24h提币额度：</label><i>134 BTC</i></p>
                  <NavLink to="">提额申请 &gt;</NavLink>
                </div>
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
                <img src={hideZero ? "/static/mobile/asset/icon_zc_yincang" : "/static/mobile/asset/icon_zc_xianshi"}/>
                <span>{this.intl.get("asset-hideZero")}</span>
                <a className="sort">总资产</a>
            </div>
            {/*列表数据显示*/}
            {result && result.map((item, index) => {
                return item.coinName.toUpperCase() !== 'QBT' ?
                    (<div className="wallet-li"  key={index}>
                        <div className="d1">
                            <label><img src={item.coinIcon}/>{item.coinName.toUpperCase()}</label>
                            <NavLink to={{pathname: `/wallet/detail/`, query: { currency: item.coinName }}}>{this.intl.get("asset-detail")} ></NavLink>
                        </div>
                        <div className="d2">
                            <p>
                                <span>{this.intl.get("asset-avail")}</span><i>{Number(item.availableCount).format({ number: "property" , style:{ decimalLength: 8}})}</i>
                            </p>
                            <p>
                                <span>{this.intl.get("asset-lock")}</span>
                                <i>{Number(item.frozenCount).format({ number: "property" , style:{ decimalLength: 8}})}</i>
                            </p>
                        </div>
                    </div>) : (<div className="wallet-li" key={index}>
                        <div className="d1">
                            <label>{item.coinName.toUpperCase()}</label>
                        </div>
                        <div className="d2">
                            <p>
                                <span>{this.intl.get("asset-avail")}</span><i>{Number(item.availableCount).format({ number: "property" , style:{ decimalLength: 8}})}</i>
                            </p>
                            <p>
                                <span>{this.intl.get("asset-lock")}</span>
                                <i>—</i>
                            </p>
                        </div>
                    </div>)
            })}
        </div>
    </div>)
  }
}