import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../ExchangeViewBase";
import Button from "../../../common/component/Button";
import Input from "../../../common/component/Input";
import Pagination from "../../../common/component/Pagination";
import "../style/charge.styl";
export default class Charge extends exchangeViewBase {
  constructor(props) {
    super(props);
    //绑定方法
    let { controller } = props;
    this.state = {
      showSearch: false,
      currency: "BTC",
      value: "BTC",
      showQrcode: false
    };
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    let { wallet_dict, wallet_list, charge_history } = controller.initState;
    this.state = Object.assign(this.state, {
      wallet_dict,
      wallet_list,
      charge_history
    });
    //绑定方法
    this.hideQrcode = () => {
      if (!this.state.showQrcode) return;
      this.setState({
        showQrcode: false
      });
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
    this.getCharge = controller.getCharge.bind(controller);
    this.getCurrencyList = controller.getCurrencyList.bind(controller);
    this.getChargeHistory = controller.getChargeHistory.bind(controller);
  }

  componentWillMount() {
    this.getCharge();
    this.getCurrencyList();
    this.getChargeHistory();
  }

  componentDidMount() {
    window.addEventListener("click", this.hideQrcode);
  }

  componentWillUpdate(props, state, next) {}

  componentWillUnmount() {
    window.removeEventListener("click", this.hideQrcode);
  }

  // 复制到剪贴板
  copy(el) {
    el.select(); // 选择对象
    try {
      if (document.execCommand("copy", false, null)) {
        document.execCommand("Copy");
        alert("已复制好，可贴粘。");
      } else {
        alert("复制失败，请手动复制");
      }
    } catch (err) {
      alert("复制失败，请手动复制");
    }
  }
  render() {
    let { amount, avail, lock, addr, pay_confirms } = this.state.wallet_dict;
    let { total, cur_page, page_size, list } = this.state.charge_history;
    let searchArr = this.props.controller.filter(
      this.state.wallet_list,
      this.state.value.toLowerCase()
    );
    return (
      <div className="charge">
        <h3>充币-{this.state.currency}</h3>
        <div className="select">
          <div className="search clearfix">
            <span className="title">选择币种</span>
            <div className="currency-asset">
              <div className="input">
                <Input
                  type="search1"
                  placeholder="请输入币种关键字"
                  value={this.state.value}
                  onInput={value => {
                    this.setState({ value: value });
                  }}
                  onFocus={this.show}
                  onEnter={() => {
                    this.setValue(searchArr[0].toUpperCase());
                    this.setCurrency(searchArr[0].toUpperCase());
                    this.hide();
                  }}
                  clickOutSide={() => {
                    this.setValue(searchArr[0].toUpperCase());
                    this.setCurrency(searchArr[0].toUpperCase());
                    this.hide();
                  }}
                >
                  {
                    <ul
                      className={`search-list ${
                        this.state.showSearch && searchArr.length ? "" : "hide"
                      }`}
                    >
                      {searchArr.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            this.setValue(item.toUpperCase());
                            this.setCurrency(item.toUpperCase());
                            this.hide();
                          }}
                        >
                          {item.toUpperCase()}
                        </li>
                      ))}
                    </ul>
                  }
                </Input>
              </div>
              <ul>
                <li>
                  <span>总额</span>
                  <i>
                    {amount} {this.state.currency}
                  </i>
                </li>
                <li>
                  <span>下单冻结</span>
                  <i>
                    {lock} {this.state.currency}
                  </i>
                </li>
                <li>
                  <span>可用余额</span>
                  <i>
                    {avail} {this.state.currency}
                  </i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="address">
          <p className="tips">
            注意：禁止向{this.state.currency}地址充值除{this.state.currency}之外的资产，任何充入{
              this.state.currency
            }地址的非{this.state.currency}资产将不可找回。
          </p>
          <div className="currency-address clearfix">
            <span className="title">充值地址</span>
            <input
              ref="address"
              value={addr}
              readOnly="readonly"
              onChange={() => {}}
            />
          </div>
          <div className="handel">
            <Button
              title="展示二维码"
              type="base"
              onClick={e => {
                e.nativeEvent.stopImmediatePropagation();
                this.setState({ showQrcode: true });
              }}
            />
            <Button
              title="复制到剪贴板"
              type="base"
              onClick={() => {
                this.copy(this.refs.address);
              }}
            />
            <div className={`qrcode ${this.state.showQrcode ? "show" : ""}`} />
          </div>
        </div>
        <div className="tip clearfix">
          <span className="title">温馨提示</span>
          <ol>
            <li>
              使用{this.state.currency}地址充值需要<a href="#">
                {pay_confirms}
              </a>个网络确认才能到账
            </li>
            <li>
              充值完成后，你可以进入{" "}
              <NavLink to={`/wallet/dashboard`}>资产记录</NavLink> 页面跟踪进度
            </li>
          </ol>
        </div>
        <div className="to-trade clearfix">
          <span className="title">去交易</span>
          <Button title="EOS/BTC" type="base" />
        </div>
        <div className="history clearfix">
          <span className="title">充币记录</span>
          <table>
            <thead>
              <tr>
                <th className="time">充值时间</th>
                <th className="currency">币种</th>
                <th className="amount">充值数量</th>
                <th className="send">发送地址</th>
                <th className="receive">接收地址</th>
                <th className="confirm">确认数</th>
                <th className="state">状态</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.currency}</td>
                  <td>{item.amount}</td>
                  <td>{item.send_address}</td>
                  <td>{item.receive_address}</td>
                  <td>
                    <a href="#">{item.confirm}</a>
                  </td>
                  <td>
                    <span>
                      {!item.state
                        ? "通过"
                        : item.state === 1
                          ? "审核中"
                          : "未通过"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagina">
            <Pagination
              total={total}
              pageSize={page_size}
              showTotal={true}
              showQuickJumper={true}
              currentPage={cur_page}
            />
          </div>
          <p className="more">
            <NavLink to={`/wallet/dashboard`}>查看全部→</NavLink>
          </p>
        </div>
      </div>
    );
  }
}
