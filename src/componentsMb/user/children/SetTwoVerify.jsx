import React from 'react';
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../../components/ExchangeViewBase.jsx";

export default class setTwoVerify extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
    }
    const { controller } = this.props
    controller.setView(this)
  }

  componentWillMount() {
  }
  componentDidMount() {
  }

  render() {
    const { controller, url } = this.props;
    // const language = this.props.controller.configData.language;
    return (
      <div className="user-safe-center">
        <div className="safe-center-header">
          <div className="back">
            <img src="../../../../static/mobile/user/Back@3x.png" />
            <NavLink to={`${url}`}>{this.intl.get("back")}</NavLink>
          </div>
          <div className="name">{this.intl.get("header-security")}</div>
        </div>
      </div>
    );
  }
}