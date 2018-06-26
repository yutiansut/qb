import React, { Component } from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";
import Input from "../../../common/component/Input";
import Button from "../../../common/component/Button";

export default class CoinData extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
      currency: "BTC",
      unit: 0,
      value: "",
      walletList: []
    };
    this.show = () => {
      this.setState({ showSearch: true });
    };
    this.hide = () => {
      this.setState({ showSearch: false });
    };
    this.setValue = value => {
      this.setState({ value });
    };
    this.setCurrency = currency => {
      this.setState({ currency });
    };
    this.search = () => {
      let value = this.state.value !== '' && this.searchArr[0] || "BTC";
      this.setValue(value);
      this.setCurrency(value);
      this.hide();
    }
  }
  async componentWillMount() {
    this.setState({
      walletList: await this.props.controller.assetController.walletList()
    });
  }
  render() {
    let { controller } = this.props;
    this.searchArr = controller.filter(
      this.state.walletList,
      this.state.value.toUpperCase()
    );
    return (
      <div className="help-coin">
        <h2 className="title">
          币币交易> 币种资料> <a>{this.state.currency}</a>
        </h2>
        <div className="search clearfix">
          <div className="input">
            <Input
              type="search2"
              placeholder="搜索币种（按首字母排列）"
              value={this.state.value}
              onInput={value => {
                this.setValue(value);
              }}
              onFocus={this.show}
              onEnter={this.search}
              clickOutSide={this.search}
            >
              {this.state.showSearch &&
                this.searchArr.length ? (
                  <ul className="search-list">
                    {this.searchArr.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          this.setValue(item);
                          this.setCurrency(item);
                          this.hide();
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : ''}
            </Input>
          </div>
          <button
            className={`${!this.state.unit && "active"}`}
            onClick={() => {
              this.setState({ unit: 0 });
            }}
          >
            $
          </button>
          <button
            className={`${this.state.unit && "active"}`}
            onClick={() => {
              this.setState({ unit: 1 });
            }}
          >
            ¥
          </button>
        </div>
        <div className="content">
          <img src="" alt="" />
          <div className="info clearfix">
            <div className="left">
              <p>BTC(Bitcoin)</p>
              <p>$66665.020</p>
              <a>去充值</a>
            </div>
            <div className="right">
              <p>
                <span>市值：$21000000</span>
                <span>发行总量：21000000</span>
                <span>流通量：21,000,000</span>
              </p>
              <p>
                <span>发行价格：$21000000</span>
                <span>发行日期：2009-01-09</span>
              </p>
              <p>
                <span>去交易：</span>
                <a>BTC/USDT</a>
                <a>BTC/ETH</a>
              </p>
            </div>
          </div>
          <div className="detail">
            <p>
              介绍:<br />
              比特币是目前使用最为广泛的一种数字货币。它诞生于2009年1月3日，是一种点对点（P2P）传输的数字加密货币，总量2100万枚。比特币网络每10分钟释放出一定数量币，预计在2140年达到极限。比特币涨幅曾接近460万倍，被投资者称为“数字黄金”。截止目前比特币总市值突破3748亿人民币。比特币因去中心化、全球流通、低交易费用
              、匿名流通等特点，备受科技爱好者青睐。近来华尔街、多国央行等传统金融机构开始研究比特币区块链技术，中国人民银行也公布研发数字货币的计划。日本政府正式承认比特币为法定支付方式，越来越多的日本商家接受了比特币支付。
            </p>
            <div className="button">
              <Button type="base" title="官网" href="#" target={true} />
              <Button type="base" title="区块浏览器" href="#" target={true} />
              <Button type="base" title="白皮书" href="#" target={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
