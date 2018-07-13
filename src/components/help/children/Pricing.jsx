import React, { Component } from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";

export default class Pricing extends exchangeViewBase {
  constructor(props) {
    super(props);

    // const {controller} = props
    // controller.setView(this);
    // console.log('jsxconfig',controller.configData)
  }

  componentWillMount() {
    // console.log(this.props.controller);
    // this.props.controller.getPairFees()
  }

  componentDidMount(evt) {
    // console.log(this.props.location.query)
    window.onload = () => {
      let anchor = window.location.hash.split('#')[1]
      let anchorElement = document.getElementById(anchor);
      // console.log(232, anchorElement,  anchorElement.offsetTop)
      anchor && (document.body.scrollTop = document.documentElement.scrollTop = anchorElement.offsetTop)
    }
  }
  render() {
    // const { controller } = this.props;
    // let { nameUsd, netUrl } = controller.configData;
    let { table1, gradeInfo, trade, scoreTable } = this.getPricing();
    return <div className="help-pricing">
      <h2 className="title">{this.intl.get('help-fees')}</h2>
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
      <h2 className="title">{this.intl.get('help-trade-fee')}</h2>
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
      <h2 className="title" id="earn_points">{this.intl.get('help-earn-points')}</h2>
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
  getPricing(nameUsd) {
    return {
      table1: {
        thead: [this.intl.get('help-level'), this.intl.get('help-require-points'), this.intl.get('help-trade-fee'), this.intl.get('help-quick-withdrawal')],
        tbody: [
          {
            grade: `VIP0`,
            score: `0`,
            fee: this.intl.get('help-see-below'),
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
            score: this.intl.get('help-fee-services')
          }
        ]
      },
      gradeInfo: [
        this.intl.get('help-vip-forver'),
        this.intl.get('help-points-accumulation'),
        this.intl.get('help-adjust'),
        this.intl.get('help-usd-withdrawal'),
      ],
      trade: {
        tradeInfo: [
          this.intl.get("help-tradefee-intro1"),
          this.intl.get("help-tradefee-intro2"),
        ],
        tradeTable: {
          thead: [this.intl.get('help-trade-type'), `Maker`, `Taker`],
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
        thead: [this.intl.get('action'), this.intl.get('points'), this.intl.get('explanation')],
        tbody: [
          {
            op: this.intl.get('login'),
            score: `+2`,
            info: this.intl.get('help-per-day')
          },
          {
            op: `BTC ${this.intl.get('Deposit')}`,
            score: `+(${this.intl.get('help-usd-equivalent')}*0.01)`,
            info: this.intl.get('help-rounded-up')
          },
          {
            op: this.intl.get('help-improv'),
            score: `+100`,
            info: this.intl.get('help-idea-accepted')
          },
          {
            op: this.intl.get('help-verification'),
            score: `+500`,
            info: this.intl.get('help-real-name')
          },
          {
            op: this.intl.get('help-email-auth'),
            score: `+100`,
            info: this.intl.get('help-email-verify')
          },
          {
            op: this.intl.get('help-google-auth'),
            score: `+1000`,
            info: this.intl.get('help-google-verify')
          },
          {
            op: this.intl.get('help-phone-bind'),
            score: `+1000`,
            info: this.intl.get('help-phone-award')
          },
          {
            op: this.intl.get('help-chargebtc-first'),
            score: `+2000`,
            info: this.intl.get('help-chargebtc-award')
          }
        ]
      }
    };
  }
}
