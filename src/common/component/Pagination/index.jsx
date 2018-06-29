import React, { Component } from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";
import Button from "../Button/";
import "./style.styl";
/*
  currentPage	当前页码，默认为1
  total	数据总条数
  pageSize 每页数据条数
  showTotal 是否显示数据总条数
  showQuickJumper 是否显示快速跳转
  onChange页码跳转的回调
*/

export default class Pagination extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = { currentPage: props.currentPage ? props.currentPage : 1 };
    this.totalPage =
      props.total % props.pageSize === 0
        ? parseInt(props.total / props.pageSize)
        : parseInt(props.total / props.pageSize) + 1;
  }
  list(totalPage, currentPage) {
    if (totalPage < 7) {
      return Array.from({ length: totalPage }, (item, index) => index + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPage];
    }
    if (currentPage < totalPage - 3) {
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPage
      ];
    }
    if (currentPage >= totalPage - 3) {
      return [
        1,
        "...",
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
        totalPage
      ];
    }
  }

  shouldComponentUpdate (nextProps,nextState){
    if (nextState.currentPage === this.state.currentPage) return false;
    this.props.onChange && this.props.onChange(nextState.currentPage);
    return true;
  }


  render() {
    let { total, showTotal, showQuickJumper, pageSize } = this.props;
    let currentPage = this.state.currentPage;
    return (
      <div className="pagination-wrap">
        {showTotal && (
          <p className="total">
            {this.intl.get('inTotal_v1')} <span>{total}</span> {this.intl.get('items_v1')}
          </p>
        )}
        <ul className="pagination">
          <li
            className={`last ${currentPage === 1 ? "disable" : ""}`}
            onClick={() => {
              if (currentPage - 1 < 1) return;
              this.setState({ currentPage: currentPage - 1 });
            }}
          />
          {this.list(this.totalPage, currentPage).map((item, index) => {
            return (
              <li
                key={index}
                className={`page-button ${
                  item === currentPage ? "active" : ""
                } ${item === "..." ? "omit" : ""}`}
                onClick={() => {
                  if (item === "...") return;
                  this.setState({ currentPage: item });
                }}
              >
                {item}
              </li>
            );
          })}
          <li
            className={`next ${
              currentPage === this.totalPage ? "disable" : ""
            }`}
            onClick={() => {
              if (currentPage + 1 > this.totalPage) return;
              this.setState({ currentPage: currentPage + 1 });
            }}
          />
        </ul>
        {showQuickJumper && (
          <p className="jump">
            {this.intl.get('to_v1')}<input
              ref="input"
              type="text"
              onInput={() => {
                let value = this.refs.input.value;
                if (!/(^[0-9]\d*$)/.test(value)) {
                  value = value.replace(/[^0-9]/g, "");
                }
                if (value == 0 || value > this.totalPage) {
                  value = value.substring(0, value.length - 1);
                }
                this.refs.input.value = value;
              }}
              onKeyDown={e => {
                if (e.nativeEvent.keyCode === 13) {
                  this.setState({
                    currentPage: Number(this.refs.input.value)
                  });
                  this.refs.input.blur();
                }
              }}
            /> {this.intl.get('page_v1')}
            <Button
              title={this.intl.get('go_v1')}
              type="base"
              onClick={() => {
                if (this.refs.input.value === '') return;
                this.setState({
                  currentPage: Number(this.refs.input.value)
                });
              }}
            />
          </p>
        )}
      </div>
    );
  }
}
