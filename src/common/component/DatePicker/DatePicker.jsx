/*
  onChangeStart 绑定获取开始时间
  onChangeEnd 绑定获取结束时间
  startTime 开始时间
  endTime 结束时间
 */

import React, { Component } from "react";
import Calendar from  "../Calendar/Calendar.jsx"
import "./datePicker.styl"

export default class DateInterval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 0,
      endTime: 0,
      showOtherNum: 0
    };
  }

  seletTimeStart(state) {
    let startTime = new Date(state).getTime()
    this.setState({
      startTime: startTime
    });
    this.props.onChangeStart(startTime)
  }
  seletTimeEnd(state) {
    let endTime = new Date(state).getTime()
    this.setState({
      endTime: endTime
    });
    this.props.onChangeEnd(endTime + 86390000)
  }
  render() {
    return (
      <div className="date-interval clearfix">
        <div className="start-time fl">
          <Calendar onChange={(state) => this.seletTimeStart(state)} endTime={this.state.endTime} startInputTime = {this.props.startTime}/>
        </div>
        <div className="end-time fl">
          <Calendar onChange={(state) =>{this.seletTimeEnd(state)}} startTime={this.state.startTime} endInputTime = {this.props.endTime}/>
        </div>
      </div>
    );
  }
}
