import React, { Component } from "react";
import MonthView from "./MonthView.jsx";
import DecadeView from "./DecadeView.jsx";
import SetMonthView from "./SetMonthView.jsx";
import "./calendar.styl"

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day:  new Date().getDate(),
      view: "month",
      showCalendar: 'none',

      inputValue: '',
      clickActive: 0,
    };
    this.hide = (evt) => {
      console.log('evt', evt)
      if (evt.target.className === 'date-interval clearfix') {
        this.setState({
          showCalendar: 'none'
        })
      }
    }
  }

  componentDidMount(){
    document.addEventListener('click', this.hide)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.hide)
  }

  //变为下一月
  goNextMonth() {
    //如果当前是12月，那么下一月就是下一年的1月
    if (this.state.month == 12) {
      this.setState({
        year: this.state.year + 1,
        month: 1
      });
    } else {
      this.setState({
        month: this.state.month + 1
      });
    }
  };

  //变为上一月
  goPrevMonth() {
    if (this.state.month == 1) {
      this.setState({
        year: this.state.year - 1,
        month: 12
      });
    } else {
      this.setState({
        month: this.state.month - 1
      });
    }
  };

  goNextYear() {
    this.setState({
      year: this.state.year + 1
    });
  };

  goPrevYear() {
    this.setState({
      year: this.state.year - 1
    });
  };
  setYear(year) {
    this.setState({
      year,
      view: "changeMonth"
    });
  };

  setMonth(month) {
    this.setState({
      month,
      view: "month"
    });
  };

  setDay(day) {
    let time = day === '今天' ? `${this.state.year}-${this.state.month}-${new Date().getDate()}` : `${this.state.year}-${this.state.month}-${day}`
    this.setState({
      inputValue: time,
      clickActive: day
    });
    this.props.onChange(time)
  };

  showCalendar(state) {
    console.log(111, this.props.showOtherNum)
    this.setState({
      showCalendar: state
    })
  };



  render() {
    return (
      <div className="calendar-wrap">
        <input type="text"
               className="check-calendar"
               placeholder="选择日期"
               onFocus={state => {this.showCalendar('block')}}
               value={this.state.inputValue}/>
        <div className="calendar" style={{display: this.state.showCalendar}}>
          {this.state.view == "month" ? (
            <h3>
              <span onClick={this.goPrevYear.bind(this)}>《</span>
              <b onClick={this.goPrevMonth.bind(this)}>{'<'}</b>
              <i className="year-i" onClick={() => {this.setState({view: "decade"})}}>{this.state.year}年</i>
              <i onClick={() => {this.setState({view: "changeMonth"})}}>{this.state.month}月</i>
              <b onClick={this.goNextMonth.bind(this)}>{'>'}</b>
              <span onClick={this.goNextYear.bind(this)}>》</span>
            </h3>
          ) : (this.state.view == "decade" ? (
            <h3>
              <b onClick={this.goPrevYear.bind(this)}>{'<'}</b>
              {this.state.year - (this.state.year % 10)}年 - {this.state.year - (this.state.year % 10) + 9}年
              <b onClick={this.goNextYear.bind(this)}>{'>'}</b>
            </h3>
          ) : (
            <h3>{this.state.year}年</h3>
          ))}

          {this.state.view == "month" ? (
            <MonthView year={this.state.year} month={this.state.month} day={this.state.day} setDay={this.setDay.bind(this)} index={this.state.clickActive} />
          ) : (this.state.view == "decade" ? (
            <DecadeView
              year={this.state.year}
              setYear={this.setYear.bind(this)}
            />
          ) : (
            <SetMonthView
              month={this.state.month}
              setMonth={this.setMonth.bind(this)}
            />
          ))}
        </div>
      </div>
    );
  }
}
