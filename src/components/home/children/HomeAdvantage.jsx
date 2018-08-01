import React, {Component} from 'react';
import exchangeViewBase from "../../ExchangeViewBase.jsx";
import '../stylus/homeAdvadtage.styl'

export default class HomeAdvantage extends exchangeViewBase {
  constructor() {
    super()
    this.imageArray = [
      this.$imagesMap.$home_financial,
      this.$imagesMap.$home_safe,
      this.$imagesMap.$home_stable,
      this.$imagesMap.$home_muti
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
              <img src={this.$imagesMap.$home_financial}/>
              <p>{this.intl.get("home-advantage-h1")}</p>
            </li>
            <li className={this.state.index === 1 ?"active" : ""} onClick={() => {this.setState({index: 1})}}>
              <img src={this.$imagesMap.$home_safe} style={{padding: ".02rem 0"}}/>
              <p>{this.intl.get("home-advantage-h2")}</p>
            </li>
            <li className={this.state.index === 2 ?"active" : ""} onClick={() => {this.setState({index: 2})}}>
              <img src={this.$imagesMap.$home_stable} style={{padding: ".02rem 0"}}/>
              <p>{this.intl.get("home-advantage-h3")}</p>
            </li>
            <li className={this.state.index === 3 ?"active" : ""} onClick={() => {this.setState({index: 3})}}>
              <img src={this.$imagesMap.$home_muti} style={{padding: ".05rem 0"}}/>
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

