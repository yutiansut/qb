import React, { Component } from "react";

export default class DecadeView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let year = this.props.year;
    let setYear = this.props.setYear;
    //这一年代的开头
    let firstYear = year - (year % 10);

    function showTable() {
      let arr = [];
      for (let i = 0; i < 3; i++) {
        let temp = [];
        for (let j = 0; j < 4; j++) {
          let year = firstYear + i * 4 + j;
          i * 4 + j > 9 && (year = '')
          temp .push(<td
            key={j}
            className={(year !== '') ? 'active-set' : ''}
            onClick={() => {setYear(firstYear + i * 4 + j)}}
          >
            {year}
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
