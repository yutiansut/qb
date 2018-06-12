import React, { Component } from "react";
import './style.styl'

export default class Pagination extends Component {
  constructor(props) {
    super(props);
  }
  list(total,pageSize,currentPage) {
    let arr;
    let totalPage = parseInt(total / pageSize) + 1;
    if (totalPage < 7) {
      arr = [1, 2, 3, 4, 5, 6, 7];
    }
    if (totalPage > 7 && currentPage < 4) {
      arr = [1, 2, 3, 4, 5, "...", totalPage];
    }
    return arr;
  }
  render() {
    let {
      currentPage,
      hideOnSinglePage,
      total,
      showTotal,
      showQuickJumper,
      pageSize
    } = this.props;
    !currentPage && (currentPage = 1)
    return <ul className="pagination">
        <li className="last">{"<"}</li>
        {this.list(total, pageSize, currentPage).map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
        <li className="next">{">"}</li>
      </ul>;
  }
}
