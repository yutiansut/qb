import {observer} from "mobx-react";
import React from "react";
import echarts from "echarts";

@observer
class PairComponent extends React.Component {
  constructor() {
    super();
    this.formatOption = this.formatOption.bind(this)
  }

  componentWillMount() {

    // store.get();
    // store.get()
  }

  componentDidMount() {
    const store = this.props.store;
    // console.log('storestorestore', store)
    // if (this.props.type === 'block') {
    //   store.get()
    // }
    // else {
    //   store.get({market_index: 0})
    // }
    let option = this.formatOption();
    this.formatOptionSelf[this.props.type](option)
    option.xAxis.data = Array(this.props.store.data.line.slice().length).fill(0).map((v, index) => index);
    option.series.data = this.props.store.data.line.slice()
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
  }


  formatOption() {
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
        data: [],
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
        color: '#C0CCDA',
        animation: false,
        lineStyle: {
          width: 1
        }
      }
    }
  }

  table() {
    return (
      <tr>
        <td style={{textAlign: 'center'}}>{this.props.store.data.is_collect && 'abc' || 'bac'}</td>
        <td>{this.props.store.data.name}</td>
        <td>{this.props.store.data.last}</td>
        <td>{this.props.store.data.money}</td>
        <td>{this.props.store.data.vol}</td>
        <td>{this.props.store.data.updown}</td>
        <td>
          <div ref="line" style={{width: '100px', height: '20px'}}>{this.props.store.data.line}</div>
        </td>
      </tr>
    )
  }

  block() {
    return (
      <div className="rec-pairs">
        <div className="rec-pairs-top">
          <p className="rec-pairs-name">{this.props.store.data.name.split("_").reduce((a, b) => !a && a + b || a + '/' + b, '').toUpperCase()}</p>
          <p className="rec-pairs-updown">{this.props.store.data.updown}</p>
        </div>
        <div className="rec-pairs-bottom">
          <p className="rec-pairs-last">{this.props.store.data.last}</p>
          <p className="rec-pairs-money">{this.props.store.data.money}</p>
        </div>
        <div>
          <div ref="line" className="rec-pairs-line">{this.props.store.data.line}</div>
        </div>
      </div>
    )
  }

  render() {
    return this[this.props.type]();
  }
}

export default PairComponent
