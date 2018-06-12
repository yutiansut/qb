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
    console.log('日历1', state, new Date(state).getTime())
    let startTime = new Date(state).getTime()
    this.setState({
      startTime: startTime
    });
  }
  seletTimeEnd(state) {
    console.log('日历2', state, new Date(state).getTime())
    let endTime = new Date(state).getTime()
    this.setState({
      endTime: endTime
    });
    if (this.state.startTime > endTime) {
      console.log(22222)
    }
  }
  showOtherStart() {
    this.setState({
      showOtherNum: 1
    })
  }
  showOtherEnd() {
    this.setState({
      showOtherNum: 2
    })
  }
  render() {
    return (
      <div className="date-interval clearfix">
        <div className="start-time fl">
          <Calendar onChange={(state) => this.seletTimeStart(state)} endTime={this.state.endTime} showOther={() => this.showOtherStart.bind(this)}/>
        </div>
        <div className="end-time fl">
          <Calendar onChange={(state) => this.seletTimeEnd(state)} startTime={this.state.startTime} showOther={() => this.showOtherEnd.bind(this)}/>
        </div>
      </div>
    );
  }
}
