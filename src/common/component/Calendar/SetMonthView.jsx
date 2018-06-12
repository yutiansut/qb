import React, { Component } from "react";

export default class SeletMonthView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let month = this.props.month;
    let setMonth = this.props.setMonth;
    let firstMonth = 1;
    let monthList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

    function showTable() {
      let arr = [];
      for (let i = 0; i < 3; i++) {
        let temp = [];
        for (let j = 0; j < 4; j++) {
          let month = firstMonth + i * 4 + j;
          i * 4 + j > 10 && (month = firstMonth + 10)
          temp .push(<td
            key={j}
            className={'active-set'}
            onClick={() => {setMonth(firstMonth + i * 4 + j)}}
          >
            {monthList[firstMonth + i * 4 + j - 1]}
          </td>)
        }
        arr.push(<tr key={i}>{temp}</tr>);
      }
      return arr;
    }

    return (
      <div>
        <table>
          <tbody>{showTable()}</tbody>
        </table>
      </div>
    );
  }
}
