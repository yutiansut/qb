import React, { Component } from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";
function getPricing(nameUsd) {
  return {
    table1: {
      thead: [`用户等级`, `需要积分`, `交易手续费`, `BTC 快速提现`],
      tbody: [
        {
          grade: `VIP0`,
          score: `0`,
          fee: `见下`,
          fast: `0%`
        },
        {
          grade: `VIP1`,
          score: `10000`
        },
        {
          grade: `VIP2`,
          score: `50000`
        },
        {
          grade: `VIP3`,
          score: `100000`
        },
        {
          grade: `VIP4`,
          score: `200000`
        },
        {
          grade: `VIP5`,
          score: `500000`
        },
        {
          grade: `MVIP`,
          score: `付费服务`
        }
      ]
    },
    gradeInfo: [
      `· VIP 等级永久有效`,
      `· 用户积分累积达到相应的积分可以自动成为相应的 VIP`,
      `· ${nameUsd}可能会根据运营需要对 VIP 政策做出调整`,
      `· 美元提现银行另外收取约每笔 $20 手续费`
    ],
    trade: {
      tradeInfo: [
        `所有的交易活动都是在两方之间发生的：Maker 是先挂单的一方，Taker 是下单去匹配已有订单的一方。Maker 创造了市场流动性，Taker 通过匹配 Maker 的订单获取了市场流动性。`,
        `Maker-Taker 模型可以给 Maker 以一定的费率折扣的方式来鼓励增加市场流动性。该模型由于鼓励 Maker 更积极地挂单，它还会直接导致市场买卖双方差价的缩小。Taker 负担了更高的成本以鼓励 Maker 减小买卖差价的行为。`
      ],
      tradeTable: {
        thead: [`交易品种`, `Maker`, `Taker`],
        tbody: [
          {
            var: `ETH / BTC`,
            maker: `0.08%`,
            taker: `0.12%`
          },
          {
            var: `BCH / BTC`,
            maker: `0.08%`,
            taker: `0.12%`
          },
          {
            var: `LSK / BTC`,
            maker: `0.08%`,
            taker: `0.12%`
          },
          {
            var: `LSK / ETH`,
            maker: `0.08%`,
            taker: `0.12%`
          },
          {
            var: `BCH / ETH`,
            maker: `0.08%`,
            taker: `0.12%`
          },
          {
            var: `LSK / USDT`,
            maker: `0.08%`,
            taker: `0.12%`
          },
          {
            var: `BTC / USDT`,
            maker: `0.08%`,
            taker: `0.12%`
          },
          {
            var: `BCH / USDT`,
            maker: `0.08%`,
            taker: `0.12%`
          },
          {
            var: `ETH / USDT`,
            maker: `0.08%`,
            taker: `0.12%`
          }
        ]
      }
    },
    scoreTable: {
      thead: [`操作`, `积分`, `	说明`],
      tbody: [
        {
          op: `登录`,
          score: `+2`,
          info: `每天累加（每天仅限一次）`
        },
        {
          op: `BTC 充值`,
          score: `+(折合美元*0.01)`,
          info: `取整数（四舍五入）`
        },
        {
          op: `网站改进意见采纳`,
          score: `+100`,
          info: `每采纳 1 条送 100 积分哦`
        },
        {
          op: `注册并实名认证`,
          score: `+500`,
          info: `注册加实名即送 500 积分`
        },
        {
          op: `邮箱认证`,
          score: `+100`,
          info: `邮箱认证送 100 积分`
        },
        {
          op: `添加谷歌验证`,
          score: `+1000`,
          info: `绑定谷歌验证送 1000 积分`
        },
        {
          op: `绑定手机`,
          score: `+1000`,
          info: `绑定手机送 1000 积分`
        },
        {
          op: `首次充值 BTC`,
          score: `+2000`,
          info: `首次充值 BTC 送 2000 积分`
        }
      ]
    }
  };
}

export default class Pricing extends exchangeViewBase {
  constructor(props) {
    super(props);
    // const {controller} = props
    // console.log('jsxconfig',controller.configData)
  }

  componentWillMount() {}

  componentDidMount() {}
  render() {
    const { controller } = this.props;
    let { nameUsd, netUrl } = controller.configData;
    let { table1, gradeInfo, trade, scoreTable } = getPricing(nameUsd);
    return <div className="help-pricing">
        <h2 className="title">费率标准</h2>
        <table className="standard">
          <thead>
            <tr>
              {table1.thead.map((v, index) => <th key={index}>{v}</th>)}
            </tr>
          </thead>
          <tbody>
            {table1.tbody.map((v, index) => <tr key={index}>
                <td>{v.grade}</td>
                <td>{v.score}</td>
                {v.fee && <td rowSpan="7">{v.fee}</td>}
                {v.fast && <td rowSpan="7">{v.fast}</td>}
              </tr>)}
          </tbody>
        </table>
        <ul className="gradeInfo">
          {gradeInfo.map((v, index) => <li key={index}>{v}</li>)}
        </ul>
        <h2 className="title">交易手续费</h2>
        <div className="pircing-trade">
          <ul>
            {trade.tradeInfo.map((v, index) => <li key={index}>{v}</li>)}
          </ul>
          <table>
            <thead>
              <tr>
                {trade.tradeTable.thead.map((v, index) => (
                  <th key={index}>{v}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trade.tradeTable.tbody.map((v, index) => <tr key={index}>
                  <td>{v.var}</td>
                  <td>{v.maker}</td>
                  <td>{v.taker}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <h2 className="title">如何增长积分</h2>
        <div className="score-grow">
          <table>
            <thead>
              <tr>
                {scoreTable.thead.map((v, index) => (
                  <th key={index}>{v}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scoreTable.tbody.map((v, index) => <tr key={index}>
                  <td>{v.op}</td>
                  <td>{v.score}</td>
                  <td>{v.info}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>;
  }
}
