import {observer} from "mobx-react";
import React from "react";

// const echarts = require('echarts/lib/echarts');
// require('echarts/lib/chart/line');

class EchartsLine extends React.Component {

  componentDidMount() {
    const data = this.props.data;
    const type = this.props.type;
    let option = this.formatOption;

    this.formatOptionSelf[type](option)
    // option.xAxis.data = Array(data.slice().length).fill(0).map((v, index) => index);
    // option.series.data = data.slice();
    option.series.data = [... data];
    let lineItem = this.refs.line;
    let myCharts = echarts.init(lineItem);
    myCharts.setOption(option)
  }

  formatOptionSelf = {
    table(option) {
      option.series.color = '#25272D'
    },
    block(option) {
      option.series.areaStyle = {color: '#F9FBFE'}
      option.series.color = '#C0CCDA'
    }
  };

  get formatOption() {
    return {
      grid: {
        left: '0',
        right: '0',
        bottom: '0',
        top: '0',
        // width: '100',
        // height: '20'
      },
      xAxis: {
        show: false,
        data: [1, 2, 3, 4, 5, 6, 7],
        type: 'category',
        boundaryGap: false,
      },
      yAxis: {
        show: false,
        type: 'value',
        boundaryGap: ['0%', '30%'],
      },
      series: {
        data: [],
        type: 'line',
        symbol: 'none',
        cursor: 'none',
        color: '#25272D',
        animation: false,
        lineStyle: {
          width: 1
        }
      }
    }
  }

  render() {
    return <div ref="line" className={this.props.type === 'table' && 'market-pair-line' || 'rec-pairs-line'}></div>
  }
}

export default EchartsLine
