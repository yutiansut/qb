import React, { Component } from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";

export default class MonthView extends exchangeViewBase {
  constructor(props) {
    super(props);
  }


  render() {
    const { year, month, day, setDay, index, isStart, isEnd} = this.props;

    //计算三要素
    //① 本月1号星期几
    let curMonthWeek = new Date(year, month - 1, 1).getDay();
    //② 本月共几天
    let days = new Date(new Date(year, month, 1) - 1).getDate();
    //③ 上月共几天
    let lastMonthDays = new Date(new Date(year, month - 1, 1) - 1).getDate();

    //组建数组
    let daysArr = [];
    //本月1号星期几，就有上个月的几天尾巴
    let count1 = curMonthWeek;
    while (count1--) {
      daysArr.unshift("");
    }
    //本月的日子
    let count2 = 1;
    let n = days;
    while (n--) {
      daysArr.push(count2++);
    }
    //凑满35项或42项
    let total = daysArr.length > 35 ? 42 : 35;
    while (daysArr.length != total) {
      daysArr.push("");
    }

    //封装一个函数，根据ARR来返回JSX结构
    function showMonth(arr) {
      let domarr = [];
      for (let i = 0; i < arr.length / 7; i++) {
        let temp = [];
        for (let j = 0; j < 7; j++) {
          (year === new Date().getFullYear() && month === new Date().getMonth() + 1 && arr[i * 7 + j] === day) && (arr[i * 7 + j] = this.intl.get('today'))
          temp.push(<td key={j}
                        className={`${(arr[i * 7 + j] === this.intl.get('today')) ? ((isStart && new Date().getDate() < new Date(isStart).getDate()) || (isEnd && new Date().getDate() > new Date(isEnd).getDate()) ? 'is-disabled' : 'today-text') : ''}
                                    ${(arr[i * 7 + j] !== '') ? 'active-text' : ''}
                                    ${arr[i * 7 + j] === index ? 'active' : ''}
                                    ${(new Date(isStart).getFullYear() === year && new Date(isStart).getMonth() + 1 === month && arr[i * 7 + j] < new Date(isStart).getDate()) ? 'is-disabled' : ''}
                                    ${new Date(isStart).getMonth() + 1 > month ? 'is-disabled' : ''}
                                    ${new Date(isStart).getFullYear() > year ? 'is-disabled' : ''}
                                    ${(isEnd && new Date(isEnd).getFullYear() === year && new Date(isEnd).getMonth() + 1 === month && arr[i * 7 + j] > new Date(isEnd).getDate()) ? 'is-disabled' : ''}
                                    ${isEnd && new Date(isEnd).getMonth() + 1 < month ? 'is-disabled' : ''}
                                    ${isEnd && new Date(isEnd).getFullYear() < year ? 'is-disabled' : ''}`}
                        onClick={() => {
                          setDay(arr[i * 7 + j]);
                        }}>{arr[i * 7 + j]}</td>);
        }
        domarr.push(<tr key={i}>{temp}</tr>);
      }
      return domarr;
    }

    return <div className="calendar-content">
        <table>
          <thead>
            <tr>
              <td>{this.intl.get("Su")}</td>
              <td>{this.intl.get("Mo")}</td>
              <td>{this.intl.get('Tu')}</td>
              <td>{this.intl.get('We')}</td>
              <td>{this.intl.get('Th')}</td>
              <td>{this.intl.get('Fr')}</td>
              <td>{this.intl.get('Sa')}</td>
            </tr>
          </thead>
          <tbody>{showMonth.call(this,daysArr)}</tbody>
        </table>
      </div>;
  }
}
