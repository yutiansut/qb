import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../../components/ExchangeViewBase";

export default class Select extends exchangeViewBase {
    constructor(props) {
        super(props);
        let { controller } = props;
        this.state = {
            to: "",
            wallet: [],
            selectIndex: -1,
        };
        //绑定view
        controller.setView(this);

        let {wallet} = controller.initState;
        this.state = Object.assign(this.state, {wallet});
        // 绑定方法
        this.getAssets = controller.getAssets.bind(controller);
        this.addContent = controller.headerController.addContent.bind(controller.headerController) // 获取头部内容
    }

    async componentDidMount() {
        //头部
        this.addContent({
            con: this.intl.get("asset-selectCoin"),
            search: true,
            selectFn: () => this.props.history.push(`/wallet/search?to=${to}`)
        });
        //路由参数to
        let to = this.props.controller.getQuery("to") || "/wallet";
        let currency = this.props.controller.getQuery("currency") || "";
        console.error(to);
        await this.getAssets();
        this.setState({to: to, currency: currency});
    }

    render() {
        let {history} = this.props;
        let {wallet, selectIndex, to, currency} = this.state;
        return (
            <div className="select">
                {/*钱包列表*/}
                {wallet && wallet.map((item, index) => {
                    return (
                        <div className="li" key={index} onClick={() =>{
                          this.setState({selectIndex: index});
                          // history.push({
                          //   pathname:`${to}?currency=${item.coinName}`,
                          //
                          // });
                          history.push(`${to}?currency=${item.coinName}`);

                        }
                        }>
                            <span>{item.coinName.toUpperCase()}</span>
                            {currency === item.coinName.toUpperCase() &&
                                <img src="/static/mobile/asset/icon_select_green@3x.png"/>}
                        </div>
                    )
                })}
            </div>
        );
    }
}
