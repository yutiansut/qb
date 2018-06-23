import React, { Component } from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";

function getContent(netUrl) {
  return {
    summarize: {
      title: `概述`,
      content: [
        {
          title: `1. 公共 API 包括 <span>ticker</span>, <span>trades</span>, <span>depth</span>`
        },
        {
          title: `2. 用户 API 每次请求还需要一个额外的 POST 参数：nonce（必须是自增的正整数）`
        },
        { title: `3. API 起始地址为：https://${netUrl}/api/v1` },
        { title: `4. 公共 API 使用 HTTP GET 请求；用户 API 使用 POST 请求` },
        {
          title: `5. 服务器响应为 JSON 格式，数据结构为：`,
          code: `{'status': xxx, 'message': 'xxx', 'result': xxx}`
        }
      ],
      remark: `请求正常时，status 为 200, result 为返回内容；请求有误时，status 为非 200，message 为具体出错信息`
    },
    tableList:{
      title: `API 列表`,
      table: {
        thead: [`API`, `需要身份验证`, `功能`],
        tbody: [
          {
            api:`/ticker/`,
            verify: `-`,
            function: `获取最新行情`,
          },
          {
            api:`/trades/`,
            verify: `-`,
            function: `获取最新成交列表`,
          },
          {
            api:`/depth/`,
            verify: `-`,
            function: `获取最新深度`
          },
        ]
      }
    },
    apiList: [
      {
        title: `/ticker/`,
        content: [
          { title: `1. 获取最新行情` },
          { title: `2. 支持参数：` },
          {
            title: `market: 市场，可选：eth_btc, bch_btc, lsk_btc, lsk_eth, bch_eth, lsk_usdt, btc_usdt, bch_usdt, eth_usdt`
          },
          {
            title: `3. 返回示例：`,
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
          { title: `1. 获取最新成交列表` },
          { title: `2. 支持参数：` },
          {
            title: `market: 市场，可选：eth_btc, bch_btc, lsk_btc, lsk_eth, bch_eth, lsk_usdt, btc_usdt, bch_usdt, eth_usdt`
          },
          {
            title: `3. 返回示例：`,
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
          { title: `1. 获取最新深度` },
          { title: `2. 支持参数：` },
          {
            title: `market: 市场，可选：eth_btc, bch_btc, lsk_btc, lsk_eth, bch_eth, lsk_usdt, btc_usdt, bch_usdt, eth_usdt`
          },
          {
            title: `3. 返回示例：`,
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
    const { summarize, apiList, tableList } = getContent(netUrl);
    return <div className="help-api">
        <h2 className="title">REST API 文档 v1</h2>
        <div className="summarize">
          <h3>{summarize.title}</h3>
          <div className="content">
            <ol>
              {summarize.content.map((v, index) => (
                !v.code ? <li
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: v.title
                  }}
                /> :
                <li
                  key={index}
                >
                  {v.title}
                  {v.code && (
                    <pre>
                      <code>{v.code}</code>
                    </pre>
                  )}
                </li>
              ))}
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
}
