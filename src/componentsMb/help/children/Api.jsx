import React, { Component } from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";

export default class Api extends exchangeViewBase {
  constructor(props) {
    super(props);
    // const {controller} = props
    // console.log('jsxconfig',controller.configData)
  }

  componentWillMount() {}

  componentDidMount() {}
  render() {
    const { controller } = this.props;
    let { netUrl } = controller.configData;
    const { summarize, apiList, tableList } = this.getContent(netUrl);
    return <div className="help-api">
        <h2 className="title">{this.intl.get("help-api-title")} v1</h2>
        <div className="summarize">
          <h3>{summarize.title}</h3>
          <div className="content">
            <ol>
              {summarize.content.map((v, index) => (v.code ? <li key={index}>
                      {v.title}
                      {v.code && <pre>
                          <code>{v.code}</code>
                        </pre>}
                    </li> : <li key={index} dangerouslySetInnerHTML={{ __html: v.title }} />))}
            </ol>
            <p>{summarize.remark}</p>
          </div>
        </div>
        <h3>{tableList.title}</h3>
        <div className="api-list">
          <div className="content">
            <table>
              <thead>
                <tr>
                  {tableList.table.thead.map((v, index) => (
                    <th key={index}>{v}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableList.table.tbody.map((v, index) => <tr key={index}>
                    <td>
                      <span>{v.api}</span>
                    </td>
                    <td>{v.verify}</td>
                    <td>{v.function}</td>
                  </tr>)}
              </tbody>
            </table>
            {apiList.map((v, index) => <div key={index}>
                <h5>
                  <span>{v.title}</span>
                </h5>
                <ol>
                  {v.content.map((v, index) => <li key={index}>
                      {v.title}
                      {v.code && <pre>
                          <code>{v.code}</code>
                        </pre>}
                    </li>)}
                </ol>
              </div>)}
          </div>
        </div>
      </div>;
  }
  getContent(netUrl) {
    return {
      summarize: {
        title: this.intl.get('help-api-overview'),
        content: [
          {
            title: this.intl.get('help-api-overview-1'),
          },
          {
            title: this.intl.get('help-api-overview-2'),
          },
          {
            title: this.intl.get('help-api-overview-3'),
          },
          {
            title: this.intl.get('help-api-overview-4'),
          },
          {
            title: this.intl.get('help-api-overview-5'),
            code: `{'status': xxx, 'message': 'xxx', 'result': xxx}`
          }
        ],
        remark: this.intl.get('help-api-overview-error'),
      },
      tableList: {
        title: this.intl.get('help-api-list'),
        table: {
          thead: [`API`, this.intl.get('help-api-list-auth'), this.intl.get('help-api-list-func')],
          tbody: [
            {
              api: `/ticker/`,
              verify: `-`,
              function: this.intl.get('help-api-list-1')
            },
            {
              api: `/trades/`,
              verify: `-`,
              function: this.intl.get('help-api-list-2')
            },
            {
              api: `/depth/`,
              verify: `-`,
              function: this.intl.get('help-api-list-3')
            }
          ]
        }
      },
      apiList: [
        {
          title: `/ticker/`,
          content: [
            { title: `1.${this.intl.get('help-api-list-1')}` },
            { title: this.intl.get('help-api-list-1-2') },
            {
              title: `market: ${this.intl.get('help-api-list-1-2-1')}eth_btc, bch_btc, lsk_btc, lsk_eth, bch_eth, lsk_usdt, btc_usdt, bch_usdt, eth_usdt`
            },
            {
              title: this.intl.get('help-api-list-1-3'),
              code: `{
  "status": 200,
  "message": "ok",
  "result": {
    "last": "600",
    "sell": "610.77",
    "buy": "590",
    "high": "650",
    "low": "550",
    "vol": "9",
  }
}`
            }
          ]
        },
        {
          title: `/trades/`,
          content: [
            { title: this.intl.get('help-api-list-2') },
            { title: this.intl.get('help-api-list-1-2') },
            {
              title: `market: ${this.intl.get('help-api-list-1-2-1')}eth_btc, bch_btc, lsk_btc, lsk_eth, bch_eth, lsk_usdt, btc_usdt, bch_usdt, eth_usdt`
            },
            {
              title: this.intl.get('help-api-list-1-3'),
              code: `{
  "status": 200,
  "message": "ok",
  "result": [
    {
      "date": 1407694316,
      "amount": "38.9998",
      "price": "2",
      "id": 3355
    },
    {
      "date": 1406813788,
      "amount": "0.1",
      "price": "582.6",
      "id": 3205
    }
  ]
}`
            }
          ]
        },
        {
          title: `/depth/`,
          content: [
            { title: this.intl.get('help-api-list-3') },
            { title: this.intl.get('help-api-list-1-2') },
            {
              title: `market: ${this.intl.get('help-api-list-1-2-1')}eth_btc, bch_btc, lsk_btc, lsk_eth, bch_eth, lsk_usdt, btc_usdt, bch_usdt, eth_usdt`
            },
            {
              title: this.intl.get('help-api-list-1-3'),
              code: `{
  "status": 200,
  "message": "ok",
  "result": {
    "bids": [
      [
        3.0,
        1.2345
      ],
      [
        1.0,
        82.99
      ]
    ],
    "asks": [
      [
        4.0,
        1.2345
      ]
    ]
  }
}`
            }
          ]
        }
      ]
    };
  }
}
