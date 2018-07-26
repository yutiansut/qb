import React, { Component } from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";

export default class SeletMonthView extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.monthList = [
      this.intl.get('Jan'),
      this.intl.get('Feb'),
      this.intl.get('Mar'),
      this.intl.get('Apr'),
      this.intl.get('May'),
      this.intl.get('Jun'),
      this.intl.get('Jul'),
      this.intl.get('Aug'),
      this.intl.get('Sep'),
      this.intl.get('Oct'),
      this.intl.get('Nov'),
      this.intl.get('Dec'),
    ]
  }

  render() {
    let monthList = this.monthList;
    let setMonth = this.props.setMonth;
    let firstMonth = 1;

    function showTable() {
      let arr = [];
      for (let i = 0; i < 3; i++) {
        let temp = [];
        for (let j = 0; j < 4; j++) {
          let month = firstMonth + i * 4 + j;
          // console.log(month)
          // i * 4 + j > 10 && (month = firstMonth + 10)
          temp .push(<td
            key={j}
            className={'active-set'}
            onClick={() => {setMonth(month)}}
          >
            {monthList[month - 1]}
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
