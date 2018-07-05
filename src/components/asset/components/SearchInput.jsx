import React, { Component } from "react";
import exchangeViewBase from "../../ExchangeViewBase";
import Input from "../../../common/component/Input";

export default class Charge extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false
    };
    this.show = () => {
      this.setState({ showSearch: true });
    };
    this.hide = () => {
      this.setState({ showSearch: false });
    };
    this.setValue = value => {
      this.props.setValue(value);
    };
    this.setCurrency = currency => {
      this.props.setCurrency(currency);
    };
  }
  render() {
    let searchArr = this.props.filte(
      this.props.walletList,
      this.props.value.toUpperCase()
    );
    return (
      <div className="input">
        <Input
          type="search1"
          value={this.props.value}
          onInput={value => {
            this.setValue(value);
          }}
          onFocus={this.show}
          onEnter={() => {
            let value = searchArr[0] || "BTC";
            this.setValue(value);
            this.setCurrency(value);
            this.hide();
          }}
          clickOutSide={() => {
            let value = searchArr[0] || "BTC";
            this.setValue(value);
            this.setCurrency(value);
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
                  onClick={e => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    this.setValue(item);
                    this.setCurrency(item);
                    this.hide();
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          }
        </Input>
      </div>
    );
  }
}
