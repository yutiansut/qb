import React from 'react';
import exchangeViewBase from "../../ExchangeViewBase.jsx";

export default class HomeSuperiority extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}
  componentDidMount() {}

  render() {
    let lang = this.props.controller.configController.store.state.language;
    return (
      <div className="home-super-wrap">
        <h1>{this.intl.get("home-advantage")}</h1>
        <ul className={`clearfix ${lang === 'zh-CN' ? '' : 'active'}`}>
          <li>
            <img src={this.$imagesMap.$home_financial}/>
            <h2>{this.intl.get("home-advantage-h1")}</h2>
            <p>{this.intl.get("home-advantage-p1")}</p>
          </li>
          <li>
            <img src={this.$imagesMap.$home_safe}/>
            <h2>{this.intl.get("home-advantage-h2")}</h2>
            <p>{this.intl.get("home-advantage-p2")}</p>
          </li>
          <li>
            <img src={this.$imagesMap.$home_stable}/>
            <h2>{this.intl.get("home-advantage-h3")}</h2>
            <p>{this.intl.get("home-advantage-p3")}</p>
          </li>
          <li>
            <img className='muti' src={this.$imagesMap.$home_muti}/>
            <h2>{this.intl.get("home-advantage-h4")}</h2>
            <p>{this.intl.get("home-advantage-p4")}</p>
          </li>
        </ul>
      </div>
    );
  }
}

