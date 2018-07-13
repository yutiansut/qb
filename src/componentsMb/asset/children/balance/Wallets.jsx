import React, { Component } from "react";
import exchangeViewBase from "../../../ExchangeViewBase";
import { NavLink } from "react-router-dom";

export default class Wallets extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      hideZero: false,
    };

    let { controller } = this.props;
    this.filter = controller.filte.bind(controller);
  }

  render() {
    let {wallet, controller} = this.props;
    let {hideZero} = this.state;
    let result = this.filter(wallet, "", null, hideZero);

    return <div className="asset-wallet">
        <div className="filter">
          <img src="/static/mobile/icon_zc_yclyezc@2x.png"/>
          <span>隐藏0余额资产</span>
          <span className={this.state.hideZero ? "toggle-btn active" : "toggle-btn"}
                 onClick={()=>{
                   this.setState({hideZero:!this.state.hideZero});
                 }}>
              <i/></span>
        </div>
        {result && result.map((item, index) => {
            return <div className="wallet-li"  key={index}>
                <div className="d1">
                    <label><img src={item.coinIcon}/>{item.coinName.toUpperCase()}</label>
                    <NavLink to={{pathname: `/mwallet/detail/`, query: { currency: item.coinName }}}>资产详情 ></NavLink>
                </div>
                <div className="d2">
                    <p>
                        <span>可用</span><i>{Number(item.availableCount).format({number: "property" })}</i>
                    </p>
                    <p>
                        <span>冻结</span>
                        <i>{Number(item.frozenCount).format({number: "property" })}</i>
                    </p>
                </div>
            </div>
        })}
      </div>;
  }
}
