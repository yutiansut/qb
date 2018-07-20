import React, {Component} from 'react';
import exchangeViewBase from "../../ExchangeViewBase.jsx";
import '../stylus/homeAdvadtage.styl'

export default class HomeAdvantage extends exchangeViewBase {
  constructor() {
    super()
    this.imageArray = [
      '/static/img/home/金融交易@2x.png',
      '/static/img/home/4_2.svg',
      '/static/img/home/4_3.svg',
      '/static/img/home/muti@2x.png'
    ];
    this.wordArray = [
      {head: this.intl.get("home-advantage-h1"), para: this.intl.get("home-advantage-p1")},
      {head: this.intl.get("home-advantage-h2"), para: this.intl.get("home-advantage-p2")},
      {head: this.intl.get("home-advantage-h3"), para: this.intl.get("home-advantage-p3")},
      {head: this.intl.get("home-advantage-h4"), para: this.intl.get("home-advantage-p4")},
    ];
    this.state = {index: 0};
    this.changeIndex = this.changeIndex.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }
  changeIndex(index) {
    this.setState({index})
  }
  render() {
    return (
      <div className="home-advan-wrap">
        <h1>{this.intl.get("home-advantage")}</h1>
        <div className="home-advan-header clearfix">
          <ul>
            <li className={this.state.index === 0 ?"active" : ""} onClick={() => {this.setState({index: 0})}}>
              <img src="/static/img/home/金融交易@2x.png"/>
              <p>{this.intl.get("home-advantage-h1")}</p>
            </li>
            <li className={this.state.index === 1 ?"active" : ""} onClick={() => {this.setState({index: 1})}}>
              <img src="/static/img/home/4_2.svg" style={{padding: ".02rem 0"}}/>
              <p>{this.intl.get("home-advantage-h2")}</p>
            </li>
            <li className={this.state.index === 2 ?"active" : ""} onClick={() => {this.setState({index: 2})}}>
              <img src="/static/img/home/4_3.svg" style={{padding: ".02rem 0"}}/>
              <p>{this.intl.get("home-advantage-h3")}</p>
            </li>
            <li className={this.state.index === 3 ?"active" : ""} onClick={() => {this.setState({index: 3})}}>
              <img src="/static/img/home/muti@2x.png" style={{padding: ".05rem 0"}}/>
              <p>{this.intl.get("home-advantage-h4")}</p>
            </li>
          </ul>
        </div>
        <div className="home-advan-content clearfix">
          <div className="big-image">
            <img src={this.imageArray[this.state.index]}/>
          </div>
          <div className="content-ct">
            <div className="content">
              <h2>{this.wordArray[this.state.index].head}</h2>
              <p>{this.wordArray[this.state.index].para}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

