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

  componentDidMount() { }
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
      <h2 className="title">{this.intl.get('help-earn-points')}</h2>
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
          tbody: [{ "tradePairId": 1, "tradePairName": "lsk/btc", "marketName": "btc", "icon": "http://www.cointalks.com/res/lsk.png", "isRecommend": true, "isNewBorn": false }, { "tradePairId": 2, "tradePairName": "bch/btc", "marketName": "btc", "icon": "http://www.cointalks.com/res/bch.png", "isRecommend": false, "isNewBorn": false }, { "tradePairId": 3, "tradePairName": "eth/btc", "marketName": "btc", "icon": "http://www.cointalks.com/res/eth.png", "isRecommend": false, "isNewBorn": false }, { "tradePairId": 6, "tradePairName": "ltc/btc", "marketName": "btc", "icon": "http://www.cointalks.com/res/ltc.png", "isRecommend": false, "isNewBorn": false }, { "tradePairId": 7, "tradePairName": "omg/btc", "marketName": "btc", "icon": "http://www.cointalks.com/res/omg.png", "isRecommend": false, "isNewBorn": false }, { "tradePairId": 32, "tradePairName": "lsk/eth", "marketName": "eth", "icon": "http://www.cointalks.com/res/lsk.png", "isRecommend": false, "isNewBorn": false }, { "tradePairId": 33, "tradePairName": "bch/eth", "marketName": "eth", "icon": "http://www.cointalks.com/res/bch.png", "isRecommend": false, "isNewBorn": false }, { "tradePairId": 34, "tradePairName": "lsk/usdt", "marketName": "usdt", "icon": "http://www.cointalks.com/res/lsk.png", "isRecommend": false, "isNewBorn": false }, { "tradePairId": 35, "tradePairName": "btc/usdt", "marketName": "usdt", "icon": "http://www.cointalks.com/res/btc.png", "isRecommend": false, "isNewBorn": false }, { "tradePairId": 36, "tradePairName": "bch/usdt", "marketName": "usdt", "icon": "http://www.cointalks.com/res/bch.png", "isRecommend": false, "isNewBorn": false }, { "tradePairId": 37, "tradePairName": "eth/usdt", "marketName": "usdt", "icon": "http://www.cointalks.com/res/eth.png", "isRecommend": false, "isNewBorn": false }, { "tradePairId": 41, "tradePairName": "ltc/usdt", "marketName": "usdt", "icon": "http://www.cointalks.com/res/ltc.png", "isRecommend": false, "isNewBorn": false }, { "tradePairId": 42, "tradePairName": "dash/usdt", "marketName": "usdt", "icon": "http://www.cointalks.com/res/dash.png", "isRecommend": false, "isNewBorn": false }, { "tradePairId": 43, "tradePairName": "zec/usdt", "marketName": "usdt", "icon": "http://www.cointalks.com/res/zec.png", "isRecommend": false, "isNewBorn": false }, { "tradePairId": 44, "tradePairName": "dash/btc", "marketName": "btc", "icon": "http://www.cointalks.com/res/dash.png", "isRecommend": true, "isNewBorn": false }, { "tradePairId": 45, "tradePairName": "zec/btc", "marketName": "btc", "icon": "http://www.cointalks.com/res/zec.png", "isRecommend": false, "isNewBorn": false }, { "tradePairId": 46, "tradePairName": "omg/eth", "marketName": "eth", "icon": "http://www.cointalks.com/res/omg.png", "isRecommend": false, "isNewBorn": false }, { "tradePairId": 47, "tradePairName": "zec/eth", "marketName": "eth", "icon": "http://www.cointalks.com/res/zec.png", "isRecommend": false, "isNewBorn": false }].map(v => {
            return {
              var: v.tradePairName.toUpperCase(),
              maker: `0.08%`,
              taker: `0.12%`
            }
          })
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
